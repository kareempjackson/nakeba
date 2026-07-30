const EMAIL = "hello@nakebamason.com";

/**
 * NOTE: these labels come from the comp but don't match the site's own IA, and
 * they speak as "our" where the rest of the page speaks as "I". Mapped to the
 * nearest real sections for now — worth reconciling.
 */
const LINKS = [
  { label: "Our Work", href: "#by-the-numbers" },
  { label: "Services", href: "#what-i-take-off-your-plate" },
  { label: "Contact", href: "#contact" },
];

/** Add profile URLs and these render as links instead of plain labels. */
const SOCIALS = [
  {
    label: "LI",
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/nakeba-mason/",
  },
];

const BRACE = "text-[13px] tracking-[0.12em] uppercase";

export function ContactFooter() {
  return (
    <footer className="sticky bottom-0 z-0 bg-brand-ink text-brand-white">
      <div className="flex min-h-112 flex-col gap-8 overflow-hidden px-6 py-8 md:min-h-136 md:justify-between md:gap-12 md:px-8">
        {/*
          Top row on desktop; on mobile it dissolves (`display: contents`) so
          its two children become rows of the column below and can be reordered
          against the address: links, then "Send a message" directly above the
          address it belongs to. With the nav in between, that label read as a
          stray link rather than as the address's own.

          Every child of the column carries an explicit `order-*` for that
          reason — anything left at the default would sort ahead of all of them.
          `md:order-0` puts them all back on equal footing, where source order
          decides and the top row reassembles itself.
        */}
        <div className="contents md:flex md:flex-wrap md:items-start md:justify-between md:gap-x-8 md:gap-y-6">
          {/* Opens the reader's mail client, same as the address below it. */}
          <a
            href={`mailto:${EMAIL}`}
            className="order-2 text-[15px] font-bold transition-opacity hover:opacity-60 md:order-0"
          >
            Send a message
          </a>

          <nav aria-label="Footer" className="order-1 md:order-0">
            {/* Stacked on mobile: three braced links wrap two-then-one at phone
                widths, which reads as a mistake rather than a row. */}
            <ul className="flex flex-col gap-y-3 md:flex-row md:flex-wrap md:items-center md:gap-x-8 lg:gap-x-14">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`${BRACE} transition-opacity hover:opacity-60`}
                  >
                    <span aria-hidden className="mr-3 inline-block">
                      &#123;
                    </span>
                    {link.label}
                    <span aria-hidden className="ml-3 inline-block">
                      &#125;
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* The address, set as the loudest thing on the page. Pulled up under
            its label on mobile so the two read as one block. */}
        <a
          href={`mailto:${EMAIL}`}
          /* The address is far too long to set inside the cursor's disc. */
          data-cursor-label="Email"
          className="order-3 -mt-4 block text-[clamp(2.25rem,9vw,10rem)] leading-[0.85] font-bold tracking-[-0.055em] break-all uppercase transition-opacity hover:opacity-70 md:order-0 md:mt-0"
        >
          <span className="block">Hello@</span>
          <span className="block">nakebamason.com</span>
        </a>

        {/* Bottom block — copyright + socials, then the studio credit under
            the rule. Kept as one child so the column above still distributes
            as three rows. The year is stamped at build time, so it advances
            with the next deploy rather than sitting frozen in the markup. */}
        <div className="order-4 md:order-0">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
            {/* Sized to hold one line rather than wrapping mid-sentence. The
                clamp is what makes that a guarantee instead of a guess: the
                line is a fixed 41 characters, so tying the size to the viewport
                keeps it fitting from a 320px phone up to where it reaches the
                13px the rest of this row is set in. */}
            <p className="text-[clamp(0.5rem,2.9vw,0.8125rem)] tracking-[0.08em] whitespace-nowrap uppercase md:tracking-[0.12em]">
              &copy; {new Date().getFullYear()} Nakeba Mason. All rights
              reserved.
            </p>

            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 lg:gap-x-12">
              {SOCIALS.map((social) => (
                <li key={social.label} className={BRACE}>
                  <span aria-hidden className="mr-2.5 inline-block">
                    &#123;
                  </span>
                  {social.href ? (
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      // The two-letter label is the design; the full name is
                      // what a screen reader announces.
                      aria-label={social.name}
                      className="transition-opacity hover:opacity-60"
                    >
                      {social.label}
                    </a>
                  ) : (
                    social.label
                  )}
                  <span aria-hidden className="ml-2.5 inline-block">
                    &#125;
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 text-[11px] tracking-[0.12em] text-brand-white/60 uppercase">
            Design by{" "}
            <a
              href="https://ghostsavvy.com"
              target="_blank"
              rel="noreferrer"
              className="normal-case transition-colors hover:text-brand-white"
            >
              Ghost Savvy Studios
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
