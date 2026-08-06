/**
 * Central site configuration.
 * Update agency name, contact details, and social links here —
 * they are referenced throughout the header, footer, and metadata.
 *
 * SITE URL: `NEXT_PUBLIC_SITE_URL` — set this env var to the real production
 * domain once one exists (e.g. `https://www.example.com`, no trailing
 * slash). It feeds `metadataBase`, canonical URLs, Open Graph URLs,
 * sitemap.xml, and robots.txt. Falls back to localhost so the site is fully
 * functional in local development without a real domain configured. See
 * `.env.example` for the full list of environment variables used by the site.
 */

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");

export const siteConfig = {
  name: "Northlight Studio",
  shortName: "Northlight",
  tagline: "Websites That Help Your Business Grow.",
  description:
    "Northlight Studio designs and builds modern, fast, professional websites for small and local businesses across Vancouver and the surrounding areas.",
  url: configuredSiteUrl && configuredSiteUrl.length > 0 ? configuredSiteUrl : "http://localhost:3000",
  locale: "en_CA",
  /** IANA time zone used to format the submission timestamp in lead emails. */
  timeZone: "America/Vancouver",
  serviceArea: "Vancouver, BC & the Lower Mainland",
  /**
   * How quickly we tell inquiry submitters we'll respond — shown on the
   * Contact page and in the auto-reply email. Change this one value rather
   * than editing copy in multiple places.
   */
  responseTime: "1 business day",
  contact: {
    email: "hello@northlightstudio.com",
    phone: "+1 (604) 555-0148",
    phoneDisplay: "(604) 555-0148",
    location: "Vancouver, BC, Canada",
  },
  social: {
    instagram: "https://instagram.com/northlightstudio",
    linkedin: "https://linkedin.com/company/northlightstudio",
    facebook: "https://facebook.com/northlightstudio",
  },
} as const;

export const mainNavLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Templates", href: "/templates" },
  { label: "About", href: "/about" },
] as const;

export const footerNavLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Templates", href: "/templates" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerServiceLinks = [
  { label: "Website Design", href: "/services" },
  { label: "Development", href: "/services" },
  { label: "SEO", href: "/services" },
  { label: "Maintenance", href: "/services" },
  { label: "Hosting", href: "/services" },
] as const;
