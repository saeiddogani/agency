import type { ComponentType } from "react";
import {
  IconPalette,
  IconCode,
  IconSearch,
  IconWrench,
  IconServer,
  IconLayout,
  IconSmartphone,
  IconZap,
  IconShieldCheck,
  IconTarget,
  IconLayers,
  IconMail,
  type IconProps,
} from "@/components/icons";

export interface Service {
  title: string;
  description: string;
  icon: ComponentType<IconProps>;
}

export const services: Service[] = [
  {
    title: "Website Design",
    description:
      "Custom, modern designs tailored to your brand — built to earn trust the moment a visitor lands on your site.",
    icon: IconPalette,
  },
  {
    title: "Website Development",
    description:
      "Fast, reliable websites built with modern tools, coded cleanly so they're easy to grow and maintain.",
    icon: IconCode,
  },
  {
    title: "SEO",
    description:
      "On-page and technical SEO foundations that help local customers find your business on Google.",
    icon: IconSearch,
  },
  {
    title: "Website Maintenance",
    description:
      "Ongoing updates, monitoring, and support so your site stays secure, current, and running smoothly.",
    icon: IconWrench,
  },
  {
    title: "Hosting",
    description:
      "Managed, secure hosting with strong performance — no technical setup required on your end.",
    icon: IconServer,
  },
  {
    title: "Landing Pages",
    description:
      "Focused, high-converting pages for campaigns, promotions, and new service launches.",
    icon: IconLayout,
  },
];

export interface ServiceDetail {
  title: string;
  icon: ComponentType<IconProps>;
  whatItIs: string;
  whatYouGet: string[];
  whyItMatters: string;
  ctaLabel: string;
}

/** Full write-ups for the Services page — one section per service. */
export const serviceDetails: ServiceDetail[] = [
  {
    title: "Website Design",
    icon: IconPalette,
    whatItIs:
      "A custom visual design for your website — layout, colors, typography, and structure — built around your brand and your customers, not a generic template.",
    whatYouGet: [
      "A design tailored to your industry and audience",
      "A clear visual hierarchy that guides visitors toward action",
      "Consistent branding carried across every page",
      "Mobile-first layouts designed for real screens, not just a resized desktop view",
    ],
    whyItMatters:
      "Most visitors judge a business within seconds of landing on its website. A professional design builds instant credibility and keeps people from bouncing to a competitor.",
    ctaLabel: "Start Your Design",
  },
  {
    title: "Website Development",
    icon: IconCode,
    whatItIs:
      "Turning a design into a real, working website — built with modern, reliable code rather than page builders or bloated plugins.",
    whatYouGet: [
      "A fast, clean build using modern web technology",
      "Cross-browser and cross-device testing",
      "Code that's organized and easy to maintain or extend later",
      "A site that's technically sound from launch, not patched together",
    ],
    whyItMatters:
      "A good design that's poorly built will still load slowly, break on mobile, or become a pain to update. Solid development is what makes a website actually work for your business long-term.",
    ctaLabel: "Discuss Your Build",
  },
  {
    title: "SEO",
    icon: IconSearch,
    whatItIs:
      "On-page and technical SEO foundations — page structure, metadata, headings, and performance — that help search engines understand and rank your site.",
    whatYouGet: [
      "Optimized titles, meta descriptions, and headings for every page",
      "A technically clean site structure that's easy for search engines to crawl",
      "Local SEO basics so nearby customers can find you",
      "Guidance on the kind of content that helps you rank over time",
    ],
    whyItMatters:
      "A beautiful website does little good if no one can find it. SEO is what helps your business show up when local customers are searching for what you offer.",
    ctaLabel: "Improve My SEO",
  },
  {
    title: "Website Maintenance",
    icon: IconWrench,
    whatItIs:
      "Ongoing updates and monitoring after launch — keeping your site secure, current, and running the way it should.",
    whatYouGet: [
      "Regular software and security updates",
      "Uptime and performance monitoring",
      "Small content updates and fixes",
      "A direct point of contact whenever something needs attention",
    ],
    whyItMatters:
      "Websites aren't \"set it and forget it.\" Without maintenance, small issues can turn into downtime, security risks, or a site that no longer represents your business well.",
    ctaLabel: "Set Up Maintenance",
  },
  {
    title: "Hosting",
    icon: IconServer,
    whatItIs:
      "Managed, secure hosting for your website — handled for you, with no technical setup required on your end.",
    whatYouGet: [
      "Reliable, secure hosting infrastructure",
      "SSL and basic security best practices in place",
      "Performance-focused server configuration",
      "One less technical thing for you to manage",
    ],
    whyItMatters:
      "Slow or unreliable hosting undermines everything else — even a fast, well-built site still needs a solid foundation to run on.",
    ctaLabel: "Ask About Hosting",
  },
  {
    title: "Landing Pages",
    icon: IconLayout,
    whatItIs:
      "Focused, single-purpose pages built around one goal — a promotion, a new service, or a specific campaign.",
    whatYouGet: [
      "A page built around a single, clear call to action",
      "Copy and layout focused on conversion, not distraction",
      "Fast turnaround for time-sensitive campaigns",
      "A page that works well with your existing site or stands on its own",
    ],
    whyItMatters:
      "Sending campaign traffic to a general homepage often loses potential customers. A dedicated landing page keeps visitors focused on the specific offer that brought them there.",
    ctaLabel: "Plan a Landing Page",
  },
];

