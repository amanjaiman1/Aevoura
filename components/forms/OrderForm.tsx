"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { templates } from "@/lib/templates";
import { plans, buildPlans, carePlan, formatPrice, formatPlanPrice, addOnOptions, budgetBands, upgradeCredit } from "@/lib/pricing";
import { site } from "@/lib/site";
import { composeOrder, type ComposedOrder, type OrderDetails } from "@/lib/order";
import { ActionLink } from "@/components/primitives/ActionLink";
import {
  ArrowUpRight,
  Badge,
  CheckMark,
  CopyIcon,
  Eyebrow,
  MailIcon,
  iconMap,
} from "@/components/primitives/Marks";

type Errors = Partial<Record<"name" | "email", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const allPlans = [...buildPlans, carePlan];

/**
 * THE ORDER FORM
 *
 * Orders are placed by email. That is a deliberate, stated constraint — there
 * is no payment gateway yet — so the form's job is to make the email so
 * complete that the reply can be an invoice rather than a list of questions.
 *
 * The design decision that matters: this does not pretend to be a checkout.
 * It says "send order by email", it shows exactly what will be sent, and it
 * gives three ways to send it, because `mailto:` fails silently for anyone
 * without a desktop mail client:
 *
 *   1. the mail app, opened automatically on submit
 *   2. Gmail web compose, one click
 *   3. copy the whole order to the clipboard and paste it anywhere
 *
 * Nobody reaches a dead end, and nothing is lost if step 1 does nothing.
 */
