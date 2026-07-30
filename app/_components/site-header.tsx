"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "The Problem", href: "#the-problem" },
  { label: "Approach", href: "#approach" },
  { label: "My Offer", href: "#my-offer" },
  { label: "About Me", href: "#about-me" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  // The design marks the current section with a filled dot.
  const [current, setCurrent] = useState(NAV_LINKS[0].href);

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
      const line = (headerRef.current?.offsetHeight ?? 0) + 1;
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
    <header ref={headerRef} className="sticky top-0 z-50 bg-brand-white">
      <div className="mx-auto flex w-full max-w-380 items-center justify-between gap-8 px-6 py-5 md:px-10 lg:px-14">
        <a href="#home" aria-label="Nakeba Mason — home" className="shrink-0">
          <Image
            src="/logo/header-logo.svg"
            alt="Nakeba Mason"
            width={75}
            height={30}
            unoptimized
            priority
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

      {/* Mobile panel */}
      <nav
        id="mobile-nav"
        aria-label="Main"
        hidden={!open}
        className="border-t border-brand-line px-6 pb-6 md:px-10 lg:hidden"
      >
        <ul className="flex flex-col">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={link.href === current ? "page" : undefined}
                className="flex items-center gap-2.5 border-b border-brand-line py-4 text-base last:border-0"
              >
                <span
                  aria-hidden
                  className={`size-2 shrink-0 rounded-full bg-brand-ink transition-opacity ${
                    link.href === current ? "opacity-100" : "opacity-0"
                  }`}
                />
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
