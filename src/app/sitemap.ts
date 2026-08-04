import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { standaloneDemoSlugs } from "@/lib/templates";
import { portfolioCaseStudies } from "@/lib/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/templates",
    "/portfolio",
    "/pricing",
    "/about",
    "/contact",
    ...standaloneDemoSlugs.map((slug) => `/templates/${slug}`),
    ...portfolioCaseStudies.map((item) => `/portfolio/${item.slug}`),
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
