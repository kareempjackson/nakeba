/**
 * Site facts that don't belong in the CMS: the origin this deployment answers
 * on, and the share card's pixel size. Everything editorial — name, role,
 * description, email, the share image itself — lives in Sanity (Site settings)
 * and reaches the page through `sanity/lib/fetch.ts`.
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

/**
 * The share card's true pixel size. Stated because WhatsApp decides between a
 * large card and a small thumbnail before it has finished fetching the image;
 * without the dimensions it often settles for the thumbnail.
 *
 * An image uploaded in the Studio is cropped to exactly this on the Sanity CDN
 * (see `fetch.ts`), so the numbers always match the file. The fallback in
 * `public/` must match too — check with
 * `sips -g pixelWidth -g pixelHeight public/<file>` after replacing it.
 *
 * Facebook's scraper (which WhatsApp shares) caches images by URL for weeks.
 * Sanity asset URLs change with every upload, so a new image is never served
 * from that cache — but the page's own cached preview still has to be
 * re-scraped in Facebook's Sharing Debugger.
 */
export const SHARE_IMAGE_SIZE = { width: 1200, height: 630 } as const;

/** Paths under `public/` become absolute on this origin; URLs pass through. */
export function absoluteUrl(pathOrUrl: string) {
  return /^https?:\/\//.test(pathOrUrl) ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;
}
