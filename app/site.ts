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

export const SITE_EMAIL = "hello@nakebamason.com";

/** The retainer, as named on the page. */
export const SITE_OFFER = "The Operations Partnership";