export const trustPoints: { title: string; icon: ComponentType<IconProps> }[] = [
  { title: "Modern Design", icon: IconPalette },
  { title: "Mobile Friendly", icon: IconSmartphone },
  { title: "Fast Performance", icon: IconZap },
  { title: "SEO Ready", icon: IconSearch },
];

export interface WhyPoint {
  title: string;
  description: string;
  icon: ComponentType<IconProps>;
}

export const whyChooseUs: WhyPoint[] = [
  {
    title: "Designed for your business",
    description: "No generic templates — every site is shaped around how your business actually works.",
    icon: IconTarget,
  },
  {
    title: "Mobile-first",
    description: "Most of your visitors are on their phones. We design for that reality first.",
    icon: IconSmartphone,
  },
  {
    title: "Fast loading",
    description: "Lean, optimized builds so pages load quickly and visitors don't bounce.",
    icon: IconZap,
  },
  {
    title: "SEO-friendly",
    description: "Clean structure and technical foundations that help you get found on Google.",
    icon: IconSearch,
  },
  {
    title: "Easy to manage",
    description: "Straightforward handoff and support, so updates don't require a developer.",
    icon: IconLayers,
  },
  {
    title: "Built to convert",
    description: "Every page is structured to turn visitors into calls, bookings, and customers.",
    icon: IconShieldCheck,
  },
];

export const aboutValues: WhyPoint[] = [
  {
    title: "Modern Web Design",
    description: "Clean, current design that makes your business look credible from the first visit.",
    icon: IconPalette,
  },
  {
    title: "Fast & Responsive",
    description: "Websites built to load quickly and work properly on every screen size.",
    icon: IconZap,
  },
  {
    title: "Practical Solutions",
    description: "No unnecessary complexity — just what your business actually needs to succeed online.",
    icon: IconTarget,
  },
  {
    title: "Clear Communication",
    description: "Plain-language updates throughout your project, with no technical jargon.",
    icon: IconMail,
  },
  {
    title: "Long-Term Support",
    description: "We stick around after launch with maintenance and support options as you grow.",
    icon: IconShieldCheck,
  },
];

