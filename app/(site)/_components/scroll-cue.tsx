"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useCurtainLifted } from "./preloader/preloader-store";

/** How far the reader has to scroll for the cue to be gone. */
const SPENT = 140;

/**
 * The invitation: one word, set like the hero's pitch line, drifting down and
 * back on a slow loop.
 *
 * It's the page's first instruction and its shortest — once the reader has
 * taken it, it's in the way, so it fades on the scroll it asked for. That fade
 * is scroll-linked rather than a one-off, so coming back to the top brings the
 * cue back with it.
 *
 * Decorative by design: `aria-hidden`, no pointer events, nothing here that a
 * keyboard or screen-reader user needs — the header nav already offers the way
 * down the page.
 */
export function ScrollCue() {
  const reduceMotion = useReducedMotion();
  const lifted = useCurtainLifted();
  const { scrollY } = useScroll();

  const fade = useTransform(scrollY, [0, SPENT], [1, 0]);
  const sink = useTransform(scrollY, [0, SPENT], [0, 16]);

  return (
    /* Three elements, because three things own the same two properties: the
       entrance animates them once, the scroll fade drives them continuously,
       and the drift loops. On one element the last would win outright. */
    <motion.div
      aria-hidden
      className="pointer-events-none fixed right-6 bottom-8 z-40 md:right-10 lg:right-14"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={lifted ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      /* Held back until after the entrance has landed, so it reads as the page
         turning to the reader once it's finished introducing itself. */
      transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div style={{ opacity: fade, y: sink }}>
        {/* Set as the hero's pitch line is: the cue speaks in the same voice as
            the sentence above it, not in the eyebrow's small caps. */}
        <motion.span
          className="block text-lg leading-snug font-medium md:text-xl"
          animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
          }
        >
          Scroll
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
