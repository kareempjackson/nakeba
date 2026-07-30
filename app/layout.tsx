import type { Metadata, Viewport } from "next";
import { hostGrotesk } from "./fonts";
import { Cursor } from "./_components/cursor";
import { BootScript } from "./_components/preloader/boot-script";
import { Preloader } from "./_components/preloader/preloader";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_ROLE,
  SITE_URL,
} from "./site";
import "./globals.css";

/**
 * The card platforms show when the site is shared. A static file rather than
 * the `opengraph-image` route convention, so that the JSON-LD in `page.tsx` can
 * point at the same asset — the convention's URL carries a build hash and isn't
 * addressable from anywhere else.
 *
 * Deliberately no `width`/`height`: they'd have to be restated here every time
 * the artwork changes, and stale dimensions render worse than absent ones.
 * Every platform measures the image on fetch.
 */
const SHARE_IMAGE = "/og.png";

export const metadata: Metadata = {
  // Lets every URL-shaped field below (OG images, canonicals) be relative.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_ROLE}`,
    template: "%s — Nakeba Mason",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    "operations partner",
    "strategic operations",
    "operations manager for creative agencies",
    "creative founders",
    "business operations support",
    "online business manager",
    "agency operations retainer",
    "Nakeba Mason",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_ROLE}`,
    description: SITE_DESCRIPTION,
    images: [{ url: SHARE_IMAGE, alt: `${SITE_NAME} — ${SITE_ROLE}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_ROLE}`,
    description: SITE_DESCRIPTION,
    images: [{ url: SHARE_IMAGE, alt: `${SITE_NAME} — ${SITE_ROLE}` }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  // The page opens on the white ground; the dark sections are interior.
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      /* The entrance sequence's state. Starts up; the boot script may set it to
         "done" before first paint. `suppressHydrationWarning` is required
         because of that — React must accept the DOM's value over its own. */
      data-preload="playing"
      suppressHydrationWarning
      className={`${hostGrotesk.variable} h-full antialiased`}
    >
      <head>
        <BootScript />
      </head>
      {/* No flex on body — it would fight the sticky footer reveal. */}
      <body className="min-h-full">
        {children}
        {/*
          Last child of <body>, not a portal: `createPortal` renders nothing
          during SSR, so a portalled curtain would be absent from the streamed
          HTML and only appear once the bundle hydrates — hundreds of visible
          milliseconds on a slow connection, followed by a curtain slamming
          shut. Rendered here it's in the HTML, up before any script runs.
        */}
        <Preloader />
        {/* Above the curtain, so the pointer is the site's from the first
            frame the visitor can move it. */}
        <Cursor />
      </body>
    </html>
  );
}
