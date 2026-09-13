import type { Metadata, Viewport } from "next";
import { draftMode } from "next/headers";
import { getContent } from "@/sanity/lib/fetch";
import { hostGrotesk } from "./fonts";
import { Cursor } from "./_components/cursor";
import { BootScript } from "./_components/preloader/boot-script";
import { Preloader } from "./_components/preloader/preloader";
import { PreviewBridge } from "./_components/preview-bridge";
import { SHARE_IMAGE_SIZE, SITE_URL } from "../site";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getContent();
  const title = `${settings.name} — ${settings.role}`;

  /** Every card carries the same picture, alt text and measurements. Uploads
      are always re-encoded as JPEG on the CDN; the fallback in `public/` is a
      PNG. */
  const shareImage = {
    url: settings.shareImage,
    ...SHARE_IMAGE_SIZE,
    type: /^\/.*\.png$/.test(settings.shareImage) ? "image/png" : "image/jpeg",
    alt: title,
  };

  return {
    // Lets every URL-shaped field below (OG images, canonicals) be relative.
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s — ${settings.name}`,
    },
    description: settings.description,
    applicationName: settings.name,
    authors: [{ name: settings.name, url: SITE_URL }],
    creator: settings.name,
    publisher: settings.name,
    keywords: settings.keywords,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: SITE_URL,
      siteName: settings.name,
      title,
      description: settings.description,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: settings.description,
      images: [shareImage],
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
}

export const viewport: Viewport = {
  // The page opens on the white ground; the dark sections are interior.
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [{ home }, { isEnabled: preview }] = await Promise.all([
    getContent(),
    draftMode(),
  ]);

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

          It deals the deck's first hand, so it has to be handed the same
          photos the hero renders.
        */}
        <Preloader hand={home.hero.deck[0]} />
        {/* Above the curtain, so the pointer is the site's from the first
            frame the visitor can move it. */}
        <Cursor />
        {preview && <PreviewBridge />}
      </body>
    </html>
  );
}
