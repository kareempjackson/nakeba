import type { Swatch } from "../brand-data";
import { Mono } from "./primitives";

/** Large swatch card with full spec and legibility read-out. */
export function SwatchCard({ swatch }: { swatch: Swatch }) {
  const needsBorder = swatch.onWhite < 1.15;

  return (
    <figure className="group">
      <div
        style={{ backgroundColor: swatch.hex }}
        className={[
          "flex h-36 items-end justify-end rounded-lg p-3 sm:h-44",
          needsBorder ? "ring-1 ring-inset ring-brand-line" : "",
        ].join(" ")}
      >
        {/* Proof, in situ: ink is legible on every brand colour. */}
        <span className="text-xs font-semibold text-brand-ink opacity-0 transition-opacity group-hover:opacity-100">
          Aa
        </span>
      </div>
      <figcaption className="mt-3">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-sm font-semibold">{swatch.name}</span>
          <Mono>{swatch.hex}</Mono>
        </div>
        <p className="mt-1 text-xs text-brand-muted">{swatch.note}</p>
        <dl className="mt-3 space-y-1 border-t border-brand-line pt-2 text-[0.6875rem] text-brand-muted">
          <div className="flex justify-between gap-2">
            <dt>RGB</dt>
            <dd data-numeric>{swatch.rgb}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt>Token</dt>
            <dd className="font-medium text-brand-ink">{swatch.token}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt>Ink on fill</dt>
            <dd data-numeric>{swatch.onInk.toFixed(2)}:1</dd>
          </div>
        </dl>
      </figcaption>
    </figure>
  );
}

/** Compact chip used for the derived tint rows. */
export function Chip({
  hex,
  name,
  token,
  meta,
}: {
  hex: string;
  name: string;
  token: string;
  meta?: string;
}) {
  return (
    <div>
      <div
        style={{ backgroundColor: hex }}
        className="h-20 rounded-md ring-1 ring-inset ring-black/5"
      />
      <p className="mt-2 text-xs font-semibold">{name}</p>
      <p className="text-[0.6875rem] text-brand-muted" data-numeric>
        {hex}
      </p>
      <p className="text-[0.6875rem] text-brand-muted">{token}</p>
      {meta ? (
        <p className="text-[0.6875rem] font-medium text-brand-ink" data-numeric>
          {meta}
        </p>
      ) : null}
    </div>
  );
}
