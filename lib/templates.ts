/**
 * THE COLLECTION — the templates that actually exist.
 *
 * Every entry here is a real, finished build with a public live demo. Nothing
 * in this array is a concept or a mock-up: if it is listed, it can be
 * demonstrated, bought and delivered today. Ideas that are not built yet live
 * in `conceptTemplates` at the bottom of this file and are deliberately not
 * rendered anywhere — listing something unbuyable next to something buyable is
 * how a storefront loses trust.
 *
 * Adding a template: append one entry. Every route, listing, order-form option,
 * sitemap entry and JSON-LD product derives from this array, and the counts and
 * the entrance animation follow automatically.
 *
 * MEDIA
 *   poster    Required. A real 1600x1000 frame of the live build, WebP.
 *             Regenerate with `capture.mjs` + `optimise.mjs` when a demo changes.
 *   gallery   Optional extra frames, shown on the template detail page.
 *   preview   Optional MP4 loop at /public/works/<slug>/preview.mp4.
 */

export type Availability = "available" | "reserved" | "sold";

export type TemplateTheme = {
  /** Ground colour of the template's own visual world, measured from the build. */
  ground: string;
  /** Its accent, used only inside preview surfaces and small marks. */
  accent: string;
  dark: boolean;
  /** Three words describing the atmosphere. */
  mood: string;
};

export type Template = {
  slug: string;
  /** Display number, e.g. "01". Derived positionally below. */
  number: string;
  name: string;
  /** The demo brand the template ships configured as. */
  demoBrand: string;
  industry: string;
  category: string;
  /** The commercial promise, in one line. */
  tagline: string;
  /** The design idea, in one line. */
  pitch: string;
  bestFor: string[];
  /** Three concrete reasons it sells. All verifiable in the live demo. */
  highlights: { title: string; body: string }[];
  concept: string[];
  theme: TemplateTheme;
  poster: string;
  posterAlt: string;
  posterAspect: [number, number];
  gallery?: { src: string; alt: string }[];
  previewVideo: string | null;
  liveDemo: string | null;
  liveDemoNote?: string;
  technology: string[];
  pages: string[];
  features: string[];
  interactions: { title: string; body: string }[];
  performance: { label: string; value: string }[];
  sourcePrice: number;
  customFrom: number;
  exclusiveAvailable: boolean;
  availability: Availability;
  featured?: boolean;
};

