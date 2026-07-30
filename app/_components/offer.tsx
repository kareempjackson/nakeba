import { BleedWord } from "./bleed-word";

export function Offer() {
  return (
    <section
      id="my-offer"
      aria-labelledby="my-offer-title"
      className="relative scroll-mt-20 overflow-hidden bg-brand-surface"
    >
      <BleedWord left="Ma" right="son" />

      <div className="relative mx-auto w-full max-w-380 px-6 py-32 md:px-10 md:py-40 lg:px-14 lg:py-56">
        <h2
          id="my-offer-title"
          className="mx-auto max-w-160 text-center text-[clamp(2.25rem,4vw,4.5rem)] leading-[1.1] font-medium text-brand-ghost"
        >
          The Operations Partnership
        </h2>

        <p className="mx-auto mt-8 max-w-112 text-center text-[17px] leading-relaxed">
          I work with creative founders on a monthly retainer — as their
          strategic operations partner inside the business. Not a VA you
          delegate tasks to. A partner who takes ownership of the operational
          side so it stops depending on you.
        </p>
      </div>
    </section>
  );
}
