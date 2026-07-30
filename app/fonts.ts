import localFont from "next/font/local";

/**
 * Host Grotesk — the Nakeba Mason brand typeface.
 * Six weights, each with a matching italic. Self-hosted from `public/fonts`.
 *
 * `preload: false` is load-bearing. This family is declared in the root
 * layout, so Next preloads it on every route — and with twelve faces declared
 * that meant twelve `<link rel="preload">` tags, roughly 720KB of font, fetched
 * at the highest priority ahead of the content, on a page that renders four of
 * them. Turning preload off lets the browser discover each face from the
 * stylesheet and fetch only the ones actually rendered.
 *
 * The usual cost of that trade is layout shift, and it doesn't apply here:
 * `adjustFontFallback` defaults to `'Arial'` for local fonts, so Next emits a
 * metrics-matched fallback face and the swap doesn't move anything. Text still
 * paints immediately, in the adjusted fallback, which is what `display: swap`
 * is for.
 */
export const hostGrotesk = localFont({
  src: [
    { path: "../public/fonts/HostGrotesk-Light.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/HostGrotesk-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "../public/fonts/HostGrotesk-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/HostGrotesk-Italic.ttf", weight: "400", style: "italic" },
    { path: "../public/fonts/HostGrotesk-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/HostGrotesk-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "../public/fonts/HostGrotesk-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/HostGrotesk-SemiBoldItalic.ttf", weight: "600", style: "italic" },
    { path: "../public/fonts/HostGrotesk-Bold.ttf", weight: "700", style: "normal" },
    { path: "../public/fonts/HostGrotesk-BoldItalic.ttf", weight: "700", style: "italic" },
    { path: "../public/fonts/HostGrotesk-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "../public/fonts/HostGrotesk-ExtraBoldItalic.ttf", weight: "800", style: "italic" },
  ],
  variable: "--font-host-grotesk",
  display: "swap",
  preload: false,
  fallback: ["ui-sans-serif", "system-ui", "Helvetica Neue", "Arial", "sans-serif"],
});
