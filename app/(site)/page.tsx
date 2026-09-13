import type { Metadata } from "next";
import type { SiteSettings } from "@/sanity/content/types";
import { getContent } from "@/sanity/lib/fetch";
import { Approach } from "./_components/approach";
import { CaseStudy } from "./_components/case-study";
import { Contact } from "./_components/contact";
import { ContactFooter } from "./_components/contact-footer";
import { Credentials } from "./_components/credentials";
import { EdgeReveal } from "./_components/edge-reveal";
import { Hero } from "./_components/hero";
import { Meet } from "./_components/meet";
import { NextStep } from "./_components/next-step";
import { Offer } from "./_components/offer";
import { Plate } from "./_components/plate";
import { Problem } from "./_components/problem";
import { Result } from "./_components/result";
import { SiteFooter } from "./_components/site-footer";
import { SiteHeader } from "./_components/site-header";
import { absoluteUrl, SITE_URL } from "../site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Structured data for the one page: who she is, what the retainer is, and the
 * site itself. Only facts the page itself states — no address, hours or
 * pricing, none of which are published here.
 */
function structuredData(settings: SiteSettings, offerCatalogName: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: settings.name,
        description: settings.description,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: settings.name,
        url: SITE_URL,
        email: `mailto:${settings.email}`,
        image: absoluteUrl(settings.shareImage),
        jobTitle: settings.role,
        description: settings.description,
        knowsAbout: settings.capabilities,
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#service`,
        name: settings.offerName,
        serviceType: settings.serviceType,
        description: settings.serviceDescription,
        provider: { "@id": `${SITE_URL}/#person` },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: offerCatalogName,
          itemListElement: settings.capabilities.map((capability) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: capability },
          })),
        },
      },
    ],
  };
}

export default async function Home() {
  const { settings, home } = await getContent();
  const { bookingUrl } = settings;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // `<` escaped so CMS text can't close the script element early.
          __html: JSON.stringify(
            structuredData(settings, home.plate.title),
          ).replace(/</g, "\\u003c"),
        }}
      />

      {/*
        Footer reveal: this stack is opaque and sits above the footer, which is
        pinned to the bottom of the viewport behind it. Scrolling slides the
        stack up over the footer, uncovering it — the footer holds still, so it
        reads as parallax. No scroll listeners, and it degrades to a normal
        stacked footer wherever `position: sticky` isn't honoured.
      */}
      <div className="relative z-10 bg-brand-white">
        <SiteHeader
          name={settings.name}
          navLinks={settings.navLinks}
          socials={settings.socials}
        />

        <main>
          <Hero settings={settings} content={home.hero} />
          <Problem content={home.problem} bookingUrl={bookingUrl} />
          <Approach content={home.approach} />
          <Result content={home.result} />
          <Offer content={home.offer} title={settings.offerName} />
          <Plate content={home.plate} bookingUrl={bookingUrl} />
          <Meet content={home.meet} bookingUrl={bookingUrl} />
          <Credentials content={home.credentials} />

          {/*
            From "By the numbers" down, the page pulls back from the edges as
            it scrolls, revealing brand colour along both margins. The strips
            end with this block — the summary section below runs full-bleed
            again.
          */}
          <EdgeReveal>
            <CaseStudy content={home.caseStudy} />
            <Contact content={home.contact} bookingUrl={bookingUrl} />
            <NextStep content={home.nextStep} />
          </EdgeReveal>
        </main>

        <SiteFooter settings={settings} />
      </div>

      <ContactFooter settings={settings} />
    </>
  );
}
