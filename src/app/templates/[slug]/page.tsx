import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoonDemo } from "@/components/templates/ComingSoonDemo";
import { WestCoastRoofingDemo } from "@/components/templates/west-coast-roofing/WestCoastRoofingDemo";
import { NorthShoreLandscapingDemo } from "@/components/templates/north-shore-landscaping/NorthShoreLandscapingDemo";
import { CasaBellaDemo } from "@/components/templates/casa-bella/CasaBellaDemo";
import { Studio22Demo } from "@/components/templates/studio-22/Studio22Demo";
import { NorthPointRealtyDemo } from "@/components/templates/northpoint-realty/NorthPointRealtyDemo";
import { ApexConsultingDemo } from "@/components/templates/apex-consulting/ApexConsultingDemo";
import { getTemplateBySlug, templates } from "@/lib/templates";
import { buildMetadata } from "@/lib/seo";

interface TemplateDemoPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return templates.map((template) => ({ slug: template.slug }));
}

export async function generateMetadata({ params }: TemplateDemoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    return { title: "Template Not Found" };
  }

  if (template.hasDemo) {
    return buildMetadata({
      title: `${template.name} — Website Template Demo`,
      description: `A concept website demo for ${template.name}, a fictional ${template.category.toLowerCase()} business. Built to show what our agency can create for you.`,
      path: `/templates/${template.slug}`,
    });
  }

  return buildMetadata({
    title: `${template.name} — Template Demo Coming Soon`,
    description: `${template.description} The full interactive demo for this template is coming soon.`,
    path: `/templates/${template.slug}`,
    noIndex: true,
  });
}

export default async function TemplateDemoPage({ params }: TemplateDemoPageProps) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    notFound();
  }

  switch (template.slug) {
    case "west-coast-roofing":
      return <WestCoastRoofingDemo />;
    case "north-shore-landscaping":
      return <NorthShoreLandscapingDemo />;
    case "casa-bella":
      return <CasaBellaDemo />;
    case "studio-22":
      return <Studio22Demo />;
    case "northpoint-realty":
      return <NorthPointRealtyDemo />;
    case "apex-consulting":
      return <ApexConsultingDemo />;
    default:
      return <ComingSoonDemo template={template} />;
  }
}
