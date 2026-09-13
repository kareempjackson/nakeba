"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * A hairline under the header that fills as the page is read — the spine of
 * the story, and the one piece of chrome that says how far in you are.
 */
export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  // Smoothed so the line glides instead of stepping with each wheel notch.
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: reduceMotion ? scrollYProgress : smoothed }}
      className="absolute inset-x-0 bottom-0 h-px origin-left bg-brand-ink"
    />
  );
}
