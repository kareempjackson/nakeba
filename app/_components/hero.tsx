import { CtaButton } from "./cta-button";
import { HeroCardStack } from "./hero-card-stack";
import { Parallax } from "./parallax";
import { ScrollCue } from "./scroll-cue";
import { ScrollRevealText } from "./scroll-reveal-text";
import { SignatureComposition } from "./signature-composition";
import { SITE_NAME, SITE_ROLE } from "../site";

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
      {/* Fixed to the viewport rather than the fold, so it stays put while the
          hero moves under it — and `overflow-hidden` above doesn't clip it,
          since nothing on the way up carries a transform. */}
      <ScrollCue />

      {/*
        The fold: capabilities, pitch and the full signature composition are
        sized to land inside one viewport (minus the sticky header, 4.75rem on
        mobile / 5.25rem once the logo steps up), so nothing about the card
        design needs scrolling to be read. `svh` keeps mobile browser chrome
        from eating the composition.
      */}
      <div className="mx-auto flex min-h-[calc(100svh-4.75rem)] w-full max-w-380 flex-col px-6 pt-8 pb-10 md:min-h-[calc(100svh-5.25rem)] md:px-10 md:pt-10 lg:px-14 lg:pt-12 lg:pb-14">
        {/* The page's h1. The signature composition below is the visual title,
            but it's set as artwork, so the readable heading is carried here for
            search engines and screen readers. */}
        <h1 className="sr-only">
          {SITE_NAME} — {SITE_ROLE}
        </h1>

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
          {/* The signature holds its ground as the page starts to move over it
              — the first hint that scrolling is going somewhere. */}
          <Parallax
            distance={32}
            className="flex w-full items-center justify-center"
          >
            {/*
              The composition is width-driven (the wordmarks set the height at
              roughly half the width), so on wide-but-short screens we cap its
              width by the height still available. `(100svh - 24rem) * 2` is
              that budget: 24rem covers the header, this block's padding and the
              capabilities row above.

              `data-flip-target` is where the entrance sequence lands its copy
              of the signature — see `preloader/preloader.tsx`.
            */}
            <SignatureComposition
              data-flip-target="hero-signature"
              className="max-w-6xl lg:max-w-[clamp(28rem,calc((100svh-24rem)*2),72rem)]"
            >
              <HeroCardStack />
            </SignatureComposition>
          </Parallax>
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
