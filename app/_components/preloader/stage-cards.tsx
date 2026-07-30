import Image from "next/image";

/**
 * The deck the entrance deals, in the card slot of the staged signature.
 *
 * Each card is a flat brand-colour card with a photo laid over it. The two rear
 * photos fade off during the flight, revealing the colour already underneath —
 * which is how three photographs can deal in and still land as the hero's
 * actual deck (one photo, two colour cards) without anything swapping. The
 * front card is already identical to its counterpart, so it just keeps its
 * photo.
 *
 * At rest all three sit squared, unrotated and unoffset — the pose the real
 * deck holds while the curtain is up, and the first keyframe of its shuffle. So
 * the entrance deals the deck and the page riffles it, with no seam.
 *
 * `sizes` is copied verbatim from the hero's card so the front photo resolves
 * to the same srcset candidate and reuses that single request.
 */
const SIZES = "(min-width: 1024px) 28vw, (min-width: 640px) 32vw, 38vw";

const CARDS = [
  {
    photo: "/images/30534.jpg",
    /* Matches the hero's back card. */
    className: "bg-brand-peach",
    keepsPhoto: false,
  },
  {
    photo: "/images/30533.jpg",
    className: "bg-brand-butter-soft",
    keepsPhoto: false,
  },
  {
    photo: "/images/30532.jpg",
    className: "bg-brand-surface shadow-[0_18px_45px_-20px_rgba(0,0,0,0.35)]",
    keepsPhoto: true,
  },
];

export function StageCards() {
  return (
    <div className="relative aspect-5/7">
      {CARDS.map((card, i) => (
        <div
          key={card.photo}
          data-stage-card={i}
          className={`absolute inset-0 overflow-hidden rounded-[3px] ${card.className}`}
        >
          <Image
            src={card.photo}
            alt=""
            fill
            sizes={SIZES}
            /* Only the front photo is the one the page itself preloads. The
               other two must not compete with the hero wordmark for bandwidth
               during the LCP window, so they load eagerly but not urgently. */
            priority={card.keepsPhoto}
            loading={card.keepsPhoto ? undefined : "eager"}
            data-stage-photo={card.keepsPhoto ? "keep" : "fade"}
            className="object-cover object-top"
          />
        </div>
      ))}
    </div>
  );
}
