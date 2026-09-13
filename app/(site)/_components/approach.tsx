import type { HomePage } from "@/sanity/content/types";
import { Reveal } from "./reveal";
import { ScrollRevealText } from "./scroll-reveal-text";

export function Approach({ content }: { content: HomePage["approach"] }) {
  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="scroll-mt-20 bg-brand-night text-brand-white"
    >
      <div className="mx-auto w-full max-w-380 px-6 py-24 md:px-10 md:py-32 lg:px-14 lg:py-40">
        {/* Headline. Label sits to the left of the first line on desktop. */}
        <div className="relative">
          <p className="mb-6 text-[13px] font-medium tracking-[0.12em] uppercase lg:absolute lg:top-[0.7em] lg:left-0 lg:mb-0">
            [ {content.eyebrow} ]
          </p>

          <h2
            id="approach-title"
            className="text-[clamp(1.875rem,3.6vw,4.75rem)] leading-[1.15] font-light tracking-display [word-spacing:-0.03em] lg:ml-[20%] lg:indent-[13%]"
          >
            {content.headline}{" "}
            {/* The tail starts muted and fills to white as the reader scrolls
                through it — the second half of the thought arriving. */}
            <ScrollRevealText
              as="span"
              variant="fill"
              tone="white"
              text={content.headlineTail}
              className="text-brand-night-muted"
            />
          </h2>
        </div>

        {/* Pillars */}
        <ol className="mt-24 space-y-14 lg:mt-40 lg:space-y-20">
          {content.pillars.map((pillar, i) => (
            /* Marker, then heading, then body: the method assembles itself in
               reading order as each pillar comes up. */
            <Reveal
              key={i}
              as="li"
              className="grid gap-x-10 gap-y-4 md:grid-cols-2 lg:grid-cols-12"
            >
              <span
                aria-hidden
                className="mt-1.5 hidden size-2.5 bg-brand-white lg:col-start-4 lg:block"
              />

              <Reveal delay={0.12} className="lg:col-span-3 lg:col-start-6">
                <p className="text-[15px] text-brand-night-muted">
                  {content.pillarLabel} {i + 1}
                </p>
                <h3 className="mt-3 text-base font-bold tracking-[0.02em]">
                  {pillar.heading}
                </h3>
              </Reveal>

              <Reveal
                as="p"
                delay={0.24}
                className="text-[15px] leading-relaxed text-brand-night-muted lg:col-span-3 lg:col-start-10"
              >
                {pillar.body}
              </Reveal>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
