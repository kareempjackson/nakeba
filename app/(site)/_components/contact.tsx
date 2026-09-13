import Image from "next/image";
import type { HomePage } from "@/sanity/content/types";
import { CtaButton } from "./cta-button";
import { Parallax } from "./parallax";
import { Reveal } from "./reveal";

export function Contact({
  content,
  bookingUrl,
}: {
  content: HomePage["contact"];
  bookingUrl: string;
}) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-20 bg-brand-white"
    >
      <div className="mx-auto w-full max-w-380 px-6 py-24 md:px-10 md:py-32 lg:px-14 lg:py-40">
        <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
          <h2
            id="contact-title"
            className="text-[clamp(2.25rem,4.7vw,5.5rem)] leading-[1.1] font-bold tracking-display lg:col-span-8 lg:max-w-3xl"
          >
            {content.headline}
          </h2>

          <Reveal delay={0.15} className="lg:col-span-3 lg:col-start-10 lg:mt-36">
            <p className="text-[17px] leading-relaxed text-brand-muted">
              {content.body}
            </p>

            <CtaButton href={bookingUrl} className="mt-8">
              {content.ctaLabel}
            </CtaButton>
          </Reveal>
        </div>

        {/* Full-width closing portrait, treated black and white. The drift is
            the largest on the page — the last image, and the one the reader
            arrives at slowest. */}
        <div className="relative mt-16 aspect-4/3 overflow-hidden bg-brand-surface lg:mt-24">
          <Parallax distance={44} className="absolute -inset-12">
            <Image
              src={content.photo.src}
              alt={content.photo.alt}
              fill
              sizes="100vw"
              className="object-cover grayscale"
              style={{ objectPosition: content.photo.position }}
            />
          </Parallax>
        </div>
      </div>
    </section>
  );
}
