import Image from "next/image";
import { CtaButton } from "./cta-button";
import { HeroCardStack } from "./hero-card-stack";
import { ScrollRevealText } from "./scroll-reveal-text";

const WORDMARK_NAKEBA = "/logo/main%20logo/Nakeba%20Logo%20part.svg";
const WORDMARK_MASON = "/logo/main%20logo/mason%20logo%20part.svg";

const CAPABILITIES = [
  "Strategic Initiatives",
  "Manage Operations",
  "Coordinate Teams",
  "Optimise systems & Processes",
  "Analyse Performance",
];

const POSITIONING =
  "I work with creative founders who are growing but feeling the weight of everything that comes with it. Client requests slipping through the cracks, a team that needs direction, and a business that needs someone holding it all together behind the scenes.";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/*
        The fold: capabilities, pitch and the full signature composition are
        sized to land inside one viewport (minus the sticky header, 4.75rem on
        mobile / 5.25rem once the logo steps up), so nothing about the card
        design needs scrolling to be read. `svh` keeps mobile browser chrome
        from eating the composition.
      */}
      <div className="mx-auto flex min-h-[calc(100svh-4.75rem)] w-full max-w-380 flex-col px-6 pt-8 pb-10 md:min-h-[calc(100svh-5.25rem)] md:px-10 md:pt-10 lg:px-14 lg:pt-12 lg:pb-14">
        {/* Capabilities + pitch */}
        <div className="flex shrink-0 flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <ul className="space-y-1.5 text-[15px] leading-relaxed">
            {CAPABILITIES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="max-w-md lg:shrink-0">
            <p className="text-lg leading-snug font-medium md:text-xl md:leading-snug">
              You&rsquo;re too good at what you do to be buried in the chaos
              behind it.
            </p>

            <CtaButton href="#contact" className="mt-6">
              Let&rsquo;s talk
            </CtaButton>
          </div>
        </div>

        {/* Signature composition — the photo stack is sandwiched between the
            two halves of the signature: "Nakeba" behind, "Mason" in front.
            It centres in whatever height the fold has left over. */}
        <div className="mt-10 flex min-h-0 flex-1 items-center justify-center lg:mt-6">
          {/*
            The composition is width-driven (the wordmarks set the height at
            roughly half the width), so on wide-but-short screens we cap its
            width by the height still available. `(100svh - 24rem) * 2` is that
            budget: 24rem covers the header, this block's padding and the
            capabilities row above.
          */}
          <div className="relative w-full max-w-6xl pb-[23%] sm:pb-[13%] lg:max-w-[clamp(28rem,calc((100svh-24rem)*2),72rem)] lg:pb-[10%]">
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

            {/* Middle — the card stack. `top` is a share of the container's
                height, so it is re-tuned per breakpoint alongside the bottom
                padding to keep the card sitting at the same spot. */}
            <div className="absolute top-[12%] left-[47.5%] z-10 w-[38%] -translate-x-1/2 sm:top-[14%] sm:w-[32%] lg:top-[15%] lg:w-[27%]">
              <HeroCardStack />
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
      </div>

      {/* Below the fold: the positioning statement, revealed word by word as
          the reader scrolls into it. */}
      <div className="mx-auto w-full max-w-380 px-6 pb-24 md:px-10 md:pb-32 lg:px-14 lg:pb-40">
        <ScrollRevealText
          text={POSITIONING}
          className="max-w-136 text-[17px] leading-loose text-brand-muted lg:ml-[28%]"
        />
      </div>
    </section>
  );
}
