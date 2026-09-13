import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";

/**
 * Published content only, from the CDN. Preview reads layer a token and the
 * drafts perspective on top of this in `fetch.ts`.
 *
 * `null` when no project is configured, so callers have to handle the
 * fallback rather than finding out from a thrown config error at build time.
 */
export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
      // Stega would thread invisible characters through every string. This
      // site splits headlines into words and derives the footer address from
      // the email, both of which it would break.
      stega: false,
    })
  : null;

/**
 * The one cache tag every Sanity read carries. The whole site is two
 * documents, so there's nothing to gain from finer tags — a publish to either
 * invalidates everything.
 */
export const CONTENT_TAG = "sanity";
