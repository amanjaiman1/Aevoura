/** Questions a real buyer asks before spending money. No filler. */

export type FaqItem = { q: string; a: string };

/** Shown on the order page — all about the mechanics of paying and receiving. */
export const buyFaq: FaqItem[] = [
  {
    q: "Why is there no card checkout?",
    a: "We have not set up a payment gateway yet, and we would rather say that than fake one. Every one of these engagements needs a short conversation first anyway — which template, what content you have, what the deadline is — so the email is the first step rather than an extra one.",
  },
  {
    q: "How do I actually pay?",
    a: "We reply to your order with an invoice and payment details — UPI or bank transfer for India, and bank transfer or Wise for international clients. Nothing is due until you have the invoice and have agreed the scope in writing.",
  },
  {
    q: "What happens after I pay?",
    a: "For source code, you get repository access within 24 hours. For Setup & Launch we start immediately and you are usually live in 5 to 8 working days. For custom builds we book a kickoff call and write the scope before any design work begins.",
  },
  {
    q: "The email app did not open. What now?",
    a: "That happens on machines with no desktop mail client configured. The confirmation screen gives you a one-click Gmail compose link and a button that copies the whole order to your clipboard, so you can paste it into any email client or send it over WhatsApp.",
  },
  {
    q: "Can I change my order after sending it?",
    a: "Yes. Nothing is locked until you have paid. Reply to your own email or send a new order — quote the reference number and we will use the latest one.",
  },
  {
    q: "Do you take on projects outside India?",
    a: "Regularly. Prices are listed in rupees; international clients can be invoiced in USD at the prevailing rate. Time zones have not been a problem so far — most communication is written.",
  },
  {
    q: "Is the price per site or per company?",
    a: "Per production site. One licence runs one live website. If you need it on a second domain, that is a second licence, and an exclusive licence removes the template from sale entirely.",
  },
];

/** Shown on every template page. */
export const templateFaq: FaqItem[] = [
  {
    q: "What exactly do I receive when I buy the source code?",
    a: "The complete repository: every page, component, animation and style file, the design tokens, the placeholder assets, and a setup document that gets it running locally in a few minutes. No obfuscation, no removed sections, no licence key phoning home.",
  },
  {
    q: "Do I need a developer?",
    a: "For source code, yes — or someone on your team who is comfortable with Next.js. If you would rather not touch it, Setup & Launch puts it live with your content, and a Custom Build rebuilds it around your brand.",
  },
  {
    q: "Can I change the design myself afterwards?",
    a: "Yes. Colour, type and spacing are centralised as design tokens, so a full rebrand is a handful of values rather than a search across files. Larger structural changes are ordinary React work.",
  },
  {
    q: "What if I buy the source and then want the custom build?",
    a: "We credit the full source-code price against your custom project if you upgrade within 30 days. Starting small costs you nothing.",
  },
  {
    q: "Will it work on mobile and on slower phones?",
    a: "Mobile is designed as its own layout rather than a shrunken desktop one. Heavier interactions have deliberate fallbacks, hover is never required to reach information, and every build is tested on a mid-range Android device before delivery.",
  },
  {
    q: "Do you provide the images and copy?",
    a: "The template ships with art-directed placeholders so nothing looks broken. Your real photography and copy go in during Setup & Launch or a Custom Build. We can write the copy if you want it handled.",
  },
  {
    q: "What happens after launch?",
    a: "Nothing you have to worry about, unless you want us involved. The Care Plan covers updates, upkeep, performance monitoring and small additions each month. It is optional and cancellable.",
  },
];

/** Shown on the custom-build page. Commercial rather than technical. */
export const customBuildFaq: FaqItem[] = [
  {
    q: "How is this different from hiring an agency from scratch?",
    a: "You are not paying for the first three weeks of exploration. The structure, motion language and engineering already exist and already work, so the budget goes into what makes the site yours rather than into discovering a direction.",
  },
  {
    q: "How different can the final site be from the template?",
    a: "As different as you need. Some projects keep the structure and change the identity. Others keep only the engineering standard and rebuild the rest. The starting point is a floor, not a ceiling.",
  },
  {
    q: "What do you need from me to begin?",
    a: "A sense of the brand, whatever assets exist, and clarity on what the site has to achieve commercially. If any of that is missing we work through it on the first call rather than sending a form back.",
  },
  {
    q: "How long does a custom build take?",
    a: "Most run three to six weeks from scope agreement to launch. Complex commerce or 3D work runs longer, and we say so before you commit rather than during.",
  },
  {
    q: "How does payment work?",
    a: "Typically 40% to begin, 40% at design approval, 20% at launch. Invoiced in INR, or USD for international clients. Nothing is paid before the scope is written down.",
  },
  {
    q: "Who owns the final work?",
    a: "You do. Full ownership of the delivered site, its code and its design, transferred at launch. We keep the right to show it as our work unless you ask us not to.",
  },
  {
    q: "Can you work with our existing developers?",
    a: "Yes, and it is often the cheapest route. We build to a clean handover standard — typed, commented, conventional — and brief your team directly.",
  },
];

/** Shown on the licence page. */
export const licenceFaq: FaqItem[] = [
  {
    q: "Can I resell or redistribute the source code?",
    a: "No. You may use it to build and run your own site, and modify it however you like. You may not resell it, redistribute it, or repackage it as a template or theme.",
  },
  {
    q: "Can I use it for a client project?",
    a: "Yes, with one licence per client site. Tell us it is client work and we will invoice accordingly.",
  },
  {
    q: "What does an exclusive licence actually guarantee?",
    a: "That the design is withdrawn from this collection permanently, removed from the site, and never sold to anyone else. It is recorded in writing, and the template is marked as sold here rather than quietly deleted.",
  },
  {
    q: "Are the fonts and assets included?",
    a: "Open-source fonts are included and named. Commercially licensed fonts are listed with a link so you can buy the licence in your own name — we cannot legally transfer those. Placeholder assets are ours and are cleared for your use.",
  },
  {
    q: "Can I get a refund?",
    a: "Source-code purchases are not refundable once repository access has been granted, because they cannot be returned — which is why we publish live demos and answer every question first. Service work that has not started yet is refundable in full.",
  },
];
