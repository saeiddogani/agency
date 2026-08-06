import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { standaloneDemoSlugs } from "@/lib/templates";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/templates",
    "/about",
    "/contact",
    ...standaloneDemoSlugs.map((slug) => `/templates/${slug}`),
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
