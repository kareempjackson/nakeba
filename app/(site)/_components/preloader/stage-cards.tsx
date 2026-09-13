import Image from "next/image";
import type { DeckHand } from "@/sanity/content/types";

/**
 * The deck the entrance deals — a copy of the hero's own first hand, card for
 * card.
 *
 * The layout hands this the same `deck[0]` the hero renders. The clones come to
 * rest directly on top of the real cards and then fade off, so any difference
 * between the two decks would show up as a visible swap at the exact moment
 * the entrance hands over.
 *
 * At rest all three sit squared, unrotated and unoffset — the pose the real
 * deck holds while the curtain is up, and the first keyframe of its shuffle. So
 * the entrance deals the deck and the page riffles it, with no seam.
 *
 * `sizes` is copied verbatim from the hero's cards so each photo resolves to
 * the same srcset candidate and reuses that single request.
 */
const SIZES = "(min-width: 1024px) 28vw, (min-width: 640px) 32vw, 38vw";

export function StageCards({ hand }: { hand: DeckHand }) {
  const cards = [
    { photo: hand.back, className: "bg-brand-peach" },
    { photo: hand.middle, className: "bg-brand-butter-soft" },
    {
      photo: hand.front,
      className: "bg-brand-surface shadow-[0_18px_45px_-20px_rgba(0,0,0,0.35)]",
    },
  ];

  return (
    <div className="relative aspect-5/7">
      {cards.map((card, i) => (
        <div
          key={i}
          data-stage-card={i}
          className={`absolute inset-0 overflow-hidden rounded-[3px] ${card.className}`}
        >
          <Image
            src={card.photo.src}
            alt=""
            fill
            sizes={SIZES}
            /* Eager, but never urgent: these must not compete with the hero's
               wordmark for bandwidth during the LCP window. */
            loading="eager"
            className="object-cover object-top"
            style={{ objectPosition: card.photo.position }}
          />
        </div>
      ))}
    </div>
  );
}
