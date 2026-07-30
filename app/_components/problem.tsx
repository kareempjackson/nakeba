import Image from "next/image";
import { CtaButton } from "./cta-button";
import { Parallax } from "./parallax";
import { Reveal } from "./reveal";
import { ScrollRevealText } from "./scroll-reveal-text";

/** Placeholder for now — swap for the final art-directed crop. */
const CARD_PHOTO = "/images/30533.jpg";

const PAIN_POINTS_LEFT = [
  "Your designer is waiting on a brief, your client is waiting on a deliverable, and you're stuck in the middle of both.",
  "You built a team so you could focus on the creative work. But somehow you're still the one holding everything together.",
];

const PAIN_POINTS_RIGHT = [
  "Requests come in through WhatsApp, Instagram DMs, and email all at once and something always slips.",
  "The only time you know something went wrong is when a client brings it up first.",
];

export function Problem() {
  return (
    <section
      id="the-problem"
      aria-labelledby="the-problem-title"
      className="scroll-mt-20 bg-brand-surface"
    >
      <div className="mx-auto w-full max-w-380 px-6 py-24 md:px-10 md:py-32 lg:px-14 lg:py-40">
        {/* Headline. The label sits in the first line's indent on desktop. */}
        <div className="relative">
          <p className="mb-6 text-[15px] lg:absolute lg:top-[0.55em] lg:left-0 lg:mb-0">
            (The Problem)
          </p>

          <h2
            id="the-problem-title"
            className="text-[clamp(2.25rem,5.6vw,7rem)] leading-[0.95] font-bold tracking-display lg:indent-[19%]"
          >
            The work is good. The clients keep coming. But behind the scenes,
            it&rsquo;s a different story.{" "}
            {/* The tail starts ghosted and fills to ink as the reader scrolls
                through it — the second half of the thought arriving. */}
            <ScrollRevealText
              as="span"
              variant="fill"
              text="This is what running a growing creative business actually feels like."
              className="font-light text-brand-ghost italic"
            />
          </h2>
        </div>

        {/*
          Evidence row. Below `lg` the "Pain Point" annotation is ordered up to
          sit above the copy it labels, since there's no margin for it to sit in
          — done with `order` rather than by moving the markup, because on `lg`
          a definite column after col-start-12 would push the columns onto a new
          grid row.
        */}
        <div className="mt-20 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:mt-32 lg:grid-cols-12">
          {/* Signed card */}
          <Reveal
            as="figure"
            className="relative order-1 aspect-3/4 overflow-hidden bg-brand-canvas md:col-span-1 lg:order-0 lg:col-span-3 lg:col-start-2"
          >
            {/* Overhang in fixed units, always greater than the drift, so no
                frame edge is ever exposed — a percentage would fall short of
                it on a small viewport. */}
            <Parallax distance={26} className="absolute -inset-8">
              <Image
                src={CARD_PHOTO}
                alt="Nakeba Mason"
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </Parallax>
            <figcaption>
              <span className="absolute top-5 left-5 text-[15px] font-medium">
                Nakeba Mason&#174;
              </span>
              <span className="absolute right-5 bottom-5 text-[13px]">
                Since 2019
              </span>
            </figcaption>
          </Reveal>

          {/* Pain points land one after another — each one is a separate ache,
              and they read better arriving than sitting there in a block. */}
          <div className="order-3 lg:order-0 lg:col-span-3 lg:col-start-6">
            <div className="space-y-6 text-[15px] leading-relaxed">
              {PAIN_POINTS_LEFT.map((copy, i) => (
                <Reveal key={copy} as="p" delay={0.1 + i * 0.1}>
                  {copy}
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <CtaButton href="#contact" className="mt-12 lg:mt-20">
                Let&rsquo;s talk
              </CtaButton>
            </Reveal>
          </div>

          {/* Second pain-point column */}
          <div className="order-4 space-y-6 text-[15px] leading-relaxed lg:order-0 lg:col-span-3 lg:col-start-9">
            {PAIN_POINTS_RIGHT.map((copy, i) => (
              <Reveal key={copy} as="p" delay={0.2 + i * 0.1}>
                {copy}
              </Reveal>
            ))}
          </div>

          {/* Margin annotation on `lg`; a heading over the copy below it. */}
          <Reveal
            as="p"
            /* Modest, since on mobile it now leads the copy rather than
               trailing the row. */
            delay={0.15}
            className="order-2 w-max text-[15px] font-medium tracking-eyebrow lg:order-0 lg:col-start-12 lg:justify-self-end"
          >
            Pain Point
          </Reveal>
        </div>
      </div>
    </section>
  );
}
