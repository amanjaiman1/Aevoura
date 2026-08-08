# Aevoura

A commercial storefront for five premium website templates. Buy the source code, have us launch it, or commission a custom build. Orders are placed by email — there is no payment gateway yet, and the site says so plainly rather than faking a checkout.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · GSAP 3
**No environment variables required.** Nothing to configure to run or deploy.

---

## Where to change things

Everything a non-developer needs to edit is centralised. No component contains a price, an email address or a template description.

| To change | Edit |
| --- | --- |
| Brand name, contact email, promises, navigation, social links | `lib/site.ts` |
| Prices, plans, add-on options, budget bands, upgrade credit | `lib/pricing.ts` |
| The five templates — all copy, media, features, availability | `lib/templates.ts` |
| FAQ content (ordering, templates, custom build, licence) | `lib/faq.ts` |
| The order email format | `lib/order.ts` |
| Colour, type, radii, shadows, motion | `@theme` block in `app/globals.css` |

**The order inbox is one string:** `site.contact.email`. Change it and every order, mailto link and Gmail fallback follows.

---

## How ordering works

There is no back end. `/buy` composes a complete, structured email and hands it to the visitor's mail client, addressed to `site.contact.email`.

`mailto:` fails silently for anyone without a desktop mail client, so every order produces **three** routes and the confirmation screen shows all of them:

1. **The mail app**, opened automatically on submit
2. **Gmail web compose**, one click — most of the market is on Gmail
3. **Copy to clipboard**, to paste into any client or send over WhatsApp

The confirmation screen also shows a reference code and the exact text that will be sent, so nothing is hidden and nothing is lost if step 1 does nothing.

The order email contains: template, plan, indicative price, add-ons, budget, launch date, name, email, phone, company, website and notes. The reply can be an invoice rather than a list of questions.

Spam is not a concern here because nothing is submitted to a server — the visitor sends the mail themselves.

### Adding a payment gateway later

`lib/order.ts` is the only file that needs to change. `composeOrder()` already returns a structured object; point it at Razorpay or Stripe instead of building a `mailto:` and the rest of the interface is unaffected. Free-text notes are capped at 900 characters so the current mail body stays inside what clients reliably accept.

---

## The template data model

`lib/templates.ts` is the single source of truth. Every route, listing, order-form option, sitemap entry and JSON-LD product derives from it.

**Adding a sixth template** means appending one entry. Nothing else needs touching.

**Selling one exclusively:** set `availability: "sold"`. It drops out of the sitemap, is listed in the licence page's withdrawal register, and the footer count updates. The page is kept rather than deleted, so the record stays honest.

### Media conventions

**Posters** (required) live at `public/works/<slug>.svg`. They are hand-authored placeholders — an art-directed visual world per template, not stock photography. A few kilobytes each, no image optimiser needed, and they cannot shift layout.

To replace one with a real frame: export at 1600×1000 as `.avif` or `.webp`, update `poster` and `posterAspect`, and switch the `<img>` in `components/templates/PreviewMedia.tsx` to `next/image` (`next.config.ts` is already configured).

**Preview video** (optional) goes at `public/works/<slug>/preview.mp4`, referenced from `previewVideo`. Target an 8–12 second silent loop, 1280px wide, under 1.5 MB. `null` is fully supported and is the current state.

The video layer is already built: the `<video>` element is not created until wanted, never downloads on a low-power or metered connection until asked, pauses when it leaves the viewport or the tab is hidden, and always has a visible play control so it is never hover-only.

---

## Design system

Warm and rounded rather than editorial. Ink is a warm brown-black, never pure black.

- **Grounds** `#f7f7f8` page, `#ffffff` surfaces, `#050505` dark panels
- **Ink** `#39332d`, muted `#837c73`, rules `#e3e0de`
- **Accent** crimson `#fa294f` — reserved for the single most important action on a screen
- **Endorsement** teal `#007864` — "most popular", checkmarks. Keeps the crimson meaning "act"
- **Type** Comfortaa (display) + DM Sans (interface) + Geist Mono (figures)
- **Radii** 12 / 20 / 28 / full · **Buttons** always fully rounded pills

