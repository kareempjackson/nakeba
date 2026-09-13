import type { HomePage } from "@/sanity/content/types";
import { Reveal } from "./reveal";
import { ScrollRevealText } from "./scroll-reveal-text";

export function NextStep({ content }: { content: HomePage["nextStep"] }) {
  return (
    <section
      id="next-step"
      aria-labelledby="next-step-title"
      className="scroll-mt-20 bg-brand-white"
    >
      <div className="mx-auto w-full max-w-380 px-6 py-24 md:px-10 md:py-32 lg:px-14 lg:py-40">
        <div className="relative">
          <Reveal
            as="p"
            className="mb-8 max-w-70 text-[15px] leading-relaxed lg:absolute lg:top-[0.4em] lg:left-0 lg:mb-0"
          >
            {content.aside}
          </Reveal>

          {/* The last line of the story, filling in as the reader lands on it
              — the page's closing beat before the footer takes over. */}
          <h2
            id="next-step-title"
            className="text-[clamp(1.875rem,3.6vw,4.75rem)] leading-[1.1] font-normal tracking-display lg:ml-[20%] lg:indent-[18%]"
          >
            <ScrollRevealText as="span" variant="fill" text={content.headline} />
          </h2>
        </div>
      </div>
    </section>
  );
}