const collection: Omit<Template, "number">[] = [
  /* ══════════════════════════════════════════════════════════════════
     AABHA — fine jewellery, sold by telephone
     ══════════════════════════════════════════════════════════════════ */
  {
    slug: "aabha",
    name: "Aabha",
    demoBrand: "Aabha — a Johari Bazaar jewellery house",
    industry: "Fine jewellery",
    category: "Jewellery & Luxury Retail",
    tagline: "A jewellery house that closes on the telephone, not in a cart.",
    pitch:
      "Gold is weighed on the day, in the room, with the client watching. A checkout would be a lie.",
    bestFor: [
      "Jewellery houses and bridal ateliers",
      "Made-to-order and by-weight pricing",
      "Showrooms that close in person",
      "Any brand whose sale ends in a phone call",
    ],
    highlights: [
      {
        title: "No cart, by design",
        body: "Every action on the site ends in a telephone call. An appointment drawer opens from any CTA, leads with Call, then WhatsApp and email, and only then offers a callback request — five fields, no slot picker pretending to know your diary.",
      },
      {
        title: "Four houses from one codebase",
        body: "Four complete art directions ship in the box. One build command produces the same site for a different jewellery house — palette, typography, photography and copy all swap from a client config file. No component holds client content.",
      },
      {
        title: "Prices shown, pressure absent",
        body: "Prices are visible so a client knows the neighbourhood before ringing, but nothing is purchasable. No countdowns, no discount codes, no urgency banners — the things that make a serious buyer distrust a jeweller.",
      },
    ],
    concept: [
      "Aabha starts from a commercial fact rather than a visual one: a jewellery house that sells uncut polki and hand-drawn 22k does not sell from a screen. Gold is weighed on the day, the piece is worn, and the price is decided in the room. A cart on that business is dishonest, and buyers can feel it.",
      "So the entire site is built to produce one outcome — a telephone call. The number sits in the navigation capsule at every scroll position, set large in the footer, and a sticky call bar appears on phones once the hero is behind you. Saved pieces are the pieces that will physically be out of the case when the client arrives, and they travel into the appointment drawer with them.",
      "The art direction is warm-paper editorial: an ivory ground, warm ink that is never black, an oxblood accent, cream bands and a cocoa footer. Cormorant Garamond sets the display voice in sentence case; Jost handles the functional type. Controls are pills; everything else is square. Motion is deliberately restrained to three moves in the whole site, because this direction earns its quality from typography, photography and whitespace rather than from choreography.",
    ],
    theme: {
      ground: "#FBF7F0",
      accent: "#5D0412",
      dark: false,
      mood: "Warm, editorial, unhurried",
    },
    poster: "/works/aabha.webp",
    posterAlt:
      "Aabha template — a full-bleed bridal portrait in polki and 22k gold behind the line 'Wear the light you were given', with call-to-book and request-a-callback controls.",
    posterAspect: [1600, 1000],
    gallery: [
      {
        src: "/works/aabha-2.webp",
        alt: "Aabha template — the explore-by-category mosaic, a five-tile grid on warm paper.",
      },
      {
        src: "/works/aabha-3.webp",
        alt: "Aabha template — the collections band in cream, with four edits and their prices.",
      },
    ],
    previewVideo: null,
    liveDemo: "https://temp-jwel.vercel.app/",
    liveDemoNote:
      "The live demo is configured as Aabha. Three further art directions ship in the same codebase.",
    technology: [
      "React 19",
      "Vite",
      "TypeScript",
      "Tailwind CSS v4",
      "GSAP ScrollTrigger",
      "Lenis",
      "React Router",
    ],
    pages: [
      "Home — hero, mosaic, collections, arrivals, story, invitation",
      "Shop with bilingual filters",
      "Product detail with call and callback actions",
      "Collections",
      "Our story",
      "Journal index",
      "Journal entry",
      "Visit & appointments",
      "404",
    ],
    features: [
      "Appointment drawer, opened from any CTA and aware of the piece asked about",
      "Sticky call bar on phones once the hero is passed",
      "Saved pieces that travel into the appointment request",
      "Four client art directions from one codebase",
      "Catalogue with bilingual filters and gold-weight notes",
      "Five-tile category mosaic on a measured grid",
      "New-arrivals snap rail",
      "Three appointment rooms with their own weeks and numbers",
      "SEO component, error boundary and a single image primitive",
    ],
    interactions: [
      {
        title: "The appointment drawer",
        body: "Any call to action opens the same drawer, noting which piece prompted it. Call comes first, then WhatsApp and email, and a callback request last — because the fastest close is the phone, not a form.",
      },
      {
        title: "Three moves, and no more",
        body: "A block rises 24px and fades once as it enters; display type rises out of its own mask line by line; imagery eases 4.5% on hover in CSS. That is the entire motion vocabulary. No pinning, no horizontal hijack, no loader, no page-transition curtain.",
      },
      {
        title: "A weighted glide",
        body: "Lenis runs at a heavy lerp with touch synchronised, so a flick on a phone decelerates on the same model as a desktop wheel. One 5% drift on the tall story portrait is the only parallax in the build.",
      },
      {
        title: "Reduced motion removes the choreography, not the content",
        body: "With reduced motion enabled the three moves resolve to their end state and everything else is untouched. Nothing is gated behind an animation.",
      },
    ],
    performance: [
      { label: "Framework", value: "Vite build, static output" },
      { label: "Motion budget", value: "Three moves, site-wide" },
      { label: "Media strategy", value: "Single image primitive, semantic keys" },
      { label: "Reduced motion", value: "End state, full content" },
      { label: "Client swap", value: "One config file, one build flag" },
    ],
    sourcePrice: 9999,
    customFrom: 75000,
    exclusiveAvailable: true,
    availability: "available",
    featured: true,
  },

  /* ══════════════════════════════════════════════════════════════════
     SECTION — architecture and interiors, drawn as a building section
     ══════════════════════════════════════════════════════════════════ */
  {
    slug: "section",
    name: "Section",
    demoBrand: "Mātra — an eleven-person practice in New Delhi",
    industry: "Architecture & interiors",
    category: "Architecture & Design Studios",
    tagline: "A studio portfolio drawn like a building section, not a grid of thumbnails.",
    pitch: "Architecture is organised space. The page is set out the same way.",
    bestFor: [
      "Architecture practices",
      "Interior and spatial design studios",
      "Developers presenting completed work",
      "Any practice judged on its portfolio",
    ],
    highlights: [
      {
        title: "A homepage that runs as one film",
        body: "Twelve scenes in a continuous descent: the entrance, the position, a typographic index of the work, a lateral walk past the portfolio, materials opened like sample panels, twelve hours of light on one wall, a draggable before-and-after, and a 1:200 plan that draws itself.",
      },
      {
        title: "The datum rail",
        body: "A rail down the left edge carries a travelling level marker and a live elevation reading — ±0.00, +3.60, +7.20 — for whichever scene you are standing in. Press G and the setting-out grid the whole page is composed on appears.",
      },
      {
        title: "Project pages built as publications",
        body: "Opening, statement, a lateral image sequence, the rooms, record and plan, gallery, then a full-bleed reveal of the next building. A project is presented, not thumbnailed.",
      },
    ],
    concept: [
      "Architecture studios are usually handed a grid of thumbnails, which is the least architectural way to present a building. Section is drawn as a sequence of spaces instead: the homepage is one continuous film in twelve scenes, and the scroll behaves like a descent through a section drawing rather than a list of components.",
      "The conceit is carried by the datum rail — a hairline down the left edge with a travelling level marker and an elevation reading that belongs to the scene you are in. It is not decoration; it tells you where you are in a page that deliberately has no visible section boundaries. Press G and the setting-out grid appears, the way an architect would turn on guides.",
      "Everything client-specific lives in config and data files, so the demo practice can be replaced without touching a component. The type is a grotesque paired with a high-contrast serif, on a warm grey ground that reads like drawing paper rather than a screen.",
    ],
    theme: {
      ground: "#E6E4DD",
      accent: "#1C1D19",
      dark: false,
      mood: "Measured, cinematic, architectural",
    },
    poster: "/works/section.webp",
    posterAlt:
      "Section template — 'Architecture in Measure' set over a dusk photograph of a timber and glass house, with a datum rail and coordinates down the left edge.",
    posterAspect: [1600, 1000],
    gallery: [
      {
        src: "/works/section-2.webp",
        alt: "Section template — the position scene, 'We don't fill space. We measure light.', with a +1.20 elevation reading on the datum rail.",
      },
      {
        src: "/works/section-3.webp",
        alt: "Section template — the material specification scene, six materials presented as opened sample panels.",
      },
    ],
    previewVideo: null,
    liveDemo: "https://temp-interior.vercel.app/",
    liveDemoNote:
      "Best on a desktop browser — the pinned scenes and the G-key grid are desktop behaviours, and mobile gets purpose-built vertical chapters instead.",
    technology: [
      "React 19",
      "Vite",
      "TypeScript",
      "Tailwind CSS v4",
      "GSAP ScrollTrigger",
      "Lenis",
      "React Router",
    ],
    pages: [
      "Home — twelve continuous scenes",
      "Work index",
      "Project detail, built as a publication",
      "Studio",
      "Journal",
      "Contact",
      "404",
    ],
    features: [
      "Datum rail with travelling level marker and live elevation readings",
      "Press G to reveal the setting-out grid",
      "Vertical scroll becomes a lateral walk past the portfolio",
      "Six materials opened as specification sample panels",
      "Twelve hours of light on one wall in a single scroll",
      "Draggable before-and-after threshold",
      "A 1:200 plan that draws itself: grid, plan, structure, material, space",
      "Custom cursor, loader and page transitions",
      "Journal, awards record and client statements",
    ],
    interactions: [
      {
        title: "The elevation reading",
        body: "The rail's marker travels with you and the elevation changes per scene. It replaces the section headings a page like this cannot have without breaking the film.",
      },
      {
        title: "Passage",
        body: "One scene converts vertical scroll into a lateral walk past the portfolio, so the work is passed rather than clicked through.",
      },
      {
        title: "The drawing",
        body: "A plan assembles itself in five ordered stages. It is the clearest possible demonstration that the practice thinks in drawings, and it costs the visitor nothing to watch.",
      },
      {
        title: "Threshold",
        body: "Before and after, cut by a hairline you drag. The most persuasive thing an interiors studio owns, given a control instead of two photographs side by side.",
      },
    ],
    performance: [
      { label: "Framework", value: "Vite build, static output" },
      { label: "Pinned scenes", value: "Desktop only, via matchMedia" },
      { label: "Mobile", value: "Purpose-built vertical chapters" },
      { label: "Animated properties", value: "Transform, opacity, clip-path" },
      { label: "Reduced motion", value: "Static end state per scene" },
    ],
    sourcePrice: 9999,
    customFrom: 75000,
    exclusiveAvailable: true,
    availability: "available",
  },

  /* ══════════════════════════════════════════════════════════════════
     POINT OF VIEW — personal brand and workshops, email-first
     ══════════════════════════════════════════════════════════════════ */
  {
    slug: "point-of-view",
    name: "Point of View",
    demoBrand: "Rhea Malik — a digital strategist and educator",
    industry: "Personal brand & workshops",
    category: "Creators, Coaches & Educators",
    tagline: "A personal-brand site engineered to fill a workshop by email.",
    pitch: "The product is not the content. It is a point of view worth paying for.",
    bestFor: [
      "Educators, coaches and consultants",
      "Workshops, cohorts and paid communities",
      "Creators selling expertise rather than a product",
      "Anyone launching before they have a payment stack",
    ],
    highlights: [
      {
        title: "Email-first conversion, no checkout required",
        body: "Every call to action opens a pre-written email with the intent already filled in. No payment gateway, no accounts, no back end — which is exactly how you sell the first three cohorts before you have any of that.",
      },
      {
        title: "Five themes, one codebase",
        body: "Editorial ink, electric creator, minimal intelligence, bold orange and monochrome. Colour tokens are semantic and cascade per section, so any single section can flip to a dark scheme with one attribute and every child follows.",
      },
      {
        title: "Twenty sections of argument",
        body: "Problem, transformation, positioning test, idea machine, curriculum, outcomes, case studies, opinion ticker, FAQ. It is a sales page written as an editorial magazine, built to be rebranded for a different educator without touching a component.",
      },
    ],
    concept: [
      "Most personal-brand sites are a headshot, three testimonials and a Calendly link. Point of View treats the page as the argument: it opens by naming the reader's actual problem — posting constantly and being forgotten — and then walks through the shift from producing content to holding a position worth remembering.",
      "The conversion mechanic is deliberately email. Every CTA composes a message with the intent already written, so the visitor's only job is to press send. For an educator selling a workshop that is not a limitation, it is a shorter funnel than a checkout — and it means the site can go live and start earning before any payment infrastructure exists.",
      "Visually it is an editorial magazine: a heavy grotesque in full caps, an italic serif for the turn in each sentence, monospaced eyebrows, monochrome photography and a single acid highlight that marks the words that matter. Five themes ship in the box, and the demo persona's statistics, testimonials and case studies are flagged as placeholders in source and disclosed in the site's own footer.",
    ],
    theme: {
      ground: "#F2EFE7",
      accent: "#D9FF40",
      dark: false,
      mood: "Bold, editorial, high-contrast",
    },
    poster: "/works/pointofview.webp",
    posterAlt:
      "Point of View template — 'You don't need more content. You need a better point of view' in heavy caps with an acid-lime highlight, beside a monochrome portrait.",
    posterAspect: [1600, 1000],
    gallery: [
      {
        src: "/works/pointofview-2.webp",
        alt: "Point of View template — the transformation section, contrasting random content with a recognisable point of view.",
      },
      {
        src: "/works/pointofview-3.webp",
        alt: "Point of View template — the workshop poster section, set as an editorial cover.",
      },
    ],
    previewVideo: null,
    liveDemo: "https://temp-marketing-eight.vercel.app/",
    liveDemoNote:
      "The demo persona, statistics, testimonials and case studies are fictional placeholders — flagged in the source and disclosed in the demo's own footer.",
    technology: [
      "React 19",
      "Vite",
      "TypeScript",
      "Tailwind CSS v4",
      "GSAP ScrollTrigger",
      "Lenis",
      "React Router",
    ],
    pages: [
      "Home — twenty-section conversion experience",
      "Workshops — upcoming editions and archive",
      "Workshop detail, twelve conversion beats",
      "Thinking — essay index with category filter",
      "Article",
      "About — story, timeline, beliefs",
      "Contact — four prewritten intents",
      "404",
    ],
    features: [
      "Email-first CTAs with prewritten intents",
      "Five switchable themes with semantic colour tokens",
      "Per-section dark schemes via one data attribute",
      "Twelve GSAP hooks: line and text reveals, parallax, pinning, marquee, count-up, magnetic, cursor",
      "Hand-written text splitter that preserves nested markup",
      "Workshop pages with curriculum, outcomes and FAQ",
      "Essay index with category filtering",
      "Placeholder demo content flagged in source and disclosed in the footer",
    ],
    interactions: [
      {
        title: "The positioning test",
        body: "An interactive section that makes the reader diagnose their own problem before being sold the fix. It is the highest-intent moment on the page and it is not a form.",
      },
      {
        title: "The highlight sweep",
        body: "The acid marker draws across the phrase that carries the argument, on a scroll trigger. One effect, used only where the sentence turns.",
      },
      {
        title: "Prewritten email intents",
        body: "Four contact intents compose four different emails. The visitor never has to work out what to say, which is the real reason enquiry forms go unfinished.",
      },
      {
        title: "Reduced motion resolves, never removes",
        body: "Every hook wraps a GSAP context, animates only transform, opacity and clip-path, cleans up its triggers on unmount, and resolves to a static end state under reduced motion. Pinned scenes are desktop-only; mobile gets purpose-built vertical chapters.",
      },
    ],
    performance: [
      { label: "Framework", value: "Vite build, static output" },
      { label: "Animated properties", value: "Transform, opacity, clip-path" },
      { label: "Pinned scenes", value: "Desktop only, via matchMedia" },
      { label: "Photography", value: "Rendered monochrome in CSS" },
      { label: "Reduced motion", value: "Static end state per hook" },
    ],
    sourcePrice: 9999,
    customFrom: 75000,
    exclusiveAvailable: true,
    availability: "available",
  },
];

