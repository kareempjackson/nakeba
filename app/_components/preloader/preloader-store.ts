"use client";

import { useSyncExternalStore } from "react";

/**
 * Where the entrance sequence is up to.
 *
 * - `armed`    — nothing has run yet. The server renders this, and so does the
 *                client's first render, which is what keeps hydration clean.
 * - `playing`  — the curtain is up and the sequence is running.
 * - `handoff`  — the clones are landing; the page has been handed back its own
 *                animations and its scroll.
 * - `done`     — the overlay is gone.
 *
 * Deliberately a module singleton rather than context: the page's server
 * components don't have to be wrapped in a provider, `HeroCardStack` can
 * subscribe without being a React descendant of the preloader, and only the
 * components that actually read it re-render.
 */
export type Stage = "armed" | "playing" | "handoff" | "done";

let stage: Stage = "armed";
const listeners = new Set<() => void>();

export function getStage() {
  return stage;
}

export function setStage(next: Stage) {
  if (stage === next) return;
  stage = next;
  /*
    Mirror onto `<html>` so stylesheets can key off the same truth — the scroll
    lock and the curtain's visibility are CSS, not React. `armed` maps to
    `playing` because the attribute's job is "is the curtain up", and it starts
    up: the boot script in `<head>` sets it to `done` before first paint if the
    intro isn't going to run at all.
  */
  document.documentElement.dataset.preload = next === "armed" ? "playing" : next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const getServerSnapshot = () => "armed" as const;

export function usePreloaderStage() {
  return useSyncExternalStore(subscribe, getStage, getServerSnapshot);
}

/**
 * True once the page owns its own animations again — i.e. anything that would
 * otherwise have played, wasted, behind the curtain should start now.
 *
 * When there is no intro (reduced motion, already seen this session, no JS)
 * this is true on the first committed frame, because the preloader flips the
 * store in a layout effect, which React flushes before paint.
 */
export function useCurtainLifted() {
  const current = usePreloaderStage();
  return current === "handoff" || current === "done";
}
