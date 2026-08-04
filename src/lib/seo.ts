import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

interface PageMetadataInput {
  /** Page-specific title. The root layout appends " — {siteConfig.name}". */
  title: string;
  description: string;
  /** Path starting with "/", e.g. "/services" or "/portfolio/casa-bella". */
  path: string;
  /**
   * Optional absolute or root-relative Open Graph image path (e.g.
   * "/og/services.png"). No default image exists yet — omit until one is
   * designed. Once available, either pass it per-page here or add a
   * site-wide fallback in `buildMetadata` below.
   */
  ogImage?: string;
  /** Set true for pages that shouldn't be indexed (e.g. templates without a demo yet). */
  noIndex?: boolean;
}

/**
 * Builds a consistent Metadata object (title, description, canonical,
 * Open Graph, Twitter card) for a single page. Centralizing this means
 * every page automatically stays consistent, and adding something new
 * (like a default OG image) later only requires one change here rather
 * than editing every page.
 */
export function buildMetadata({ title, description, path, ogImage, noIndex }: PageMetadataInput): Metadata {
  const url = `${siteConfig.url}${path}`;
  const socialTitle = path === "/" ? title : `${title} — ${siteConfig.name}`;

  const metadata: Metadata = {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      url,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };

  if (noIndex) {
    metadata.robots = { index: false, follow: true };
  }

  return metadata;
}
