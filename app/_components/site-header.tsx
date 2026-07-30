"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ScrollProgress } from "./scroll-progress";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "The Problem", href: "#the-problem" },
  { label: "Approach", href: "#approach" },
  { label: "My Offer", href: "#my-offer" },
  { label: "About Me", href: "#about-me" },
];

/**
 * Foot of the mobile menu. Add profile URLs and these render as links instead
 * of plain labels — the same arrangement the site footer uses.
 */
const SOCIALS = [{ label: "LI", href: "" }];

/** The braces are set off from the label and lighter than it. */
const BRACE = "text-brand-ink/30";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  // Measured on the bar, not the header: with the mobile panel open the header
  // is as tall as the screen, which would throw the section line off.
  const barRef = useRef<HTMLDivElement>(null);
  // The design marks the current section with a filled dot.
  const [current, setCurrent] = useState(NAV_LINKS[0].href);

  useEffect(() => {
    if (!open) return;

    // The panel covers the screen, so the page behind it holds still — and
    // Escape closes it, the way any full-screen overlay should.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    /*
      The reader is "in" the last nav section whose top has passed under the
      sticky header. Sections that aren't in the nav (The Result, Plate, the
      closing sections) therefore keep the preceding nav item marked, and short
      sections still register — both of which an IntersectionObserver on
      "mostly visible" would get wrong.
    */
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = (barRef.current?.offsetHeight ?? 0) + 1;
      let active = NAV_LINKS[0].href;
      for (const link of NAV_LINKS) {
        const top = document
          .querySelector(link.href)
          ?.getBoundingClientRect().top;
        if (top !== undefined && top <= line) active = link.href;
      }
      setCurrent(active);
    };

    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-brand-white">
      <ScrollProgress />
      <div
        ref={barRef}
        className="mx-auto flex w-full max-w-380 items-center justify-between gap-8 px-6 py-5 md:px-10 lg:px-14"
      >
        <a href="#home" aria-label="Nakeba Mason — home" className="shrink-0">
          {/* `data-flip-target` is where the entrance sequence lands its
              monogram. On the image, not the link: the <a> is inline, so its
              box picks up line-height leading and wouldn't match. */}
          <Image
            src="/logo/header-logo.svg"
            alt="Nakeba Mason"
            width={75}
            height={30}
            unoptimized
            priority
            data-flip-target="header-logo"
            className="h-9 w-auto md:h-11"
          />
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-10 xl:gap-16">
            {NAV_LINKS.map((link) => {
              const isCurrent = link.href === current;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isCurrent ? "page" : undefined}
                    className="group flex items-center gap-2.5 text-[15px] transition-opacity hover:opacity-60"
                  >
                    {/* Always rendered, so the labels hold still as the
                        marker moves between them. */}
                    <span
                      aria-hidden
                      className={`size-2 shrink-0 rounded-full bg-brand-ink transition-opacity ${
                        isCurrent ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="-mr-2 flex items-center gap-2 rounded-sm px-2 py-2 text-[15px] lg:hidden"
        >
          <span className="flex flex-col gap-1.25" aria-hidden>
            <span
              className={`block h-px w-5 bg-brand-ink transition-transform ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-brand-ink transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-brand-ink transition-transform ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
          <span className="sr-only">
            {open ? "Close menu" : "Open menu"}
          </span>
        </button>
      </div>

      {/*
        Mobile panel: fills the screen under the bar, so the menu is the whole
        view rather than a tray over the page. Display is toggled by class, not
        the `hidden` attribute — a display utility would override it.
      */}
      <nav
        id="mobile-nav"
        aria-label="Main"
        className={`h-[calc(100svh-4.75rem)] flex-col justify-between overflow-y-auto bg-brand-canvas px-6 pt-12 pb-12 md:h-[calc(100svh-5.25rem)] md:px-10 lg:hidden ${
          open ? "flex" : "hidden"
        }`}
      >
        <ul className="flex flex-col gap-14">
          {NAV_LINKS.map((link) => {
            const isCurrent = link.href === current;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isCurrent ? "page" : undefined}
                  className="inline-flex items-center gap-5 text-[13px] tracking-eyebrow transition-opacity hover:opacity-60"
                >
                  {/* The braces carry the current-section marker here: full ink
                      on the section being read, faint on the rest. */}
                  <span aria-hidden className={isCurrent ? undefined : BRACE}>
                    &#123;
                  </span>
                  {link.label}
                  <span aria-hidden className={isCurrent ? undefined : BRACE}>
                    &#125;
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <ul className="flex flex-wrap items-center gap-x-12 gap-y-4 text-[13px] tracking-eyebrow">
          {SOCIALS.map((social) => (
            <li key={social.label} className="inline-flex items-center gap-2.5">
              <span aria-hidden className={BRACE}>
                &#123;
              </span>
              {social.href ? (
                <a
                  href={social.href}
                  className="transition-opacity hover:opacity-60"
                >
                  {social.label}
                </a>
              ) : (
                social.label
              )}
              <span aria-hidden className={BRACE}>
                &#125;
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
