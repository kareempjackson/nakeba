import { Reveal } from "./reveal";
import { ScrollRevealText } from "./scroll-reveal-text";

const PILLARS = [
  {
    heading: "I get inside your business first.",
    // The comp clips this sentence mid-clause at "…constantly brief and".
    // Closed with "manage." — drop in the real copy when it lands.
    body: "Before anything else I learn how your business actually operates — your clients, your team, your workflow, your tools. That's what allows me to show up as a real partner, not someone you have to constantly brief and manage.",
  },
  {
    heading: "Build structure around how you work.",
    body: "I don't bring a rigid system and force your business into it. I identify what's missing, what's falling through the cracks, and I build the structure your business actually needs — so things move, your team knows what to do, and nothing gets lost.",
  },
  {
    heading: "I stay in it with you.",
    body: "This isn't a setup-and-disappear service. Week after week I'm coordinating your projects, tracking what's outstanding, keeping your clients and team aligned — so nothing slips and nothing stalls.",
  },
];

export function Approach() {
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
            [ How it works ]
          </p>

          <h2
            id="approach-title"
            className="text-[clamp(1.875rem,3.6vw,4.75rem)] leading-[1.15] font-light tracking-display [word-spacing:-0.03em] lg:ml-[20%] lg:indent-[13%]"
          >
            I don&rsquo;t come in to manage tasks. I come in to understand your
            business how{" "}
            {/* The tail starts muted and fills to white as the reader scrolls
                through it — the second half of the thought arriving. */}
            <ScrollRevealText
              as="span"
              variant="fill"
              tone="white"
              text="it moves, where it stalls, and what it needs to run well without you having to oversee every detail."
              className="text-brand-night-muted"
            />
          </h2>
        </div>

        {/* Pillars */}
        <ol className="mt-24 space-y-14 lg:mt-40 lg:space-y-20">
          {PILLARS.map((pillar, i) => (
            /* Marker, then heading, then body: the method assembles itself in
               reading order as each pillar comes up. */
            <Reveal
              key={pillar.heading}
              as="li"
              className="grid gap-x-10 gap-y-4 md:grid-cols-2 lg:grid-cols-12"
            >
              <span
                aria-hidden
                className="mt-1.5 hidden size-2.5 bg-brand-white lg:col-start-4 lg:block"
              />

              <Reveal delay={0.12} className="lg:col-span-3 lg:col-start-6">
                <p className="text-[15px] text-brand-night-muted">
                  Pillar {i + 1}
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
