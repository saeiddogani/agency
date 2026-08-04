/**
 * Portfolio / case-study registry.
 *
 * Every entry here is a demo concept built to show what our agency can
 * design and build for a given industry — not a real client engagement.
 * Each `slug` matches the corresponding entry in `lib/templates.ts` so the
 * case study can link straight to its live interactive demo at
 * `/templates/[slug]`.
 *
 * Add a new case study by adding an entry here — the `/portfolio` listing
 * page and the `/portfolio/[slug]` detail route both read from this single
 * source.
 */

export interface PortfolioCaseStudy {
  slug: string;
  name: string;
  category: string;
  projectType: string;
  accent: string;
  /** Short summary shown on listing cards. */
  summary: string;
  /** Longer overview shown at the top of the detail page. */
  overview: string;
  designApproach: string;
  keyFeatures: string[];
}

export const portfolioCaseStudies: PortfolioCaseStudy[] = [
  {
    slug: "west-coast-roofing",
    name: "West Coast Roofing",
    category: "Home Services",
    projectType: "Website Concept — Roofing & Exteriors",
    accent: "#B5502E",
    summary:
      "A trust-first website concept for a home services business, built around clear calls to action and project proof.",
    overview:
      "West Coast Roofing is a demo project created to show how a home services business can turn a website into a steady source of quote requests. The concept leans on straightforward navigation, prominent contact options, and real project examples so a visitor can quickly judge the quality of the work and reach out with confidence.",
    designApproach:
      "The design uses a grounded, professional palette and a structure that puts trust signals — service area, past project photos, and a clear \"why choose us\" section — within easy reach on every page. Calls to action are repeated at natural decision points rather than left to a single contact page, which matters most for home services customers who are often comparing several companies at once.",
    keyFeatures: [
      "Prominent \"Request a Quote\" calls to action throughout the page",
      "A project gallery showcasing example completed work",
      "A dedicated \"Why Choose Us\" trust section",
      "Clear service area and contact information in the header and footer",
      "Fully responsive layout built mobile-first for on-the-go visitors",
    ],
  },
  {
    slug: "casa-bella",
    name: "Casa Bella",
    category: "Food & Hospitality",
    projectType: "Website Concept — Restaurant",
    accent: "#6B1E1E",
    summary:
      "An elegant restaurant website concept built around menu presentation, atmosphere, and easy reservations.",
    overview:
      "Casa Bella is a demo project for a restaurant that wants its website to feel as considered as its dining room. The concept is organized around the questions a hungry visitor actually has — what's on the menu, what's the vibe, and how do I book a table — and puts a reservation call to action within reach on every scroll.",
    designApproach:
      "A warm, editorial layout pairs a serif display typeface with generous imagery placeholders and a wine-and-gold palette to suggest a refined but approachable dining experience. Menu items are presented with real structure — starters, mains, desserts — rather than a flat list, and the reservation CTA is treated as a first-class element rather than an afterthought in the footer.",
    keyFeatures: [
      "Structured menu presentation with starters, mains, and desserts",
      "A dedicated story/about section to convey atmosphere and philosophy",
      "A visual gallery section for interior and dish photography",
      "A persistent \"Reserve a Table\" call to action",
      "Hours, location, and contact details clearly presented in the footer",
    ],
  },
  {
    slug: "northpoint-realty",
    name: "NorthPoint Realty",
    category: "Real Estate",
    projectType: "Website Concept — Real Estate",
    accent: "#0F766E",
    summary:
      "A real estate website concept designed to showcase listings, agents, and a simple property search experience.",
    overview:
      "NorthPoint Realty is a demo project exploring how a real estate website can help a small brokerage or independent agent present listings professionally and generate buyer and seller inquiries. The homepage leads with a visual property search interface, followed by featured listings and agent profiles that build credibility.",
    designApproach:
      "The layout borrows conventions buyers already expect from real estate sites — a prominent search bar, card-based listings with key details visible at a glance — while keeping the visual language clean and confident with a teal-and-slate palette. Every listing and agent profile is clearly labeled as example content, since no real inventory or team exists yet.",
    keyFeatures: [
      "A visual property search interface (location, type, price range)",
      "Featured property listings with price, beds, baths, and type",
      "Agent profile cards to build trust with prospective clients",
      "A services section covering buying, selling, and market analysis",
      "Clear \"Start Your Search\" and contact calls to action",
    ],
  },
];

export function getPortfolioCaseStudyBySlug(slug: string): PortfolioCaseStudy | undefined {
  return portfolioCaseStudies.find((item) => item.slug === slug);
}
