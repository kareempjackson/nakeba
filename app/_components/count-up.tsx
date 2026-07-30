"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

/** "$2M+" → prefix "$", number "2", suffix "M+". Falls back to a plain read. */
function parse(value: string) {
  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
  if (!match) return null;

  const [, prefix, digits, suffix] = match;
  const decimals = digits.split(".")[1]?.length ?? 0;
  return {
    prefix,
    suffix,
    decimals,
    target: Number.parseFloat(digits.replace(/,/g, "")),
  };
}

/**
 * A statistic that counts up the first time it's read. The figures are the
 * section's whole argument, so they arrive as an event rather than as text
 * that happens to already be on the page.
 */
export function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const parsed = parse(value);

  if (!parsed) {
    return <span className={className}>{value}</span>;
  }

  return <Counter {...parsed} className={className} />;
}

function Counter({
  prefix,
  suffix,
  decimals,
  target,
  className,
}: {
  prefix: string;
  suffix: string;
  decimals: number;
  target: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  // `amount: 0` — the count starts as the figure crosses the bottom edge, so
  // the reader watches it run rather than catching it already finished.
  const inView = useInView(ref, { once: true, amount: 0 });

  /*
    Starts at the target so the server-rendered markup carries the real figure
    (it's the content, not decoration). The reset to zero happens on mount,
    frames after hydration and long before the section is scrolled to.
  */
  const count = useMotionValue(target);
  const text = useTransform(count, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (!reduceMotion) count.set(0);
  }, [count, reduceMotion]);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(count, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [count, inView, reduceMotion, target]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {/* Tabular figures so the number doesn't jitter in width as it runs. */}
      <motion.span className="[font-variant-numeric:tabular-nums]">
        {text}
      </motion.span>
      {suffix}
    </span>
  );
}