/** Numbers are positional, so reordering the array renumbers the collection. */
export const templates: Template[] = collection.map((template, i) => ({
  ...template,
  number: String(i + 1).padStart(2, "0"),
}));

/* ── derived, so nothing hard-codes the size of the collection ── */

export const templateCount = templates.length;

const NUMBER_WORDS = [
  "zero", "one", "two", "three", "four", "five",
  "six", "seven", "eight", "nine", "ten",
];

export const templateCountWord =
  NUMBER_WORDS[templateCount] ?? String(templateCount);

export const liveDemoCount = templates.filter((t) => t.liveDemo).length;

/** Honest, shared statement used wherever performance is discussed. */
export const performanceStatement =
  "Every template is tested on a mid-range Android device and a throttled connection before delivery. We publish the techniques rather than a screenshot of a score, because a score measured on our hardware tells you nothing about yours.";

export function getTemplate(slug: string): Template | undefined {
  return templates.find((t) => t.slug === slug);
}

export function getFeaturedTemplate(): Template {
  return templates.find((t) => t.featured) ?? templates[0];
}

/** The rest of the collection, in order, wrapping around. */
export function getRelatedTemplates(slug: string, count = 2): Template[] {
  const index = templates.findIndex((t) => t.slug === slug);
  if (index === -1) return templates.slice(0, count);
  return [...templates.slice(index + 1), ...templates.slice(0, index)].slice(0, count);
}

