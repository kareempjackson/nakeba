import { defineArrayMember, defineField, defineType } from "sanity";
import { line, paragraph, paragraphs, photo, section } from "./fields";

const TAIL =
  "Continues the headline in the same sentence. It starts faded and fills in as the reader scrolls through it.";

const EYEBROW = "The small label beside the headline. Brackets are added for you.";

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "problem", title: "Problem" },
    { name: "approach", title: "Approach" },
    { name: "result", title: "Result" },
    { name: "offer", title: "Offer" },
    { name: "plate", title: "Plate" },
    { name: "meet", title: "Meet" },
    { name: "credentials", title: "Credentials" },
    { name: "caseStudy", title: "Case study" },
    { name: "contact", title: "Contact" },
    { name: "nextStep", title: "Next step" },
  ],
  fields: [
    section(
      "hero",
      "Hero",
      [
        line("ctaLabel", "Button label"),
        paragraph(
          "positioning",
          "Positioning statement",
          "Below the fold. Revealed word by word as the reader scrolls.",
        ),
        defineField({
          name: "deck",
          title: "Photo deck",
          description:
            "The stack of three cards between “Nakeba” and “Mason”. Clicking the deck shuffles to the next hand. The first hand is also the one the opening animation deals.",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "deckHand",
              title: "Hand",
              fields: [
                photo("back", "Back card"),
                photo("middle", "Middle card"),
                photo("front", "Front card", "The only card fully visible."),
              ],
              preview: {
                select: { media: "front" },
                prepare: ({ media }) => ({ title: "Hand of three", media }),
              },
            }),
          ],
          validation: (rule) => rule.required().min(1),
        }),
      ],
      "Capabilities and the pitch are shared with the closing summary — edit them in Site settings.",
    ),

    section("problem", "The Problem", [
      line("eyebrow", "Label", EYEBROW),
      paragraph("headline", "Headline", undefined, 3),
      paragraph("headlineTail", "Headline, continued", TAIL, 2),
      photo("photo", "Card photo"),
      line("photoTitle", "Card title"),
      line("photoCaption", "Card caption"),
      line("annotation", "Pain point label"),
      paragraphs("painPointsLeft", "Pain points — first column"),
      paragraphs("painPointsRight", "Pain points — second column"),
      line("ctaLabel", "Button label"),
    ]),

    section("approach", "Approach", [
      line("eyebrow", "Label", EYEBROW),
      paragraph("headline", "Headline", undefined, 3),
      paragraph("headlineTail", "Headline, continued", TAIL, 3),
      line("pillarLabel", "Pillar label", "Numbered automatically — “Pillar 1”, “Pillar 2”…"),
      defineField({
        name: "pillars",
        title: "Pillars",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            name: "pillar",
            fields: [line("heading", "Heading"), paragraph("body", "Body")],
            preview: { select: { title: "heading", subtitle: "body" } },
          }),
        ],
        validation: (rule) => rule.required().min(1),
      }),
    ]),

    section("result", "The Result", [
      line("eyebrow", "Label", EYEBROW),
      paragraph("headline", "Headline", undefined, 2),
      paragraph("body", "Supporting line"),
    ]),

    section(
      "offer",
      "My Offer",
      [
        line(
          "bleedLeft",
          "Background word — left half",
          "The giant word split behind the section.",
        ),
        line("bleedRight", "Background word — right half"),
        paragraph("body", "Body"),
      ],
      "The headline is the offer name from Site settings.",
    ),

    section("plate", "What I Take Off Your Plate", [
      line("title", "Heading"),
      photo("photo", "Photo"),
      paragraph("intro", "Intro"),
      line("ctaLabel", "Button label"),
      defineField({
        name: "items",
        title: "Items",
        description: "The expandable list. The first item starts open.",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            name: "plateItem",
            fields: [line("title", "Title"), paragraph("body", "Body", undefined, 3)],
            preview: { select: { title: "title", subtitle: "body" } },
          }),
        ],
        validation: (rule) => rule.required().min(1),
      }),
    ]),

    section("meet", "Meet Nakeba", [
      line("eyebrow", "Label", EYEBROW),
      paragraph("headline", "Headline", undefined, 3),
      photo("photo", "Photo"),
      paragraph("career", "Career", undefined, 8),
      paragraph("trust", "Trust", undefined, 6),
      line("ctaLabel", "Button label"),
      line("stamp", "Corner stamp", "e.g. ©2026"),
    ]),

    section("credentials", "Credentials", [
      line("bleedLeft", "Background word — left half"),
      line("bleedRight", "Background word — right half"),
      line("eyebrow", "Label"),
      line("qualification", "Qualification"),
      paragraph("details", "Details", undefined, 3),
    ]),

    section("caseStudy", "Case study", [
      line("eyebrow", "Label", EYEBROW),
      paragraph("headline", "Headline", undefined, 2),
      paragraph("headlineTail", "Headline, continued", TAIL, 2),
      line("situationLabel", "Situation label"),
      paragraph("situationHeading", "Situation heading", undefined, 2),
      paragraph("situation", "Situation", undefined, 6),
      line("partnershipHeading", "Partnership heading"),
      paragraph("partnership", "Partnership", undefined, 10),
      line("changedHeading", "“What changed” heading"),
      paragraph("changed", "What changed", undefined, 6),
      line("standingHeading", "“Where it stands” heading"),
      paragraph("standing", "Where it stands", undefined, 3),
      line("testimonialsLabel", "Testimonial label"),
      paragraph(
        "quote",
        "Testimonial",
        "Quotation marks are added for you.",
        6,
      ),
      line("quoteAuthor", "Testimonial — name"),
      line("quoteRole", "Testimonial — role"),
    ]),

    section("contact", "Contact", [
      paragraph("headline", "Headline", undefined, 2),
      paragraph("body", "Body", undefined, 2),
      line("ctaLabel", "Button label"),
      photo("photo", "Closing portrait", "Shown full width in black and white."),
    ]),

    section("nextStep", "Next step", [
      paragraph("aside", "Side note", undefined, 2),
      paragraph(
        "headline",
        "Closing statement",
        "Fills in as the reader scrolls through it.",
        4,
      ),
    ]),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});
