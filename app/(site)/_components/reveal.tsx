"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** The elements a reveal can render as, kept small so the types stay honest. */
const AS = {
  div: motion.div,
  li: motion.li,
  p: motion.p,
  figure: motion.figure,
} as const;

/**
 * The page's content beat: a block settles up into place the first time it
 * comes into view. Unlike the headline fills, this one plays once — the story
 * moves forward, it doesn't rewind.
 *
 * `delay` is what turns a row of these into a stagger; pass `i * 0.08` from the
 * mapping section rather than nesting a container component.
 */
export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  distance = 28,
}: {
  children: ReactNode;
  className?: string;
  as?: keyof typeof AS;
  delay?: number;
  /** How far below its resting place the block starts, in pixels. */
  distance?: number;
}) {
  const Component = AS[as];
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      // Fires a little before the block is fully in — it should already be
      // arriving as the reader gets to it, not start when they're staring at it.
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
