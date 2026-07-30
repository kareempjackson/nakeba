/**
 * Brand guide source data.
 *
 * Hex values are taken from the Nakeba Mason brand overview document.
 * Contrast ratios are computed WCAG 2.1 values, rounded to 2dp.
 * Anything not in the document is marked `derived`.
 */

export type Swatch = {
  name: string;
  note: string;
  hex: string;
  rgb: string;
  token: string;
  /** Contrast of black ink on this swatch. */
  onInk: number;
  /** Contrast of white on this swatch. */
  onWhite: number;
};

/** The six colours printed on p.11 of the brand overview. */
export const CORE_PALETTE: Swatch[] = [
  {
    name: "Sky",
    note: "Soft blue",
    hex: "#8FDDF3",
    rgb: "143 221 243",
    token: "brand-sky",
    onInk: 13.8,
    onWhite: 1.52,
  },
  {
    name: "Periwinkle",
    note: "Soft blue",
    hex: "#AFC6F8",
    rgb: "175 198 248",
    token: "brand-periwinkle",
    onInk: 12.26,
    onWhite: 1.71,
  },
  {
    name: "Blush",
    note: "Blush pink",
    hex: "#F7B4C4",
    rgb: "247 180 196",
    token: "brand-blush",
    onInk: 12.28,
    onWhite: 1.71,
  },
  {
    name: "Peach",
    note: "Warm peach",
    hex: "#FFD4B3",
    rgb: "255 212 179",
    token: "brand-peach",
    onInk: 15.32,
    onWhite: 1.37,
  },
  {
    name: "Butter",
    note: "Buttery yellow",
    hex: "#FFE9B5",
    rgb: "255 233 181",
    token: "brand-butter",
    onInk: 17.57,
    onWhite: 1.19,
  },
  {
    name: "Canvas",
    note: "Off-white neutral",
    hex: "#F9F8F6",
    rgb: "249 248 246",
    token: "brand-canvas",
    onInk: 19.79,
    onWhite: 1.06,
  },
];

export const NEUTRALS: Swatch[] = [
  {
    name: "Ink",
    note: "The bold black signature",
    hex: "#000000",
    rgb: "0 0 0",
    token: "brand-ink",
    onInk: 1,
    onWhite: 21,
  },
  {
    name: "Surface",
    note: "Section ground, one step off canvas",
    hex: "#F6F6F6",
    rgb: "246 246 246",
    token: "brand-surface",
    onInk: 19.43,
    onWhite: 1.08,
  },
  {
    name: "White",
    note: "Pure white — print & product",
    hex: "#FFFFFF",
    rgb: "255 255 255",
    token: "brand-white",
    onInk: 21,
    onWhite: 1,
  },
];

/** derived — hue blended with white, for large washes. */
export const SOFT_TINTS = [
  { name: "Sky", hex: "#C7EEF9", token: "brand-sky-soft" },
  { name: "Periwinkle", hex: "#D7E2FC", token: "brand-periwinkle-soft" },
  { name: "Blush", hex: "#FBDAE2", token: "brand-blush-soft" },
  { name: "Peach", hex: "#FFEAD9", token: "brand-peach-soft" },
  { name: "Butter", hex: "#FFF4DA", token: "brand-butter-soft" },
];

/** derived — hue blended with black until it clears 4.5:1 on Canvas. */
export const DEEP_TINTS = [
  { name: "Sky", hex: "#4D7783", token: "brand-sky-deep", ratio: 4.62 },
  {
    name: "Periwinkle",
    hex: "#64718D",
    token: "brand-periwinkle-deep",
    ratio: 4.61,
  },
  { name: "Blush", hex: "#8F6872", token: "brand-blush-deep", ratio: 4.51 },
  { name: "Peach", hex: "#856E5D", token: "brand-peach-deep", ratio: 4.51 },
  { name: "Butter", hex: "#7A7057", token: "brand-butter-deep", ratio: 4.62 },
];

export const WEIGHTS = [
  { label: "Light", weight: 300, className: "font-light" },
  { label: "Regular", weight: 400, className: "font-normal" },
  { label: "Medium", weight: 500, className: "font-medium" },
  { label: "SemiBold", weight: 600, className: "font-semibold" },
  { label: "Bold", weight: 700, className: "font-bold" },
  { label: "ExtraBold", weight: 800, className: "font-extrabold" },
];

export const TYPE_SCALE = [
  {
    role: "Display",
    sample: "Fresh, creative, approachable",
    className:
      "text-[clamp(2.5rem,7vw,5rem)] font-bold tracking-display leading-[0.95]",
    spec: "700 · clamp(40–80px) · -0.03em · 0.95",
  },
  {
    role: "Heading 1",
    sample: "A look that feels like her",
    className: "text-4xl md:text-5xl font-semibold tracking-display leading-tight",
    spec: "600 · 36–48px · -0.03em · 1.1",
  },
  {
    role: "Heading 2",
    sample: "Balance, warmth and elegance",
    className: "text-2xl md:text-3xl font-semibold leading-snug",
    spec: "600 · 24–30px · 1.35",
  },
  {
    role: "Body Large",
    sample:
      "The colour palette blends soft blues, blush pinks, warm peach and buttery yellow.",
    className: "text-lg font-normal leading-relaxed",
    spec: "400 · 18px · 1.65",
  },
  {
    role: "Body",
    sample:
      "Paired with clean off-white neutrals and the bold black signature, these colours bring balance and a modern sense of elegance to the brand.",
    className: "text-base font-normal leading-relaxed",
    spec: "400 · 16px · 1.65",
  },
  {
    role: "Caption",
    sample: "Brand overview — Nakeba Mason",
    className: "text-sm font-normal text-brand-muted leading-normal",
    spec: "400 · 14px · Muted ink",
  },
  {
    role: "Eyebrow",
    sample: "Colour palette",
    className: "eyebrow",
    spec: "600 · 11px · 0.18em · Uppercase",
  },
];

export const PHOTOGRAPHY = [
  "/images/30527.jpg",
  "/images/30529.jpg",
  "/images/30530.jpg",
  "/images/30531.jpg",
  "/images/30532.jpg",
  "/images/30533.jpg",
  "/images/30534.jpg",
  "/images/30528.jpg",
];

export const SECTIONS = [
  { id: "logo", label: "Logo" },
  { id: "colour", label: "Colour" },
  { id: "type", label: "Typography" },
  { id: "photography", label: "Photography" },
  { id: "tokens", label: "Tokens" },
];
