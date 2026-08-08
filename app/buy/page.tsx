import type { Metadata } from "next";
import { site } from "@/lib/site";
import { getTemplate } from "@/lib/templates";
import { getPlan } from "@/lib/pricing";
import { buyFaq } from "@/lib/faq";
import { OrderForm } from "@/components/forms/OrderForm";
import { Faq } from "@/components/templates/Faq";
import { Eyebrow, CheckMark, MailIcon } from "@/components/primitives/Marks";

export const metadata: Metadata = {
  title: "Place an order",
  description:
    "Choose a template and a plan, and send your order in one click. No card needed — we reply with an invoice within one working day.",
  alternates: { canonical: "/buy" },
  robots: { index: true, follow: true },
};

export default async function BuyPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string; plan?: string }>;
}) {
  const params = await searchParams;
  const template = params.template ? getTemplate(params.template) : undefined;
  const plan = params.plan ? getPlan(params.plan) : undefined;

  return (
    <>
      {/* ── head ── */}
      <section className="shell pt-10 pb-8 sm:pt-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow tone="accent">Order</Eyebrow>
            <h1 className="mt-4 font-display text-[clamp(2.25rem,4.4vw,3.5rem)] leading-[1.04] font-bold tracking-[-0.03em] text-ink">
              {template ? (
                <>
                  Order {template.name}.{" "}
                  <br />
                  Live in days, not months.
                </>
              ) : (
                <>
                  Pick a template.{" "}
                  <br />
                  Send the order.
                </>
              )}
            </h1>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft">
              Four short steps. No card details, no account to create — you send
              one email and we reply with an invoice{" "}
              {site.contact.responseTime}.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-lg border border-rule bg-surface p-5">
              <div className="flex items-center gap-2.5">
                <MailIcon className="text-accent" />
                <p className="text-[0.875rem] font-bold text-ink">
                  Orders are placed by email
                </p>
              </div>
              <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-muted">
                We have not wired up a payment gateway yet, and we would rather
                tell you than fake a checkout. It also means every order gets a
                human reply instead of an automated receipt.
              </p>
            </div>
          </div>
        </div>

        {/* trust strip */}
        <ul className="mt-8 grid gap-x-6 gap-y-3 border-t border-rule pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {site.promises.map((promise) => (
            <li key={promise} className="flex gap-2.5">
              <CheckMark className="mt-0.5 shrink-0 text-endorse" />
              <span className="text-[0.875rem] leading-snug text-ink-soft">
                {promise}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── the form ── */}
      <section className="shell pb-16 sm:pb-20" aria-label="Order form">
        <OrderForm defaultTemplate={template?.slug} defaultPlan={plan?.id} />
      </section>

      <Faq
        items={buyFaq}
        eyebrow="Ordering"
        title="How buying works."
        lead={`Anything not covered here, write to ${site.contact.email} and we will answer before you spend anything.`}
        id="buy-faq"
      />
    </>
  );
}
