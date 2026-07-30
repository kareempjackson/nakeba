/**
 * NOTE — two copy issues carried over from the comp, left as-is rather than
 * guessed at:
 *  1. "$2M+" is paired with "over $20 million" — an order of magnitude apart.
 *  2. This is the only section written in "we / our"; the rest of the site
 *     speaks as "I". Worth reconciling.
 */
const STATS = [
  {
    value: "$2M+",
    copy: "Collectively, our projects have generated over $20 million in revenue for clients.",
  },
  {
    value: "120+",
    copy: "We've launched more than 120 websites across industries and continents.",
  },
  {
    value: "95%",
    copy: "95% of our clients continue working with us because we focus on trust, clarity, and results.",
  },
];

export function Stats() {
  return (
    <section
      id="by-the-numbers"
      aria-labelledby="by-the-numbers-title"
      className="scroll-mt-20 bg-brand-surface"
    >
      <div className="mx-auto w-full max-w-380 px-6 py-24 md:px-10 md:py-32 lg:px-14 lg:py-40">
        <div className="relative">
          <h2
            id="by-the-numbers-title"
            className="mb-8 text-[13px] font-medium tracking-[0.12em] uppercase lg:absolute lg:top-2 lg:left-0 lg:mb-0"
          >
            [ By the numbers ]
          </h2>

          <dl className="lg:ml-[8.5%]">
            {STATS.map((stat) => (
              <div
                key={stat.value}
                className="grid items-start gap-x-10 gap-y-3 border-b border-brand-line py-6 lg:grid-cols-12"
              >
                <dt className="text-[clamp(3rem,6.5vw,7.5rem)] leading-none font-normal tracking-display lg:col-span-6">
                  {stat.value}
                </dt>
                <dd className="text-[17px] leading-relaxed text-brand-muted lg:col-span-2 lg:col-start-11 lg:pt-2">
                  {stat.copy}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
