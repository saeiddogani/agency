"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { standaloneDemoSlugs } from "@/lib/templates";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/lib/data";

const standaloneDemoPaths = new Set(standaloneDemoSlugs.map((slug) => `/templates/${slug}`));

/**
 * Represents the agency itself as a professional service business.
 * Sourced entirely from `siteConfig` and the real `services` list in
 * `lib/data.ts`, so updating either automatically keeps this in sync —
 * no separate structured-data content to maintain. Intentionally does NOT
 * include reviews, ratings, or awards, since none of that exists yet; add
 * an `aggregateRating` only once real, verifiable reviews are collected.
 */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteConfig.url}/#business`,
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vancouver",
    addressRegion: "BC",
    addressCountry: "CA",
  },
  areaServed: siteConfig.serviceArea,
  sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin, siteConfig.social.facebook],
  makesOffer: services.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.title,
      description: service.description,
    },
  })),
};

/**
 * Wraps every page with the agency Header/Footer — except standalone
 * template demo sites (e.g. /templates/west-coast-roofing), which render
 * their own header, navigation, and footer so each demo can look and feel
 * like an independent business website rather than a page on our site.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isStandaloneDemo = standaloneDemoPaths.has(pathname);
  // The admin dashboard renders its own sidebar/topbar shell (see
  // AdminShell) instead of the public Header/Footer.
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isStandaloneDemo || isAdmin) {
    return <>{children}</>;
  }

  return (
    <MotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </MotionProvider>
  );
}
