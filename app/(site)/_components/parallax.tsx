"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * Scroll-linked drift. The wrapped block travels against the page as it passes
 * through the viewport — images breathe inside their frames, and the big
 * decorative type opens away from the copy it frames.
 *
 * Transform only: nothing here touches layout, so a drifting image can't push
 * the section it sits in.
 */
export function Parallax({
  children,
  className,
  distance = 60,
  axis = "y",
}: {
  children: ReactNode;
  className?: string;
  /** Travel in pixels, from `+distance` on entry to `-distance` on exit.
      Negative flips the direction — how the two bleed-word halves part. */
  distance?: number;
  axis?: "x" | "y";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    // The block's whole pass through the viewport, bottom edge to top edge.
    offset: ["start end", "end start"],
  });

  const shift = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduceMotion ? undefined : axis === "y" ? { y: shift } : { x: shift }}
    >
      {children}
    </motion.div>
  );
}
