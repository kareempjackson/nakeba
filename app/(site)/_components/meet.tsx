import Image from "next/image";
import type { HomePage } from "@/sanity/content/types";
import { CtaButton } from "./cta-button";
import { Parallax } from "./parallax";
import { Reveal } from "./reveal";

export function Meet({
  content,
  bookingUrl,
}: {
  content: HomePage["meet"];
  bookingUrl: string;
}) {
  return (
    <section
      id="about-me"
      aria-labelledby="about-me-title"
      className="scroll-mt-20 bg-brand-white"
    >
      <div className="mx-auto w-full max-w-380 px-6 py-24 md:px-10 md:py-32 lg:px-14 lg:py-40">
        <div className="relative">
          <p className="mb-6 text-[15px] lg:absolute lg:top-[0.6em] lg:left-0 lg:mb-0">
            [ {content.eyebrow} ]
          </p>

          <h2
            id="about-me-title"
            className="text-[clamp(2.25rem,4.7vw,5.5rem)] leading-[1.1] font-bold tracking-display lg:indent-[18%]"
          >
            {content.headline}
          </h2>
        </div>

        <div className="mt-20 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:mt-32 lg:grid-cols-12">
          <Reveal className="relative aspect-3/4 overflow-hidden rounded-md bg-brand-surface md:col-span-1 lg:col-span-2">
            <Parallax distance={24} className="absolute -inset-8">
              <Image
                src={content.photo.src}
                alt={content.photo.alt}
                fill
                sizes="(min-width: 1024px) 17vw, (min-width: 768px) 45vw, 100vw"
                className="object-cover"
                style={{ objectPosition: content.photo.position }}
              />
            </Parallax>
          </Reveal>

          {/* The career, in one telling — it used to run across both columns
              as two halves of the same thought. */}
          <Reveal delay={0.12} className="lg:col-span-3 lg:col-start-4">
            <p className="text-[15px] leading-relaxed">{content.career}</p>

            <CtaButton href={bookingUrl} className="mt-12 lg:mt-20">
              {content.ctaLabel}
            </CtaButton>
          </Reveal>

          <Reveal
            as="p"
            delay={0.24}
            className="text-[15px] leading-relaxed lg:col-span-3 lg:col-start-8"
          >
            {content.trust}
          </Reveal>

          <p className="text-[15px] lg:col-start-12 lg:justify-self-end">
            {content.stamp}
          </p>
        </div>
      </div>
    </section>
  );
}
