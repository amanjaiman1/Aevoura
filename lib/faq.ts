/** Questions a real buyer asks before spending money. No filler. */

export type FaqItem = { q: string; a: string };

/** Shown on every work detail page. */
export const workFaq: FaqItem[] = [
  {
    q: "What exactly do I receive when I buy the source code?",
    a: "The complete repository: every page, component, animation and style file, the design tokens, the placeholder assets, and a setup document that gets it running locally in a few minutes. No obfuscation, no removed sections, no licence key phoning home.",
  },
  {
    q: "Can I change the design myself afterwards?",
    a: "Yes. Colour, type and spacing are centralised as design tokens, so a full rebrand is a handful of values rather than a search across files. Larger structural changes are ordinary React work.",
  },
  {
    q: "Do I need to know how to code?",
    a: "For the source-code option, yes — or someone on your team does. If you would rather not touch it, Launch puts it live with your content, and Custom rebuilds it around your brand.",
  },
  {
    q: "How many sites can I run on one licence?",
    a: "One production site per standard licence. A second project needs a second licence. Exclusive licences transfer the design to you entirely and remove it from sale here.",
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
    a: "The build ships with art-directed placeholders so nothing looks broken. Your real photography and copy go in during Launch or Custom. We can write the copy if you want it handled.",
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
    a: "You are not paying for the first three weeks of exploration. The structure, motion language and engineering already exist and are already working, so the budget goes into what makes the site yours rather than into discovering a direction.",
  },
  {
    q: "How different can the final site be from the original work?",
    a: "As different as you need. Some projects keep the structure and change the identity. Others keep only the engineering standard and rebuild the rest. The starting point is a floor, not a ceiling.",
  },
  {
    q: "What do you need from me to begin?",
    a: "A sense of the brand, whatever assets exist, and clarity on what the site has to achieve commercially. If any of that is missing we work through it in the first call rather than sending a form back.",
  },
  {
    q: "How long does a custom build take?",
    a: "Most run three to six weeks from scope agreement to launch. Complex commerce or 3D work runs longer, and we say so before you commit rather than during.",
  },
  {
    q: "How does payment work?",
    a: "Typically 40% to begin, 40% at design approval, 20% at launch. Invoiced in INR, or USD for international clients. Nothing is paid before scope is written down.",
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
    a: "That the design is withdrawn from this collection permanently, removed from the site, and never sold to anyone else. It is recorded in writing, and the work is marked as withdrawn here rather than quietly deleted.",
  },
  {
    q: "Are the fonts and assets included?",
    a: "Open-source fonts are included and named. Commercially licensed fonts are listed with a link so you can buy the licence in your own name — we cannot legally transfer those. Placeholder assets are ours and are cleared for your use.",
  },
];
