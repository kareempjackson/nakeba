import type { HomePage } from "@/sanity/content/types";
import { Reveal } from "./reveal";
import { ScrollRevealText } from "./scroll-reveal-text";

/** Shared with the other sections' bracketed labels. */
const EYEBROW = "text-[13px] font-medium tracking-[0.12em] uppercase";

/**
 * A client case study, told as situation → partnership → outcome, closing on
 * the founder's own words.
 *
 * Set on Night like the Approach section, and running the same devices — the
 * bracketed label in the left margin, the headline's tail filling in as it's
 * read, the body columns arriving in reading order.
 */
export function CaseStudy({ content }: { content: HomePage["caseStudy"] }) {
  return (
    <section
      id="case-study"
      aria-labelledby="case-study-title"
      className="scroll-mt-20 bg-brand-night text-brand-white"
    >
      <div className="mx-auto w-full max-w-380 px-6 py-24 md:px-10 md:py-32 lg:px-14 lg:py-40">
        {/* Headline. Label sits to the left of the first line on desktop. */}
        <div className="relative">
          <p
            className={`mb-6 ${EYEBROW} lg:absolute lg:top-[0.7em] lg:left-0 lg:mb-0`}
          >
            [ {content.eyebrow} ]
          </p>

          <h2
            id="case-study-title"
            className="text-[clamp(1.875rem,3.6vw,4.75rem)] leading-[1.15] font-light tracking-display [word-spacing:-0.03em] lg:ml-[20%] lg:indent-[13%]"
          >
            {content.headline}{" "}
            {/* The outcome half of the sentence fills in as it's read. */}
            <ScrollRevealText
              as="span"
              variant="fill"
              tone="white"
              text={content.headlineTail}
              className="text-brand-night-muted"
            />
          </h2>
        </div>

        {/* The situation, then what the partnership did about it. */}
        <div className="mt-20 grid gap-x-10 gap-y-16 md:grid-cols-2 lg:mt-32 lg:grid-cols-12">
          <Reveal className="lg:col-span-3 lg:col-start-3">
            <p className={EYEBROW}>[ {content.situationLabel} ]</p>

            <h3 className="mt-8 text-[clamp(1.5rem,2vw,2rem)] leading-[1.25] font-light tracking-display">
              {content.situationHeading}
            </h3>

            <p className="mt-8 text-[15px] leading-relaxed text-brand-night-muted">
              {content.situation}
            </p>
          </Reveal>

          <div className="space-y-16 lg:col-span-3 lg:col-start-7">
            <Reveal delay={0.12}>
              <h3 className="text-base font-bold tracking-[0.02em]">
                {content.partnershipHeading}
              </h3>
              <p className="mt-6 text-[15px] leading-relaxed text-brand-night-muted">
                {content.partnership}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <h3 className="text-base font-bold tracking-[0.02em]">
                {content.changedHeading}
              </h3>
              <p className="mt-6 text-[15px] leading-relaxed text-brand-night-muted">
                {content.changed}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Where it stands — set in the same column the story was told in. */}
        <Reveal className="mt-24 grid lg:mt-32 lg:grid-cols-12">
          <div className="lg:col-span-4 lg:col-start-7">
            <h3 className="text-2xl font-bold tracking-display md:text-[1.75rem]">
              {content.standingHeading}
            </h3>
            <p className="mt-8 text-[clamp(1.5rem,2.3vw,2.4rem)] leading-[1.25] font-light tracking-display text-brand-night-muted italic">
              {content.standing}
            </p>
          </div>
        </Reveal>

        {/* The founder's own words, which is the only proof that counts. */}
        <div className="mt-24 grid gap-x-10 gap-y-10 lg:mt-40 lg:grid-cols-12">
          <p className={`${EYEBROW} lg:col-span-2`}>
            [ {content.testimonialsLabel} ]
          </p>

          <Reveal className="lg:col-span-5 lg:col-start-7">
            <blockquote>
              <p className="text-[clamp(1.25rem,1.9vw,1.9rem)] leading-[1.45] font-light tracking-display">
                &ldquo;{content.quote}&rdquo;
              </p>

              <footer className="mt-12 text-[15px] leading-snug">
                <p>{content.quoteAuthor}</p>
                <p className="text-brand-night-muted">{content.quoteRole}</p>
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