export function getAdjacentTemplate(slug: string, direction: 1 | -1): Template {
  const index = templates.findIndex((t) => t.slug === slug);
  const next = (index + direction + templates.length) % templates.length;
  return templates[next];
}

export const availabilityLabel: Record<Availability, string> = {
  available: "Available now",
  reserved: "Reserved",
  sold: "Sold exclusively",
};

/* ══════════════════════════════════════════════════════════════════════
   NOT BUILT YET

   Directions we intend to build. These are ideas, not products: there is
   no code, no demo and nothing to deliver, so they are intentionally not
   rendered anywhere on the site. Every listed template must be one a
   visitor can try before paying and we can ship the same week.

   To promote one: build it, publish a demo, capture a poster with
   capture.mjs + optimise.mjs, and move it into `collection` above.
   ══════════════════════════════════════════════════════════════════════ */

export type ConceptTemplate = {
  slug: string;
  name: string;
  industry: string;
  note: string;
};

export const conceptTemplates: ConceptTemplate[] = [
  {
    slug: "kinetic",
    name: "Kinetic",
    industry: "Automotive & performance",
    note: "Specification sheets set like instrumentation, plus a shareable configurator.",
  },
  {
    slug: "velora",
    name: "Velora",
    industry: "Skincare & fragrance",
    note: "Sensory commerce with a routine builder and Shopify Storefront integration.",
  },
  {
    slug: "orbital",
    name: "Orbital",
    industry: "SaaS & technology",
    note: "A technical product explained to an engineer and a buyer in one scroll.",
  },
];
