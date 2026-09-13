import { draftMode } from "next/headers";
import { cache } from "react";
import { DEFAULT_CONTENT } from "../content/defaults";
import type { Img, SiteContent } from "../content/types";
import { dataset, projectId } from "../env";
import { client, CONTENT_TAG } from "./client";

/** Both singletons in one round trip. */
const CONTENT_QUERY = `{
  "settings": *[_id == "siteSettings"][0],
  "home": *[_id == "homePage"][0]
}`;

/**
 * How stale published content can get if the publish webhook is missing or
 * fails. The webhook (`app/api/revalidate`) is what makes edits immediate;
 * this is only the backstop.
 */
const REVALIDATE_SECONDS = 300;

/**
 * Everything the site renders, from Sanity, with the original copy filling any
 * gap. Wrapped in `cache` so the layout, metadata and page share one read per
 * request.
 *
 * In Draft Mode (the Studio's Presentation tool) it reads drafts, uncached.
 * Otherwise it reads published content through Next's data cache, tagged for
 * the webhook.
 *
 * Never throws: with no project configured, or the API unreachable, the page
 * renders `DEFAULT_CONTENT` rather than failing the build or the request.
 */
export const getContent = cache(async (): Promise<SiteContent> => {
  if (!client) return DEFAULT_CONTENT;

  const { isEnabled: preview } = await draftMode();
  const token = process.env.SANITY_API_READ_TOKEN;

  try {
    const raw = await client.fetch<RawContent>(
      CONTENT_QUERY,
      {},
      preview && token
        ? { perspective: "drafts", token, useCdn: false, cache: "no-store" }
        : { next: { revalidate: REVALIDATE_SECONDS, tags: [CONTENT_TAG] } },
    );
    return normalise(raw);
  } catch (error) {
    console.error("[sanity] Couldn't read content; using defaults.", error);
    return DEFAULT_CONTENT;
  }
});

/* -------------------------------------------------------------------------- */

type RawContent = { settings?: unknown; home?: unknown } | null;

type SanityImage = {
  asset: { _ref: string };
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number };
  alt?: string;
};

type Plain = Record<string, unknown>;

const isPlain = (value: unknown): value is Plain =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isImage = (value: unknown): value is SanityImage =>
  isPlain(value) &&
  isPlain(value.asset) &&
  typeof value.asset._ref === "string";

function normalise(raw: RawContent): SiteContent {
  const settings = isPlain(raw?.settings) ? { ...raw.settings } : {};

  // The share card is cropped to its fixed size on the CDN, around the
  // hotspot, so the dimensions in the metadata are always true.
  if (isImage(settings.shareImage)) {
    const { hotspot } = settings.shareImage;
    settings.shareImage = imageUrl(settings.shareImage, {
      w: 1200,
      h: 630,
      fit: "crop",
      fm: "jpg",
      ...(hotspot && { crop: "focalpoint", "fp-x": hotspot.x, "fp-y": hotspot.y }),
    });
  } else {
    delete settings.shareImage;
  }

  return merge(DEFAULT_CONTENT, {
    settings: resolveImages(settings),
    home: resolveImages(raw?.home),
  });
}

/**
 * Sanity asset reference → CDN URL. The reference encodes everything needed:
 * `image-<id>-<width>x<height>-<format>`. A crop set in the Studio is applied
 * as a source rectangle.
 */
function imageUrl(
  image: SanityImage,
  params: Record<string, string | number> = {},
) {
  const [, id, size, format] = image.asset._ref.split("-");
  const [width, height] = size.split("x").map(Number);
  const search = new URLSearchParams();

  const crop = image.crop;
  if (crop && (crop.left || crop.top || crop.right || crop.bottom)) {
    const x = Math.round(crop.left * width);
    const y = Math.round(crop.top * height);
    const w = Math.round(width * (1 - crop.left - crop.right));
    const h = Math.round(height * (1 - crop.top - crop.bottom));
    search.set("rect", `${x},${y},${w},${h}`);
  }
  for (const [key, value] of Object.entries(params)) {
    search.set(key, String(value));
  }

  const query = search.size ? `?${search}` : "";
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${size}.${format}${query}`;
}

/**
 * The hotspot as CSS `object-position`, so `object-cover` keeps the chosen
 * point in frame. The hotspot is relative to the full image, so it's
 * re-expressed relative to the crop.
 */
function objectPosition({ hotspot, crop }: SanityImage) {
  if (!hotspot) return undefined;
  const { left = 0, right = 0, top = 0, bottom = 0 } = crop ?? {};
  const clamp = (n: number) => Math.min(1, Math.max(0, n));
  const x = clamp((hotspot.x - left) / (1 - left - right || 1));
  const y = clamp((hotspot.y - top) / (1 - top - bottom || 1));
  return `${(x * 100).toFixed(1)}% ${(y * 100).toFixed(1)}%`;
}

/** Walks a document, turning image fields into `Img` and dropping `_` keys. */
function resolveImages(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(resolveImages);
  if (isImage(value)) {
    const img: Img = { src: imageUrl(value), alt: value.alt ?? "" };
    const position = objectPosition(value);
    if (position) img.position = position;
    return img;
  }
  if (isPlain(value)) {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => !key.startsWith("_"))
        .map(([key, child]) => [key, resolveImages(child)]),
    );
  }
  return value;
}

/** Fields an item may leave empty without being considered incomplete. */
const OPTIONAL_KEYS = new Set(["alt", "position"]);

/**
 * Overlays CMS values on the defaults, key by key. Empty strings and missing
 * values keep the default. A non-empty CMS list replaces the default list
 * outright — but items missing a required field (half-filled in the Studio)
 * are skipped rather than rendered with holes.
 */
function merge<T>(fallback: T, value: unknown): T {
  if (value === null || value === undefined) return fallback;

  if (typeof fallback === "string") {
    return (typeof value === "string" && value.trim() ? value : fallback) as T;
  }

  if (Array.isArray(fallback)) {
    if (!Array.isArray(value)) return fallback;
    const template: unknown = fallback[0];
    const items = value.filter((item) => isComplete(item, template));
    return (items.length ? items : fallback) as T;
  }

  if (isPlain(fallback)) {
    if (!isPlain(value)) return fallback;
    const out: Plain = { ...fallback };
    for (const key of Object.keys(fallback)) {
      out[key] = merge(fallback[key], value[key]);
    }
    // Optional keys the defaults don't carry, such as a hotspot position.
    for (const key of OPTIONAL_KEYS) {
      if (value[key] !== undefined && !(key in fallback)) out[key] = value[key];
    }
    return out as T;
  }

  return (typeof value === typeof fallback ? value : fallback) as T;
}

function isComplete(item: unknown, template: unknown): boolean {
  if (typeof template === "string") {
    return typeof item === "string" && item.trim() !== "";
  }
  if (isPlain(template)) {
    if (!isPlain(item)) return false;
    return Object.keys(template).every(
      (key) => OPTIONAL_KEYS.has(key) || isComplete(item[key], template[key]),
    );
  }
  return item !== null && item !== undefined;
}