### Two cascade traps worth knowing about

Both of these bit this codebase and are now fixed with comments explaining why:

1. **Base element resets live in `@layer base`.** Unlayered rules outrank Tailwind's utilities layer, so an unlayered `a { color: inherit }` or `button { color: inherit }` silently defeats every `text-*` utility — and `h1 { font-weight: 700 }` defeats `font-normal`.
2. **`.link-rule` and `.card` live in `@layer components`.** An unlayered `display: inline-block` there beat `inline-flex` and put wrapped arrows on their own line.

---

## Motion

Three modes and only three — **archive** (labels, metadata), **reveal** (sections and media), **action** (buttons, prices, forms). One runtime drives every entrance; sections stay server-rendered and declare intent with data attributes:

```tsx
<Reveal variant="up" mode="reveal">…</Reveal>
<LineMask lines={["Premium websites,", "ready to launch."]} />
```

GSAP is dynamically imported and absent from the initial bundle.

### Safety net

Reveal state sits behind a `.js-motion` class added pre-paint by an inline script, and only when the visitor has not asked for reduced motion. So:

- **No JavaScript** → the class is never added, all content visible
- **Reduced motion** → the class is never added, all content visible
- **GSAP fails to load** → a 3-second failsafe strips the class

There is no state in which content stays invisible. Hero media is deliberately *not* scroll-revealed — a hero image that needs a scroll to appear is a broken hero image.

---

## The entrance

A dark stage holds the mark while a counter steps 01 → 05, then the screen
splits into five panels that lift away with a crimson leading edge to reveal
the site. Five panels, five templates.

Tuned in `site.intro`:

```ts
intro: { enabled: true, oncePerSession: true, holdMs: 1120 }
```

- **`enabled`** turn it off entirely
- **`oncePerSession`** returning visitors skip it
- **`holdMs`** how long the mark holds before the panels part

### Why the exit runs on CSS, not JavaScript

The overlay is server-rendered. If its removal depended on a React effect,
a visitor with JavaScript disabled would sit behind a permanent dark screen
with the whole site behind it — which is exactly the bug an earlier version of
this had. So the panels lift on a CSS delay by default, and JavaScript only
ever makes it leave *sooner* (on any key, click or scroll) before dropping the
node from the tree.

Three further details worth keeping if you edit it:

- `#aevoura-boot` is **transparent**. The five panels are the cover. If the
  container carried the dark colour too, lifting the panels would reveal *it*
  rather than the page and the reveal would look like nothing happened.
- The container retires with a **transform**, not `visibility: hidden` —
  visibility is a discrete property and does not reliably hold under
  `animation-fill-mode: forwards`.
- The counter shows 01–05, the real template count. It is not a fake progress
  percentage, because there is nothing genuine to measure.

Skipped entirely under `prefers-reduced-motion`. Content renders underneath the
whole time, so nothing waits on it.

---

## Accessibility

- FAQ uses native `<details>` — keyboard operable, works with no JS, findable by in-page search
- The mobile drawer is a proper dialog: labelled, modal, focus moved in and restored, Tab cycled, Escape to dismiss, background scroll locked
- Order form: real radio groups and fieldsets, errors bound with `aria-describedby` and `aria-invalid`, a focused error summary linking to each field, success announced politely
- Tab order: skip link → navigation → content
- Touch targets clear 44px. Nothing important is behind a hover
- Sticky mobile buy bar keeps price and Buy one thumb-tap away on template pages

---

## Remaining external configuration

1. Replace `site.url` in `lib/site.ts` with the production origin — Open Graph, canonicals and the sitemap derive from it
2. Add real URLs to `site.social` — entries with an empty `href` render as inactive text
3. Optionally set `site.contact.phone` to show a call button in the header
4. Add an Open Graph image at `app/opengraph-image.png` (1200×630)
5. Populate `liveDemo` for templates 02–05 as their demos are hosted

**Note on the Aurvi demo:** the URL is wired and opens in a new tab. It sends `X-Frame-Options: SAMEORIGIN`, so it can never be embedded in an iframe — a new tab is the only viable route.
