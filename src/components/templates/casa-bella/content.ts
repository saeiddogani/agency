/**
 * Fictional content for the Casa Bella demo site. Invented for
 * demonstration purposes only — not a real business.
 */

export const cbNavLinks = [
  { label: "Home", href: "#top" },
  { label: "Menu", href: "#menu" },
  { label: "Our Story", href: "#story" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
] as const;

export const cbMenu = {
  Starters: [
    { name: "Burrata & Heirloom Tomato", description: "Whipped burrata, basil oil, aged balsamic", price: "$16" },
    { name: "Grilled Octopus", description: "Fingerling potatoes, chili, lemon", price: "$19" },
    { name: "Arancini", description: "Saffron risotto, mozzarella, tomato sugo", price: "$14" },
  ],
  Mains: [
    { name: "Tagliatelle al Ragù", description: "Slow-braised beef, parmesan, fresh herbs", price: "$27" },
    { name: "Pan-Seared Branzino", description: "Fennel, citrus, olive oil", price: "$34" },
    { name: "Wood-Fired Margherita", description: "San Marzano tomato, fior di latte, basil", price: "$21" },
  ],
  Desserts: [
    { name: "Tiramisu", description: "Espresso-soaked ladyfingers, mascarpone", price: "$11" },
    { name: "Panna Cotta", description: "Vanilla bean, seasonal berry compote", price: "$10" },
  ],
} as const;

export const cbChefSelection = [
  { name: "Tagliatelle al Ragù", note: "A Casa Bella signature, simmered for hours" },
  { name: "Pan-Seared Branzino", note: "Light, bright, and finished tableside" },
  { name: "Burrata & Heirloom Tomato", note: "A guest favorite to start the evening" },
] as const;

export const cbGallery = [
  { label: "Dining Room" },
  { label: "Wood-Fired Oven" },
  { label: "Private Table" },
  { label: "Wine Wall" },
  { label: "Evening Ambiance" },
  { label: "Chef's Pass" },
] as const;

export const cbHours = [
  { day: "Tuesday – Thursday", hours: "5:00 PM – 9:30 PM" },
  { day: "Friday – Saturday", hours: "5:00 PM – 10:30 PM" },
  { day: "Sunday", hours: "5:00 PM – 9:00 PM" },
  { day: "Monday", hours: "Closed" },
] as const;

export const cbContact = {
  phoneDisplay: "(604) 555-0173",
  phone: "+16045550173",
  email: "reservations@casabella.example",
  address: "482 Main Street, Vancouver, BC (Demo Business)",
};
