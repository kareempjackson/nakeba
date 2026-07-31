import type { Metadata } from "next";
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
import { CAPABILITIES } from "./_components/site-data";
import {
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_NAME,
  SITE_OFFER,
  SITE_ROLE,
  SITE_URL,
} from "./site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Structured data for the one page: who she is, what the retainer is, and the
 * site itself. Only facts the page itself states — no address, hours or
 * pricing, none of which are published here.
 */
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      url: SITE_URL,
      email: `mailto:${SITE_EMAIL}`,
      image: `${SITE_URL}/og.png`,
      jobTitle: SITE_ROLE,
      description: SITE_DESCRIPTION,
      knowsAbout: CAPABILITIES,
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service`,
      name: SITE_OFFER,
      serviceType: "Business operations management",
      description:
        "A monthly retainer partnership: a strategic operations partner inside the business who takes ownership of the operational side — coordinating projects, keeping clients and teams aligned, and building the structure the business runs on.",
      provider: { "@id": `${SITE_URL}/#person` },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "What I take off your plate",
        itemListElement: CAPABILITIES.map((capability) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: capability },
        })),
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />

      {/*
        Footer reveal: this stack is opaque and sits above the footer, which is
        pinned to the bottom of the viewport behind it. Scrolling slides the
        stack up over the footer, uncovering it — the footer holds still, so it
        reads as parallax. No scroll listeners, and it degrades to a normal
        stacked footer wherever `position: sticky` isn't honoured.
      */}
      <div className="relative z-10 bg-brand-white">
        <SiteHeader />

        <main>
          <Hero />
          <Problem />
          <Approach />
          <Result />
          <Offer />
          <Plate />
          <Meet />
          <Credentials />

          {/*
            From "By the numbers" down, the page pulls back from the edges as
            it scrolls, revealing brand colour along both margins. The strips
            end with this block — the summary section below runs full-bleed
            again.
          */}
          <EdgeReveal>
            <CaseStudy />
            <Contact />
            <NextStep />
          </EdgeReveal>
        </main>

        <SiteFooter />
      </div>

      <ContactFooter />
    </>
  );
}
