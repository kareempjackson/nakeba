/**
 * Canonical site facts. Metadata, the OG image, robots, the sitemap and the
 * structured data all read from here so they can't drift apart.
 *
 * `NEXT_PUBLIC_SITE_URL` overrides the domain for previews and staging; the
 * fallback is the production domain (the one the contact address is on).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nakebamason.com"
).replace(/\/+$/, "");

export const SITE_NAME = "Nakeba Mason";

export const SITE_ROLE = "Strategic Operations Partner for Creative Founders";

/** Kept under ~155 characters so search results don't truncate it. */
export const SITE_DESCRIPTION =
  "Nakeba Mason is a strategic operations partner for creative founders — building the structure, coordination and follow-through a growing studio runs on.";

export const SITE_EMAIL = "hello@nakebamason.com";

/** The retainer, as named on the page. */
export const SITE_OFFER = "The Operations Partnership";
