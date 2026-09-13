import { defineArrayMember, defineField, defineType } from "sanity";
import { line, lines, paragraph, url } from "./fields";

/**
 * The in-page anchors a nav link can point at. A fixed list rather than free
 * text, because each one is an `id` in the page's markup — a typo would leave
 * a link that scrolls nowhere and never marks itself current.
 */
const SECTION_ANCHORS = [
  { title: "Home (hero)", value: "#home" },
  { title: "The Problem", value: "#the-problem" },
  { title: "Approach", value: "#approach" },
  { title: "The Result", value: "#the-result" },
  { title: "My Offer", value: "#my-offer" },
  { title: "What I Take Off Your Plate", value: "#what-i-take-off-your-plate" },
  { title: "About Me", value: "#about-me" },
  { title: "Credentials", value: "#credentials" },
  { title: "Case Study", value: "#case-study" },
  { title: "Contact", value: "#contact" },
  { title: "Next Step", value: "#next-step" },
];

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "navigation", title: "Navigation" },
    { name: "shared", title: "Shared copy" },
    { name: "seo", title: "SEO & sharing" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({ ...line("name", "Name"), group: "identity" }),
    defineField({
      ...line(
        "role",
        "Role",
        "Follows the name in the browser tab, search results and share cards.",
      ),
      group: "identity",
    }),
    defineField({
      ...line(
        "email",
        "Email address",
        "Shown enormous in the footer, split at the @.",
      ),
      group: "identity",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      ...url(
        "bookingUrl",
        "Booking link",
        "Where every “Let’s talk” button on the page goes.",
      ),
      group: "identity",
    }),
    defineField({
      ...line(
        "offerName",
        "Offer name",
        "The retainer's name — the headline of the Offer section.",
      ),
      group: "identity",
    }),

    defineField({
      name: "navLinks",
      title: "Navigation links",
      description: "Shown in the header, the mobile menu and the footer.",
      type: "array",
      group: "navigation",
      of: [
        defineArrayMember({
          type: "object",
          name: "navLink",
          fields: [
            line("label", "Label"),
            defineField({
              name: "href",
              title: "Section",
              type: "string",
              options: { list: SECTION_ANCHORS },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "socials",
      title: "Social profiles",
      type: "array",
      group: "navigation",
      of: [
        defineArrayMember({
          type: "object",
          name: "social",
          fields: [
            defineField({
              ...line(
                "label",
                "Short label",
                "Two letters, set in braces — e.g. LI.",
              ),
              validation: (rule) => rule.required().max(3),
            }),
            line("name", "Full name", "Read out by screen readers — e.g. LinkedIn."),
            url("href", "Profile URL"),
          ],
          preview: { select: { title: "name", subtitle: "href" } },
        }),
      ],
    }),

    defineField({
      ...lines(
        "capabilities",
        "Capabilities",
        "The list at the top of the hero and in the closing summary.",
      ),
      group: "shared",
    }),
    defineField({
      ...paragraph(
        "pitch",
        "Pitch",
        "The one-line pitch beside the capabilities, in the hero and the closing summary.",
        2,
      ),
      group: "shared",
    }),

    defineField({
      ...paragraph(
        "description",
        "Site description",
        "For search results and share cards. Keep it under ~155 characters so it isn't cut off.",
        3,
      ),
      group: "seo",
      validation: (rule) =>
        rule
          .required()
          .max(160)
          .warning("Search engines truncate descriptions past ~155 characters."),
    }),
    defineField({
      name: "shareImage",
      title: "Share image",
      description:
        "The card shown when the site is shared. Cropped to 1200 × 630 — set the hotspot on what must stay in frame.",
      type: "image",
      options: { hotspot: true },
      group: "seo",
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      group: "seo",
    }),
    defineField({
      ...line(
        "serviceType",
        "Service type",
        "Structured data for search engines — what kind of service the offer is.",
      ),
      group: "seo",
    }),
    defineField({
      ...paragraph(
        "serviceDescription",
        "Service description",
        "Structured data for search engines — the offer in a sentence or two.",
        3,
      ),
      group: "seo",
    }),

    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      group: "footer",
      options: { collapsible: false },
      fields: [
        line("summaryCtaLabel", "Summary button label"),
        line("messageLabel", "“Send a message” label"),
        line("creditLabel", "Credit prefix", "e.g. “Design by”"),
        line("creditName", "Credit name"),
        url("creditUrl", "Credit link"),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
