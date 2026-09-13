"use client";

import Image from "next/image";
import { useState } from "react";
import type { HomePage } from "@/sanity/content/types";
import { CtaButton } from "./cta-button";
import { Parallax } from "./parallax";
import { Reveal } from "./reveal";

export function Plate({
  content,
  bookingUrl,
}: {
  content: HomePage["plate"];
  bookingUrl: string;
}) {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="what-i-take-off-your-plate"
      aria-labelledby="plate-title"
      className="scroll-mt-20 bg-brand-ink text-brand-white"
    >
      <div className="mx-auto w-full max-w-380 px-6 py-24 md:px-10 md:py-32 lg:px-14 lg:py-40">
        <h2 id="plate-title" className="text-[15px] font-bold tracking-[0.01em]">
          {content.title}
        </h2>

        <div className="mt-12 grid gap-x-10 gap-y-16 lg:mt-16 lg:grid-cols-12">
          {/* Left rail */}
          <Reveal className="lg:col-span-3">
            <div className="relative aspect-8/7 overflow-hidden rounded-md bg-brand-night">
              <Parallax distance={22} className="absolute -inset-8">
                <Image
                  src={content.photo.src}
                  alt={content.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: content.photo.position }}
                />
              </Parallax>
            </div>

            <p className="mt-6 text-[15px] leading-relaxed">{content.intro}</p>

            <CtaButton href={bookingUrl} variant="light" className="mt-8">
              {content.ctaLabel}
            </CtaButton>
          </Reveal>

          {/* Disclosure list — the rows draw in one by one, so the list reads
              as a tally of what's being handed over. */}
          <dl className="lg:col-span-6 lg:col-start-7">
            {content.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <Reveal
                  key={i}
                  delay={i * 0.06}
                  distance={16}
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
                </Reveal>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
