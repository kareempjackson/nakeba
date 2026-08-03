"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/** The disc's real size. At rest it's scaled down to a dot. */
const DISC = 120;
/** Diameter of the resting dot, in pixels. */
const DOT = 16;
const REST_SCALE = DOT / DISC;
const PRESS_SCALE = 0.92;

const INTERACTIVE =
  "a, button, summary, label, input, select, textarea, [role='button'], [tabindex]:not([tabindex='-1'])";

/**
 * Longest label the disc will carry. Past this it opens as a plain disc rather
 * than setting a paragraph in a circle. `data-cursor-label` overrides both the
 * text and this limit, for anything whose own wording is too long to reuse.
 */
const LABEL_MAX = 22;

/*
  The dot carries the brand gradient down the page: Sky at the top, Peach at
  the end, taking the two blues and the blush on the way. Same colours and the
  same stops as the `brand-gradient` utility in globals.css — read as a journey
  rather than all at once. Literal hex, not the `--color-brand-*` vars: framer
  interpolates between colours, and a var() string has nothing to interpolate.
  (Butter sits this one out; five stops in a 16px dot is a lot of hue for very
  little pixel.)
*/
const RAMP = ["#8fddf3", "#afc6f8", "#f7b4c4", "#ffd4b3"];
const RAMP_STOPS = [0, 0.38, 0.72, 1];

/**
 * The site's pointer: a dot trailing the mouse that opens into a disc over
 * anything clickable, carrying that element's own label in bold. It takes its
 * colour from how far down the page the reader is, working through the brand
 * gradient as they go.
 *
 * The label lives in the disc rather than the page because it has to: the disc
 * is a fixed overlay above the page's stacking context, so no amount of
 * z-index would let the link's own text paint over it. Reading the label and
 * re-setting it in the disc gets the effect the design asks for — the target
 * covered, its name bold — without touching the page's own type, and so
 * without a hover state that reflows the layout around it.
 *
 * Guards, in order of how much they matter:
 * - Only on a fine pointer. Touch devices keep their own behaviour entirely.
 * - The system cursor is left alone; this accompanies it.
 * - Reduced motion drops the spring; the disc tracks the pointer exactly.
 */
export function Cursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("");
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  // Parked off-screen so it never flashes at the origin before the first move.
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  /* Fast and barely damped: enough smoothing to feel like a physical object,
     not enough to lag behind the hand — which matters more now that the disc
     is large enough to be read. */
  const springX = useSpring(x, { stiffness: 900, damping: 50, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 900, damping: 50, mass: 0.35 });

  /* Hue by how far down the page the reader is. Smoothed on the same terms as
     the header's progress line, so the two read as one instrument. */
  const { scrollYProgress } = useScroll();
  const read = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  const backgroundColor = useTransform(
    reduceMotion ? scrollYProgress : read,
    RAMP_STOPS,
    RAMP,
  );

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const sync = () => setEnabled(fine.matches);

    sync();
    fine.addEventListener("change", sync);
    return () => fine.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      /* A touch or pen contact shouldn't drag the disc around after the fact. */
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(INTERACTIVE)
          : null;
      setHovering(!!target);
      setLabel(target ? labelFor(target) : "");
    };

    /* `relatedTarget` is null when the pointer leaves the window entirely, as
       opposed to crossing between elements inside it. */
    const onOut = (event: PointerEvent) => {
      if (!event.relatedTarget) setVisible(false);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onEnter = () => setVisible(true);

    const passive = { passive: true } as const;
    window.addEventListener("pointermove", onMove, passive);
    window.addEventListener("pointerover", onEnter, passive);
    window.addEventListener("pointerout", onOut, passive);
    window.addEventListener("pointerdown", onDown, passive);
    window.addEventListener("pointerup", onUp, passive);
    /* Dragging out of the window and releasing there would otherwise leave the
       disc stuck small. */
    window.addEventListener("blur", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onEnter);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("blur", onUp);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const scale = hovering
    ? pressed
      ? PRESS_SCALE
      : 1
    : REST_SCALE * (pressed ? 0.8 : 1);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-200 flex items-center justify-center rounded-full text-brand-ink"
      style={{
        x: reduceMotion ? x : springX,
        y: reduceMotion ? y : springY,
        backgroundColor,
        width: DISC,
        height: DISC,
        // Centres the disc on the hotspot; margins don't disturb the transform.
        marginLeft: -DISC / 2,
        marginTop: -DISC / 2,
      }}
      animate={{ scale, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className="px-5 text-center text-[13px] leading-tight font-bold tracking-eyebrow uppercase"
        /* Held back a touch, so the disc is open before the word arrives. */
        animate={{ opacity: hovering && label ? 1 : 0 }}
        transition={{ duration: 0.15, delay: hovering && label ? 0.08 : 0 }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}

/** The hovered element's own wording, cleaned up enough to set in a circle. */
function labelFor(element: HTMLElement) {
  if (element.dataset.cursorLabel) return element.dataset.cursorLabel;

  /* An `aria-label` is the control's human name, and it wins over the letters
     on screen: the footer's LinkedIn link is drawn as "LI" but named in full,
     and the disc has room to say so. */
  return fit(element.getAttribute("aria-label")) || fit(element.textContent);
}

function fit(value: string | null) {
  const text = (value ?? "")
    /* The footer and menu wrap their labels in decorative braces. */
    .replace(/[{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return text.length > 0 && text.length <= LABEL_MAX ? text : "";
}
