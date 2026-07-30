"use client";

import Image from "next/image";
import { useState } from "react";
import { CtaButton } from "./cta-button";

/** Placeholder for now — swap for the final art-directed crop. */
const PORTRAIT = "/images/30532.jpg";

/**
 * Only the first item's copy appears in the source comp. The remaining five
 * bodies are written to match the established voice and are PLACEHOLDER —
 * replace with the real copy.
 */
const ITEMS = [
  {
    title: "Client communication",
    body: "Requests, follow-ups, and approvals tracked and handled, so nothing sits unanswered.",
  },
  {
    title: "Team coordination",
    body: "Your team knows what they're working on and when it's due, without you having to chase or repeat yourself.",
  },
  {
    title: "Project visibility",
    body: "One clear view of everything in motion, so you always know what's moving, what's waiting, and what's next.",
  },
  {
    title: "Systems that hold",
    body: "Workflows and documentation built around the way you already work, so the structure survives a busy month.",
  },
  {
    title: "Meetings & priorities",
    body: "Agendas set, notes captured, decisions tracked — and the week's priorities agreed before it starts.",
  },
  {
    title: "A thinking partner",
    body: "Someone to pressure-test decisions with, who already understands the business and what it's working within.",
  },
];

export function Plate() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="what-i-take-off-your-plate"
      aria-labelledby="plate-title"
      className="scroll-mt-20 bg-brand-ink text-brand-white"
    >
      <div className="mx-auto w-full max-w-380 px-6 py-24 md:px-10 md:py-32 lg:px-14 lg:py-40">
        <h2 id="plate-title" className="text-[15px] font-bold tracking-[0.01em]">
          What I Take Off Your Plate
        </h2>

        <div className="mt-12 grid gap-x-10 gap-y-16 lg:mt-16 lg:grid-cols-12">
          {/* Left rail */}
          <div className="lg:col-span-3">
            <div className="relative aspect-8/7 overflow-hidden rounded-md bg-brand-night">
              <Image
                src={PORTRAIT}
                alt="Nakeba Mason"
                fill
                sizes="(min-width: 1024px) 25vw, 100vw"
                className="object-cover"
              />
            </div>

            <p className="mt-6 text-[15px] leading-relaxed">
              That career began in 2020, mid-pandemic, while I was two years
              into a psychology degree — which turned out to be the right
              training for work that is, at its core, about understanding people
              and how they move.
            </p>

            <CtaButton href="#contact" variant="light" className="mt-8">
              Start a project
            </CtaButton>
          </div>

          {/* Disclosure list */}
          <dl className="lg:col-span-6 lg:col-start-7">
            {ITEMS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={item.title}
                  className="border-t border-brand-white/15 last:border-b"
                >
                  <dt>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      aria-controls={`plate-panel-${i}`}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="text-xl md:text-2xl">{item.title}</span>

                      {/* Plus that becomes a minus */}
                      <span
                        aria-hidden
                        className="relative size-4 shrink-0 opacity-70"
                      >
                        <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-brand-white" />
                        <span
                          className={`absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-brand-white transition-transform duration-200 ${
                            isOpen ? "scale-y-0" : "scale-y-100"
                          }`}
                        />
                      </span>
                    </button>
                  </dt>

                  <dd
                    id={`plate-panel-${i}`}
                    hidden={!isOpen}
                    className="max-w-prose pb-8 text-[17px] leading-relaxed text-brand-night-muted"
                  >
                    {item.body}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
