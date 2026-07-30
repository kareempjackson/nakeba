import type { MetadataRoute } from "next";
import { SITE_URL } from "./site";

/** One-page site: the marketing page is the only indexable route. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
