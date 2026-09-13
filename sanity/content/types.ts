/**
 * The shape the site renders from. Sanity documents are normalised into this
 * in `sanity/lib/fetch.ts` — images become a ready `src`, and any field the
 * CMS hasn't filled falls back to `DEFAULT_CONTENT` — so components never deal
 * with asset references or missing values.
 */

export type Img = {
  src: string;
  alt: string;
  /** CSS `object-position`, from the hotspot set in the Studio. */
  position?: string;
};

export type NavLink = { label: string; href: string };

export type Social = {
  /** The two-letter label the design sets in braces, e.g. "LI". */
  label: string;
  /** The full name, for screen readers. */
  name: string;
  href: string;
};

/** One row of the hero's photo deck, back card first. */
export type DeckHand = { back: Img; middle: Img; front: Img };

export type Pillar = { heading: string; body: string };

export type PlateItem = { title: string; body: string };

export type SiteSettings = {
  name: string;
  role: string;
  description: string;
  email: string;
  offerName: string;
  bookingUrl: string;
  keywords: string[];
  /** Absolute URL on the Sanity CDN, or a path under `public/`. */
  shareImage: string;
  navLinks: NavLink[];
  socials: Social[];
  capabilities: string[];
  pitch: string;
  serviceType: string;
  serviceDescription: string;
  footer: {
    summaryCtaLabel: string;
    messageLabel: string;
    creditLabel: string;
    creditName: string;
    creditUrl: string;
  };
};

export type HomePage = {
  hero: {
    ctaLabel: string;
    positioning: string;
    deck: DeckHand[];
  };
  problem: {
    eyebrow: string;
    headline: string;
    headlineTail: string;
    photo: Img;
    photoTitle: string;
    photoCaption: string;
    annotation: string;
    painPointsLeft: string[];
    painPointsRight: string[];
    ctaLabel: string;
  };
  approach: {
    eyebrow: string;
    headline: string;
    headlineTail: string;
    pillarLabel: string;
    pillars: Pillar[];
  };
  result: {
    eyebrow: string;
    headline: string;
    body: string;
  };
  offer: {
    bleedLeft: string;
    bleedRight: string;
    body: string;
  };
  plate: {
    title: string;
    photo: Img;
    intro: string;
    ctaLabel: string;
    items: PlateItem[];
  };
  meet: {
    eyebrow: string;
    headline: string;
    photo: Img;
    career: string;
    trust: string;
    ctaLabel: string;
    stamp: string;
  };
  credentials: {
    bleedLeft: string;
    bleedRight: string;
    eyebrow: string;
    qualification: string;
    details: string;
  };
  caseStudy: {
    eyebrow: string;
    headline: string;
    headlineTail: string;
    situationLabel: string;
    situationHeading: string;
    situation: string;
    partnershipHeading: string;
    partnership: string;
    changedHeading: string;
    changed: string;
    standingHeading: string;
    standing: string;
    testimonialsLabel: string;
    quote: string;
    quoteAuthor: string;
    quoteRole: string;
  };
  contact: {
    headline: string;
    body: string;
    ctaLabel: string;
    photo: Img;
  };
  nextStep: {
    aside: string;
    headline: string;
  };
};

export type SiteContent = {
  settings: SiteSettings;
  home: HomePage;
};
