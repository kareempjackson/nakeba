export function NextStep() {
  return (
    <section
      id="next-step"
      aria-labelledby="next-step-title"
      className="scroll-mt-20 bg-brand-white"
    >
      <div className="mx-auto w-full max-w-380 px-6 py-24 md:px-10 md:py-32 lg:px-14 lg:py-40">
        <div className="relative">
          <p className="mb-8 max-w-70 text-[15px] leading-relaxed lg:absolute lg:top-[0.4em] lg:left-0 lg:mb-0">
            You&rsquo;ll Leave With Clarity Either Way. That&rsquo;s The Point.
          </p>

          {/* The comp runs two clauses together without punctuation
              ("simple a 30-minute call No pitch"); dash and full stop added. */}
          <h2
            id="next-step-title"
            className="text-[clamp(1.875rem,3.6vw,4.75rem)] leading-[1.1] font-normal tracking-display lg:ml-[20%] lg:indent-[18%]"
          >
            The next step is simple &mdash; a 30&#8209;minute call. No pitch, no
            pressure. Just an honest conversation about where your business is,
            where things are slipping, and whether working together makes sense.
          </h2>
        </div>
      </div>
    </section>
  );
}
