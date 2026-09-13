import type { HomePage } from "@/sanity/content/types";
import { Reveal } from "./reveal";
import { ScrollRevealText } from "./scroll-reveal-text";

export function Result({ content }: { content: HomePage["result"] }) {
  return (
    <section
      id="the-result"
      aria-labelledby="the-result-title"
      className="scroll-mt-20 bg-brand-night text-brand-white"
    >
      <div className="mx-auto w-full max-w-380 px-6 pt-16 pb-24 md:px-10 md:pt-20 md:pb-32 lg:px-14 lg:pt-24 lg:pb-40">
        <div className="relative">
          {/* Unlike the other sections, this label sits at the far right. */}
          <p className="mb-6 text-[13px] font-medium tracking-[0.12em] uppercase lg:absolute lg:top-[0.7em] lg:right-0 lg:mb-0">
            [ {content.eyebrow} ]
          </p>

          {/* The payoff. Unlike the setup headlines, the whole line fills —
              nothing here is an aside. */}
          <h2
            id="the-result-title"
            className="text-[clamp(1.875rem,3.6vw,4.75rem)] leading-[1.15] font-normal tracking-display [word-spacing:-0.03em] lg:max-w-280 lg:indent-[15%]"
          >
            <ScrollRevealText
              as="span"
              variant="fill"
              tone="white"
              text={content.headline}
            />
          </h2>
        </div>

        <Reveal
          as="p"
          delay={0.15}
          className="mt-10 max-w-132 text-[15px] leading-relaxed text-brand-night-muted lg:mt-12 lg:ml-[23%]"
        >
          {content.body}
        </Reveal>
      </div>
    </section>
  );
}
