/**
 * Canonical site facts. Metadata, the OG image, robots, the sitemap and the
 * structured data all read from here so they can't drift apart.
 *
 * `NEXT_PUBLIC_SITE_URL` overrides the domain for previews and staging; the
 * fallback is the production domain (the one the contact address is on).
 */
/**
 * The origin this deployment is actually reachable at. Every absolute URL the
 * site publishes — OG images, canonicals, the sitemap, the structured data —
 * is built on it, so it has to name a host that really serves these files.
 *
 * Order matters:
 *  1. `NEXT_PUBLIC_SITE_URL`, when a domain is being pinned deliberately.
 *  2. Vercel's production domain for this project, which follows the custom
 *     domain automatically once one is attached.
 *  3. The per-deployment URL, so previews advertise themselves.
 *  4. The eventual home, for local builds.
 *
 * Read on the server only — no client component imports this module, which is
 * what lets the un-prefixed Vercel variables be used at all.
 */
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://nakebamason.com";
}

export const SITE_URL = resolveSiteUrl().replace(/\/+$/, "");

export const SITE_NAME = "Nakeba Mason";

export const SITE_ROLE = "Strategic Operations Partner for Creative Founders";

/** Kept under ~155 characters so search results don't truncate it. */
export const SITE_DESCRIPTION =
  "Nakeba Mason is a strategic operations partner for creative founders — building the structure, coordination and follow-through a growing studio runs on.";

/**
 * The card platforms show when the site is shared, and its true pixel size.
 *
 * A static file rather than the `opengraph-image` route convention, so the
 * JSON-LD can point at the same asset — the convention's URL carries a build
 * hash and isn't addressable from anywhere else.
 *
 * The filename is versioned on purpose. Facebook's scraper (which WhatsApp
 * shares) caches fetched images by URL for weeks, so re-uploading artwork at a
 * path it has already seen leaves the old picture in circulation. Bump the
 * suffix whenever the artwork changes and every cache misses on the next
 * scrape. Renaming is not enough on its own — the page URL's cached preview
 * still has to be re-scraped in Facebook's Sharing Debugger.
 *
 * The dimensions are stated because WhatsApp decides between a large card and
 * a small thumbnail before it has finished fetching the image; without them it
 * often settles for the thumbnail. They must match the file — check with
 * `sips -g pixelWidth -g pixelHeight public/<file>` after replacing it.
 */
export const SHARE_IMAGE = {
  url: "/og-v2.png",
  width: 1200,
  height: 630,
  type: "image/png",
} as const;

export const SITE_EMAIL = "hello@nakebamason.com";

/** The retainer, as named on the page. */
export const SITE_OFFER = "The Operations Partnership";
