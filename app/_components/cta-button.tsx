import type { ReactNode } from "react";

/**
 * The site's one call-to-action. `dark` is the default (ink on light grounds);
 * `light` inverts it for use on Night and Ink sections.
 */
export function CtaButton({
  href,
  children,
  variant = "dark",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "dark" | "light";
  className?: string;
}) {
  return (
    <a
      href={href}
      className={[
        "group inline-flex items-center gap-4 rounded-sm px-7 py-4 text-[15px] font-medium transition-opacity hover:opacity-85",
        variant === "dark"
          ? "bg-brand-ink text-brand-white"
          : "bg-brand-white text-brand-ink",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform group-hover:translate-x-1"
      >
        &rarr;
      </span>
    </a>
  );
}