export interface ProcessStepData {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStepData[] = [
  {
    number: "01",
    title: "Tell Us About Your Business",
    description: "We start with a short conversation about your business, your goals, and your customers.",
  },
  {
    number: "02",
    title: "Choose Your Design",
    description: "Pick a design direction that fits your industry, then we tailor it to your brand.",
  },
  {
    number: "03",
    title: "We Build Your Website",
    description: "We handle the design, content layout, and development while you focus on your business.",
  },
  {
    number: "04",
    title: "Launch & Grow",
    description: "Your site goes live, and we help you maintain and grow it over time.",
  },
];

/**
 * Portfolio / case-study data now lives in `src/lib/portfolio.ts` — it powers
 * the homepage "Our Work" section, the /portfolio listing page, and the
 * /portfolio/[slug] detail pages, and links to real demo sites.
 */

export interface PricingTier {
  name: string;
  price: string;
  bestFor: string;
  description: string;
  features: string[];
  featured?: boolean;
}

/**
 * Starting prices — not final quotes. Update the `price` fields here as
 * pricing changes; the FAQ and pricing page copy already frame these as
 * starting points, so changing numbers doesn't require other edits.
 */
export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$999",
    bestFor: "New businesses that need a solid, professional first website.",
    description: "A focused, professional site to establish your business online.",
    features: [
      "Up to 5 pages",
      "Mobile-friendly, responsive design",
      "Basic on-page SEO setup",
      "Contact form",
      "Launch on a domain of your choice",
      "1 round of design revisions",
    ],
  },
  {
    name: "Business",
    price: "$1,799",
    bestFor: "Established businesses that want more pages and a stronger presence.",
    description: "A stronger web presence with room to grow your content and services.",
    features: [
      "Up to 10 pages",
      "Custom design direction",
      "On-page SEO across all pages",
      "Booking or quote request form",
      "Basic local SEO setup",
      "2 rounds of design revisions",
    ],
    featured: true,
  },
  {
    name: "Professional",
    price: "$2,999",
    bestFor: "Businesses that need more depth, content, or functionality.",
    description: "A comprehensive build for businesses that need more depth and features.",
    features: [
      "10+ pages",
      "Advanced SEO foundation",
      "Priority support during the build",
      "Ongoing maintenance option available",
      "Support for more advanced page layouts",
      "3 rounds of design revisions",
    ],
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const pricingFaqs: FaqItem[] = [
  {
    question: "How long does a website take?",
    answer:
      "Most projects take 2–4 weeks from kickoff to launch, depending on the size of the site and how quickly we receive content and feedback. We'll give you a clear timeline before work begins.",
  },
  {
    question: "Do you provide hosting?",
    answer:
      "Yes. Hosting is available as an add-on for any package, or you're welcome to use your own hosting provider if you already have one.",
  },
  {
    question: "Can I update my website myself?",
    answer:
      "Yes. We build sites so straightforward updates — text, images, basic content — don't require a developer. For larger changes, our maintenance plans have you covered.",
  },
  {
    question: "Do you provide SEO?",
    answer:
      "Every website includes basic on-page SEO. If you want a deeper, ongoing SEO strategy, that's available as part of our dedicated SEO service.",
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Yes. We regularly redesign existing sites — we'll review what you have now and recommend the best approach, whether that's a full rebuild or a more focused refresh.",
  },
  {
    question: "What happens after the website launches?",
    answer:
      "You'll get a walkthrough of your new site and guidance on making basic updates yourself, with the option to add ongoing maintenance and support so everything keeps running smoothly.",
  },
];

/**
 * Options for the project inquiry form on the Contact page.
 * `businessTypeOptions` intentionally reuses the template category list
 * (from `lib/templates.ts`) so the two stay in sync automatically.
 */
export const servicesNeededOptions = [
  "New Website",
  "Website Redesign",
  "Website Maintenance",
  "SEO",
  "Hosting",
  "Landing Page",
  "Other",
] as const;

export const budgetOptions = [
  "Under $1,000",
  "$1,000–$2,000",
  "$2,000–$3,000",
  "$3,000–$5,000",
  "$5,000+",
] as const;

export const timelineOptions = ["ASAP", "1–2 months", "2–3 months", "Flexible"] as const;

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

/** Placeholder testimonials — replace with real client feedback once available. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Our new website finally looks as professional as the work we do. We've had more people mention finding us online since launch.",
    name: "Example Client",
    role: "Owner, Home Services Business",
  },
  {
    quote:
      "The process was simple and the team explained everything clearly. We didn't need to know anything technical.",
    name: "Example Client",
    role: "Owner, Local Restaurant",
  },
  {
    quote:
      "It was easy to see the value right away — a clean, fast site that actually represents our business well.",
    name: "Example Client",
    role: "Owner, Professional Services Firm",
  },
];
