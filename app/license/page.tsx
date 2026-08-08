import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { templates } from "@/lib/templates";
import { licenceFaq } from "@/lib/faq";
import { Faq } from "@/components/templates/Faq";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import { Eyebrow, CheckMark, LockIcon } from "@/components/primitives/Marks";

export const metadata: Metadata = {
  title: "Licence terms",
  description:
    "What you may and may not do with the source code, what an exclusive licence guarantees, and exactly what is handed over. In plain language.",
  alternates: { canonical: "/license" },
};

const permitted = [
  "Build and run one production website per licence",
  "Modify anything — code, design, structure, content",
  "Use it for your own brand or for one client site",
  "Deploy it to any host you like",
  "Keep using it forever, with no renewal or key",
];

const notPermitted = [
  "Resell, sublicense or redistribute the source",
  "Repackage it as a template, theme or starter kit",
  "Use one licence across multiple production sites",
  "Publish it publicly as your own work",
];

const handover = [
  {
    title: "The repository",
    body: "Complete source — pages, components, animation code, styles and design tokens. Git history included when the project was built for you.",
  },
  {
    title: "Documentation",
    body: "A README covering local setup, environment variables, content locations, deployment, and where the design tokens live.",
  },
  {
    title: "Assets",
    body: "Placeholder art, poster frames and icons, all cleared for your use, in editable form where they exist.",
  },
  {
    title: "Fonts",
    body: "Open-source families are included and named. Commercially licensed families are listed with a purchase link — those licences must be bought in your own name, because they cannot legally be transferred.",
  },
  {
    title: "Third-party services",
    body: "Named, with configuration documented. Accounts for hosting, commerce or email are created in your name, so you are never renting access from us.",
  },
];

