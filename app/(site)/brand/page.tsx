import type { Metadata } from "next";
import Image from "next/image";
import {
  CORE_PALETTE,
  DEEP_TINTS,
  NEUTRALS,
  PHOTOGRAPHY,
  SECTIONS,
  SOFT_TINTS,
  TYPE_SCALE,
  WEIGHTS,
} from "./brand-data";
import { Mono, Rule, Section, SubHead } from "./_components/primitives";
import { Chip, SwatchCard } from "./_components/swatches";

export const metadata: Metadata = {
  title: "Brand Guide",
  description:
    "Logo, colour, typography and photography standards for the Nakeba Mason identity.",
  // An internal reference, not a marketing page — kept out of search results.
  robots: { index: false, follow: false },
  alternates: { canonical: "/brand" },
};

const LOCKUP = "/logo/main%20logo/Nakeba%20Logo.svg";
const WORDMARK_NAKEBA = "/logo/main%20logo/Nakeba%20Logo%20part.svg";
const WORDMARK_MASON = "/logo/main%20logo/mason%20logo%20part.svg";
const MONOGRAM_GRADIENT = "/logo/nm-monogram-gradient.png";
const MONOGRAM_LIGHT = "/logo/nm-monogram-light.png";
const HEADER_LOGO = "/logo/header-logo.svg";

