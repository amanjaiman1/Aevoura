"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { budgetBands, serviceOptions } from "@/lib/pricing";
import { works } from "@/lib/works";
import { site } from "@/lib/site";
import type { FieldErrors } from "@/lib/enquiry";
import { Arrow } from "@/components/primitives/Marks";

/**
 * PROJECT ENQUIRY
 *
 * Accessible by construction: real labels, real fieldsets, errors bound with
 * aria-describedby and aria-invalid, an error summary that receives focus and
 * links to the offending field, and a success state announced politely.
 *
 * It also refuses to be a dead end. If no delivery provider is configured on
 * the server, the failure state hands the visitor a pre-filled mailto link
 * containing everything they typed, so the enquiry still reaches us.
 */

type Status = "idle" | "submitting" | "success" | "error";

const initial = {
  name: "",
  email: "",
  company: "",
  website: "",
  work: "",
  services: [] as string[],
  budget: "",
  launchDate: "",
  message: "",
};

export function EnquiryForm({
  defaultWork = "",
  defaultServices = [],
  className = "",
}: {
  defaultWork?: string;
  defaultServices?: string[];
  className?: string;
}) {
  const uid = useId();
  const field = (name: string) => `${uid}-${name}`;

  const [values, setValues] = useState({
    ...initial,
    work: works.some((w) => w.slug === defaultWork) ? defaultWork : "",
    services: defaultServices.filter((s) =>
      (serviceOptions as readonly string[]).includes(s)
    ),
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");
  const [showMailFallback, setShowMailFallback] = useState(false);

  /** Set after mount, so render stays pure. Used as a simple bot gate. */
  const renderedAt = useRef(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  const set = <K extends keyof typeof values>(key: K, value: (typeof values)[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key as keyof FieldErrors];
      return next;
    });
  };

  const toggleService = (service: string) => {
    setValues((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  /* Move focus to whichever block just appeared. */
  useEffect(() => {
    if (status === "error" && Object.keys(errors).length) summaryRef.current?.focus();
    if (status === "success") successRef.current?.focus();
  }, [status, errors]);

  /** Everything the visitor typed, as an email they can send themselves. */
  const mailtoHref = useMemo(() => {
    const selected = works.find((w) => w.slug === values.work);
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Company: ${values.company || "—"}`,
      `Existing website: ${values.website || "—"}`,
      `Work of interest: ${selected ? selected.name : "Not sure yet"}`,
      `Services: ${values.services.length ? values.services.join(", ") : "—"}`,
      `Budget: ${values.budget || "—"}`,
      `Launch by: ${values.launchDate || "—"}`,
      "",
      values.message,
    ].join("\n");
    return `mailto:${site.contact.email}?subject=${encodeURIComponent(
      `Project enquiry — ${values.name || "new"}`
    )}&body=${encodeURIComponent(body)}`;
  }, [values]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");
    setErrors({});
    setMessage("");
    setShowMailFallback(false);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          honeypot:
            (form.elements.namedItem("company-url") as HTMLInputElement | null)?.value ?? "",
          renderedAt: renderedAt.current,
        }),
      });
      const payload = (await response.json()) as {
        ok: boolean;
        reference?: string;
        delivered?: boolean;
        message?: string;
        errors?: FieldErrors;
      };

      if (response.ok && payload.ok) {
        setReference(payload.reference ?? "");
        setStatus("success");
        return;
      }

      if (response.status === 400 && payload.errors) {
        setErrors(payload.errors);
        setMessage(payload.message ?? "Please check the highlighted fields.");
        setStatus("error");
        return;
      }

      // 501 = nothing configured server-side. Hand over the email route.
      setShowMailFallback(true);
      setMessage(
        response.status === 501
          ? "Our form is not connected to a mailbox yet. Send it as an email instead — everything you typed is already in it."
          : (payload.message ?? "Something went wrong on our side.")
      );
      setStatus("error");
    } catch {
      setShowMailFallback(true);
      setMessage("We could not reach the server. Send it as an email instead.");
      setStatus("error");
    }
  }

  /* ── success ── */
  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className={`border-l-2 border-accent bg-paper-raised px-6 py-9 ${className}`}
      >
        <p className="meta text-accent">ENQUIRY RECEIVED</p>
        <h3 className="mt-4 font-display text-headline tracking-[-0.015em] text-ink">
          Thank you — that is enough to work with.
        </h3>
        <p className="mt-5 measure text-[0.9375rem] leading-relaxed text-ink-soft">
          You will get a reply from a person, within one working day, with
          either a straight answer or the two or three questions we need before
          giving you one. No automated sequence, no drip campaign.
        </p>
        {reference && (
          <p className="mt-5 meta text-ink-muted">
            REFERENCE {reference} — quote it if you write again
          </p>
        )}
        <a
          href={`mailto:${site.contact.email}`}
          className="link-rule mt-6 inline-block meta text-ink"
        >
          {site.contact.email}
        </a>
      </div>
    );
  }

  const invalid = (key: keyof FieldErrors) => Boolean(errors[key]);
  const describedBy = (key: keyof FieldErrors, hint?: string) =>
    [errors[key] ? `${field(key)}-error` : null, hint ? `${field(key)}-hint` : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const inputClass = (key: keyof FieldErrors) =>
    `w-full min-h-11 border bg-paper-sunk px-4 py-3 text-[0.9375rem] text-ink transition-colors duration-200 placeholder:text-ink-muted/70 focus:bg-paper-raised focus:outline-none ${
      invalid(key) ? "border-accent" : "border-rule focus:border-ink"
    }`;

  return (
    <form onSubmit={onSubmit} noValidate className={className}>
      {/* error summary */}
      {status === "error" && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mb-8 border-l-2 border-accent bg-accent-tint px-5 py-4"
        >
          <p className="meta text-accent-deep">COULD NOT SEND</p>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink">{message}</p>
          {Object.keys(errors).length > 0 && (
            <ul className="mt-3 space-y-1">
              {Object.entries(errors).map(([key, text]) => (
                <li key={key}>
                  <a href={`#${field(key)}`} className="link-rule text-[0.875rem] text-accent-deep">
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          )}
          {showMailFallback && (
            <a
              href={mailtoHref}
              className="mt-4 inline-flex min-h-11 items-center border border-accent bg-accent px-5 py-3 meta text-paper"
            >
              Send as email instead <Arrow dir="ne" />
            </a>
          )}
        </div>
      )}

      {/* ── about you ── */}
      <fieldset className="border-0 p-0">
        <legend className="meta w-full border-b border-rule pb-4 text-ink">
          01 — ABOUT YOU
        </legend>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor={field("name")} className="meta block text-ink-muted">
              Name <span className="text-accent">*</span>
            </label>
            <input
              id={field("name")}
              name="name"
              type="text"
              required
              autoComplete="name"
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              aria-invalid={invalid("name") || undefined}
              aria-describedby={describedBy("name")}
              className={`mt-2 ${inputClass("name")}`}
            />
            {errors.name && (
              <p id={`${field("name")}-error`} className="mt-2 meta text-accent-deep">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={field("email")} className="meta block text-ink-muted">
              Email <span className="text-accent">*</span>
            </label>
            <input
              id={field("email")}
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              aria-invalid={invalid("email") || undefined}
              aria-describedby={describedBy("email")}
              className={`mt-2 ${inputClass("email")}`}
            />
            {errors.email && (
              <p id={`${field("email")}-error`} className="mt-2 meta text-accent-deep">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={field("company")} className="meta block text-ink-muted">
              Company or brand
            </label>
            <input
              id={field("company")}
              name="company"
              type="text"
              autoComplete="organization"
              value={values.company}
              onChange={(e) => set("company", e.target.value)}
              className={`mt-2 ${inputClass("company")}`}
            />
          </div>

          <div>
            <label htmlFor={field("website")} className="meta block text-ink-muted">
              Existing website
            </label>
            <input
              id={field("website")}
              name="website"
              type="text"
              inputMode="url"
              placeholder="yourbrand.com"
              value={values.website}
              onChange={(e) => set("website", e.target.value)}
              aria-invalid={invalid("website") || undefined}
              aria-describedby={describedBy("website", "hint")}
              className={`mt-2 ${inputClass("website")}`}
            />
            <p id={`${field("website")}-hint`} className="mt-2 meta text-ink-muted">
              Leave blank if there is not one yet
            </p>
            {errors.website && (
              <p id={`${field("website")}-error`} className="mt-2 meta text-accent-deep">
                {errors.website}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      {/* ── the project ── */}
      <fieldset className="mt-12 border-0 p-0">
        <legend className="meta w-full border-b border-rule pb-4 text-ink">
          02 — THE PROJECT
        </legend>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor={field("work")} className="meta block text-ink-muted">
              Starting from
            </label>
            <select
              id={field("work")}
              name="work"
              value={values.work}
              onChange={(e) => set("work", e.target.value)}
              aria-describedby={describedBy("work")}
              className={`mt-2 ${inputClass("work")}`}
            >
              <option value="">Not sure yet / start from nothing</option>
              {works.map((work) => (
                <option key={work.slug} value={work.slug}>
                  {work.number} — {work.name} ({work.industry})
                </option>
              ))}
            </select>
            {errors.work && (
              <p id={`${field("work")}-error`} className="mt-2 meta text-accent-deep">
                {errors.work}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={field("budget")} className="meta block text-ink-muted">
              Budget range
            </label>
            <select
              id={field("budget")}
              name="budget"
              value={values.budget}
              onChange={(e) => set("budget", e.target.value)}
              aria-describedby={describedBy("budget", "hint")}
              className={`mt-2 ${inputClass("budget")}`}
            >
              <option value="">Prefer to discuss</option>
              {budgetBands.map((band) => (
                <option key={band} value={band}>
                  {band}
                </option>
              ))}
            </select>
            <p id={`${field("budget")}-hint`} className="mt-2 meta text-ink-muted">
              An honest range saves us both a call
            </p>
            {errors.budget && (
              <p id={`${field("budget")}-error`} className="mt-2 meta text-accent-deep">
                {errors.budget}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={field("launchDate")} className="meta block text-ink-muted">
              Desired launch date
            </label>
            <input
              id={field("launchDate")}
              name="launchDate"
              type="date"
              value={values.launchDate}
              onChange={(e) => set("launchDate", e.target.value)}
              className={`mt-2 ${inputClass("launchDate")}`}
            />
          </div>
        </div>

        {/* services */}
        <div className="mt-8">
          <p className="meta text-ink-muted" id={`${uid}-services-label`}>
            What do you need?
          </p>
          <div
            role="group"
            aria-labelledby={`${uid}-services-label`}
            className="mt-3 flex flex-wrap gap-2"
          >
            {serviceOptions.map((service) => {
              const checked = values.services.includes(service);
              return (
                <label
                  key={service}
                  className={`inline-flex min-h-11 cursor-pointer items-center gap-2.5 border px-4 py-2.5 meta transition-colors duration-200 ${
                    checked
                      ? "border-ink bg-ink text-paper"
                      : "border-rule text-ink-soft hover:border-ink"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="services"
                    value={service}
                    checked={checked}
                    onChange={() => toggleService(service)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={`block h-1.5 w-1.5 shrink-0 rounded-full ${
                      checked ? "bg-accent" : "bg-rule"
                    }`}
                  />
                  {service}
                </label>
              );
            })}
          </div>
        </div>

        {/* description */}
        <div className="mt-8">
          <label htmlFor={field("message")} className="meta block text-ink-muted">
            Project description <span className="text-accent">*</span>
          </label>
          <textarea
            id={field("message")}
            name="message"
            required
            rows={6}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={invalid("message") || undefined}
            aria-describedby={describedBy("message", "hint")}
            placeholder="What the brand sells, who it sells to, and what the site has to achieve. What is wrong with the current one, if there is one."
            className={`mt-2 resize-y ${inputClass("message")}`}
          />
          <p id={`${field("message")}-hint`} className="mt-2 meta text-ink-muted">
            Two or three sentences is plenty
          </p>
          {errors.message && (
            <p id={`${field("message")}-error`} className="mt-2 meta text-accent-deep">
              {errors.message}
            </p>
          )}
        </div>
      </fieldset>

      {/* honeypot — hidden from people, irresistible to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={field("company-url")}>Company URL</label>
        <input id={field("company-url")} name="company-url" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* submit */}
      <div className="mt-12 flex flex-col gap-5 border-t border-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group/submit relative inline-flex min-h-11 items-center justify-between gap-6 overflow-hidden border border-accent bg-accent px-6 py-4 meta text-paper transition-opacity duration-200 disabled:opacity-60"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 translate-y-full bg-ink transition-transform duration-[280ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/submit:translate-y-0 group-focus-visible/submit:translate-y-0"
          />
          <span className="relative">
            {status === "submitting" ? "Sending…" : "Send the enquiry"}
          </span>
          <span aria-hidden="true" className="relative">
            {status === "submitting" ? "•••" : <Arrow />}
          </span>
        </button>

        <p className="max-w-xs meta text-ink-muted">
          No newsletter, no CRM sequence. A reply from a person within one
          working day.
        </p>
      </div>

      <p aria-live="polite" className="sr-only">
        {status === "submitting" ? "Sending your enquiry" : ""}
      </p>
    </form>
  );
}
