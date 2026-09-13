import Image from "next/image";

export const WORDMARK_NAKEBA = "/logo/main%20logo/Nakeba%20Logo%20part.svg";
export const WORDMARK_MASON = "/logo/main%20logo/mason%20logo%20part.svg";

/**
 * The signature: the card stack sandwiched between the two halves of the
 * wordmark — "Nakeba" behind, "mason" in front.
 *
 * Every dimension inside is a percentage of the composition's own width — the
 * wordmarks are `w-full h-auto` at fixed intrinsic ratios, the card slot is
 * positioned and sized in `%`, and the overlap between the two halves is
 * `mt-[-1.5%]`. That makes the whole thing uniformly scale-invariant in width:
 * set its width and everything inside lands in proportion.
 *
 * That property is why this is a shared component rather than markup living in
 * the hero. The entrance sequence renders a second copy of it at a different
 * size and then flies it onto this one, which is a single measure-and-scale
 * because the two copies can't disagree about their internals.
 *
 * Only `max-w-*` belongs to the caller; the bottom padding is part of the
 * composition and stays here, since the card slot's `top-%` is tuned against it
 * per breakpoint.
 */
export function SignatureComposition({
  className,
  children,
  ...rest
}: React.ComponentProps<"div">) {
  return (
    <div
      className={`relative w-full pb-[23%] sm:pb-[13%] lg:pb-[10%] ${className ?? ""}`}
      {...rest}
    >
      {/* Behind */}
      <Image
        src={WORDMARK_NAKEBA}
        alt=""
        width={523}
        height={126}
        unoptimized
        priority
        data-sig="nakeba"
        className="relative z-0 h-auto w-full"
      />

      {/* Middle — the card slot. `top` is a share of the container's height, so
          it is re-tuned per breakpoint alongside the bottom padding to keep the
          card sitting at the same spot. */}
      <div
        data-sig="cards"
        className="absolute top-[12%] left-[47.5%] z-10 w-[38%] -translate-x-1/2 sm:top-[14%] sm:w-[32%] lg:top-[15%] lg:w-[27%]"
      >
        {children}
      </div>

      {/* In front. Decorative: the page's h1 already announces the name. */}
      <Image
        src={WORDMARK_MASON}
        alt=""
        width={522}
        height={90}
        unoptimized
        priority
        data-sig="mason"
        className="relative z-20 mt-[-1.5%] h-auto w-full"
      />
    </div>
  );
}
