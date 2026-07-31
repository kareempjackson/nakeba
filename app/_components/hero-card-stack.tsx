"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
  type Transition,
} from "framer-motion";
import { useCurtainLifted } from "./preloader/preloader-store";

/**
 * Placeholders for now — swap for the final art-directed crops.
 *
 * The brand colour behind each photo is kept as the card's ground, so the deck
 * still reads as the designed composition in the moment before the images
 * decode, and around the rounded corners.
 *
 * The entrance sequence deals a copy of this same deck, so anything changed
 * here must be changed in `preloader/stage-cards.tsx` too or the cards will
 * visibly swap photos as they land.
 */
const PHOTO_BACK = "/images/30532.jpg";
const PHOTO_MIDDLE = "/images/30530.jpg";
const PHOTO_FRONT = "/images/30532.jpg";

/** Matches the front card's, so all three resolve the same srcset candidate. */
const SIZES = "(min-width: 1024px) 28vw, (min-width: 640px) 32vw, 38vw";

/**
 * The three cards inside the signature deal themselves in on load: they land
 * as one squared deck, riffle apart, cross back over each other, then settle
 * into the resting fan of the design. Each card runs the same four-beat
 * keyframe track with a small offset, which is what makes it read as a shuffle
 * rather than three separate entrances.
 *
 * Scrolling then keeps the deck alive: the cards riffle against each other in
 * proportion to how hard the page is being scrolled, and spring back to rest
 * the moment it stops. A pointer over the deck adds a third motion: the cards
 * follow the cursor and tip towards it, each by a different amount, and stirring
 * the mouse across them riffles the deck open into its own shuffle pose — a
 * still pointer only cracks it, a worked one spreads it. Load shuffle, pointer
 * lean and scroll riffle each live on their own nested element, so their
 * transforms compose instead of fighting over the same properties.
 *
 * The last keyframe of every load track is the card's resting position, so the
 * end state is exactly the static composition.
 *
 * The shuffle waits for the entrance sequence: while the curtain is up the
 * cards hold on their first keyframe — the squared deck — which is exactly
 * where the sequence deals its own cards. So the entrance deals and the page
 * shuffles, and the seam between them is one continuous gesture. With no
 * intro, the gate is already open on the first frame and this behaves as it
 * always did.
 */

/** Shared four-beat timing: squared → riffle out → cross back → settle. */
const SHUFFLE: Transition = {
  duration: 1.5,
  times: [0, 0.34, 0.68, 1],
  ease: [0.33, 1, 0.68, 1],
};

/**
 * Scroll speed, in px/s, at which the riffle reaches full spread. Set well
 * above a reading scroll on purpose: paging down gently only nudges the cards,
 * and it takes a hard flick to fan them all the way open.
 */
const FULL_RIFFLE = 3200;

/**
 * How each card answers the pointer, at the edge of the deck: `shift` in
 * percent of the card, `tilt` in degrees. The back card travels furthest and
 * the front card barely moves, which is what reads as depth rather than as the
 * whole deck sliding. Values are for full deflection — the pointer is
 * normalised to ±0.5, so the real range is half of each.
 */
type Lean = { shift: number; tilt: number };

/** Enough perspective for the tilt to have depth, not so much that it warps. */
const PERSPECTIVE = 900;

/**
 * Pointer speed, in deck-widths per second, at which the shuffle is fully open.
 * A deliberate stir across the cards reaches it; drifting across on the way to
 * something else barely registers.
 */
const FULL_STIR = 3.4;

/** How far the deck opens on a still pointer, and how much a stir adds. */
const HOVER_OPEN = 0.35;
const STIR_OPEN = 0.65;

type Keyframes = { x: string[]; y: string[]; rotate: number[] };

/** The deck's poses are authored as percentage strings: "-9%" → -9. */
const pct = (value: string) => Number.parseFloat(value);

