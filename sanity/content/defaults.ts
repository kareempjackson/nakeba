import type { DeckHand, Img, SiteContent } from "./types";

/**
 * The site's copy as it stood before the CMS. Two jobs:
 *
 *  1. The fallback for any field Sanity hasn't filled — or for everything,
 *     when no project is configured or the API can't be reached — so the page
 *     never renders a hole.
 *  2. The seed: `scripts/seed-sanity.ts` writes exactly this into the dataset,
 *     uploading the images under `public/` as it goes.
 *
 * Once the dataset is seeded the Studio is the source of truth. Edits here
 * only show where a field has been left empty there.
 */

/** Deck photos crop from the top, so faces stay in frame on the narrow cards. */
const deckPhoto = (src: string, alt = ""): Img => ({
  src,
  alt,
  position: "50% 0%",
});

const hand = (back: string, middle: string, front: string): DeckHand => ({
  back: deckPhoto(back),
  middle: deckPhoto(middle),
  front: deckPhoto(front, "Nakeba Mason"),
});

export const DEFAULT_CONTENT: SiteContent = {
  settings: {
    name: "Nakeba Mason",
    role: "Strategic Operations Partner for Creative Founders",
    description:
      "Nakeba Mason is a strategic operations partner for creative founders — building the structure, coordination and follow-through a growing studio runs on.",
    email: "hello@nakebamason.com",
    offerName: "The Operations Partnership",
    bookingUrl: "https://appt.link/meet-with-nakeba/primeskillva",
    keywords: [
      "operations partner",
      "strategic operations",
      "operations manager for creative agencies",
      "creative founders",
      "business operations support",
      "online business manager",
      "agency operations retainer",
      "Nakeba Mason",
    ],
    shareImage: "/og-v2.png",
    navLinks: [
      { label: "Home", href: "#home" },
      { label: "The Problem", href: "#the-problem" },
      { label: "Approach", href: "#approach" },
      { label: "My Offer", href: "#my-offer" },
      { label: "About Me", href: "#about-me" },
    ],
    socials: [
      {
        label: "LI",
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/nakeba-mason/",
      },
    ],
    capabilities: [
      "Strategic Initiatives",
      "Manage Operations",
      "Coordinate Teams",
      "Optimise systems & Processes",
      "Analyse Performance",
    ],
    pitch:
      "You’re too good at what you do to be buried in the chaos behind it.",
    serviceType: "Business operations management",
    serviceDescription:
      "A monthly retainer partnership: a strategic operations partner inside the business who takes ownership of the operational side — coordinating projects, keeping clients and teams aligned, and building the structure the business runs on.",
    footer: {
      summaryCtaLabel: "Let’s talk",
      messageLabel: "Send a message",
      creditLabel: "Design by",
      creditName: "Ghost Savvy Studios",
      creditUrl: "https://ghostsavvy.com",
    },
  },

  home: {
    hero: {
      ctaLabel: "Let’s talk",
      positioning:
        "I work with creative founders who are growing but feeling the weight of everything that comes with it. Client requests slipping through the cracks, a team that needs direction, and a business that needs someone holding it all together behind the scenes.",
      deck: [
        hand("/images/30532.jpg", "/images/30530.jpg", "/images/30532.jpg"),
        hand("/images/30527.jpg", "/images/30528.jpg", "/images/30529.jpg"),
        hand("/images/30531.jpg", "/images/30533.jpg", "/images/30534.jpg"),
      ],
    },

    problem: {
      eyebrow: "The Problem",
      headline:
        "The work is good. The clients keep coming. But behind the scenes, it’s a different story.",
      headlineTail:
        "This is what running a growing creative business actually feels like.",
      photo: { src: "/images/30533.jpg", alt: "Nakeba Mason" },
      photoTitle: "Nakeba Mason®",
      photoCaption: "Since 2019",
      annotation: "Pain Point",
      painPointsLeft: [
        "Your designer is waiting on a brief, your client is waiting on a deliverable, and you're stuck in the middle of both.",
        "You built a team so you could focus on the creative work. But somehow you're still the one holding everything together.",
      ],
      painPointsRight: [
        "Requests come in through WhatsApp, Instagram DMs, and email all at once and something always slips.",
        "The only time you know something went wrong is when a client brings it up first.",
      ],
      ctaLabel: "Let’s talk",
    },

    approach: {
      eyebrow: "How it works",
      headline:
        "I don’t come in to manage tasks. I come in to understand your business, how",
      headlineTail:
        "it moves, where it stalls, and what it needs to run well without you having to oversee every detail.",
      pillarLabel: "Pillar",
      pillars: [
        {
          heading: "I get inside your business first.",
          body: "Before anything else I learn how your business actually operates — your clients, your team, your workflow, your tools. That's what allows me to show up as a real partner, not someone you have to constantly brief and manage.",
        },
        {
          heading: "Build structure around how you work.",
          body: "I don't bring a rigid system and force your business into it. I identify what's missing, what's falling through the cracks, and I build the structure your business actually needs — so things move, your team knows what to do, and nothing gets lost.",
        },
        {
          heading: "I stay in it with you.",
          body: "This isn't a setup-and-disappear service. Week after week I'm coordinating your projects, tracking what's outstanding, keeping your clients and team aligned — so nothing slips and nothing stalls.",
        },
      ],
    },

    result: {
      eyebrow: "The result",
      headline:
        "You spend less time managing the business and more time building it.",
      body: "I don’t come in to manage tasks. I come in to understand your business, how it moves, where it stalls, and what it needs to run well without you having to oversee every detail.",
    },

    offer: {
      bleedLeft: "Ma",
      bleedRight: "son",
      body: "I work with creative founders on a monthly retainer — as their strategic operations partner inside the business. Not a VA you delegate tasks to. A partner who takes ownership of the operational side so it stops depending on you.",
    },

    plate: {
      title: "What I Take Off Your Plate",
      photo: { src: "/images/30532.jpg", alt: "Nakeba Mason" },
      intro:
        "That career began in 2020, mid-pandemic, while I was two years into a psychology degree — which turned out to be the right training for work that is, at its core, about understanding people and how they move.",
      ctaLabel: "Start a project",
      items: [
        {
          title: "Client communication",
          body: "Requests, follow-ups, and approvals tracked and handled, so nothing sits unanswered.",
        },
        {
          title: "Team coordination",
          body: "Your team knows what they're working on and when it's due, without you having to chase or repeat yourself.",
        },
        {
          title: "Project visibility",
          body: "One clear view of everything in motion, so you always know what's moving, what's waiting, and what's next.",
        },
        {
          title: "Systems that hold",
          body: "Workflows and documentation built around the way you already work, so the structure survives a busy month.",
        },
        {
          title: "Meetings & priorities",
          body: "Agendas set, notes captured, decisions tracked — and the week's priorities agreed before it starts.",
        },
        {
          title: "A thinking partner",
          body: "Someone to pressure-test decisions with, who already understands the business and what it's working within.",
        },
      ],
    },

    meet: {
      eyebrow: "Meet Nakeba",
      headline:
        "I’ve spent my career creating the conditions in which leaders and teams can do their best work.",
      photo: {
        src: "/images/30534.jpg",
        alt: "Nakeba Mason, photographed at work",
      },
      career:
        "That career began in 2020, mid-pandemic, while I was two years into a psychology degree — which turned out to be the right training for work that is, at its core, about understanding people and how they move. What started as a way to put my strengths to use grew into something much bigger, carrying me through banking, digital consultancy, creative agencies, e-commerce, and legal — including supporting executive directors at one of the Caribbean's leading banks. And somewhere along the way, the work revealed what it had always been about. Not tasks. Structure. The ability to make fast-moving environments feel navigable, and complex operations feel human.",
      trust:
        "My partnerships are remote, so trust isn't a nice-to-have — it's the foundation. Transparency, communication, discretion, and showing up when I say I will: these aren't values on a wall. They're how the work gets done. When a founder opens their business to me, I understand exactly what they're protecting — because I've built something of my own too. I honour that.",
      ctaLabel: "Let’s talk",
      stamp: "©2026",
    },

    credentials: {
      bleedLeft: "Nak",
      bleedRight: "eba",
      eyebrow: "Education",
      qualification: "BSc Psychology, University of the West Indies",
      details:
        "PACE‑Certified, American Society of Administrative Professionals · Based in Barbados, partnering with founders worldwide",
    },

    caseStudy: {
      eyebrow: "BEKO Creative Studios",
      headline: "How an award-winning creative studio got its",
      headlineTail: "founder out of the middle of everything.",
      situationLabel: "The situation",
      situationHeading:
        "BEKO Creative Studios is an award-winning design and advertising agency in Barbados",
      situation:
        "A talented team, a growing client list, and a founder carrying all of it. Every client request, every follow-up, every team brief ran through Dwayne. The work was strong; the operations behind it depended entirely on him. In his own words: work overload, with too much of his time spent liaising with clients instead of leading the studio.",
      partnershipHeading: "The partnership",
      partnership:
        "I came in on a three-month starting retainer — my standard first step, so both sides confirm the fit before committing long-term. From there, I embedded into the way BEKO works: I became the point of contact between clients, founder, and team — requests, follow-ups, approvals. I brief the lead designers when new work comes in and keep Dwayne briefed on what needs his attention, coordinate and track projects in Asana so nothing lives in memory, and run meetings from scheduling through notes to action-item follow-up. I've built the studio's operational backbone — equipment tracking, a client contact database, and a regional network of creators, from voice actors and photographers to videographers and influencers. And I'm in the room when it matters: client meetings, shoots, and strategy conversations about the studio's growth.",
      changedHeading: "What changed",
      changed:
        "The back-and-forth is minimized. Client follow-ups and scheduling stay on track without the founder chasing them. Briefing the team on every job is off his plate. And the role has grown into something deeper than coordination — executive-level support, trusted with parts of the business the wider team isn't.",
      standingHeading: "Where it stands",
      standing:
        "What began as a three month trial is, nearly a year in, extending into a longterm partnership.",
      testimonialsLabel: "Testimonials",
      quote:
        "Before working with Nakeba, it was work overload — too much of my time went to liaising with clients. Now the back and forth is minimized, client follow-ups and scheduling stay on track, and briefing the team on every job is off my plate. Her role sits at an executive level — she's privy to things the wider team isn't, and that reflects the level of trust we've developed. I see the value, and I can envision a longer partnership",
      quoteAuthor: "Dwayne",
      quoteRole: "Founder, BEKO Creative Studios",
    },

    contact: {
      headline: "Let’s talk about your business.",
      body: "If you’ve read this far, something on this page probably felt familiar.",
      ctaLabel: "Book a clarity call",
      photo: {
        src: "/images/30529.jpg",
        alt: "Portrait of Nakeba Mason, operations partner to creative founders",
      },
    },

    nextStep: {
      aside: "You’ll Leave With Clarity Either Way. That’s The Point.",
      headline:
        "The next step is simple — a 30‑minute call. No pitch, no pressure. Just an honest conversation about where your business is, where things are slipping, and whether working together makes sense.",
    },
  },
};
