/**
 * Where the content lives. None of these are secrets — the project ID and
 * dataset are public in every request the browser makes to the Sanity CDN — so
 * they're `NEXT_PUBLIC_` and safe to read from the Studio's client bundle.
 *
 * Without a project ID the site still builds and renders: every read falls
 * back to the copy in `sanity/content/defaults.ts`. See `isSanityConfigured`.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

/** Pinned, so a Sanity API change can't alter query results under us. */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-09-01";

export const isSanityConfigured = /^[a-z0-9-]+$/.test(projectId);