export function HeroCardStack() {
  const reduceMotion = useReducedMotion();
  const play = useCurtainLifted();

  /* Pointer position within the deck, normalised to ±0.5 from its centre. The
     springs are slower and looser than the cursor's — the deck should follow
     the hand the way a held object does, trailing it slightly. */
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const leanX = useSpring(pointerX, { stiffness: 210, damping: 26, mass: 0.5 });
  const leanY = useSpring(pointerY, { stiffness: 210, damping: 26, mass: 0.5 });

  /* How hard the pointer is being worked across the deck, on exactly the terms
     the scroll riffle uses: velocity in, clamped fraction out. Stirring the
     mouse over the cards shuffles them; resting on them does not. */
  const speedX = useVelocity(pointerX);
  const speedY = useVelocity(pointerY);
  const worked = useTransform([speedX, speedY], ([vx, vy]: number[]) =>
    Math.min(1, Math.hypot(vx, vy) / FULL_STIR),
  );
  /* Just under critical damping, so the deck overshoots a hair as it closes —
     the same settle the scroll riffle has. */
  const stir = useSpring(worked, {
    stiffness: 120,
    damping: 16,
    mass: 0.4,
    restDelta: 0.001,
  });

  /* The deck opens a little just from being under the pointer, before any
     movement — so it acknowledges the hand before it's stirred. */
  const over = useMotionValue(0);
  const fan = useSpring(over, { stiffness: 180, damping: 24, mass: 0.5 });

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    /* A touch drag shouldn't leave the deck leaning where the finger left. */
    if (event.pointerType !== "mouse") return;
    /* Read in the event, before framer's writes land in the following frame,
       so measuring here doesn't thrash against its own transforms. */
    const box = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - box.left) / box.width - 0.5);
    pointerY.set((event.clientY - box.top) / box.height - 0.5);
    over.set(1);
  };

  const release = () => {
    pointerX.set(0);
    pointerY.set(0);
    over.set(0);
  };

  // Scroll velocity, spring-smoothed: it swells while the page moves and
  // decays back to zero when it stops, so the cards settle on their own.
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const riffle = useSpring(velocity, {
    // Just under critical damping, so the deck overshoots a hair on the way
    // back to square — a settle, not a bounce.
    stiffness: 110,
    damping: 14,
    mass: 0.5,
    restDelta: 1,
  });

  return (
    <div
      className="relative aspect-5/7"
      style={{ perspective: PERSPECTIVE }}
      onPointerMove={reduceMotion ? undefined : onPointerMove}
      onPointerLeave={reduceMotion ? undefined : release}
      /* A cancelled gesture — scrolling away mid-hover — never fires leave. */
      onPointerCancel={reduceMotion ? undefined : release}
    >
      {/* Back card — peach. Swings widest, both on load and on scroll. */}
      <Card
        riffle={riffle}
        leanX={leanX}
        leanY={leanY}
        stir={stir}
        fan={fan}
        lean={{ shift: 13, tilt: 14 }}
        play={play}
        reduceMotion={reduceMotion ?? false}
        delay={0.42}
        keyframes={{
          x: ["0%", "-9%", "7%", "4%"],
          y: ["0%", "3%", "0%", "1%"],
          rotate: [0, -7, 11, 7],
        }}
        sway={{ rotate: 6, x: 3 }}
        className="overflow-hidden bg-brand-peach"
        aria-hidden
      >
        <Image
          src={PHOTO_BACK}
          alt=""
          fill
          sizes={SIZES}
          /* Above the fold, so it can't be lazy — but not `priority` either:
             only the wordmark should be competing for the LCP window. */
          loading="eager"
          className="object-cover object-top"
        />
      </Card>

      {/* Middle card — butter. Fans the other way, which is what turns the
          pair into a riffle instead of a shared tilt. */}
      <Card
        riffle={riffle}
        leanX={leanX}
        leanY={leanY}
        stir={stir}
        fan={fan}
        lean={{ shift: 8, tilt: 10 }}
        play={play}
        reduceMotion={reduceMotion ?? false}
        delay={0.34}
        keyframes={{
          x: ["0%", "11%", "2%", "6%"],
          y: ["0%", "-4%", "-1%", "-2%"],
          rotate: [0, 13, -1, 3.5],
        }}
        sway={{ rotate: -4.5, x: -2.5 }}
        className="overflow-hidden bg-brand-butter-soft"
        aria-hidden
      >
        <Image
          src={PHOTO_MIDDLE}
          alt=""
          fill
          sizes={SIZES}
          loading="eager"
          className="object-cover object-top"
        />
      </Card>

      {/* Front card — the photo. Stays nearly square so the face never tilts
          far; it only settles the deck. */}
      <Card
        riffle={riffle}
        leanX={leanX}
        leanY={leanY}
        stir={stir}
        fan={fan}
        lean={{ shift: 3.5, tilt: 6 }}
        play={play}
        reduceMotion={reduceMotion ?? false}
        delay={0.26}
        keyframes={{
          x: ["0%", "-3%", "1%", "0%"],
          y: ["0%", "2%", "-1%", "0%"],
          rotate: [0, -2.5, 1.5, 0],
        }}
        sway={{ rotate: 1.6, x: 0.8 }}
        className="overflow-hidden bg-brand-surface shadow-[0_18px_45px_-20px_rgba(0,0,0,0.35)]"
      >
        <Image
          src={PHOTO_FRONT}
          alt="Nakeba Mason"
          fill
          sizes={SIZES}
          priority
          className="object-cover object-top"
        />
      </Card>
    </div>
  );
}

