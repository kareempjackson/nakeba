import { Parallax } from "./parallax";

/**
 * The brand name set enormous and split across the section — the fragments
 * clipped by the viewport edges, with the section's content sitting between
 * them. They pull apart as the section is scrolled, so the name opens around
 * the copy rather than sitting still behind it.
 *
 * There's no room for two fragments side by side on a phone, so below `md`
 * they stack instead: one above the content, one below, both left-aligned and
 * running off the right edge.
 *
 * Set in Ink, at full weight — the signature, not a watermark. Purely
 * decorative all the same: the readable name lives in the logo and headings,
 * and the sections that use this keep their copy clear of the fragments rather
 * than setting anything on top of them.
 */
export function BleedWord({
  left,
  right,
  align = "center",
}: {
  left: string;
  right: string;
  align?: "center" | "top";
}) {
  /*
    Below `md` a fragment is `min(70vw,17rem)` tall (leading-none, so the line
    box is the font size). The sections that use this reserve
    `min(90vw,22rem)` of vertical padding — the fragment plus a 5rem gap — so
    the copy in the middle always has air around it. Change one, change both.
  */
  const type =
    "block text-[min(70vw,17rem)] leading-none font-bold tracking-display text-brand-ink md:text-[clamp(6rem,21vw,25rem)]";

  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none absolute inset-0 flex flex-col items-start justify-between overflow-hidden select-none md:flex-row",
        // `align` only has meaning once the fragments sit side by side.
        align === "center" ? "md:items-center" : "md:items-start",
      ].join(" ")}
    >
      {/* Opposite signs: the halves travel away from each other, not together.
          The static offsets stay on the inner span so the drift composes with
          the design's resting position instead of replacing it — and they only
          apply from `md`, where the fragments bleed off opposite edges. */}
      <Parallax axis="x" distance={-70}>
        <span className={`${type} md:translate-x-[-20%]`}>{left}</span>
      </Parallax>
      <Parallax axis="x" distance={70}>
        <span className={`${type} md:translate-x-[18%]`}>{right}</span>
      </Parallax>
    </div>
  );
}
