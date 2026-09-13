import type { ReactNode } from "react";

export function Section({
  id,
  index,
  title,
  intro,
  children,
}: {
  id: string;
  index: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 border-t border-brand-line py-20 md:py-28"
    >
      <div className="grid gap-10 md:grid-cols-[14rem_1fr] md:gap-16">
        <header className="md:sticky md:top-24 md:self-start">
          <span className="eyebrow text-brand-muted" data-numeric>
            {index}
          </span>
          <h2
            id={`${id}-title`}
            className="mt-3 text-2xl font-semibold tracking-display"
          >
            {title}
          </h2>
          {intro ? (
            <p className="mt-4 max-w-[22rem] text-sm leading-relaxed text-brand-muted">
              {intro}
            </p>
          ) : null}
        </header>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

export function SubHead({
  children,
  aside,
}: {
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3 border-b border-brand-line pb-3">
      <h3 className="eyebrow">{children}</h3>
      {aside ? (
        <span className="text-xs text-brand-muted">{aside}</span>
      ) : null}
    </div>
  );
}

/** A do / don't rule card. */
export function Rule({
  kind,
  children,
}: {
  kind: "do" | "dont";
  children: ReactNode;
}) {
  const isDo = kind === "do";
  return (
    <li className="flex gap-3 text-sm leading-relaxed">
      <span
        aria-hidden
        className={[
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
          isDo ? "bg-brand-sky text-brand-ink" : "bg-brand-ink text-brand-white",
        ].join(" ")}
      >
        {isDo ? "✓" : "✕"}
      </span>
      <span>
        <span className="sr-only">{isDo ? "Do: " : "Don't: "}</span>
        {children}
      </span>
    </li>
  );
}

export function Mono({ children }: { children: ReactNode }) {
  return (
    <span
      data-numeric
      className="text-[0.8125rem] font-medium tracking-tight uppercase"
    >
      {children}
    </span>
  );
}
