import Image from "next/image";
import { CtaButton } from "./cta-button";
import { Parallax } from "./parallax";
import { Reveal } from "./reveal";

/** Placeholder for now — swap for the final art-directed crop. */
const PORTRAIT = "/images/30534.jpg";

export function Meet() {
  return (
    <section
      id="about-me"
      aria-labelledby="about-me-title"
      className="scroll-mt-20 bg-brand-white"
    >
      <div className="mx-auto w-full max-w-380 px-6 py-24 md:px-10 md:py-32 lg:px-14 lg:py-40">
        <div className="relative">
          <p className="mb-6 text-[15px] lg:absolute lg:top-[0.6em] lg:left-0 lg:mb-0">
            [ Meet Nakeba ]
          </p>

          <h2
            id="about-me-title"
            className="text-[clamp(2.25rem,4.7vw,5.5rem)] leading-[1.1] font-bold tracking-display lg:indent-[18%]"
          >
            I&rsquo;ve spent my career creating the conditions in which leaders
            and teams can do their best work.
          </h2>
        </div>

        <div className="mt-20 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:mt-32 lg:grid-cols-12">
          <Reveal className="relative aspect-3/4 overflow-hidden rounded-md bg-brand-surface md:col-span-1 lg:col-span-2">
            <Parallax distance={24} className="absolute -inset-8">
              <Image
                src={PORTRAIT}
                alt="Nakeba Mason, photographed at work"
                fill
                sizes="(min-width: 1024px) 17vw, (min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </Parallax>
          </Reveal>

          {/* NOTE: this paragraph is duplicated verbatim in the "What I Take Off
              Your Plate" comp. Kept in both per the designs — worth confirming
              it is intentional. */}
          <Reveal delay={0.12} className="lg:col-span-3 lg:col-start-4">
            <p className="text-[15px] leading-relaxed">
              That career began in 2020, mid-pandemic, while I was two years
              into a psychology degree — which turned out to be the right
              training for work that is, at its core, about understanding people
              and how they move.
            </p>

            <CtaButton href="#contact" className="mt-12 lg:mt-20">
              Let&rsquo;s talk
            </CtaButton>
          </Reveal>

          <Reveal
            as="p"
            delay={0.24}
            className="text-[15px] leading-relaxed lg:col-span-3 lg:col-start-8"
          >
            What started as a way to put my strengths to use grew into something
            much bigger, carrying me through banking, digital consultancy,
            creative agencies, e-commerce, and legal — including supporting
            executive directors at one of the Caribbean&rsquo;s leading banks.
            And somewhere along the way, the work revealed what it had always
            been about. Not tasks. Structure. The ability to make fast-moving
            environments feel navigable, and complex operations feel human.
          </Reveal>

          <p className="text-[15px] lg:col-start-12 lg:justify-self-end">
            &copy;2026
          </p>
        </div>
      </div>
    </section>
  );
}
