/**
 * Fictional content for the West Coast Roofing demo site. Everything here —
 * business details, projects, and copy — is invented for demonstration
 * purposes only and does not describe a real business.
 */

export const wcrNavLinks = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export const wcrServices = [
  {
    title: "Roof Replacement",
    description:
      "Full roof replacements using durable materials suited to coastal weather, installed with clean, careful work from start to finish.",
  },
  {
    title: "Roof Repair",
    description:
      "Fast, reliable repairs for leaks, damaged shingles, and storm damage — fixed right the first time.",
  },
  {
    title: "Roof Inspection",
    description:
      "A thorough top-to-bottom inspection with a clear, honest report on the condition of your roof.",
  },
  {
    title: "Emergency Roofing",
    description:
      "Rapid response when you need it most, with temporary protection and a clear plan to fix the problem.",
  },
] as const;

export const wcrWhyUs = [
  {
    title: "Quality Work",
    description: "Every job is done with care and attention to detail, from small repairs to full replacements.",
  },
  {
    title: "Clear Communication",
    description: "Straightforward estimates and updates throughout the project — no surprises.",
  },
  {
    title: "Professional Service",
    description: "A tidy job site, respectful crew, and a finished result you can count on.",
  },
  {
    title: "Built for Local Conditions",
    description: "Materials and techniques chosen for the rain, wind, and weather of the West Coast.",
  },
] as const;

export const wcrProjects = [
  {
    title: "Residential Roof Replacement",
    description: "A full asphalt shingle replacement on a single-family home.",
    accent: "#B5502E",
  },
  {
    title: "Modern Home Roofing",
    description: "A clean, low-slope roofing solution for a contemporary new build.",
    accent: "#8C4B6B",
  },
  {
    title: "Cedar Roof Restoration",
    description: "Restoring a cedar shake roof on an older character home.",
    accent: "#57534E",
  },
] as const;

export const wcrContact = {
  phoneDisplay: "(604) 555-0199",
  phone: "+16045550199",
  email: "info@westcoastroofing.example",
  location: "Vancouver, BC (Demo Business)",
};
