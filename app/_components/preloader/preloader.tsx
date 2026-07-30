"use client";

import { useEffect } from "react";
import { useAnimate } from "framer-motion";
import { Monogram } from "./monogram";
import { StageCards } from "./stage-cards";
import { SignatureComposition } from "../signature-composition";
import { setStage, usePreloaderStage } from "./preloader-store";

/**
 * The entrance.
 *
 * Four beats: the monogram writes itself in; it settles and the name resolves
 * beneath it; three cards deal into the deck; then the whole composition flies
 * onto its real position on the page — the cards becoming the hero's deck, the
 * wordmark becoming the hero's signature, the monogram becoming the header
 * logo — while the white ground fades off beneath it.
 *
 * Two things about the shape of this that are load-bearing:
 *
 * The page underneath is never hidden, only covered. It is painted and correct
 * from the first frame, which is what lets the landing be a formality: the
 * clones come to rest on top of pixels that already match them, so a sub-pixel
 * miss is invisible and there is no swap to see. It's also what keeps the
 * hero's wordmark eligible as the LCP element (see globals.css).
 *
 * And the flight is one transform, not three. `SignatureComposition` is sized
 * entirely in percentages of its own width, so the staged copy and the real one
 * cannot disagree about their internals — measure the two boxes, scale one onto
 * the other, and all three pieces land together.
 */

/* Arrivals — the ease used by `reveal.tsx`. */
const EASE_ENTER = [0.22, 1, 0.36, 1] as const;
/* Cards — the ease the hero's own shuffle uses, so the two share a signature. */
const EASE_SETTLE = [0.33, 1, 0.68, 1] as const;
/* The handoff. The sharpest of the three; it needs to feel decided. */
const EASE_FLIGHT = [0.16, 1, 0.3, 1] as const;

/** Scales the whole timeline. The one number to turn if it plays long. */
const SPEED = 0.9;
const t = (seconds: number) => seconds * SPEED;

/**
 * The wipe. Four-point polygons with matching structure and units, which is
 * what the interpolator needs to tween between them. The lean on the leading
 * edge is what makes it read as a pen sweep rather than a shutter.
 */
const WIPE_HIDDEN = "polygon(0% 0%, 0% 0%, -16% 100%, -16% 100%)";
const WIPE_VISIBLE = "polygon(0% 0%, 116% 0%, 100% 100%, 0% 100%)";

/** How much larger the monogram is centre-stage than in its parked slot. */
const MONO_BIG = 2.1;

const SESSION_KEY = "nm:intro";

/** Centre-to-centre, so it composes with a scale about the same origin. */
function flip(source: DOMRect, destination: DOMRect) {
  return {
    x: destination.left + destination.width / 2 - (source.left + source.width / 2),
    y: destination.top + destination.height / 2 - (source.top + source.height / 2),
    scale: destination.width / source.width,
  };
}

/** Referentially stable so React never rewrites the transform framer owns. */
const CENTRE_ORIGIN = { transformOrigin: "50% 50%" } as const;

type Controls = { speed: number; stop: () => void };