export function OrderForm({
  defaultTemplate,
  defaultPlan,
}: {
  defaultTemplate?: string;
  defaultPlan?: string;
}) {
  const uid = useId();
  const field = (name: string) => `${uid}-${name}`;

  const [template, setTemplate] = useState(
    templates.some((t) => t.slug === defaultTemplate) ? defaultTemplate! : templates[0].slug
  );
  const [plan, setPlan] = useState(
    allPlans.some((p) => p.id === defaultPlan) ? defaultPlan! : "source"
  );
  const [addOns, setAddOns] = useState<string[]>([]);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    budget: "",
    launchDate: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<ComposedOrder | null>(null);
  const [copied, setCopied] = useState(false);

  const summaryRef = useRef<HTMLDivElement>(null);
  const sentRef = useRef<HTMLDivElement>(null);

  const selectedTemplate = templates.find((t) => t.slug === template)!;
  const selectedPlan = plans.find((p) => p.id === plan)!;

  const set = <K extends keyof typeof values>(key: K, value: (typeof values)[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (key === "name" || key === "email") {
      setErrors((prev) => {
        if (!(key in prev)) return prev;
        const next = { ...prev };
        delete next[key as keyof Errors];
        return next;
      });
    }
  };

  useEffect(() => {
    if (sent) sentRef.current?.focus();
  }, [sent]);

  useEffect(() => {
    if (Object.keys(errors).length) summaryRef.current?.focus();
  }, [errors]);

  /** The price shown in the summary: fixed for source, a floor otherwise. */
  const indicative = useMemo(() => {
    if (selectedPlan.id === "source") return formatPrice(selectedTemplate.sourcePrice);
    if (selectedPlan.id === "custom") return `From ${formatPrice(selectedTemplate.customFrom)}`;
    return formatPlanPrice(selectedPlan);
  }, [selectedPlan, selectedTemplate]);

  const needsBudget = selectedPlan.id === "custom" || selectedPlan.id === "exclusive";

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please tell us your name.";
    if (!EMAIL.test(values.email.trim()))
      next.email = "We need an email address to reply to.";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    const details: OrderDetails = {
      template,
      plan,
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      company: values.company.trim(),
      website: values.website.trim(),
      addOns,
      budget: values.budget,
      launchDate: values.launchDate,
      notes: values.notes.trim(),
    };

    const composed = composeOrder(details);
    setSent(composed);

    // Hand it to the mail client. If nothing happens, the success screen
    // already offers Gmail and clipboard routes.
    try {
      window.location.href = composed.mailto;
    } catch {
      /* the success screen covers this */
    }
  }

  async function copyOrder() {
    if (!sent) return;
    const text = `To: ${site.contact.email}\nSubject: ${sent.subject}\n\n${sent.body}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    } catch {
      /* the textarea below is selectable as a fallback */
    }
  }

  /* ─────────────── SENT ─────────────── */
  if (sent) {
    return (
      <div
        ref={sentRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="card scroll-mt-28 p-7 sm:p-10"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-endorse-tint text-endorse">
          <CheckMark className="h-6 w-6" />
        </span>

        <h2 className="mt-6 font-display text-[1.75rem] leading-tight font-bold text-ink sm:text-[2rem]">
          Your order is ready to send.
        </h2>
        <p className="mt-4 measure text-[1rem] leading-relaxed text-ink-soft">
          We just opened your email app with the whole order filled in — press
          send and it reaches us. <strong className="text-ink">If nothing
          opened</strong>, use one of the buttons below. Nothing is lost either
          way.
        </p>

        <dl className="mt-7 grid gap-3 rounded-lg bg-sunk p-5 sm:grid-cols-3">
          <div>
            <dt className="eyebrow text-ink-muted">Reference</dt>
            <dd className="num mt-1 text-[0.9375rem] font-bold text-ink">
              {sent.reference}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-ink-muted">Order</dt>
            <dd className="mt-1 text-[0.9375rem] font-bold text-ink">{sent.headline}</dd>
          </div>
          <div>
            <dt className="eyebrow text-ink-muted">Goes to</dt>
            <dd className="mt-1 text-[0.9375rem] font-bold break-all text-ink">
              {site.contact.email}
            </dd>
          </div>
        </dl>

        <div className="mt-7 flex flex-wrap gap-2.5">
          <ActionLink href={sent.mailto} variant="primary" icon={<MailIcon />} arrow={false}>
            Open my email app
          </ActionLink>
          <ActionLink href={sent.gmail} variant="dark" external>
            Send with Gmail
          </ActionLink>
          <button
            type="button"
            onClick={copyOrder}
            className="inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border border-rule px-6 py-3.5 text-[0.875rem] font-bold text-ink transition-colors duration-200 hover:border-ink hover:bg-surface"
          >
            <CopyIcon />
            {copied ? "Copied to clipboard" : "Copy order details"}
          </button>
        </div>

        <details className="faq mt-7 border-t border-rule pt-5">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-[0.9375rem] font-bold text-ink">
            See exactly what gets sent
            <span aria-hidden="true" className="relative h-3 w-3 text-ink-muted">
              <span className="absolute top-1/2 left-0 block h-px w-3 -translate-y-1/2 bg-current" />
              <span className="faq-tick absolute top-0 left-1/2 block h-3 w-px -translate-x-1/2 bg-current" />
            </span>
          </summary>
          <textarea
            readOnly
            aria-label="Your order details"
            value={sent.body}
            rows={16}
            className="num mt-4 w-full resize-y rounded-lg border border-rule bg-sunk p-4 text-[0.8125rem] leading-relaxed text-ink-soft"
          />
        </details>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-rule pt-6">
          <p className="text-[0.875rem] text-ink-muted">
            You will hear back {site.contact.responseTime}, with an invoice and
            next steps.
          </p>
          <button
            type="button"
            onClick={() => {
              setSent(null);
              setCopied(false);
            }}
            className="link-rule text-[0.875rem] font-bold text-ink"
          >
            Change the order
          </button>
        </div>
      </div>
    );
  }

  /* ─────────────── EDITING ─────────────── */
  const inputClass = (invalid = false) =>
    `w-full min-h-12 rounded-lg border bg-surface px-4 py-3 text-[0.9375rem] text-ink transition-colors duration-200 placeholder:text-ink-faint focus:outline-none ${
      invalid ? "border-accent" : "border-rule focus:border-ink"
    }`;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-7 xl:col-span-8">
        {/* error summary */}
        {Object.keys(errors).length > 0 && (
          <div
            ref={summaryRef}
            tabIndex={-1}
            role="alert"
            className="mb-6 scroll-mt-28 rounded-lg border border-accent bg-accent-tint px-5 py-4"
          >
            <p className="text-[0.875rem] font-bold text-accent-deep">
              Two things are missing
            </p>
            <ul className="mt-2 space-y-1">
              {Object.entries(errors).map(([key, text]) => (
                <li key={key}>
                  {/* Anchor for no-JS; the handler additionally focuses the
                      field, which browsers do not do reliably on their own. */}
                  <a
                    href={`#${field(key)}`}
                    onClick={(event) => {
                      const el = document.getElementById(field(key));
                      if (!el) return;
                      event.preventDefault();
                      el.scrollIntoView({ block: "center" });
                      (el as HTMLElement).focus({ preventScroll: true });
                    }}
                    className="link-rule text-[0.875rem] text-ink"
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── 1. template ── */}
        <fieldset className="card border-0 p-5 sm:p-7">
          <legend className="sr-only">Choose a template</legend>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[0.75rem] font-bold text-white">
              1
            </span>
            <p className="font-display text-[1.125rem] font-bold text-ink">
              Which template?
            </p>
          </div>

          <div
            role="radiogroup"
            aria-label="Template"
            className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
          >
            {templates.map((t) => {
              const active = t.slug === template;
              return (
                <label
                  key={t.slug}
                  className={`group/opt relative cursor-pointer overflow-hidden rounded-lg border-2 transition-colors duration-200 ${
                    active
                      ? "border-accent bg-accent-tint/40"
                      : "border-rule bg-surface hover:border-ink-faint"
                  }`}
                >
                  <input
                    type="radio"
                    name="template"
                    value={t.slug}
                    checked={active}
                    onChange={() => setTemplate(t.slug)}
                    className="sr-only"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimised SVG poster */}
                  <img
                    src={t.poster}
                    alt=""
                    width={t.posterAspect[0]}
                    height={t.posterAspect[1]}
                    loading="lazy"
                    sizes="240px"
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <span className="block p-3">
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-display text-[1rem] font-bold text-ink">
                        {t.name}
                      </span>
                      {active && <CheckMark className="text-accent" />}
                    </span>
                    <span className="mt-0.5 block truncate text-[0.75rem] text-ink-muted">
                      {t.industry}
                    </span>
                    <span className="num mt-1.5 block text-[0.8125rem] font-bold text-ink">
                      {formatPrice(t.sourcePrice)}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>

          <p className="mt-4 text-[0.8125rem] text-ink-muted">
            Not sure which fits?{" "}
            <Link href="/templates" className="link-rule font-bold text-ink">
              Compare all {site.templateCount}
            </Link>{" "}
            — or pick the closest and say so in the notes.
          </p>
        </fieldset>

        {/* ── 2. plan ── */}
        <fieldset className="card mt-5 border-0 p-5 sm:p-7">
          <legend className="sr-only">Choose a plan</legend>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[0.75rem] font-bold text-white">
              2
            </span>
            <p className="font-display text-[1.125rem] font-bold text-ink">
              How much of it should we do?
            </p>
          </div>

          <div role="radiogroup" aria-label="Plan" className="mt-5 space-y-2.5">
            {allPlans.map((p) => {
              const active = p.id === plan;
              const Icon = iconMap[p.icon];
              const price =
                p.id === "source"
                  ? formatPrice(selectedTemplate.sourcePrice)
                  : p.id === "custom"
                    ? `From ${formatPrice(selectedTemplate.customFrom)}`
                    : formatPlanPrice(p);
              return (
                <label
                  key={p.id}
                  className={`flex cursor-pointer gap-4 rounded-lg border-2 p-4 transition-colors duration-200 ${
                    active
                      ? "border-accent bg-accent-tint/40"
                      : "border-rule bg-surface hover:border-ink-faint"
                  }`}
                >
                  <input
                    type="radio"
                    name="plan"
                    value={p.id}
                    checked={active}
                    onChange={() => setPlan(p.id)}
                    className="sr-only"
                  />
                  <span
                    className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      active ? "border-accent bg-accent" : "border-rule bg-surface"
                    }`}
                  >
                    {active && <span className="block h-1.5 w-1.5 rounded-full bg-white" />}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <Icon className="text-ink-faint" />
                      <span className="font-display text-[1.0625rem] font-bold text-ink">
                        {p.name}
                      </span>
                      {p.popular && <Badge>Most popular</Badge>}
                      {p.emphasis && <Badge tone="accent">Best value</Badge>}
                      <span className="num ml-auto text-[0.9375rem] font-bold whitespace-nowrap text-ink">
                        {price}
                        {p.id === "care" && (
                          <span className="font-normal text-ink-muted"> /mo</span>
                        )}
                      </span>
                    </span>
                    <span className="mt-1.5 block text-[0.875rem] leading-snug text-ink-soft">
                      {p.summary}
                    </span>
                    <span className="mt-1.5 block text-[0.75rem] text-ink-muted">
                      {p.delivery}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* ── 3. add-ons ── */}
        <fieldset className="card mt-5 border-0 p-5 sm:p-7">
          <legend className="sr-only">Anything else</legend>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[0.75rem] font-bold text-white">
              3
            </span>
            <p className="font-display text-[1.125rem] font-bold text-ink">
              Anything else you need?{" "}
              <span className="font-sans text-[0.8125rem] font-normal text-ink-muted">
                Optional
              </span>
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {addOnOptions.map((option) => {
              const checked = addOns.includes(option);
              return (
                <label
                  key={option}
                  className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border-2 px-4 text-[0.8125rem] font-bold transition-colors duration-200 ${
                    checked
                      ? "border-ink bg-ink text-white"
                      : "border-rule bg-surface text-ink-soft hover:border-ink-faint"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      setAddOns((prev) =>
                        prev.includes(option)
                          ? prev.filter((a) => a !== option)
                          : [...prev, option]
                      )
                    }
                    className="sr-only"
                  />
                  {checked && <CheckMark className="text-accent" />}
                  {option}
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* ── 4. details ── */}
        <fieldset className="card mt-5 border-0 p-5 sm:p-7">
          <legend className="sr-only">Your details</legend>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[0.75rem] font-bold text-white">
              4
            </span>
            <p className="font-display text-[1.125rem] font-bold text-ink">Your details</p>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor={field("name")}
                className="block text-[0.8125rem] font-bold text-ink-soft"
              >
                Name <span className="text-accent">*</span>
              </label>
              <input
                id={field("name")}
                type="text"
                required
                autoComplete="name"
                value={values.name}
                onChange={(e) => set("name", e.target.value)}
                aria-invalid={Boolean(errors.name) || undefined}
                aria-describedby={errors.name ? `${field("name")}-error` : undefined}
                className={`mt-2 ${inputClass(Boolean(errors.name))}`}
              />
              {errors.name && (
                <p
                  id={`${field("name")}-error`}
                  className="mt-2 text-[0.8125rem] font-medium text-accent-deep"
                >
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={field("email")}
                className="block text-[0.8125rem] font-bold text-ink-soft"
              >
                Email <span className="text-accent">*</span>
              </label>
              <input
                id={field("email")}
                type="email"
                required
                inputMode="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                aria-invalid={Boolean(errors.email) || undefined}
                aria-describedby={errors.email ? `${field("email")}-error` : undefined}
                className={`mt-2 ${inputClass(Boolean(errors.email))}`}
              />
              {errors.email && (
                <p
                  id={`${field("email")}-error`}
                  className="mt-2 text-[0.8125rem] font-medium text-accent-deep"
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={field("phone")}
                className="block text-[0.8125rem] font-bold text-ink-soft"
              >
                Phone or WhatsApp
              </label>
              <input
                id={field("phone")}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="Optional, but faster"
                value={values.phone}
                onChange={(e) => set("phone", e.target.value)}
                className={`mt-2 ${inputClass()}`}
              />
            </div>

            <div>
              <label
                htmlFor={field("company")}
                className="block text-[0.8125rem] font-bold text-ink-soft"
              >
                Company or brand
              </label>
              <input
                id={field("company")}
                type="text"
                autoComplete="organization"
                value={values.company}
                onChange={(e) => set("company", e.target.value)}
                className={`mt-2 ${inputClass()}`}
              />
            </div>

            <div>
              <label
                htmlFor={field("website")}
                className="block text-[0.8125rem] font-bold text-ink-soft"
              >
                Current website
              </label>
              <input
                id={field("website")}
                type="text"
                inputMode="url"
                placeholder="yourbrand.com"
                value={values.website}
                onChange={(e) => set("website", e.target.value)}
                className={`mt-2 ${inputClass()}`}
              />
            </div>

            <div>
              <label
                htmlFor={field("launchDate")}
                className="block text-[0.8125rem] font-bold text-ink-soft"
              >
                Want it live by
              </label>
              <input
                id={field("launchDate")}
                type="date"
                value={values.launchDate}
                onChange={(e) => set("launchDate", e.target.value)}
                className={`mt-2 ${inputClass()}`}
              />
            </div>

            {needsBudget && (
              <div className="sm:col-span-2">
                <label
                  htmlFor={field("budget")}
                  className="block text-[0.8125rem] font-bold text-ink-soft"
                >
                  Budget range
                </label>
                <select
                  id={field("budget")}
                  value={values.budget}
                  onChange={(e) => set("budget", e.target.value)}
                  className={`mt-2 ${inputClass()}`}
                >
                  <option value="">Prefer to discuss</option>
                  {budgetBands.map((band) => (
                    <option key={band} value={band}>
                      {band}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-[0.8125rem] text-ink-muted">
                  An honest range means we can quote properly first time.
                </p>
              </div>
            )}

            <div className="sm:col-span-2">
              <label
                htmlFor={field("notes")}
                className="block text-[0.8125rem] font-bold text-ink-soft"
              >
                Anything we should know
              </label>
              <textarea
                id={field("notes")}
                rows={5}
                value={values.notes}
                onChange={(e) => set("notes", e.target.value)}
                placeholder="What you sell, what the site has to do, and anything you already know you want changed."
                className={`mt-2 resize-y ${inputClass()}`}
              />
            </div>
          </div>
        </fieldset>
      </div>

      {/* ── order summary ── */}
      <div className="lg:col-span-5 xl:col-span-4">
        <div className="lg:sticky lg:top-28">
          <div className="card overflow-hidden">
            <div className="on-dark px-6 py-5">
              <Eyebrow tone="dark">Your order</Eyebrow>
              <p className="mt-2 font-display text-[1.25rem] font-bold text-white">
                {selectedTemplate.name} · {selectedPlan.name}
              </p>
            </div>

            <div className="p-6">
              <div className="flex gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimised SVG poster */}
                <img
                  src={selectedTemplate.poster}
                  alt={selectedTemplate.posterAlt}
                  width={selectedTemplate.posterAspect[0]}
                  height={selectedTemplate.posterAspect[1]}
                  loading="lazy"
                  sizes="120px"
                  className="h-16 w-28 shrink-0 rounded-md object-cover"
                />
                <div className="min-w-0">
                  <p className="font-display text-[1rem] font-bold text-ink">
                    {selectedTemplate.name}
                  </p>
                  <p className="truncate text-[0.8125rem] text-ink-muted">
                    {selectedTemplate.industry}
                  </p>
                  {selectedTemplate.liveDemo && (
                    <a
                      href={selectedTemplate.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-rule mt-1 inline-flex items-center gap-1 text-[0.75rem] font-bold text-accent"
                    >
                      Live demo <ArrowUpRight />
                    </a>
                  )}
                </div>
              </div>

              <dl className="mt-6 space-y-3 border-t border-rule-soft pt-5">
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-[0.875rem] text-ink-muted">Plan</dt>
                  <dd className="text-right text-[0.875rem] font-bold text-ink">
                    {selectedPlan.name}
                  </dd>
                </div>
                {addOns.length > 0 && (
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="text-[0.875rem] text-ink-muted">Add-ons</dt>
                    <dd className="num text-right text-[0.875rem] font-bold text-ink">
                      {addOns.length} selected
                    </dd>
                  </div>
                )}
                <div className="flex items-baseline justify-between gap-3 border-t border-rule-soft pt-3">
                  <dt className="text-[0.875rem] font-bold text-ink">
                    {selectedPlan.id === "source" ? "Price" : "Starts at"}
                  </dt>
                  <dd className="num font-display text-[1.375rem] font-bold text-ink">
                    {indicative}
                    {selectedPlan.id === "care" && (
                      <span className="font-sans text-[0.8125rem] font-normal text-ink-muted">
                        {" "}
                        /mo
                      </span>
                    )}
                  </dd>
                </div>
              </dl>

              {selectedPlan.id !== "source" && (
                <p className="mt-3 text-[0.75rem] leading-snug text-ink-muted">
                  Final figure confirmed in writing before anything is invoiced.
                </p>
              )}

              {selectedPlan.id === "source" && (
                <p className="mt-4 rounded-md bg-endorse-tint px-4 py-3 text-[0.75rem] leading-snug text-ink-soft">
                  Credited in full if you upgrade to a custom build within{" "}
                  {upgradeCredit.windowDays} days.
                </p>
              )}

              <button
                type="submit"
                className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-4 text-[0.9375rem] font-bold text-white transition-colors duration-200 hover:bg-accent-deep"
              >
                <MailIcon />
                Send order by email
              </button>

              <p className="mt-3 text-center text-[0.75rem] leading-snug text-ink-muted">
                No payment now. This opens your email app with the order filled
                in — you press send.
              </p>
            </div>

            <ol className="border-t border-rule-soft bg-sunk px-6 py-5">
              <p className="eyebrow text-ink-muted">What happens next</p>
              {[
                "You send the order email",
                `We reply ${site.contact.responseTime} with an invoice`,
                "Payment, then delivery or kickoff call",
              ].map((step, i) => (
                <li key={step} className="mt-3 flex gap-3">
                  <span className="num mt-0.5 text-[0.75rem] font-bold text-accent">
                    0{i + 1}
                  </span>
                  <span className="text-[0.8125rem] leading-snug text-ink-soft">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <p className="mt-4 text-center text-[0.8125rem] text-ink-muted">
            Rather just ask a question?{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="link-rule font-bold text-ink"
            >
              {site.contact.email}
            </a>
          </p>
        </div>
      </div>
    </form>
  );
}
