import Image from "next/image";
import { CtaButton } from "./cta-button";

const WORDMARK_NAKEBA = "/logo/main%20logo/Nakeba%20Logo%20part.svg";
const WORDMARK_MASON = "/logo/main%20logo/mason%20logo%20part.svg";

/** Placeholder for now — swap for the final art-directed crop. */
const HERO_PHOTO = "/images/30532.jpg";

const CAPABILITIES = [
  "Strategic Initiatives",
  "Manage Operations",
  "Coordinate Teams",
  "Optimise systems & Processes",
  "Analyse Performance",
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-380 px-6 pt-10 pb-20 md:px-10 md:pt-14 lg:px-14 lg:pb-28">
        {/* Capabilities + pitch */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <ul className="space-y-1.5 text-[17px] leading-relaxed">
            {CAPABILITIES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="max-w-md lg:shrink-0">
            <p className="text-xl leading-snug font-medium md:text-2xl md:leading-snug">
              You&rsquo;re too good at what you do to be buried in the chaos
              behind it.
            </p>

            <CtaButton href="#contact" className="mt-7">
              Let&rsquo;s talk
            </CtaButton>
          </div>
        </div>

        {/* Signature composition — the photo stack is sandwiched between the
            two halves of the signature: "Nakeba" behind, "Mason" in front. */}
        <div className="mt-16 md:mt-24 lg:mt-28">
          <div className="relative mx-auto w-full max-w-6xl pb-[10%]">
            {/* Behind */}
            <Image
              src={WORDMARK_NAKEBA}
              alt=""
              width={523}
              height={126}
              unoptimized
              priority
              className="relative z-0 h-auto w-full"
            />

            {/* Middle — the card stack */}
            <div className="absolute top-[15%] left-[47.5%] z-10 w-[38%] -translate-x-1/2 sm:w-[32%] lg:w-[27%]">
              <div className="relative aspect-5/7">
                <div
                  aria-hidden
                  className="absolute inset-0 translate-x-[4%] translate-y-[1%] rotate-[7deg] rounded-[3px] bg-brand-peach"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 translate-x-[6%] translate-y-[-2%] rotate-[3.5deg] rounded-[3px] bg-brand-butter-soft"
                />
                <div className="absolute inset-0 overflow-hidden rounded-[3px] bg-brand-surface shadow-[0_18px_45px_-20px_rgba(0,0,0,0.35)]">
                  <Image
                    src={HERO_PHOTO}
                    alt="Nakeba Mason"
                    fill
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 32vw, 38vw"
                    priority
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* In front */}
            <Image
              src={WORDMARK_MASON}
              alt="Nakeba Mason"
              width={522}
              height={90}
              unoptimized
              priority
              className="relative z-20 mt-[-1.5%] h-auto w-full"
            />
          </div>
        </div>

        {/* Positioning statement */}
        <p className="mt-4 max-w-136 text-[17px] leading-loose text-brand-muted lg:mt-0 lg:ml-[28%]">
          I work with creative founders who are growing but feeling the weight of
          everything that comes with it. Client requests slipping through the
          cracks, a team that needs direction, and a business that needs someone
          holding it all together behind the scenes.
        </p>
      </div>
    </section>
  );
}
