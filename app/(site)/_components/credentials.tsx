import type { HomePage } from "@/sanity/content/types";
import { BleedWord } from "./bleed-word";
import { Reveal } from "./reveal";

export function Credentials({ content }: { content: HomePage["credentials"] }) {
  return (
    <section
      id="credentials"
      aria-labelledby="credentials-title"
      className="relative scroll-mt-20 overflow-hidden bg-brand-surface"
    >
      <BleedWord left={content.bleedLeft} right={content.bleedRight} align="top" />

      {/* As in the Offer section: the mobile padding is the stacked fragment's
          height plus a gap, easing off once they move to the side margins. */}
      <div className="relative mx-auto w-full max-w-380 px-6 py-[min(90vw,22rem)] md:px-10 md:py-32 lg:px-14 lg:py-40">
        <Reveal className="text-center">
          <p
            id="credentials-title"
            className="text-[15px] font-bold tracking-[0.1em]"
          >
            {content.eyebrow}
          </p>

          <p className="mx-auto mt-8 max-w-70 text-2xl leading-tight font-bold tracking-display">
            {content.qualification}
          </p>

          <p className="mx-auto mt-6 max-w-88 text-[17px] leading-relaxed">
            {content.details}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
