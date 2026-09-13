import { accessibleImage } from "./accessible-image";
import { homePage } from "./home-page";
import { siteSettings } from "./site-settings";

export const schemaTypes = [homePage, siteSettings, accessibleImage];

/**
 * Documents that exist exactly once, at a fixed ID. The site queries them by
 * these IDs, so the Studio hides "create", "duplicate" and "delete" for them.
 */
export const SINGLETONS = {
  homePage: "homePage",
  siteSettings: "siteSettings",
} as const;
