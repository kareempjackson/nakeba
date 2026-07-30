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
const SOCIALS = [{ label: "LI", href: "" }];

const BRACE = "text-[13px] tracking-[0.12em] uppercase";

export function ContactFooter() {
  return (
    <footer className="sticky bottom-0 z-0 bg-brand-ink text-brand-white">
      <div className="flex min-h-112 flex-col justify-between gap-12 overflow-hidden px-6 py-8 md:min-h-136 md:px-8">
        {/* Top row */}
        <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-6">
          <p className="text-[15px] font-bold">Send a message</p>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 lg:gap-x-14">
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

        {/* The address, set as the loudest thing on the page */}
        <a
          href={`mailto:${EMAIL}`}
          className="block text-[clamp(2.25rem,9vw,10rem)] leading-[0.85] font-bold tracking-[-0.055em] break-all uppercase transition-opacity hover:opacity-70"
        >
          <span className="block">Hello@</span>
          <span className="block">nakebamason.com</span>
        </a>

        {/* Bottom block — copyright + socials, then the studio credit under
            the rule. Kept as one child so the column above still distributes
            as three rows. The year is stamped at build time, so it advances
            with the next deploy rather than sitting frozen in the markup. */}
        <div>
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
            <p className={BRACE}>
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