function Card({
  riffle,
  leanX,
  leanY,
  lean,
  stir,
  fan,
  play,
  reduceMotion,
  keyframes,
  delay,
  sway,
  className,
  children,
  ...rest
}: {
  riffle: MotionValue<number>;
  /** Pointer position within the deck, ±0.5 from centre. */
  leanX: MotionValue<number>;
  leanY: MotionValue<number>;
  /** This card's share of the lean. */
  lean: Lean;
  /** How hard the pointer is being stirred across the deck, 0–1. */
  stir: MotionValue<number>;
  /** Whether the pointer is over the deck at all, 0–1. */
  fan: MotionValue<number>;
  /** False while the entrance sequence still owns the screen. */
  play: boolean;
  reduceMotion: boolean;
  keyframes: Keyframes;
  delay: number;
  /** Peak scroll-driven offset for this card, at `FULL_RIFFLE`. */
  sway: { rotate: number; x: number };
  className?: string;
  children?: React.ReactNode;
} & React.ComponentProps<typeof motion.div>) {
  const rotate = useTransform(
    riffle,
    [-FULL_RIFFLE, 0, FULL_RIFFLE],
    [-sway.rotate, 0, sway.rotate],
    { clamp: true },
  );
  const x = useTransform(
    riffle,
    [-FULL_RIFFLE, 0, FULL_RIFFLE],
    [`${-sway.x}%`, "0%", `${sway.x}%`],
    { clamp: true },
  );

  /*
    The pose the deck opens into under the pointer is the card's own riffle —
    keyframe 1 of the load shuffle, the beat where the cards are spread widest
    — measured against where it rests. Reusing it rather than authoring a
    second spread means the hover shuffle, the load shuffle and the entrance
    are all the same gesture at different intensities, and a change to one
    card's choreography carries through all three.
  */
  const open = {
    x: pct(keyframes.x[1]) - pct(keyframes.x.at(-1)!),
    y: pct(keyframes.y[1]) - pct(keyframes.y.at(-1)!),
    rotate: keyframes.rotate[1] - keyframes.rotate.at(-1)!,
  };

  /* Under the pointer it opens part way; stirring drives it the rest. Capped
     at 1 so the two can't compound past the card's own riffle. */
  const intensity = useTransform([fan, stir], ([f, s]: number[]) =>
    Math.min(1, f * HOVER_OPEN + s * STIR_OPEN),
  );

  /* Pointer lean. The card follows the cursor across the deck and tips towards
     it; `rotateX` is negated so pushing the pointer up lifts the card's top
     edge away, which is the way a real card would sit. The lean and the open
     share these two axes, so they're summed here rather than stacked on yet
     another element. */
  const leanShiftX = useTransform(
    [leanX, intensity],
    ([l, i]: number[]) => `${l * lean.shift + i * open.x}%`,
  );
  const leanShiftY = useTransform(
    [leanY, intensity],
    ([l, i]: number[]) => `${l * lean.shift + i * open.y}%`,
  );
  const leanSpin = useTransform(intensity, (i) => i * open.rotate);
  const rotateY = useTransform(leanX, (v) => v * lean.tilt);
  const rotateX = useTransform(leanY, (v) => -v * lean.tilt);

  const restState = {
    x: keyframes.x.at(-1),
    y: keyframes.y.at(-1),
    rotate: keyframes.rotate.at(-1),
  };

  /* The squared deck the shuffle starts from — and the pose the cards hold in
     while the entrance sequence is still running. */
  const squared = {
    x: keyframes.x[0],
    y: keyframes.y[0],
    rotate: keyframes.rotate[0],
  };

  return (
    // Outer layer: the one-off load shuffle.
    <motion.div
      className="absolute inset-0"
      initial={reduceMotion ? false : squared}
      animate={reduceMotion ? restState : play ? keyframes : squared}
      transition={reduceMotion ? { duration: 0 } : { ...SHUFFLE, delay }}
    >
      {/* Middle layer: the pointer lean. Its own element so following the
          mouse doesn't contend with the shuffle above or the riffle below —
          each layer owns its properties outright and the three compose. */}
      <motion.div
        className="h-full w-full"
        style={
          reduceMotion
            ? undefined
            : {
                x: leanShiftX,
                y: leanShiftY,
                rotate: leanSpin,
                rotateX,
                rotateY,
              }
        }
      >
        {/* Inner layer: the continuous scroll riffle. */}
        <motion.div
          className={`relative h-full w-full rounded-[3px] ${className ?? ""}`}
          style={reduceMotion ? undefined : { rotate, x }}
          {...rest}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
