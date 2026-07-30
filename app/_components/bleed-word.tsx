/**
 * The brand name set enormous and split across the viewport — the first
 * fragment clipped by the left edge, the second by the right, with the
 * section's content sitting in the gap between them.
 *
 * "Nak" + "eba" and "Ma" + "son" are the two halves of Nakeba Mason.
 * Purely decorative: the readable name lives in the logo and headings.
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
  const type =
    "text-[clamp(6rem,21vw,25rem)] leading-none font-bold tracking-display";

  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none absolute inset-0 flex justify-between overflow-hidden select-none",
        align === "center" ? "items-center" : "items-start",
      ].join(" ")}
    >
      <span className={`translate-x-[-20%] ${type}`}>{left}</span>
      <span className={`translate-x-[18%] ${type}`}>{right}</span>
    </div>
  );
}
