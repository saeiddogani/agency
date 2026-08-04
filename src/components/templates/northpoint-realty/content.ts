/**
 * Fictional content for the NorthPoint Realty demo site. Invented for
 * demonstration purposes only — not a real business. Listings are example
 * data for layout purposes and do not represent real properties.
 */

export const npNavLinks = [
  { label: "Home", href: "#top" },
  { label: "Properties", href: "#properties" },
  { label: "Buy", href: "#services" },
  { label: "Sell", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const npProperties = [
  { address: "142 Harbourview Ave, Vancouver, BC", price: "$1,245,000", beds: 4, baths: 3, type: "Single Family", accent: "#0F766E" },
  { address: "88 Cedar Ridge Rd, North Vancouver, BC", price: "$894,000", beds: 3, baths: 2, type: "Townhome", accent: "#134E4A" },
  { address: "310 Marine Dr #1204, Vancouver, BC", price: "$675,000", beds: 2, baths: 2, type: "Condo", accent: "#0E7490" },
  { address: "27 Lakeshore Cres, Coquitlam, BC", price: "$1,590,000", beds: 5, baths: 4, type: "Single Family", accent: "#164E63" },
  { address: "56 Willow Park Way, Burnaby, BC", price: "$759,000", beds: 3, baths: 2, type: "Townhome", accent: "#115E59" },
  { address: "901 Granville St #802, Vancouver, BC", price: "$549,000", beds: 1, baths: 1, type: "Condo", accent: "#0F766E" },
] as const;

export const npServices = [
  { title: "Buying", description: "Guidance through every step of finding and purchasing your next home." },
  { title: "Selling", description: "A clear strategy to list, market, and sell your property for the right price." },
  { title: "Market Analysis", description: "Up-to-date insight into local pricing and market conditions." },
  { title: "Property Guidance", description: "Honest advice on neighborhoods, timing, and what to look for." },
] as const;

export const npTeam = [
  { name: "Sarah Whitfield", role: "Principal Agent", initials: "SW" },
  { name: "Marcus Chen", role: "Buyer's Agent", initials: "MC" },
  { name: "Priya Anand", role: "Listing Specialist", initials: "PA" },
] as const;

export const npContact = {
  phoneDisplay: "(604) 555-0165",
  phone: "+16045550165",
  email: "hello@northpointrealty.example",
  location: "Vancouver, BC (Demo Business)",
};

export const npFilters = {
  transactionTypes: ["Buy", "Rent"],
  propertyTypes: ["Any Type", "Single Family", "Townhome", "Condo"],
  priceRanges: ["Any Price", "Under $700k", "$700k – $1M", "$1M – $1.5M", "$1.5M+"],
};
