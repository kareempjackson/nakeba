import { Approach } from "./_components/approach";
import { Contact } from "./_components/contact";
import { ContactFooter } from "./_components/contact-footer";
import { Credentials } from "./_components/credentials";
import { Hero } from "./_components/hero";
import { Meet } from "./_components/meet";
import { NextStep } from "./_components/next-step";
import { Offer } from "./_components/offer";
import { Plate } from "./_components/plate";
import { Problem } from "./_components/problem";
import { Result } from "./_components/result";
import { SiteFooter } from "./_components/site-footer";
import { SiteHeader } from "./_components/site-header";
import { Stats } from "./_components/stats";

export default function Home() {
  return (
    <>
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
          <Stats />
          <Contact />
          <NextStep />
        </main>

        <SiteFooter />
      </div>

      <ContactFooter />
    </>
  );
}
