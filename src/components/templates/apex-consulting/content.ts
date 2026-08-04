/**
 * Fictional content for the Apex Consulting demo site. Invented for
 * demonstration purposes only — not a real business. Case studies and
 * results are illustrative examples, not real client work.
 */

export const acNavLinks = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Insights", href: "#insights" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const acServices = [
  { title: "Business Strategy", description: "Clear, practical strategy grounded in how your business actually operates." },
  { title: "Operations", description: "Streamlined processes that remove friction and free up your team's time." },
  { title: "Growth Planning", description: "A realistic roadmap for sustainable growth, not just a pitch deck." },
  { title: "Digital Transformation", description: "Practical guidance on the tools and systems worth investing in." },
] as const;

export const acApproach = [
  { number: "01", title: "Understand", description: "We start by learning how your business actually works today." },
  { number: "02", title: "Analyze", description: "We identify what's driving results — and what's holding you back." },
  { number: "03", title: "Strategize", description: "We build a clear, prioritized plan tailored to your goals." },
  { number: "04", title: "Execute", description: "We work alongside your team to put the plan into action." },
] as const;

export const acCaseStudies = [
  {
    title: "Streamlining Operations for a Growing Retailer",
    summary: "Example case study: reducing manual processes and improving order turnaround time.",
    tag: "Operations",
  },
  {
    title: "A Growth Strategy for a Regional Services Firm",
    summary: "Example case study: prioritizing markets and offerings for sustainable expansion.",
    tag: "Growth Planning",
  },
  {
    title: "Modernizing Systems for a Professional Services Team",
    summary: "Example case study: consolidating tools to reduce overhead and improve visibility.",
    tag: "Digital Transformation",
  },
] as const;

export const acInsights = [
  {
    title: "Building a Stronger Business Strategy",
    description: "A practical look at what separates a real strategy from a list of goals.",
  },
  {
    title: "Preparing for Sustainable Growth",
    description: "How to plan for growth without outpacing your operations.",
  },
  {
    title: "Improving Operational Efficiency",
    description: "Small process changes that add up to meaningful time savings.",
  },
] as const;

export const acContact = {
  phoneDisplay: "(604) 555-0188",
  phone: "+16045550188",
  email: "hello@apexconsulting.example",
  location: "Vancouver, BC (Demo Business)",
};
