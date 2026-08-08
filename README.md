# Aevoura

A curated platform for a finite collection of website experiences. Edition 001 holds five works, each purchasable as source, deployable by us, or rebuildable around a brand.

The governing design principle is **quiet architecture, loud exhibits**: the platform is the gallery, the works are the artwork. If the interface ever competes with a preview, the interface is wrong.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · GSAP 3

---

## Where to change things

Everything a non-author needs to edit is centralised. No component contains a price, an email address or a work description.

| To change | Edit |
| --- | --- |
| Brand name, domain, email, edition number, social links, navigation | `lib/site.ts` |
| Prices, engagement tiers, care plan, budget bands, upgrade credit | `lib/pricing.ts` |
| The five works — all copy, media, features, availability | `lib/works.ts` |
| FAQ content (work, custom-build, licence) | `lib/faq.ts` |
| Colour, type scale, spacing, easings, durations, layering | `@theme` block in `app/globals.css` |
| Motion timings used by GSAP | `lib/motion.ts` |
| Enquiry delivery provider | `.env.local` — see `.env.example` |

Renaming the platform is one string: `site.wordmark`. Shipping Edition 002 is one string: `site.edition`.

---

## The collection data model

`lib/works.ts` is the single source of truth. Every route, index, rail tick, related-works block, sitemap entry and JSON-LD product is derived from it.

**Adding a sixth work** means appending one `Work` entry. Nothing else needs touching — the archive rail grows a tick, `/collection/[slug]` gets a page, the sitemap picks it up. The one thing to review is `components/home/CollectionSequence.tsx`, where the five homepage layouts are authored by hand on purpose; a sixth entry reuses the first composition unless you add another.

**Selling a work exclusively:** set `availability: "withdrawn"`. It drops out of the sitemap, is marked as withdrawn in the licence register, and the footer count updates. The page is deliberately kept rather than deleted, so the record of the edition stays honest.

### Media conventions

**Posters** (required) live in `public/works/<slug>.svg`. They are hand-authored placeholders — an art-directed visual world per work, not stock photography. Each is a few kilobytes, needs no image optimiser, and cannot shift layout.

To replace one with a real frame of the built site: export at 1600×1000, save as `.avif` or `.webp`, update `poster` and `posterAspect`, and switch the `<img>` in `components/work/PreviewMedia.tsx` to `next/image` (the config in `next.config.ts` is already set up for it).

**Preview video** (optional) goes at `public/works/<slug>/preview.mp4`, referenced from `previewVideo`. Target an 8–12 second silent loop, 1280px wide, under 1.5 MB. `null` is fully supported and is the current state — the poster simply stands alone.

The video layer is already built: the `<video>` element is not created until wanted, never downloads on a low-power or metered connection until asked, pauses when it leaves the viewport or the tab is hidden, and always has a visible play control so it is never hover-only.

---

## Motion

Three modes, and only three. Anything animated must belong to one, which is what stops the site accumulating unrelated effects.

- **Archive** — precise, typographic. Metadata, counters, labels, navigation, rail.
- **Exhibition** — slow, cinematic. Large previews, the aperture, work transitions.
- **Commerce** — fast, reassuring. Buttons, prices, forms, CTAs.

`components/motion/MotionRuntime.tsx` is the only animation runtime. Sections stay server-rendered and declare intent with data attributes:

```tsx
<Reveal variant="up" mode="exhibition">…</Reveal>
<LineMask lines={["First line", "Second line"]} />
<dd data-counter="5" data-counter-pad="2">05</dd>
<div data-parallax="16">…</div>
```

GSAP is dynamically imported, so it never blocks first paint and never appears in the initial bundle.

### Safety net

Elements marked for reveal are hidden by CSS behind a `.js-motion` class, which an inline script in `app/layout.tsx` adds before first paint — and only when the visitor has not asked for reduced motion. So:

- **No JavaScript** → the class is never added, all content is visible.
- **Reduced motion** → the class is never added, all content is visible.
- **GSAP fails to load** → a 3-second failsafe strips the class.

There is no state in which content stays invisible.

---

## Deliberate decisions

**No WebGL on the platform.** Not because it was too hard — Aurvi ships a real-time Three.js viewer. Because 3D belongs to the works, and a decorative sphere in the gallery would contradict the entire premise. The hero's aperture is CSS `clip-path`.

**No smooth-scroll library.** Native scroll only. Hijacking someone's scroll to make a page feel expensive makes it feel broken instead.

**No published performance scores.** A Lighthouse screenshot taken on our hardware tells a buyer nothing about theirs. The techniques are published instead, and the live demo is there to be audited.

**No fake volume.** No invented client logos, review counts, award badges or "trusted by" rows. The site says five works, edition 001, launched recently, because that is what is true.

**`overflow-x: clip` on `body`, not `hidden`** — `hidden` would silently make the body a scroll container and break every `position: sticky` on the site.

---

## Accessibility

Not a pass at the end; it is why several things are built the way they are.

- The FAQ uses native `<details>`/`<summary>` — keyboard operable, works with no JS, findable by in-page search.
- The mobile drawer is a proper dialog: labelled, modal, focus moved in and restored on close, Tab cycled inside, Escape to dismiss, background scroll locked.
- The archive rail always shows work numbers as text. Names appear on hover as an addition, never as the only source.
- The form binds errors with `aria-describedby` and `aria-invalid`, focuses an error summary that links to each offending field, and announces success politely.
- Custom cursor is fine-pointer only and disabled under reduced motion. The real cursor is never hidden unless the replacement is on screen.
- Touch targets clear 44px. Nothing important is behind a hover.

---

## The enquiry form

`POST /api/enquiry` is a thin edge over `lib/enquiry.ts`, which holds all validation and provider logic. Configure a webhook or Resend in `.env.local` (see `.env.example`).

| Status | Meaning |
| --- | --- |
| 200 | Accepted. Check `delivered` — `false` means spam-discarded or no provider configured. |
| 400 | Validation failed, with per-field messages. |
| 501 | No provider configured. The form offers a pre-filled `mailto:` fallback. |
| 502 | The configured provider rejected or was unreachable. |

Spam handling is a honeypot field plus a submission-timing gate. No third-party captcha, no tracking.

---

## Remaining external configuration

1. Set `ENQUIRY_WEBHOOK_URL` or the Resend variables, or the form falls back to email.
2. Replace `site.url` in `lib/site.ts` with the real production origin before launch — Open Graph, canonicals and the sitemap derive from it.
3. Add real URLs to `site.social` — entries with an empty `href` render as inactive text.
4. Add an Open Graph image at `app/opengraph-image.png` (1200×630).
5. Populate `liveDemo` for works 002–005 as their demos are hosted.
