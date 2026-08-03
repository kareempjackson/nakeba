import { Reveal } from "./reveal";
import { ScrollRevealText } from "./scroll-reveal-text";

/**
 * NOTE — carried over from the comp as written, rather than guessed at: this
 * paragraph opens lower-case and reads as a continuation of the heading above
 * it ("…agency in Barbados — a talented team, …"). If that's a broken sentence
 * rather than a deliberate run-on, it wants an em dash and a capital.
 */
const SITUATION =
  "A talented team, a growing client list, and a founder carrying all of it. Every client request, every follow-up, every team brief ran through Dwayne. The work was strong; the operations behind it depended entirely on him. In his own words: work overload, with too much of his time spent liaising with clients instead of leading the studio.";

const PARTNERSHIP =
  "I came in on a three-month starting retainer — my standard first step, so both sides confirm the fit before committing long-term. From there, I embedded into the way BEKO works: I became the point of contact between clients, founder, and team — requests, follow-ups, approvals. I brief the lead designers when new work comes in and keep Dwayne briefed on what needs his attention, coordinate and track projects in Asana so nothing lives in memory, and run meetings from scheduling through notes to action-item follow-up. I've built the studio's operational backbone — equipment tracking, a client contact database, and a regional network of creators, from voice actors and photographers to videographers and influencers. And I'm in the room when it matters: client meetings, shoots, and strategy conversations about the studio's growth.";

const CHANGED =
  "The back-and-forth is minimized. Client follow-ups and scheduling stay on track without the founder chasing them. Briefing the team on every job is off his plate. And the role has grown into something deeper than coordination — executive-level support, trusted with parts of the business the wider team isn't.";

const TESTIMONIAL =
  "Before working with Nakeba, it was work overload — too much of my time went to liaising with clients. Now the back and forth is minimized, client follow-ups and scheduling stay on track, and briefing the team on every job is off my plate. Her role sits at an executive level — she's privy to things the wider team isn't, and that reflects the level of trust we've developed. I see the value, and I can envision a longer partnership";

/** Shared with the other sections' bracketed labels. */
const EYEBROW = "text-[13px] font-medium tracking-[0.12em] uppercase";

/**
 * The BEKO case study: one client, told as situation → partnership → outcome,
 * closing on the founder's own words.
 *
 * Set on Night like the Approach section, and running the same devices — the
 * bracketed label in the left margin, the headline's tail filling in as it's
 * read, the body columns arriving in reading order.
 */
export function CaseStudy() {
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
            [ BEKO Creative Studios ]
          </p>

          <h2
            id="case-study-title"
            className="text-[clamp(1.875rem,3.6vw,4.75rem)] leading-[1.15] font-light tracking-display [word-spacing:-0.03em] lg:ml-[20%] lg:indent-[13%]"
          >
            How an award-winning creative studio got its{" "}
            {/* The outcome half of the sentence fills in as it's read. */}
            <ScrollRevealText
              as="span"
              variant="fill"
              tone="white"
              text="founder out of the middle of everything."
              className="text-brand-night-muted"
            />
          </h2>
        </div>

        {/* The situation, then what the partnership did about it. */}
        <div className="mt-20 grid gap-x-10 gap-y-16 md:grid-cols-2 lg:mt-32 lg:grid-cols-12">
          <Reveal className="lg:col-span-3 lg:col-start-3">
            <p className={EYEBROW}>[ The situation ]</p>

            <h3 className="mt-8 text-[clamp(1.5rem,2vw,2rem)] leading-[1.25] font-light tracking-display">
              BEKO Creative Studios is an award-winning design and advertising
              agency in Barbados
            </h3>

            <p className="mt-8 text-[15px] leading-relaxed text-brand-night-muted">
              {SITUATION}
            </p>
          </Reveal>

          <div className="space-y-16 lg:col-span-3 lg:col-start-7">
            <Reveal delay={0.12}>
              <h3 className="text-base font-bold tracking-[0.02em]">
                The partnership
              </h3>
              <p className="mt-6 text-[15px] leading-relaxed text-brand-night-muted">
                {PARTNERSHIP}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <h3 className="text-base font-bold tracking-[0.02em]">
                What changed
              </h3>
              <p className="mt-6 text-[15px] leading-relaxed text-brand-night-muted">
                {CHANGED}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Where it stands — set in the same column the story was told in. */}
        <Reveal className="mt-24 grid lg:mt-32 lg:grid-cols-12">
          <div className="lg:col-span-4 lg:col-start-7">
            <h3 className="text-2xl font-bold tracking-display md:text-[1.75rem]">
              Where it stands
            </h3>
            <p className="mt-8 text-[clamp(1.5rem,2.3vw,2.4rem)] leading-[1.25] font-light tracking-display text-brand-night-muted italic">
              What began as a three month trial is, nearly a year in, extending
              into a longterm partnership.
            </p>
          </div>
        </Reveal>

        {/* The founder's own words, which is the only proof that counts. */}
        <div className="mt-24 grid gap-x-10 gap-y-10 lg:mt-40 lg:grid-cols-12">
          <p className={`${EYEBROW} lg:col-span-2`}>[ Testimonials ]</p>

          <Reveal className="lg:col-span-5 lg:col-start-7">
            <blockquote>
              <p className="text-[clamp(1.25rem,1.9vw,1.9rem)] leading-[1.45] font-light tracking-display">
                &ldquo;{TESTIMONIAL}&rdquo;
              </p>

              <footer className="mt-12 text-[15px] leading-snug">
                <p>Dwayne</p>
                <p className="text-brand-night-muted">
                  Founder, BEKO Creative Studios
                </p>
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
