# Aevoura

A commercial storefront for premium website templates. Buy the source code, have us launch it, or commission a custom build. Orders are placed by email — there is no payment gateway yet, and the site says so plainly rather than faking a checkout.

The collection currently holds **three** templates, each a real build with a public live demo:

| Template | For | Demo |
| --- | --- | --- |
| **Aabha** | Fine jewellery, sold by telephone | [temp-jwel.vercel.app](https://temp-jwel.vercel.app/) |
| **Section** | Architecture & interiors | [temp-interior.vercel.app](https://temp-interior.vercel.app/) |
| **Point of View** | Personal brand & workshops | [temp-marketing-eight.vercel.app](https://temp-marketing-eight.vercel.app/) |

All three are React + Vite + TypeScript + Tailwind v4 + GSAP + Lenis builds. Aevoura itself is Next.js; the templates it sells are not, and the site states each template's real stack.

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

**Adding a template** means appending one entry to `collection` in `lib/templates.ts`. Numbers, counts, the word form of the count, the footer links, the order-form options, the sitemap, the JSON-LD and the entrance animation all derive from that array.

**Nothing unbuilt gets listed.** Directions we intend to build live in `conceptTemplates` at the bottom of the file and are deliberately rendered nowhere. Every template on the site must be one a visitor can try before paying and we can ship the same week — listing something unbuyable beside something buyable is how a storefront loses trust.

**Selling one exclusively:** set `availability: "sold"`. It drops out of the sitemap, is listed in the licence page's withdrawal register, and the footer count updates. The page is kept rather than deleted, so the record stays honest.

### Media conventions

**Posters** are real 1600×1000 frames captured from the live demos and committed as WebP in `public/works/`. They render through `next/image`, so AVIF and WebP variants and a responsive srcset are generated automatically. Roughly 25–145 KB each; only the first is eager.

**Gallery** frames are optional extra screenshots shown on the template detail page, so a buyer sees more than the hero before paying.

To regenerate after a demo changes:

```bash
npm i -D playwright sharp     # tooling only, not shipped
npx playwright install chromium
node tools/capture.mjs        # -> .raw-shots/*.png  (gitignored)
node tools/optimise.mjs       # -> public/works/*.webp
npm uninstall playwright sharp
```

`tools/capture.mjs` waits out each demo's loader and page intro before shooting, and also prints each site's real headings, nav and computed colours — which is how the copy and the `theme` values in `templates.ts` were written rather than guessed.

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

## The opening

White canvas → a small black dot falls to the centre → it expands until the
screen is black → the site is revealed underneath.

**It plays on every full page load and refresh.** There is deliberately no
session-storage or "once per visit" check anywhere in it. Client-side
navigation does not replay it, because the component never unmounts and
remounts on a route change.

Tuned in `site.intro`:

```ts
intro: { enabled: true, totalMs: 1900 }
```

`totalMs` is the only timing value. Every phase is a fraction of it in
`globals.css`, and the head script publishes it as `--intro-total`.

### The three things that make it work

1. **No flash, ever.** The overlay is server-rendered *before* the site shell,
   and an inline script in `<head>` sets `html[data-intro]` before the body is
   parsed. The overlay's default state is `display: none`, so it is only ever
   shown when that script has opted in.
2. **No-JS and reduced-motion can't be trapped.** Because the attribute is the
   opt-in, a visitor without JavaScript never sees the overlay at all and gets
   the site immediately. The head script also arms a fallback timer that strips
   the attribute regardless of React, so the scroll lock can never stick even if
   hydration fails.
3. **The circle genuinely covers the viewport.** CSS has no `sqrt()` it can rely
   on, so the head script computes `--intro-cover` from the viewport diagonal.
   Verified geometrically (centre-to-furthest-corner ≤ radius) at nine
   viewports from 390×844 to 3840×2160. A flat black layer also reaches full
   opacity at the exact handover frame, so there can never be a white corner
   even if the maths were short.

### One subtle constraint

The reveal animation on `.site-shell` uses `animation-fill-mode: backwards`,
never `forwards`. `backwards` holds the hidden start state through the delay
but lets the element end at its natural state with **no transform left
behind**. A lingering transform would make the shell the containing block for
every `position: fixed` child — breaking the sticky mobile buy bar and the menu
panel. The test suite asserts `shellTransform === "none"` after the sequence for
exactly this reason.

---

## Mobile menu

The panel stays in the DOM and is hidden with `visibility`, not `display` or the
`hidden` attribute — that is what lets it animate *out* as well as in. A display
swap has no closing transition to run. `visibility` also removes it from the tab
order and the accessibility tree while closed; verified by tabbing 26 stops and
asserting focus never enters it.

The header sits above the panel (`z-70` vs `z-60`), so the hamburger stays
visible and its two lines rotate into an X rather than being covered by a second
close button. The trade-off is that the close control lives outside the dialog,
so the toggle is passed into the panel and spliced into the focus cycle first —
Shift+Tab from the top of the menu lands on it.

Links stagger in at 45ms intervals. Everything collapses to 1ms under reduced
motion.

---


## Scroll behaviour

`components/chrome/ScrollManager.tsx` owns this. Two opposite jobs:

- **Forward navigation** pins the document to the very top.
- **Back / forward** returns the visitor to where they were.

Four things in it are load-bearing:

1. **Never add `scroll-behavior: smooth` to `html`.** It silently breaks the App
   Router: Next resets scroll with a programmatic scroll, and a global smooth
   behaviour turns that into an animation the router does not wait for — so every
   client-side navigation lands on the new page at the *previous* page's scroll
   position, and back/forward stops restoring. There are only two in-page anchors
   on this site (the skip link and the order form's error summary) and an instant
   jump is correct for both, so nothing is lost.
2. The reset runs inside a **double `requestAnimationFrame`** so it lands after
   the router's own scroll. A single frame loses the race and you land ~15px short,
   which clips the top of the rounded hero panel.
3. Restoration **re-applies until the position holds** for a few frames, and waits
   for the page to grow tall enough as images arrive. It yields immediately if the
   visitor touches the scrollbar.
4. Positions are recorded **on the scroll event and when a link is activated, and
   nowhere else.** Recording in the effect cleanup looks sensible but is wrong: by
   then the router has already scrolled the outgoing page, so it stores the
   router's landing position instead of where the visitor was — which quietly
   turns restoration into "restore to 15px".

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
5. Nothing else — all three templates already have public live demos wired

**Note on the demos:** all three are live Vercel deployments and open in a new tab. None sets `X-Frame-Options`, so they *could* be embedded — but a new tab is still the right call: each template runs its own Lenis smooth-scroll and pinned scroll scenes, which fight an iframe.
