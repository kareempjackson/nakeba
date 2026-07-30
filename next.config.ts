import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
      AVIF first, WebP as the fallback. The default is WebP only; AVIF is
      typically another 20–30% smaller on photographic content, which is what
      every image on this site is. Next chooses per request from the browser's
      Accept header, so nothing is lost where AVIF isn't supported — it only
      costs a little more CPU the first time each size is optimised.
    */
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
