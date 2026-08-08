/**
 * THE COLLECTION — five premium website templates.
 *
 * All five live here as structured data. Components read from this file
 * only; no template-specific copy is scattered through the UI. Adding a
 * sixth means appending one entry — every route, listing, order form option,
 * sitemap entry and JSON-LD product picks it up automatically.
 *
 * MEDIA CONVENTIONS
 *   poster        Required. Ships as an art-directed SVG in /public/works.
 *                 Replace with an exported frame of the real build (.avif
 *                 or .webp, 1600x1000) when available.
 *   previewVideo  Optional. Drop an MP4 at /public/works/<slug>/preview.mp4
 *                 and set the path here. Target an 8-12s silent loop,
 *                 1280px wide, under 1.5 MB. `null` is fully supported.
 *   liveDemo      Optional. External URL, opened in a new tab.
 */

export type Availability = "available" | "reserved" | "sold";

export type TemplateTheme = {
  /** Ground colour of the template's own visual world. */
  ground: string;
  /** Its accent, used only inside preview surfaces and small marks. */
  accent: string;
  dark: boolean;
  /** Three words describing the atmosphere. */
  mood: string;
};

export type Template = {
  slug: string;
  /** Display number, e.g. "01". */
  number: string;
  name: string;
  industry: string;
  category: string;
  /** The commercial promise, in one line. */
  tagline: string;
  /** The design idea, in one line. */
  pitch: string;
  /** Who should buy this. */
  bestFor: string[];
  /** Three concrete reasons it sells. */
  highlights: { title: string; body: string }[];
  concept: string[];
  theme: TemplateTheme;
  poster: string;
  posterAlt: string;
  posterAspect: [number, number];
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

export const templates: Template[] = [
  {
    slug: "aurvi",
    number: "01",
    name: "Aurvi",
    industry: "Fine jewellery",
    category: "Jewellery & Luxury Retail",
    tagline:
      "Let customers turn a diamond in their hands before they buy it.",
    pitch: "Jewellery is bought with the eyes and the hands. Online, one of those was missing.",
    bestFor: [
      "Jewellery and watch brands",
      "Made-to-order and bespoke pieces",
      "High-value single products",
      "Showroom brands going online",
    ],
    highlights: [
      {
        title: "A 3D viewer that closes sales",
        body: "Customers rotate the stone, change the metal and watch light move across the facets. It answers the question that normally sends them to a showroom — or closes the tab.",
      },
      {
        title: "Built for high-value carts",
        body: "Certification panels, hallmark detail, care instructions and a bespoke enquiry route, because a ₹2,00,000 purchase needs more reassurance than a buy button.",
      },
      {
        title: "Fewer returns, less doubt",
        body: "Returns come from the gap between what a customer imagined and what arrived. Letting them inspect the real geometry first narrows it.",
      },
    ],
    concept: [
      "Aurvi begins from a commercial problem, not a visual one. A solitaire photographed under studio lighting looks identical across every jeweller in the country. The customer cannot judge cut, depth, or how light actually moves through the stone — so they hesitate, or they go to a showroom.",
      "The build answers that with a real-time 3D product view. The stone sits in the centre of a dark, controlled room. The customer rotates it, changes the metal, changes the setting, and watches the facets respond to light exactly as they would across a counter. Nothing is a rendered video; it is the product itself, live.",
      "Everything else in the interface withdraws to make that possible. The palette is near-black and warm. Type is small and mostly out of the way. There is no carousel, no badge, no urgency banner. The stone is the only bright object on the page.",
    ],
    theme: {
      ground: "#0b0a09",
      accent: "#e8c98a",
      dark: true,
      mood: "Dark, cinematic, tactile",
    },
    poster: "/works/aurvi.svg",
    posterAlt:
      "Aurvi template preview — a faceted solitaire diamond catching light against a near-black studio ground.",
    posterAspect: [1600, 1000],
    previewVideo: null,
    liveDemo:
      "https://raw.githack.com/amanjaiman1/Product_3D/aurvi-jewellery-demo/index.html",
    liveDemoNote: "Opens the live 3D product experience in a new tab. Best on desktop.",
    technology: ["Next.js", "TypeScript", "Three.js", "GSAP", "Custom GLSL", "Tailwind CSS"],
    pages: [
      "Home — cinematic entry",
      "Collection listing with filters",
      "Product detail with 3D viewer",
      "Configurator — metal, setting, carat",
      "Cart and checkout flow",
      "Bespoke enquiry",
      "Craft / about",
      "Care and certification",
    ],
    features: [
      "Real-time 3D product viewer with orbit and zoom",
      "Material switching — yellow, white and rose gold, platinum",
      "Physically-based lighting with dispersion on the stone",
      "Progressive model loading with a poster fallback",
      "Static image path for low-power and reduced-motion devices",
      "Cart, wishlist and enquiry flows",
      "Certification and hallmark detail panels",
      "Structured product data for search results",
    ],
    interactions: [
      {
        title: "Inspect, don't scroll",
        body: "Drag anywhere on the stone to orbit it. Momentum carries and settles. Press to return to the hero angle, so a customer can never get lost in the model.",
      },
      {
        title: "Material change without reload",
        body: "Switching metal cross-fades the material in place rather than swapping a photograph. The stone keeps its position, so the comparison stays honest.",
      },
      {
        title: "Light as a control",
        body: "A slow key light drifts across the facets. It reads as atmosphere, but its real job is showing brilliance — the thing a photograph flattens.",
      },
      {
        title: "Graceful floor",
        body: "On a low-end device or with reduced motion enabled, the viewer resolves to a high-quality still set with manual angle selection. The page never becomes unusable to protect an effect.",
      },
    ],
    performance: [
      { label: "Media strategy", value: "Poster first, model on intent" },
      { label: "3D scene", value: "Single scene, paused when offscreen" },
      { label: "Device pixel ratio", value: "Clamped to 2" },
      { label: "Low-power path", value: "Static image viewer" },
      { label: "Layout stability", value: "Reserved media boxes throughout" },
    ],
    sourcePrice: 9999,
    customFrom: 75000,
    exclusiveAvailable: true,
    availability: "available",
    featured: true,
  },

  {
    slug: "kinetic",
    number: "02",
    name: "Kinetic",
    industry: "Automotive & mobility",
    category: "Automotive & Performance",
    tagline: "A performance brand site with the precision of the engineering it sells.",
    pitch: "Speed is not a blur effect. It is accuracy at every step.",
    bestFor: [
      "Car, bike and EV brands",
      "Performance parts and tuning",
      "Dealerships and test-drive booking",
      "Any product sold on specifications",
    ],
    highlights: [
      {
        title: "Specs that actually persuade",
        body: "Figures are set like instrumentation — tabular, monospaced, stepped into place. The number gets the attention instead of the animation around it.",
      },
      {
        title: "A configurator people finish",
        body: "Trim, wheels and finish change instantly with no reload, and the state lives in the URL so a customer can send their build to someone else.",
      },
      {
        title: "Test drives, booked",
        body: "A validated booking form and a searchable dealer locator, because the point of the site is getting someone into the seat.",
      },
    ],
    concept: [
      "Most automotive sites reach for motion blur and lens flare, which reads as marketing. Kinetic goes the other way: it borrows from instrumentation. Numbers are tabular and monospaced. Specifications are drawn like a data sheet. Rules and tick marks measure the layout the way a gauge measures a range.",
      "The energy comes from timing rather than decoration. Sections arrive on a hard, mechanical curve. Counters step to their value rather than easing into it. Nothing floats.",
      "The result is a site that feels engineered. For a brand selling tolerances and lap times, that is the more persuasive claim.",
    ],
    theme: {
      ground: "#e8e5df",
      accent: "#d8360e",
      dark: false,
      mood: "Mechanical, precise, energetic",
    },
    poster: "/works/kinetic.svg",
    posterAlt:
      "Kinetic template preview — a technical drawing of a brake rotor over measured rules with a vermilion velocity slash.",
    posterAspect: [1600, 1000],
    previewVideo: null,
    liveDemo: null,
    technology: ["Next.js", "TypeScript", "GSAP ScrollTrigger", "Tailwind CSS", "Canvas 2D"],
    pages: [
      "Home — model line-up",
      "Model detail with specification sheet",
      "Configurator — trim, wheels, finish",
      "Technology and engineering",
      "Test-drive booking",
      "Dealer and service locator",
      "News and motorsport",
      "Contact",
    ],
    features: [
      "Scroll-linked specification reveals",
      "Stepped numeric counters with tabular figures",
      "Model comparison table, responsive down to mobile",
      "Colour and wheel configurator with instant preview",
      "Test-drive booking form with validation",
      "Locator with search and filtering",
      "Canvas velocity ribbon, paused offscreen",
    ],
    interactions: [
      {
        title: "The instrument sweep",
        body: "Performance figures resolve on a stepped curve, like a needle finding its value. It draws the eye to the number instead of the animation.",
      },
      {
        title: "Measured layout",
        body: "Tick marks along the section edges align to the grid and shift as you scroll, so the page reads like a calibrated scale.",
      },
      {
        title: "Configurator without reload",
        body: "Colour and wheel changes cross-fade layered assets in place. State is held in the URL, so a configuration can be shared.",
      },
    ],
    performance: [
      { label: "Media strategy", value: "Poster first, video on intent" },
      { label: "Canvas work", value: "Paused offscreen and when hidden" },
      { label: "Configurator assets", value: "Preloaded on hover intent only" },
      { label: "Fonts", value: "Two families, subset, swap" },
      { label: "Layout stability", value: "Fixed aspect media slots" },
    ],
    sourcePrice: 9999,
    customFrom: 75000,
    exclusiveAvailable: true,
    availability: "available",
  },

  {
    slug: "monolith",
    number: "03",
    name: "Monolith",
    industry: "Architecture & interiors",
    category: "Architecture & Design Studios",
    tagline: "A portfolio that presents buildings as spaces, not thumbnails.",
    pitch: "Architecture is organised space. So is a good page.",
    bestFor: [
      "Architecture and interior studios",
      "Property developers",
      "Photographers and galleries",
      "Any practice sold on its portfolio",
    ],
    highlights: [
      {
        title: "Projects at full scale",
        body: "Each project gets the whole screen instead of a grid cell, so the work is judged the way it deserves to be.",
      },
      {
        title: "Drawings treated as content",
        body: "Plans and photographs pair properly with margin annotations, so the craft of the practice is visible, not just the render.",
      },
      {
        title: "Restraint that reads as confidence",
        body: "Almost no motion by design. For a studio whose value is judgement, the absence of decoration is the strongest argument on the page.",
      },
    ],
    concept: [
      "Architecture studios are usually given a grid of thumbnails, which is the least architectural way to present a building. Monolith is built as a sequence of spaces instead. Projects arrive at full height. Captions sit where a drawing would annotate them. Column guides stay faintly visible, as they would on a working sheet.",
      "Type does the heavy structural work: a single large face, set tight, occasionally allowed to run past the edge of the frame the way a title block runs off a print.",
      "Motion is almost entirely absent. Images do not fade in decoratively; they are simply already there, cropped with intent. The restraint is the argument — this studio does not need to animate to hold your attention.",
    ],
    theme: {
      ground: "#cdc8bf",
      accent: "#1c1a17",
      dark: false,
      mood: "Editorial, spatial, brutalist",
    },
    poster: "/works/monolith.svg",
    posterAlt:
      "Monolith template preview — concrete masses casting long diagonal shadows with architectural plan hairlines.",
    posterAspect: [1600, 1000],
    previewVideo: null,
    liveDemo: null,
    technology: ["Next.js", "TypeScript", "GSAP", "Tailwind CSS", "MDX"],
    pages: [
      "Home — selected works",
      "Project index with year and typology",
      "Project detail with drawings and plans",
      "Practice / about",
      "Team",
      "Awards and press",
      "Journal (MDX)",
      "Contact and brief submission",
    ],
    features: [
      "Full-height project sequence",
      "Drawing and photograph pairing with captions",
      "Typology and year filtering on the index",
      "MDX journal for long-form writing",
      "Print-quality typographic scale",
      "Deliberately minimal motion",
      "Brief submission form with file references",
    ],
    interactions: [
      {
        title: "Plan-line grid",
        body: "Column guides fade in as a section is entered and out as it leaves, at very low opacity. It is the only ornament in the build, borrowed from a working drawing.",
      },
      {
        title: "Cropped, not centred",
        body: "Images are deliberately cut by the frame edge, so a photograph feels like part of a larger space rather than a product shot.",
      },
      {
        title: "Caption as annotation",
        body: "Metadata sits in the margin on a leader rule, the way a drawing is annotated. It keeps large images uninterrupted.",
      },
    ],
    performance: [
      { label: "Media strategy", value: "Poster first, no autoplay video" },
      { label: "Motion budget", value: "Minimal by design" },
      { label: "Images", value: "Responsive srcset, lazy below fold" },
      { label: "Journal", value: "Statically rendered from MDX" },
      { label: "Layout stability", value: "Aspect-locked figures" },
    ],
    sourcePrice: 9999,
    customFrom: 75000,
    exclusiveAvailable: true,
    availability: "available",
  },

  {
    slug: "velora",
    number: "04",
    name: "Velora",
    industry: "Skincare & fragrance",
    category: "Beauty & E-commerce",
    tagline: "A skincare store that sells how a product feels, then proves it.",
    pitch: "You cannot photograph a scent. You can build the room it belongs to.",
    bestFor: [
      "Skincare and cosmetics brands",
      "Fragrance and candle makers",
      "Wellness and supplements",
      "Subscription and refill products",
    ],
    highlights: [
      {
        title: "Atmosphere that converts",
        body: "Warm, sensory art direction drawn from raw materials rather than packaging — then it gets out of the way of the ingredient list, which is what actually closes a considered buyer.",
      },
      {
        title: "A routine builder",
        body: "Customers drag products into a morning and evening sequence with conflicts flagged. It answers the real question — what do I use, and in what order — and it raises basket size honestly.",
      },
      {
        title: "Shopify-ready commerce",
        body: "Storefront API integration, subscriptions, reorder flow and sample selection at checkout. Real retail plumbing, not a pretty shell.",
      },
    ],
    concept: [
      "Fragrance and skincare are sensory purchases described with words the customer cannot verify. Velora treats that honestly: instead of claiming, it creates atmosphere and then gets out of the way of the ingredient list.",
      "The palette is drawn from raw material rather than packaging — clay, oil, resin, unbleached paper. Surfaces are soft and warm. Transitions between products dissolve rather than slide, so browsing feels like moving through air.",
      "Underneath the atmosphere it is a disciplined commerce build. Ingredients, concentrations, skin-type guidance and routine sequencing are all first-class content, because that is what converts a considered buyer.",
    ],
    theme: {
      ground: "#e3d3c6",
      accent: "#9d5a3f",
      dark: false,
      mood: "Sensory, organic, atmospheric",
    },
    poster: "/works/velora.svg",
    posterAlt:
      "Velora template preview — soft clay and blush forms dissolving behind the contour of a serum droplet.",
    posterAspect: [1600, 1000],
    previewVideo: null,
    liveDemo: null,
    technology: ["Next.js", "TypeScript", "GSAP", "Tailwind CSS", "Shopify Storefront API"],
    pages: [
      "Home — atmosphere and edit",
      "Shop by concern",
      "Product detail with ingredient breakdown",
      "Routine builder",
      "Fragrance library with note pyramid",
      "Ritual journal",
      "Cart and checkout",
      "Account and reorder",
    ],
    features: [
      "Dissolve transitions between products",
      "Ingredient and concentration tables",
      "Routine builder with morning and evening sequencing",
      "Fragrance note pyramid, keyboard accessible",
      "Shopify Storefront integration",
      "Subscription and reorder flow",
      "Sample selection at checkout",
    ],
    interactions: [
      {
        title: "Dissolve, not slide",
        body: "Moving between products cross-fades on a long curve. It reads as atmosphere and avoids the jarring reflow of a carousel.",
      },
      {
        title: "Routine builder",
        body: "Products are dragged into a morning or evening sequence, with conflicts flagged. It answers the real question — what do I use, and in what order.",
      },
      {
        title: "Note pyramid",
        body: "Top, heart and base notes expand on click, not hover, so the information is reachable on touch and by keyboard.",
      },
    ],
    performance: [
      { label: "Media strategy", value: "Poster first, video on intent" },
      { label: "Blur effects", value: "Pre-composited, not live filters" },
      { label: "Commerce data", value: "Cached at the edge" },
      { label: "Images", value: "AVIF with WebP fallback" },
      { label: "Layout stability", value: "Reserved product media slots" },
    ],
    sourcePrice: 9999,
    customFrom: 75000,
    exclusiveAvailable: true,
    availability: "available",
  },

  {
    slug: "orbital",
    number: "05",
    name: "Orbital",
    industry: "Technology & AI",
    category: "SaaS & Technology",
    tagline: "Explain a complicated product without watering it down.",
    pitch: "Intelligence looks like clarity, not like a glowing gradient.",
    bestFor: [
      "SaaS and AI products",
      "Developer tools and APIs",
      "Fintech and infrastructure",
      "Anyone selling to technical buyers",
    ],
    highlights: [
      {
        title: "Two buyers, one scroll",
        body: "Built to satisfy the engineer evaluating architecture and the executive approving spend, without switching voice halfway down the page.",
      },
      {
        title: "Docs that feel like the product",
        body: "A documentation shell with sidebar, search and MDX changelog sharing the marketing type system — so a developer arriving from search never feels handed to a different company.",
      },
      {
        title: "Diagrams that survive mobile",
        body: "Architecture diagrams reflow to a labelled vertical stack instead of becoming a pinch-to-zoom image. Most technical sites fail exactly here.",
      },
    ],
    concept: [
      "Technology sites tend to hide thin thinking behind gradients and abstract 3D. Orbital assumes the opposite problem: the product is genuinely sophisticated and the site's job is to make it legible to a technical buyer and a commercial one in the same scroll.",
      "The build is cool, close to monochrome, and heavily systematised. Diagrams are drawn as real diagrams. Architecture is shown as architecture. Documentation-grade typography sits beside marketing type without a change of voice.",
      "One restrained motif carries the brand: a set of concentric orbits with a single bright node. It appears in the hero, as a section marker, and as the loading state — one idea used consistently instead of five unrelated effects.",
    ],
    theme: {
      ground: "#101318",
      accent: "#5b8cff",
      dark: true,
      mood: "Futuristic, intelligent, minimal",
    },
    poster: "/works/orbital.svg",
    posterAlt:
      "Orbital template preview — concentric orbit rings over a node grid with a single luminous blue point.",
    posterAspect: [1600, 1000],
    previewVideo: null,
    liveDemo: null,
    technology: ["Next.js", "TypeScript", "GSAP", "Tailwind CSS", "MDX", "Canvas 2D"],
    pages: [
      "Home — product thesis",
      "Platform overview",
      "Architecture and how it works",
      "Use cases by industry",
      "Pricing",
      "Documentation shell",
      "Changelog",
      "Careers",
      "Contact and demo request",
    ],
    features: [
      "System architecture diagrams, responsive and labelled",
      "Documentation shell with sidebar and search",
      "Changelog rendered from MDX",
      "Pricing with monthly and annual states",
      "Demo request form with qualification fields",
      "Canvas orbit motif, single instance, paused offscreen",
      "Dark interface as the primary theme",
    ],
    interactions: [
      {
        title: "One motif, used everywhere",
        body: "The orbit figure is the hero, the section marker and the loading indicator. Repetition builds recognition far faster than variety does.",
      },
      {
        title: "Diagrams that survive mobile",
        body: "Architecture diagrams reflow to a vertical stack with the same labels rather than becoming a pinch-to-zoom image.",
      },
      {
        title: "Docs beside marketing",
        body: "The documentation shell shares the marketing type system, so a developer arriving from a search result never feels handed to a different company.",
      },
    ],
    performance: [
      { label: "Media strategy", value: "Poster first, video on intent" },
      { label: "Canvas work", value: "One instance, paused offscreen" },
      { label: "Device pixel ratio", value: "Clamped to 2" },
      { label: "Docs and changelog", value: "Statically rendered" },
      { label: "Layout stability", value: "Aspect-locked diagrams" },
    ],
    sourcePrice: 9999,
    customFrom: 75000,
    exclusiveAvailable: true,
    availability: "available",
  },
];

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