export function Preloader() {
  const stage = usePreloaderStage();
  const [scope, animate] = useAnimate<HTMLDivElement>();

  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    const html = document.documentElement;
    const running = new Set<Controls>();
    const timers = new Set<ReturnType<typeof setTimeout>>();
    let speed = 1;
    let finished = false;

    function finish() {
      if (finished) return;
      finished = true;
      teardown();
      running.forEach((control) => control.stop());
      running.clear();
      try {
        sessionStorage.setItem(SESSION_KEY, "seen");
      } catch {
        /* Private mode. The intro simply plays again next time. */
      }
      setStage("done");
    }

    /* Track every control so a skip can speed up whatever is mid-flight, and
       so anything created after a skip inherits the raised speed. */
    function track(control: Controls) {
      control.speed = speed;
      running.add(control);
      return control;
    }

    /**
     * Fast-forward rather than cut. Seeking would jump the measurement that the
     * handoff depends on; raising the speed keeps the whole state machine
     * intact and still resolves in about 150ms. It also looks better — the
     * sequence finishes, which reads as an acknowledgement.
     */
    function skip(rate = 5) {
      if (finished || speed >= rate) return;
      speed = rate;
      running.forEach((control) => (control.speed = rate));
    }

    const onKeyDown = (event: KeyboardEvent) => {
      /* Reaching for a shortcut shouldn't kill the intro. */
      if (["Shift", "Alt", "Control", "Meta"].includes(event.key)) return;
      skip();
    };
    const onSkip = () => skip();
    /* Backgrounded tabs throttle rAF to about 1Hz — nobody should come back to
       a half-frozen entrance. */
    const onVisibility = () => {
      if (document.hidden) skip(20);
    };

    const passive = { passive: true } as const;

    function listen() {
      window.addEventListener("wheel", onSkip, passive);
      window.addEventListener("touchstart", onSkip, passive);
      window.addEventListener("pointerdown", onSkip, passive);
      window.addEventListener("scroll", onSkip, passive);
      /* Stale rects mid-flight. Fast-forwarding re-measures on its way past. */
      window.addEventListener("resize", onSkip, passive);
      window.addEventListener("keydown", onKeyDown);
      /* Rather than trapping focus or marking the page inert — either would
         wall off a screen reader user with no explanation — any focus entering
         the document resolves the sequence and hands the page over. */
      window.addEventListener("focusin", onSkip, passive);
      document.addEventListener("visibilitychange", onVisibility);
    }

    function teardown() {
      window.removeEventListener("wheel", onSkip);
      window.removeEventListener("touchstart", onSkip);
      window.removeEventListener("pointerdown", onSkip);
      window.removeEventListener("scroll", onSkip);
      window.removeEventListener("resize", onSkip);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("focusin", onSkip);
      document.removeEventListener("visibilitychange", onVisibility);
      timers.forEach(clearTimeout);
      timers.clear();
    }

    /* --- Should this run at all? ------------------------------------------
       The boot script has already settled the storage and connection cases
       before first paint; we only read its verdict off the attribute, never
       storage itself, which is what keeps React's output invariant. */
    /* The media query is read directly rather than through framer's
       `useReducedMotion()`, which the rest of the codebase uses: that hook can
       still be reporting `null` when a mount effect runs, and this decision has
       to be definite the first time it's asked. The curtain is already hidden
       for these visitors by CSS; what's left is to release the page. */
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (
      html.dataset.preload === "done" ||
      reduceMotion ||
      /* Scroll was restored, so the hero isn't where we'd measure it. */
      window.scrollY > 8
    ) {
      setStage("done");
      return;
    }

    setStage("playing");
    listen();
    /* Last-resort release inside React. The one that matters is in the boot
       script, which survives this bundle failing to load at all. */
    timers.add(setTimeout(finish, 4500));

    const mono = root.querySelector<HTMLElement>("[data-stage-mono]");
    const signature = root.querySelector<HTMLElement>("[data-stage-signature]");
    if (!mono || !signature) {
      finish();
      return;
    }

    /* Where the monogram starts: centred in the viewport, large. It parks into
       its slot above the wordmark in beat 2. Nothing on this stage is text, so
       unlike the hero its layout can't shift under a font swap — one read here
       is safe. */
    const monoBox = mono.getBoundingClientRect();
    const rise = window.innerHeight / 2 - (monoBox.top + monoBox.height / 2);

    async function play() {
      const images = Array.from(root!.querySelectorAll("img"));
      /* Never deal a blank card — but never wait indefinitely either. */
      await Promise.race([
        Promise.all(images.map((image) => image.decode().catch(() => {}))),
        new Promise((resolve) => {
          const id = setTimeout(resolve, 600);
          timers.add(id);
        }),
      ]);
      if (finished) return;

      animate(mono!, { y: rise, scale: MONO_BIG * 0.94 }, { duration: 0 });

      await track(
        animate([
          /* 1 — the mark writes itself in. */
          [
            "[data-stage-wipe]",
            { clipPath: [WIPE_HIDDEN, WIPE_VISIBLE] },
            { duration: t(0.8), ease: EASE_ENTER, at: t(0.1) },
          ],
          [
            "[data-stage-mono]",
            { opacity: [0, 1] },
            { duration: t(0.2), ease: "linear", at: t(0.1) },
          ],
          [
            "[data-stage-mono]",
            { scale: [MONO_BIG * 0.94, MONO_BIG] },
            { duration: t(0.8), ease: EASE_ENTER, at: t(0.1) },
          ],

          /* A held beat. The silence is what makes the next move read as a
             resolve rather than just the next thing to happen. */

          /* 2 — it parks, and the name resolves beneath it. */
          [
            "[data-stage-mono]",
            { y: [rise, 0], scale: [MONO_BIG, 1] },
            { duration: t(0.45), ease: EASE_FLIGHT, at: t(0.98) },
          ],
          [
            "[data-sig='nakeba']",
            {
              opacity: [0, 1],
              y: [24, 0],
              clipPath: ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
            },
            { duration: t(0.7), ease: EASE_ENTER, at: t(1.05) },
          ],
          [
            "[data-sig='mason']",
            {
              opacity: [0, 1],
              y: [24, 0],
              clipPath: ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
            },
            { duration: t(0.7), ease: EASE_ENTER, at: t(1.17) },
          ],

          /* 3 — the deck deals in, back card first so the photo lands on top.
             It comes to rest squared, which is precisely the pose the real deck
             is holding underneath and the first keyframe of its shuffle. */
          [
            "[data-stage-card='0']",
            { opacity: [0, 1], y: ["42%", "0%"], rotate: [-14, 0], scale: [0.9, 1] },
            { duration: t(0.55), ease: EASE_SETTLE, at: t(1.42) },
          ],
          [
            "[data-stage-card='1']",
            { opacity: [0, 1], y: ["42%", "0%"], rotate: [11, 0], scale: [0.9, 1] },
            { duration: t(0.55), ease: EASE_SETTLE, at: t(1.5) },
          ],
          [
            "[data-stage-card='2']",
            { opacity: [0, 1], y: ["42%", "0%"], rotate: [-6, 0], scale: [0.9, 1] },
            { duration: t(0.55), ease: EASE_SETTLE, at: t(1.58) },
          ],
        ]),
      );
      if (finished) return;

      /* 4 — the handoff. Measured now rather than up front: by this point the
         font has swapped and the hero's column has settled, so the target is
         where it will actually be. Every read happens before any write. */
      const target = {
        signature: document
          .querySelector('[data-flip-target="hero-signature"]')
          ?.getBoundingClientRect(),
        logo: document
          .querySelector('[data-flip-target="header-logo"]')
          ?.getBoundingClientRect(),
      };
      const source = {
        signature: signature!.getBoundingClientRect(),
        logo: mono!.getBoundingClientRect(),
      };
      if (!target.signature || !target.logo) {
        finish();
        return;
      }

      const toSignature = flip(source.signature, target.signature);
      const toLogo = flip(source.logo, target.logo);

      /* Hand the page back at 82% of the flight: its own deck picks up the
         shuffle while the clones are still settling, so the entrance dissolves
         into the page's motion instead of stopping. */
      track(
        animate(0, 1, {
          duration: t(0.47),
          ease: "linear",
          onComplete: () => setStage("handoff"),
        }),
      );

      await track(
        animate([
          /* The ground goes first and fastest — the real page is revealed
             while the clones are still in the air. */
          [
            "[data-ground]",
            { opacity: [1, 0] },
            { duration: t(0.45), ease: EASE_ENTER, at: 0 },
          ],
          [
            "[data-stage-signature]",
            toSignature,
            { duration: t(0.58), ease: EASE_FLIGHT, at: 0 },
          ],
          /* The two rear photos dissolve into the flat colour already beneath
             them, so the deck lands as the hero's own — one photo, two colour
             cards — without anything being swapped out. */
          [
            "[data-stage-photo='fade']",
            { opacity: [1, 0] },
            { duration: t(0.35), ease: "linear", at: 0 },
          ],
          /* A beat behind the wordmark, which reads as it being released. */
          [
            "[data-stage-mono]",
            toLogo,
            { duration: t(0.6), ease: EASE_FLIGHT, at: t(0.04) },
          ],
        ]),
      );
      if (finished) return;

      /* The clones are sitting on pixels identical to themselves; this only
         covers sub-pixel rounding. */
      await track(
        animate(
          "[data-stage]",
          { opacity: 0 },
          { duration: t(0.1), ease: "linear" },
        ),
      );
      finish();
    }

    play().catch(finish);

    return () => {
      teardown();
      running.forEach((control) => control.stop());
      running.clear();
    };
    /* Mount only. `animate` and `scope` are stable across renders, and the
       sequence must not restart when the stage changes. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (stage === "done") return null;

  return (
    <div
      ref={scope}
      data-preloader
      aria-hidden="true"
      role="presentation"
      className="fixed inset-0 z-100"
    >
      {/* The ground keeps its pointer events so it can swallow the tap that
          skips — and, on iOS, the gesture that `overflow: hidden` on <html>
          doesn't reliably stop. */}
      <div
        data-ground
        className="absolute inset-0 touch-none overscroll-none bg-brand-white"
      />

      <div
        data-stage
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6"
      >
        <div
          data-stage-mono
          style={CENTRE_ORIGIN}
          className="mb-[2.5vh] w-[min(22vw,7rem)] text-brand-ink"
        >
          {/* Split from the transform above so the wipe and the flight never
              contend for the same property. */}
          <div data-stage-wipe>
            <Monogram className="h-auto w-full" />
          </div>
        </div>

        <SignatureComposition
          data-stage-signature
          style={CENTRE_ORIGIN}
          className="max-w-[min(86vw,48rem)]"
        >
          <StageCards />
        </SignatureComposition>
      </div>
    </div>
  );
}
