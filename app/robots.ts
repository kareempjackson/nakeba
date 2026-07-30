import type { MetadataRoute } from "next";
import { SITE_URL } from "./site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The brand guide is an internal reference, not a marketing page.
      disallow: "/brand",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