export default function LicensePage() {
  const sold = templates.filter((t) => t.availability === "sold");

  return (
    <>
      <section className="shell pt-10 pb-8 sm:pt-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Licence</Eyebrow>
            <h1 className="mt-4 font-display text-[clamp(2.25rem,4.4vw,3.5rem)] leading-[1.04] font-bold tracking-[-0.03em] text-ink">
              What you own, in plain words.
            </h1>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft">
              This page is a summary written to be understood, not to protect us
              from you. The signed agreement issued with your purchase says the
              same things. If anything is unclear, ask before you buy.
            </p>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <ActionLink href="/buy" variant="primary" size="lg">
              Place an order
            </ActionLink>
          </div>
        </div>
      </section>

      {/* ── standard ── */}
      <section className="shell pb-12" aria-labelledby="standard-title">
        <Eyebrow>Standard licence</Eyebrow>
        <h2 id="standard-title" className="mt-4 font-display text-display font-bold text-ink">
          One licence, one live site.
        </h2>
        <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-ink-muted">
          Included with every source-code purchase and with every Setup &amp;
          Launch or Custom Build. Perpetual — there is nothing to renew and no
          key that can be revoked.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <Reveal variant="rise" mode="archive" className="card p-6 sm:p-7">
            <h3 className="eyebrow text-endorse">You may</h3>
            <ul className="mt-4 space-y-2.5">
              {permitted.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <CheckMark className="mt-0.5 shrink-0 text-endorse" />
                  <span className="text-[0.9375rem] leading-snug text-ink-soft">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal variant="rise" mode="archive" delay={0.06} className="card p-6 sm:p-7">
            <h3 className="eyebrow text-ink-muted">You may not</h3>
            <ul className="mt-4 space-y-2.5">
              {notPermitted.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-2 block h-1 w-3 shrink-0 rounded-full bg-ink-faint"
                  />
                  <span className="text-[0.9375rem] leading-snug text-ink-muted">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── exclusive ── */}
      <section id="exclusive" className="scroll-mt-28 px-2 sm:px-3" aria-labelledby="exclusive-title">
        <div className="on-dark panel">
          <div className="shell py-14 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-accent">
                  <LockIcon />
                </span>
                <Eyebrow tone="accent" className="mt-5">
                  Exclusive licence
                </Eyebrow>
                <h2
                  id="exclusive-title"
                  className="mt-4 font-display text-display font-bold text-white"
                >
                  Buy it, and it leaves the collection.
                </h2>
                <p className="mt-5 measure text-[1rem] leading-relaxed text-chalk-muted">
                  An exclusive licence transfers the design to you and
                  permanently withdraws it from sale. It is delisted from this
                  site, never sold again, and its slot in the collection is
                  closed. We keep no right to reuse the design for another
                  client.
                </p>
                <div className="mt-8">
                  <ActionLink href="/buy?plan=exclusive" variant="primary" size="lg">
                    Request a quote
                  </ActionLink>
                </div>
              </div>

              <Reveal
                as="dl"
                variant="rise"
                mode="archive"
                group
                className="divide-y divide-dark-rule border-t border-dark-rule lg:col-span-6"
              >
                {[
                  {
                    t: "Delisted publicly",
                    d: "The template is marked as sold in the collection rather than quietly deleted, so the record stays honest.",
                  },
                  {
                    t: "Written and dated",
                    d: "Exclusivity is a signed agreement naming the template and the date it left the collection — not a promise in an email thread.",
                  },
                  {
                    t: "Full transfer",
                    d: "Source code, design files and the right to use the design however you want, including registering it as your own.",
                  },
                  {
                    t: "Existing licences stand",
                    d: "Anyone who legitimately bought the source before the exclusive sale keeps their licence. We tell you how many that is before you commit — currently none, for every available template.",
                  },
                ].map((item) => (
                  <div key={item.t} className="py-5">
                    <dt className="font-display text-[1.0625rem] font-bold text-white">
                      {item.t}
                    </dt>
                    <dd className="mt-2 measure text-[0.9375rem] leading-relaxed text-chalk-muted">
                      {item.d}
                    </dd>
                  </div>
                ))}
              </Reveal>
            </div>

            <div className="mt-10 border-t border-dark-rule pt-8">
              <Eyebrow tone="dark">Sold exclusively so far</Eyebrow>
              {sold.length === 0 ? (
                <p className="mt-2 text-[0.9375rem] text-chalk-muted">
                  None. All {templates.length} templates are still available.
                </p>
              ) : (
                <ul className="mt-2 space-y-1">
                  {sold.map((t) => (
                    <li key={t.slug} className="text-[0.9375rem] text-white">
                      {t.number} — {t.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── handover ── */}
      <section id="handover" className="shell scroll-mt-28 section-y" aria-labelledby="handover-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <Eyebrow>Handover</Eyebrow>
            <h2
              id="handover-title"
              className="mt-4 font-display text-display font-bold text-ink"
            >
              Exactly what arrives.
            </h2>
            <Link
              href="/contact"
              className="link-rule mt-5 inline-block text-[0.9375rem] font-bold text-ink"
            >
              Ask about anything here
            </Link>
          </div>

          <Reveal
            as="dl"
            variant="rise"
            mode="archive"
            group
            className="card divide-y divide-rule-soft overflow-hidden lg:col-span-8"
          >
            {handover.map((item) => (
              <div key={item.title} className="px-5 py-6 sm:px-7">
                <dt className="font-display text-[1.0625rem] font-bold text-ink">
                  {item.title}
                </dt>
                <dd className="mt-2 measure text-[0.9375rem] leading-relaxed text-ink-muted">
                  {item.body}
                </dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <Faq
        items={licenceFaq}
        eyebrow="Licence"
        title="Licence questions."
        lead={`Anything not covered here, write to ${site.contact.email} and we will answer before you buy.`}
        id="licence-faq"
      />

      <section className="shell pb-16">
        <p className="measure text-[0.8125rem] leading-relaxed text-ink-muted">
          This page is a plain-language summary provided for clarity. The signed
          licence agreement issued with your purchase is the governing document,
          and it is written to say the same things. Source-code purchases are not
          refundable once repository access has been granted, because they cannot
          be returned — which is why we publish live demos and answer questions
          first. Service work that has not started is refundable in full.
        </p>
      </section>
    </>
  );
}
