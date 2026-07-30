"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
  type Transition,
} from "framer-motion";

/** Placeholder for now — swap for the final art-directed crop. */
const HERO_PHOTO = "/images/30532.jpg";

/**
 * The three cards inside the signature deal themselves in on load: they land
 * as one squared deck, riffle apart, cross back over each other, then settle
 * into the resting fan of the design. Each card runs the same four-beat
 * keyframe track with a small offset, which is what makes it read as a shuffle
 * rather than three separate entrances.
 *
 * Scrolling then keeps the deck alive: the cards riffle against each other in
 * proportion to how hard the page is being scrolled, and spring back to rest
 * the moment it stops. The load shuffle and the scroll riffle live on separate
 * nested elements so their transforms compose instead of fighting over the
 * same properties.
 *
 * The last keyframe of every load track is the card's resting position, so the
 * end state is exactly the static composition.
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

type Keyframes = { x: string[]; y: string[]; rotate: number[] };

export function HeroCardStack() {
  const reduceMotion = useReducedMotion();

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
    <div className="relative aspect-5/7">
      {/* Back card — peach. Swings widest, both on load and on scroll. */}
      <Card
        riffle={riffle}
        reduceMotion={reduceMotion ?? false}
        delay={0.42}
        keyframes={{
          x: ["0%", "-9%", "7%", "4%"],
          y: ["0%", "3%", "0%", "1%"],
          rotate: [0, -7, 11, 7],
        }}
        sway={{ rotate: 6, x: 3 }}
        className="bg-brand-peach"
        aria-hidden
      />

      {/* Middle card — butter. Fans the other way, which is what turns the
          pair into a riffle instead of a shared tilt. */}
      <Card
        riffle={riffle}
        reduceMotion={reduceMotion ?? false}
        delay={0.34}
        keyframes={{
          x: ["0%", "11%", "2%", "6%"],
          y: ["0%", "-4%", "-1%", "-2%"],
          rotate: [0, 13, -1, 3.5],
        }}
        sway={{ rotate: -4.5, x: -2.5 }}
        className="bg-brand-butter-soft"
        aria-hidden
      />

      {/* Front card — the photo. Stays nearly square so the face never tilts
          far; it only settles the deck. */}
      <Card
        riffle={riffle}
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
          src={HERO_PHOTO}
          alt="Nakeba Mason"
          fill
          sizes="(min-width: 1024px) 28vw, (min-width: 640px) 32vw, 38vw"
          priority
          className="object-cover object-top"
        />
      </Card>
    </div>
  );
}

function Card({
  riffle,
  reduceMotion,
  keyframes,
  delay,
  sway,
  className,
  children,
  ...rest
}: {
  riffle: MotionValue<number>;
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

  const restState = {
    x: keyframes.x.at(-1),
    y: keyframes.y.at(-1),
    rotate: keyframes.rotate.at(-1),
  };

  return (
    // Outer layer: the one-off load shuffle.
    <motion.div
      className="absolute inset-0"
      initial={
        reduceMotion
          ? false
          : {
              x: keyframes.x[0],
              y: keyframes.y[0],
              rotate: keyframes.rotate[0],
            }
      }
      animate={reduceMotion ? restState : keyframes}
      transition={reduceMotion ? { duration: 0 } : { ...SHUFFLE, delay }}
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
  );
}
