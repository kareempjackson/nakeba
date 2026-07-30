"use client";

import { useCallback, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/*
  Literal values, not the `--color-brand-*` vars: the reveal interpolates
  between the two colours, and a var() string has nothing to interpolate. Keep
  in sync with `brand-ghost`/`brand-ink` and `brand-night-muted`/`brand-white`
  in globals.css.
*/
const FILL = {
  /** Light grounds: ghost grey → ink. */
  ink: ["#d8d7d4", "#000000"],
  /** Dark grounds: night muted → white. */
  white: ["#a8a7a3", "#ffffff"],
} as const;

type Tone = keyof typeof FILL;

type Variant =
  /** Copy lifts from a whisper to full ink — for body paragraphs. */
  | "lift"
  /** Copy fills in place from the ground's muted grey to full contrast — for
      display headlines, where a rise would read as the type shifting on the
      page. */
  | "fill";

/**
 * Editorial scroll reveal: the copy starts dimmed and each word comes up to
 * full ink as it travels through the viewport. The animation is scroll-linked
 * rather than triggered, so scrubbing back up un-reveals it — it reads as the
 * reader uncovering the line, not as an entrance effect.
 *
 * The text is always in the DOM at readable contrast for assistive tech and
 * for anyone who asked for reduced motion.
 */
export function ScrollRevealText({
  text,
  className,
  as: Tag = "p",
  variant = "lift",
  tone = "ink",
}: {
  text: string;
  className?: string;
  /** `span` to sit inline inside a larger heading. */
  as?: "p" | "span";
  variant?: Variant;
  /** Which end of the contrast range `fill` resolves to. */
  tone?: Tone;
}) {
  const targetRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const attachTarget = useCallback(
    (el: HTMLElement | null) => {
      /*
        Framer sizes the scroll range from the target's clientHeight, which is
        0 for an inline element — so when we render inline we scrub against the
        nearest block ancestor (the heading we sit in) instead. Ref callbacks
        run before this component's layout effects, so `useScroll` still sees
        the element it needs on mount.
      */
      targetRef.current = Tag === "span" ? (el?.parentElement ?? el) : el;
    },
    [Tag],
  );

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset:
      variant === "fill"
        ? /* Keyed to the target's bottom edge: a filling tail is the last lines
             of a much taller headline, so the scrub tracks where those lines
             are — from just entering the fold to a little above centre. */
          ["end 0.95", "end 0.45"]
        : // Starts as the paragraph's top crosses 85% of the viewport, finishes
          // while its last line is still comfortably above the fold.
          ["start 0.85", "end 0.6"],
  });

  const words = text.split(" ");

  return (
    <Tag ref={attachTarget} className={className}>
      {words.map((word, i) => (
        <Word
          key={`${i}-${word}`}
          progress={scrollYProgress}
          // Words overlap slightly (the window is wider than the step), so the
          // reveal moves as a soft edge instead of a hard one-word cursor.
          start={i / words.length}
          end={(i + 2) / words.length}
          variant={variant}
          tone={tone}
          reduceMotion={reduceMotion ?? false}
        >
          {word}
        </Word>
      ))}
    </Tag>
  );
}

function Word({
  children,
  progress,
  start,
  end,
  variant,
  tone,
  reduceMotion,
}: {
  children: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  variant: Variant;
  tone: Tone;
  reduceMotion: boolean;
}) {
  const [from, to] = FILL[tone];
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  const y = useTransform(progress, [start, end], ["0.22em", "0em"]);
  const color = useTransform(progress, [start, end], [from, to]);
  const isFill = variant === "fill";

  return (
    <>
      <motion.span
        /* Only `lift` needs a box to translate. `fill` stays inline so display
           type keeps its native spacing — an inline-block clips the overhang
           of large italic glyphs into the next word. */
        className={isFill ? undefined : "inline-block"}
        style={
          reduceMotion
            ? // Reduced motion gets the end state, which is also the legible one.
              isFill
              ? { color: to }
              : undefined
            : isFill
              ? { color }
              : { opacity, y }
        }
      >
        {children}
      </motion.span>{" "}
    </>
  );
}
