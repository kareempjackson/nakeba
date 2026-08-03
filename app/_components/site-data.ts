/** Shared copy. The footer deliberately mirrors the hero in the designs. */

/**
 * The site's navigation, in page order. The header and the footer both read
 * from here so the two can't drift — the footer used to carry its own labels
 * from the comp ("Our Work", "Services") that named sections the site doesn't
 * have.
 */
export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "The Problem", href: "#the-problem" },
  { label: "Approach", href: "#approach" },
  { label: "My Offer", href: "#my-offer" },
  { label: "About Me", href: "#about-me" },
];

/**
 * Profiles, as the design sets them: a two-letter label in braces. `name` is
 * the full one, for the screen reader — "LI" is not a word.
 *
 * Shared by the footer and the mobile menu, which had drifted to an empty
 * `href` and rendered a dead label.
 */
export const SOCIALS = [
  {
    label: "LI",
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/nakeba-mason/",
  },
];

export const CAPABILITIES = [
  "Strategic Initiatives",
  "Manage Operations",
  "Coordinate Teams",
  "Optimise systems & Processes",
  "Analyse Performance",
];

export const PITCH =
  "You're too good at what you do to be buried in the chaos behind it.";

/**
 * Where every call to action goes: the booking page, not the contact section.
 * Defined here rather than in `app/site.ts` because client components use it
 * too, and that module reads server-only environment variables.
 */
export const BOOKING_URL = "https://appt.link/meet-with-nakeba/primeskillva";
