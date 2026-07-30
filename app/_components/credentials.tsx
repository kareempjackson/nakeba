import { BleedWord } from "./bleed-word";
import { Reveal } from "./reveal";

/**
 * Two clauses in the source comp run together without punctuation
 * ("This business is mine I know…", "in my kitchen I love to cook…").
 * Em dashes added to close them — adjust if the copy intended otherwise.
 */
const VALUES = [
  "For me, the work is inseparable from the people behind it. My partnerships are remote, which means trust isn't a nice-to-have — it's the foundation. Transparency, communication, discretion, and showing up when I say I will: these aren't values on a wall. They're how the work gets done. When a founder opens their business to me, I honour that.",
  "And I understand what they're protecting, because I built something too. This business is mine — I know what it takes to grow one, and I know what it means to trust someone with it.",
  "When I'm not working, you'll find me in a book, at the gym, on a hiking trail, or in my kitchen — I love to cook, and I take it seriously. Yoga keeps me grounded through all of it.",
];

export function Credentials() {
  return (
    <section
      id="credentials"
      aria-labelledby="credentials-title"
      className="relative scroll-mt-20 overflow-hidden bg-brand-surface"
    >
      <BleedWord left="Nak" right="eba" align="top" />

      {/* As in the Offer section: the mobile padding is the stacked fragment's
          height plus a gap, easing off once they move to the side margins. */}
      <div className="relative mx-auto w-full max-w-380 px-6 py-[min(90vw,22rem)] md:px-10 md:py-32 lg:px-14 lg:py-40">
        <Reveal className="text-center">
          <p
            id="credentials-title"
            className="text-[15px] font-bold tracking-[0.1em]"
          >
            Education
          </p>

          <p className="mx-auto mt-8 max-w-70 text-2xl leading-tight font-bold tracking-display">
            BSc Psychology, University of the West Indies
          </p>

          <p className="mx-auto mt-6 max-w-88 text-[17px] leading-relaxed">
            PACE&#8209;Certified, American Society of Administrative
            Professionals &middot; Based in Barbados, partnering with founders
            worldwide
          </p>
        </Reveal>

        <div className="mx-auto mt-24 max-w-176 space-y-6 text-center text-[17px] leading-relaxed text-brand-muted lg:mt-32">
          {VALUES.map((copy, i) => (
            <Reveal key={copy} as="p" delay={i * 0.1}>
              {copy}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
