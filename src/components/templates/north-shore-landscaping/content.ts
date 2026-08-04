/**
 * Fictional content for the North Shore Landscaping demo site. Invented for
 * demonstration purposes only — not a real business.
 */

export const nslNavLinks = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const nslServices = [
  {
    title: "Landscape Design",
    description: "Thoughtful, custom landscape plans built around how you actually want to use your yard.",
  },
  {
    title: "Garden & Planting",
    description: "Plant selection and garden beds chosen for the local climate and year-round interest.",
  },
  {
    title: "Outdoor Living",
    description: "Patios, walkways, and outdoor spaces designed for relaxing and entertaining.",
  },
  {
    title: "Lawn & Maintenance",
    description: "Ongoing care to keep your landscape looking its best through every season.",
  },
] as const;

export const nslProjects = [
  {
    title: "Modern Backyard",
    description: "A clean, low-maintenance backyard redesign with a new patio and planting beds.",
    accent: "#166534",
  },
  {
    title: "West Coast Garden",
    description: "A layered planting design featuring native, drought-tolerant species.",
    accent: "#3F6B44",
  },
  {
    title: "Outdoor Entertaining Space",
    description: "A backyard built around a dining area, fire feature, and evening lighting.",
    accent: "#57534E",
  },
] as const;

export const nslProcess = [
  { number: "01", title: "Consultation", description: "We visit your property and talk through your goals and budget." },
  { number: "02", title: "Design", description: "We put together a design concept tailored to your space." },
  { number: "03", title: "Build", description: "Our team brings the design to life with care and attention to detail." },
  { number: "04", title: "Enjoy", description: "You get to enjoy an outdoor space built around how you actually live." },
] as const;

export const nslContact = {
  phoneDisplay: "(604) 555-0142",
  phone: "+16045550142",
  email: "hello@northshorelandscaping.example",
  location: "North Vancouver, BC (Demo Business)",
};
