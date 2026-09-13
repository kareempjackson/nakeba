import type { HomePage } from "@/sanity/content/types";
import { BleedWord } from "./bleed-word";
import { Reveal } from "./reveal";
import { ScrollRevealText } from "./scroll-reveal-text";

export function Offer({
  content,
  title,
}: {
  content: HomePage["offer"];
  /** The offer's name, from Site settings — it's also used in the metadata. */
  title: string;
}) {
  return (
    <section
      id="my-offer"
      aria-labelledby="my-offer-title"
      className="relative scroll-mt-20 overflow-hidden bg-brand-surface"
    >
      <BleedWord left={content.bleedLeft} right={content.bleedRight} />

      {/* Mobile padding = the stacked fragment's height plus a 5rem gap, so
          the copy never has to share space with it. From `md` the fragments
          move out to the side margins and the padding eases off. */}
      <div className="relative mx-auto w-full max-w-380 px-6 py-[min(90vw,22rem)] md:px-10 md:py-40 lg:px-14 lg:py-56">
        {/* The offer names itself: ghost until the reader arrives on it. */}
        <h2
          id="my-offer-title"
          /* Narrow measure on mobile so the title wraps to two centred lines
             with margin either side, instead of running edge to edge. */
          className="mx-auto max-w-80 text-center text-[clamp(2.25rem,4vw,4.5rem)] leading-[1.1] font-medium text-brand-ghost md:max-w-160"
        >
          <ScrollRevealText as="span" variant="fill" text={title} />
        </h2>

        <Reveal
          as="p"
          delay={0.15}
          /* `text-balance` evens the line lengths out rather than filling each
             line before breaking — without it a centred block this short rags
             badly, with a full line above a two-word one. */
          className="mx-auto mt-10 max-w-72 text-center text-[17px] leading-relaxed text-balance md:mt-8 md:max-w-112"
        >
          {content.body}
        </Reveal>
      </div>
    </section>
  );
}
