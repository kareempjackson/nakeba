/** Shared copy. The footer deliberately mirrors the hero in the designs. */

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
