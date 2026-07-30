"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * Widest each colour strip opens, in vw. Reached as the bottom of the wrapped
 * block reaches the bottom of the viewport.
 */
const MAX_INSET = 2.5;

/**
 * The wrapped block draws back from the edges as it scrolls, uncovering a band
 * of brand colour down both margins. The reveal is scroll-linked, so it opens
 * and closes as the reader moves either way, and the strips end with the block
 * itself — whatever follows sits full-bleed again.
 *
 * It is done with `clip-path` rather than margins or padding: the white block
 * keeps its full width and its contents never reflow, which keeps the strips
 * off the layout path on every scroll frame.
 */
export function EdgeReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    // 0 as the block's top edge appears at the bottom of the viewport, 1 once
    // its bottom edge reaches the bottom of the viewport — so the strips are
    // at full width by the time the section below comes into view.
    offset: ["start end", "end end"],
  });

  const inset = useTransform(scrollYProgress, [0, 1], [0, MAX_INSET]);
  const clipPath = useMotionTemplate`inset(0 ${inset}vw)`;

  return (
    <div ref={ref} className="bg-brand-periwinkle">
      <motion.div style={reduceMotion ? undefined : { clipPath }}>
        {children}
      </motion.div>
    </div>
  );
}
