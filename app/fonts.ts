import localFont from "next/font/local";

/**
 * Host Grotesk — the Nakeba Mason brand typeface.
 * Six weights, each with a matching italic. Self-hosted from `public/fonts`.
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
  fallback: ["ui-sans-serif", "system-ui", "Helvetica Neue", "Arial", "sans-serif"],
});
