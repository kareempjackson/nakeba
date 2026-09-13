import type { SiteSettings } from "@/sanity/content/types";
import { CtaButton } from "./cta-button";

/** The closing summary. It deliberately mirrors the hero in the designs. */
export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <section
      aria-label="Summary"
      className="overflow-hidden bg-brand-surface"
    >
      <div className="mx-auto w-full max-w-380 px-6 pt-20 md:px-10 md:pt-28 lg:px-14">
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
          <ul className="space-y-1.5 text-[15px] leading-relaxed lg:col-span-3 lg:col-start-2">
            {settings.capabilities.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <div className="lg:col-span-3 lg:col-start-10">
            <p className="max-w-xs text-[17px] leading-relaxed">
              {settings.pitch}
            </p>
            <CtaButton href={settings.bookingUrl} className="mt-8">
              {settings.footer.summaryCtaLabel}
            </CtaButton>
          </div>
        </div>
      </div>

      {/* The full name set enormous and bled off both edges. Decorative — the
          readable name is in the header logo. */}
      <div aria-hidden className="mt-16 overflow-hidden select-none lg:mt-24">
        <span className="mb-[-1.5%] block translate-x-[-1.5%] text-[clamp(5rem,22vw,28rem)] leading-[0.75] font-bold tracking-display whitespace-nowrap">
          {settings.name}
        </span>
      </div>
    </section>
  );
}
