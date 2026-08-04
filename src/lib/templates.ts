/**
 * Centralized template registry. Adding a new template — even before its
 * full demo site exists — only requires adding an entry here:
 *
 *   { slug, name, category, description, accent, hasDemo: false }
 *
 * The /templates listing page, the homepage preview, and the
 * /templates/[slug] route all read from this single source. Setting
 * `hasDemo: true` and adding a case in `src/app/templates/[slug]/page.tsx`
 * is the only other step needed to "turn on" a full demo site.
 */

export const templateFilterCategories = [
  "All",
  "Home Services",
  "Food & Hospitality",
  "Professional Services",
  "Health & Beauty",
  "Real Estate",
  "Other",
] as const;

export type TemplateFilterCategory = (typeof templateFilterCategories)[number];
export type TemplateCategoryName = Exclude<TemplateFilterCategory, "All">;

export interface TemplateDefinition {
  slug: string;
  name: string;
  category: TemplateCategoryName;
  description: string;
  /** Accent color used for the card preview mockup on the listing/preview grids. */
  accent: string;
  /** Whether a full, standalone demo site exists at /templates/[slug] yet. */
  hasDemo: boolean;
}

export const templates: TemplateDefinition[] = [
  {
    slug: "west-coast-roofing",
    name: "West Coast Roofing",
    category: "Home Services",
    description: "A modern website concept for a professional roofing company.",
    accent: "#B5502E",
    hasDemo: true,
  },
  {
    slug: "north-shore-landscaping",
    name: "North Shore Landscaping",
    category: "Home Services",
    description: "A clean, visual website concept for a landscaping and outdoor services company.",
    accent: "#166534",
    hasDemo: true,
  },
  {
    slug: "casa-bella",
    name: "Casa Bella",
    category: "Food & Hospitality",
    description: "An elegant restaurant website concept focused on menu, atmosphere, and reservations.",
    accent: "#6B1E1E",
    hasDemo: true,
  },
  {
    slug: "studio-22",
    name: "Studio 22",
    category: "Health & Beauty",
    description: "A modern website concept for a barber or salon.",
    accent: "#B8860B",
    hasDemo: true,
  },
  {
    slug: "northpoint-realty",
    name: "NorthPoint Realty",
    category: "Real Estate",
    description: "A professional real estate website concept designed to showcase properties and generate inquiries.",
    accent: "#0F766E",
    hasDemo: true,
  },
  {
    slug: "apex-consulting",
    name: "Apex Consulting",
    category: "Professional Services",
    description: "A clean corporate website concept for a consulting or professional services company.",
    accent: "#0891B2",
    hasDemo: true,
  },
];

export function getTemplateBySlug(slug: string): TemplateDefinition | undefined {
  return templates.find((template) => template.slug === slug);
}

/** A small, varied selection shown in the homepage templates preview. */
const featuredSlugs = ["west-coast-roofing", "casa-bella", "apex-consulting"];
export const featuredTemplates = featuredSlugs
  .map(getTemplateBySlug)
  .filter((template): template is TemplateDefinition => Boolean(template));

/** Slugs with a full, chrome-free standalone demo site (see SiteChrome). */
export const standaloneDemoSlugs = templates.filter((t) => t.hasDemo).map((t) => t.slug);
