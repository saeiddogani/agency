/**
 * Fictional content for the Studio 22 demo site. Invented for
 * demonstration purposes only — not a real business.
 */

export const s22NavLinks = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
] as const;

export const s22Services = [
  { title: "Haircuts", price: "$45", description: "Precision cuts tailored to your face shape and style." },
  { title: "Styling", price: "$35", description: "Finishing and styling for any occasion." },
  { title: "Beard Grooming", price: "$25", description: "Shape-ups, trims, and hot towel treatment." },
  { title: "Color", price: "From $80", description: "Full color, balayage, and grey coverage." },
  { title: "Specialty Services", price: "From $60", description: "Textured cuts, design work, and custom requests." },
] as const;

export const s22Team = [
  { name: "Jordan Reyes", role: "Founder & Lead Stylist", initials: "JR" },
  { name: "Casey Nguyen", role: "Senior Barber", initials: "CN" },
  { name: "Amara Okafor", role: "Color Specialist", initials: "AO" },
] as const;

export const s22Gallery = [
  "Fresh Fade",
  "Beard Sculpt",
  "Studio Interior",
  "Color Work",
  "Classic Cut",
  "Styling Chair",
] as const;

export const s22Contact = {
  phoneDisplay: "(604) 555-0122",
  phone: "+16045550122",
  email: "book@studio22.example",
  location: "Gastown, Vancouver, BC (Demo Business)",
  hours: [
    { day: "Tue – Fri", hours: "10:00 AM – 7:00 PM" },
    { day: "Saturday", hours: "9:00 AM – 5:00 PM" },
    { day: "Sun – Mon", hours: "Closed" },
  ],
};