export default function BrandPage() {
  return (
    <div className="bg-brand-canvas text-brand-ink">
      <SkipLink />
      <TopBar />

      <main id="content">
        <Hero />

        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <LogoSection />
          <ColourSection />
          <TypographySection />
          <PhotographySection />
          <TokensSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function SkipLink() {
  return (
    <a
      href="#content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-ink focus:px-4 focus:py-2 focus:text-sm focus:text-brand-white"
    >
      Skip to content
    </a>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-line bg-brand-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-3 md:px-10">
        <a href="#content" className="flex items-center gap-3">
          <Image
            src={HEADER_LOGO}
            alt="Nakeba Mason"
            width={75}
            height={30}
            unoptimized
            priority
            className="h-7.5 w-auto"
          />
          <span
            aria-hidden
            className="hidden h-5 w-px bg-brand-line sm:block"
          />
          <span className="hidden text-xs text-brand-muted sm:inline">
            Brand Guide
          </span>
        </a>

        <nav aria-label="Brand guide sections">
          <ul className="flex items-center gap-1 text-xs md:gap-2">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="rounded-full px-2.5 py-1.5 text-brand-muted transition-colors hover:bg-brand-ink hover:text-brand-white md:px-3"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pt-16 pb-20 md:px-10 md:pt-24 md:pb-28">
      <p className="eyebrow text-brand-muted">Brand Overview</p>

      <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.95] tracking-display">
        Fresh, creative
        <br />
        and approachable.
      </h1>

      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-brand-muted">
        The Nakeba Mason identity blends soft blues, blush pink, warm peach and
        buttery yellow with clean off-white neutrals and the bold black
        signature — bringing balance, warmth and a modern sense of elegance to
        the brand.
      </p>

      {/* The lockup, presented on the signature gradient. */}
      <div className="brand-gradient mt-14 rounded-2xl p-2">
        <div className="flex items-center justify-center rounded-xl bg-brand-canvas px-8 py-16 md:py-24">
          <Image
            src={LOCKUP}
            alt="Nakeba Mason signature logo"
            width={521}
            height={225}
            unoptimized
            priority
            className="h-auto w-full max-w-md"
          />
        </div>
      </div>

      {/* Palette ribbon, echoing the layout on p.11 of the brand overview. */}
      <div className="mt-4 flex h-12 overflow-hidden rounded-lg" aria-hidden>
        {CORE_PALETTE.map((c) => (
          <div
            key={c.hex}
            style={{ backgroundColor: c.hex }}
            className="flex-1"
          />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function LogoSection() {
  return (
    <Section
      id="logo"
      index="01"
      title="Logo"
      intro="The signature is the brand. It is drawn, not typeset — always place the supplied artwork rather than recreating it in a script font."
    >
      <SubHead aside="521 × 225">Primary lockup</SubHead>
      <div className="flex items-center justify-center rounded-xl border border-brand-line bg-brand-white px-8 py-14">
        <Image
          src={LOCKUP}
          alt="Nakeba Mason primary lockup"
          width={521}
          height={225}
          unoptimized
          className="h-auto w-full max-w-sm"
        />
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div>
          <SubHead aside="523 × 126">Nakeba wordmark</SubHead>
          <div className="flex h-32 items-center justify-center rounded-xl border border-brand-line bg-brand-white px-6">
            <Image
              src={WORDMARK_NAKEBA}
              alt="Nakeba wordmark"
              width={523}
              height={126}
              unoptimized
              className="h-auto w-full max-w-[16rem]"
            />
          </div>
        </div>
        <div>
          <SubHead aside="522 × 90">Mason wordmark</SubHead>
          <div className="flex h-32 items-center justify-center rounded-xl border border-brand-line bg-brand-white px-6">
            <Image
              src={WORDMARK_MASON}
              alt="Mason wordmark"
              width={522}
              height={90}
              unoptimized
              className="h-auto w-full max-w-[16rem]"
            />
          </div>
        </div>
      </div>

      {/* Header mark */}
      <div className="mt-12">
        <SubHead aside="75 × 30">Header mark</SubHead>
        <div className="flex items-center justify-center rounded-xl border border-brand-line bg-brand-white px-8 py-14">
          <Image
            src={HEADER_LOGO}
            alt="Nakeba Mason header mark"
            width={75}
            height={30}
            unoptimized
            className="h-15 w-auto"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="text-xs text-brand-muted">Shown at 2× · actual size:</span>
          <Image
            src={HEADER_LOGO}
            alt=""
            width={75}
            height={30}
            unoptimized
            className="h-7.5 w-auto"
          />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-brand-muted">
          The untiled <em>Nm</em> monogram, drawn for navigation bars and other
          tight horizontal spaces where the full lockup would be illegible.
          Solid black, no container — set it directly on canvas or white and let
          the surrounding clear space do the framing. This is the mark used in
          the header of this page.
        </p>
      </div>

      {/* Monogram */}
      <div className="mt-12">
        <SubHead aside="App icon · favicon">Nm monogram, tiled</SubHead>
        <div className="grid gap-6 sm:grid-cols-2">
          <figure className="rounded-xl border border-brand-line bg-brand-white p-6">
            <Image
              src={MONOGRAM_GRADIENT}
              alt="Nm monogram, black on the signature gradient"
              width={640}
              height={640}
              className="mx-auto h-auto w-40 rounded-2xl"
            />
            <figcaption className="mt-4 text-center text-xs text-brand-muted">
              Primary — ink on gradient. Use wherever the icon sits on a light
              or neutral ground.
            </figcaption>
          </figure>
          <figure className="rounded-xl border border-brand-line bg-brand-ink p-6">
            <Image
              src={MONOGRAM_LIGHT}
              alt="Nm monogram, gradient on white"
              width={640}
              height={640}
              className="mx-auto h-auto w-40 rounded-2xl"
            />
            <figcaption className="mt-4 text-center text-xs text-brand-white/60">
              Alternate — gradient on white. For dark and photographic grounds.
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Clear space + minimum size */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div>
          <SubHead>Clear space</SubHead>
          <div className="rounded-xl border border-brand-line bg-brand-white p-4">
            <div className="rounded-lg border border-dashed border-brand-sky-deep/50 p-8">
              <Image
                src={LOCKUP}
                alt=""
                width={521}
                height={225}
                unoptimized
                className="h-auto w-full"
              />
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-brand-muted">
            Keep free space on all sides equal to the cap height of the{" "}
            <em>N</em>. Nothing — type, image edge or another mark — enters that
            margin.
          </p>
        </div>

        <div>
          <SubHead>Minimum size</SubHead>
          <div className="flex h-full flex-col justify-center gap-6 rounded-xl border border-brand-line bg-brand-white p-8">
            <div>
              <Image
                src={LOCKUP}
                alt=""
                width={521}
                height={225}
                unoptimized
                className="h-auto w-40"
              />
              <p className="mt-2 text-xs text-brand-muted">
                Lockup — 160px wide (digital) · 40mm (print)
              </p>
            </div>
            <div>
              <Image
                src={HEADER_LOGO}
                alt=""
                width={75}
                height={30}
                unoptimized
                className="h-7.5 w-auto"
              />
              <p className="mt-2 text-xs text-brand-muted">
                Header mark — 75 × 30px, its drawn size. Do not set smaller.
              </p>
            </div>
            <div>
              <Image
                src={MONOGRAM_GRADIENT}
                alt=""
                width={640}
                height={640}
                className="size-8 rounded-md"
              />
              <p className="mt-2 text-xs text-brand-muted">
                Tiled monogram — 32px (digital) · 10mm (print)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        <div>
          <SubHead>Do</SubHead>
          <ul className="space-y-3">
            <Rule kind="do">
              Place the signature in solid black on off-white, white or any of
              the five brand pastels.
            </Rule>
            <Rule kind="do">
              Reverse to white only on ink or on a dark, low-detail photograph.
            </Rule>
            <Rule kind="do">
              Scale proportionally, and always from the supplied vector.
            </Rule>
          </ul>
        </div>
        <div>
          <SubHead>Don&rsquo;t</SubHead>
          <ul className="space-y-3">
            <Rule kind="dont">
              Recolour the signature into a pastel — the black signature is a
              fixed brand asset.
            </Rule>
            <Rule kind="dont">
              Stretch, skew, rotate or add effects such as shadow, outline or
              glow.
            </Rule>
            <Rule kind="dont">
              Set the name in a substitute script face, or rebuild the lockup by
              spacing the two wordmarks by eye.
            </Rule>
            <Rule kind="dont">
              Place the mark over a busy area of an image where the strokes
              break up.
            </Rule>
          </ul>
        </div>
      </div>

      {/* Downloads */}
      <div className="mt-12">
        <SubHead>Files</SubHead>
        <ul className="grid gap-2 sm:grid-cols-2">
          {[
            { label: "Primary lockup (SVG)", href: LOCKUP },
            { label: "Header mark (SVG)", href: HEADER_LOGO },
            { label: "Nakeba wordmark (SVG)", href: WORDMARK_NAKEBA },
            { label: "Mason wordmark (SVG)", href: WORDMARK_MASON },
            {
              label: "Nm monogram, gradient tile (SVG)",
              href: "/logo/browser%20icon/Nm%20logo%20white.svg",
            },
            {
              label: "Nm monogram, light tile (SVG)",
              href: "/logo/browser%20icon/Nm%20logo%20black.svg",
            },
          ].map((f) => (
            <li key={f.href}>
              <a
                href={f.href}
                download
                className="flex items-center justify-between gap-3 rounded-lg border border-brand-line bg-brand-white px-4 py-3 text-sm transition-colors hover:border-brand-ink"
              >
                <span>{f.label}</span>
                <span aria-hidden className="text-brand-muted">
                  ↓
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function ColourSection() {
  return (
    <Section
      id="colour"
      index="02"
      title="Colour"
      intro="Soft blues, blush pink, warm peach and buttery yellow, paired with clean off-white neutrals and the bold black signature."
    >
      <SubHead aside="6 colours">Core palette</SubHead>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
        {CORE_PALETTE.map((s) => (
          <SwatchCard key={s.hex} swatch={s} />
        ))}
      </div>

      <div className="mt-12">
        <SubHead>Neutrals</SubHead>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
          {NEUTRALS.map((s) => (
            <SwatchCard key={s.hex} swatch={s} />
          ))}
        </div>
      </div>

      {/* Proportion guidance */}
      <div className="mt-12">
        <SubHead aside="Suggested">Proportion</SubHead>
        <div className="flex h-16 overflow-hidden rounded-lg ring-1 ring-inset ring-black/5">
          <div className="flex-70 bg-brand-canvas" />
          <div className="flex-12 bg-brand-ink" />
          <div className="flex-5 bg-brand-sky" />
          <div className="flex-5 bg-brand-periwinkle" />
          <div className="flex-3 bg-brand-blush" />
          <div className="flex-3 bg-brand-peach" />
          <div className="flex-2 bg-brand-butter" />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-brand-muted">
          Off-white carries most of the layout, black does the work of
          structure and type, and the pastels arrive as accent — a panel, a
          highlight, a fill behind an image. The palette reads as elegant when
          the colour is the smallest part of the page.
        </p>
      </div>

      {/* Derived scales */}
      <div className="mt-12">
        <SubHead aside="Derived — hue + white">Soft tints</SubHead>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
          {SOFT_TINTS.map((t) => (
            <Chip key={t.hex} {...t} />
          ))}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-brand-muted">
          For washes larger than roughly a quarter of the page, where the core
          hue becomes too present.
        </p>
      </div>

      <div className="mt-12">
        <SubHead aside="Derived — hue + black">Deep tints</SubHead>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
          {DEEP_TINTS.map((t) => (
            <Chip
              key={t.hex}
              hex={t.hex}
              name={t.name}
              token={t.token}
              meta={`${t.ratio.toFixed(2)}:1`}
            />
          ))}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-brand-muted">
          The pastels are far too light to carry small text. When type or an
          icon needs to be tinted rather than black, use these — each clears
          4.5:1 on the off-white canvas.
        </p>
      </div>

      {/* Accessibility */}
      <div className="mt-12">
        <SubHead aside="WCAG 2.1 AA">Legibility</SubHead>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-brand-line bg-brand-white p-5">
            <div className="mb-4 flex gap-1.5">
              {CORE_PALETTE.slice(0, 5).map((c) => (
                <div
                  key={c.hex}
                  style={{ backgroundColor: c.hex }}
                  className="flex h-16 flex-1 items-center justify-center rounded"
                >
                  <span className="text-sm font-bold text-brand-ink">Aa</span>
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold">Black on pastel — passes</p>
            <p className="mt-1 text-sm leading-relaxed text-brand-muted">
              Ink scores between 12.26:1 and 17.57:1 on the five accents. This
              is the brand&rsquo;s default pairing.
            </p>
          </div>

          <div className="rounded-xl border border-brand-line bg-brand-white p-5">
            <div className="mb-4 flex gap-1.5">
              {CORE_PALETTE.slice(0, 5).map((c) => (
                <div
                  key={c.hex}
                  style={{ backgroundColor: c.hex }}
                  className="flex h-16 flex-1 items-center justify-center rounded"
                >
                  <span className="text-sm font-bold text-white">Aa</span>
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold">White on pastel — fails</p>
            <p className="mt-1 text-sm leading-relaxed text-brand-muted">
              White reaches only 1.19:1 to 1.71:1 on the accents. Never set
              white type, icons or rules on a brand pastel.
            </p>
          </div>
        </div>

        <ul className="mt-6 space-y-3">
          <Rule kind="do">
            Body copy is ink on canvas (19.79:1), or muted ink for secondary
            copy (4.67:1).
          </Rule>
          <Rule kind="dont">
            Don&rsquo;t use a pastel as the only signal for state, error or
            meaning — pair it with text or an icon.
          </Rule>
          <Rule kind="dont">
            Don&rsquo;t place one pastel on another; at 1.1–1.4:1 the edge
            disappears. Separate them with canvas, white or ink.
          </Rule>
        </ul>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function TypographySection() {
  return (
    <Section
      id="type"
      index="03"
      title="Typography"
      intro="Host Grotesk carries the whole system — a clean geometric grotesque that stays quiet next to the signature."
    >
      <div className="rounded-xl border border-brand-line bg-brand-white p-6 md:p-10">
        <p className="eyebrow text-brand-muted">Typeface</p>
        <p className="mt-4 text-5xl font-bold tracking-display md:text-7xl">
          Host Grotesk
        </p>
        <p className="mt-6 text-sm text-brand-muted">
          6 weights · Light 300 → ExtraBold 800 · matching italics · self-hosted
        </p>
        <p className="mt-8 border-t border-brand-line pt-6 text-2xl leading-snug wrap-break-word">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
          <br />
          abcdefghijklmnopqrstuvwxyz
          <br />
          <span data-numeric>0123456789</span> &amp;.,:;?!&ldquo;&rdquo;&mdash;
        </p>
      </div>

      {/* Weights */}
      <div className="mt-12">
        <SubHead aside="Roman & italic">Weights</SubHead>
        <ul className="divide-y divide-brand-line">
          {WEIGHTS.map((w) => (
            <li
              key={w.weight}
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
            >
              <span className={`${w.className} text-2xl md:text-3xl`}>
                Balance, warmth, elegance
              </span>
              <span className="flex items-baseline gap-4 text-xs text-brand-muted">
                <span>{w.label}</span>
                <span data-numeric>{w.weight}</span>
                <em className={`${w.className} italic`}>Italic</em>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Scale */}
      <div className="mt-12">
        <SubHead aside="Fluid where noted">Type scale</SubHead>
        <ul className="divide-y divide-brand-line">
          {TYPE_SCALE.map((t) => (
            <li key={t.role} className="py-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="eyebrow text-brand-muted">{t.role}</span>
                <span className="text-xs text-brand-muted" data-numeric>
                  {t.spec}
                </span>
              </div>
              <p className={`mt-3 ${t.className}`}>{t.sample}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Rules */}
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        <div>
          <SubHead>Do</SubHead>
          <ul className="space-y-3">
            <Rule kind="do">
              Set display and headings tight — <Mono>-0.03em</Mono> tracking,
              leading at or below 1.1.
            </Rule>
            <Rule kind="do">
              Track eyebrows and small caps wide at <Mono>0.18em</Mono>.
            </Rule>
            <Rule kind="do">
              Hold body measure to roughly 60–75 characters.
            </Rule>
          </ul>
        </div>
        <div>
          <SubHead>Don&rsquo;t</SubHead>
          <ul className="space-y-3">
            <Rule kind="dont">
              Mix in a second typeface — the signature already supplies the
              expressive voice.
            </Rule>
            <Rule kind="dont">
              Set long passages in ExtraBold, or in all caps below 14px.
            </Rule>
            <Rule kind="dont">
              Use faux bold or faux italic; every weight has a real file.
            </Rule>
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function PhotographySection() {
  return (
    <Section
      id="photography"
      index="04"
      title="Photography"
      intro="High-key, editorial and calm — light backgrounds, clean styling and a single confident subject."
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {PHOTOGRAPHY.map((src, i) => (
          <div
            key={src}
            className="relative aspect-3/4 overflow-hidden rounded-lg bg-brand-surface"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover"
              priority={i < 2}
            />
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div>
          <SubHead>Direction</SubHead>
          <ul className="space-y-3">
            <Rule kind="do">
              Shoot on off-white and pale grounds so frames sit naturally next
              to the canvas neutral.
            </Rule>
            <Rule kind="do">
              Keep light soft and even, with shadow used for shape rather than
              drama.
            </Rule>
            <Rule kind="do">
              Leave negative space in frame for the signature or a headline.
            </Rule>
          </ul>
        </div>
        <div>
          <SubHead>Avoid</SubHead>
          <ul className="space-y-3">
            <Rule kind="dont">
              Heavy or warm filters that pull the neutrals off-white.
            </Rule>
            <Rule kind="dont">
              Saturated or competing backgrounds that fight the pastels.
            </Rule>
            <Rule kind="dont">
              Cluttered sets and busy props — the frame should feel considered.
            </Rule>
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function TokensSection() {
  const rows: { token: string; value: string; usage: string }[] = [
    ...CORE_PALETTE.map((c) => ({
      token: `--color-${c.token}`,
      value: c.hex,
      usage: `bg-${c.token}`,
    })),
    ...NEUTRALS.map((c) => ({
      token: `--color-${c.token}`,
      value: c.hex,
      usage: `bg-${c.token}`,
    })),
    {
      token: "--color-brand-muted",
      value: "#70706F",
      usage: "text-brand-muted",
    },
    { token: "--color-brand-line", value: "#E3E2E0", usage: "border-brand-line" },
    ...SOFT_TINTS.map((t) => ({
      token: `--color-${t.token}`,
      value: t.hex,
      usage: `bg-${t.token}`,
    })),
    ...DEEP_TINTS.map((t) => ({
      token: `--color-${t.token}`,
      value: t.hex,
      usage: `text-${t.token}`,
    })),
    {
      token: "--font-sans",
      value: "Host Grotesk",
      usage: "font-sans",
    },
    {
      token: "--tracking-display",
      value: "-0.03em",
      usage: "tracking-display",
    },
    {
      token: "--tracking-eyebrow",
      value: "0.18em",
      usage: "eyebrow",
    },
  ];

  return (
    <Section
      id="tokens"
      index="05"
      title="Tokens"
      intro="The guide is implemented as a Tailwind v4 theme in app/globals.css. Every value on this page reads from these tokens — change one there and the brand updates everywhere."
    >
      <SubHead aside={`${rows.length} tokens`}>Reference</SubHead>

      <div className="overflow-x-auto rounded-xl border border-brand-line bg-brand-white">
        <table className="w-full min-w-136 border-collapse text-left text-sm">
          <caption className="sr-only">
            Brand design tokens, their values, and the Tailwind utility to use
          </caption>
          <thead>
            <tr className="border-b border-brand-line text-brand-muted">
              <th scope="col" className="px-4 py-3 font-medium">
                <span className="eyebrow">Token</span>
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                <span className="eyebrow">Value</span>
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                <span className="eyebrow">Utility</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-line">
            {rows.map((r) => (
              <tr key={r.token}>
                <td className="px-4 py-2.5 align-middle">
                  <span className="text-[0.8125rem]">{r.token}</span>
                </td>
                <td className="px-4 py-2.5 align-middle">
                  <span className="flex items-center gap-2">
                    {r.value.startsWith("#") ? (
                      <span
                        aria-hidden
                        style={{ backgroundColor: r.value }}
                        className="size-4 shrink-0 rounded-sm ring-1 ring-inset ring-black/10"
                      />
                    ) : null}
                    <span className="text-[0.8125rem]" data-numeric>
                      {r.value}
                    </span>
                  </span>
                </td>
                <td className="px-4 py-2.5 align-middle text-brand-muted">
                  <span className="text-[0.8125rem]">{r.usage}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-brand-muted">
        Colour tokens live under the <Mono>brand-</Mono> namespace so they never
        collide with Tailwind&rsquo;s built-in palettes, and Host Grotesk is
        wired up through <Mono>next/font/local</Mono> in{" "}
        <Mono>app/fonts.ts</Mono>.
      </p>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-brand-line">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-10 text-xs text-brand-muted md:px-10">
        <span>Brand Overview — Nakeba Mason</span>
        <span>Colour and type standards as documented in the brand guide.</span>
      </div>
    </footer>
  );
}
