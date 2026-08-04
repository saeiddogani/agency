import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { FinalCta } from "@/components/home/FinalCta";
import { IconArrowRight, IconChevronRight } from "@/components/icons";
import { getPortfolioCaseStudyBySlug, portfolioCaseStudies } from "@/lib/portfolio";
import { getTemplateBySlug } from "@/lib/templates";
import { buildMetadata } from "@/lib/seo";

interface PortfolioDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return portfolioCaseStudies.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PortfolioDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getPortfolioCaseStudyBySlug(slug);

  if (!caseStudy) {
    return { title: "Case Study Not Found" };
  }

  return buildMetadata({
    title: `${caseStudy.name} — Portfolio`,
    description: caseStudy.summary,
    path: `/portfolio/${caseStudy.slug}`,
  });
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { slug } = await params;
  const caseStudy = getPortfolioCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const template = getTemplateBySlug(caseStudy.slug);
  const hasLiveDemo = Boolean(template?.hasDemo);

  return (
    <>
      <section className="border-b border-ink-200 bg-white py-16 lg:py-24">
        <Container className="flex flex-col gap-6">
          <Link
            href="/portfolio"
            className="inline-flex w-fit items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            ← Back to Portfolio
          </Link>

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
                {caseStudy.category}
              </span>
              <span className="rounded-full bg-ink-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-600">
                Demo Project
              </span>
            </div>
            <h1 className="text-balance max-w-2xl">{caseStudy.name}</h1>
            <p className="text-sm font-medium text-ink-500">{caseStudy.projectType}</p>
            <p className="max-w-2xl text-base text-ink-600 sm:text-lg">{caseStudy.overview}</p>
            <p className="max-w-2xl text-xs text-ink-500">
              This is a design concept created by {" "}
              <Link href="/about" className="underline underline-offset-2 hover:text-ink-600">
                our agency
              </Link>{" "}
              to demonstrate our process. It does not represent a real client or business.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {hasLiveDemo ? (
              <Button href={`/templates/${caseStudy.slug}`} size="lg">
                View Live Demo
                <IconArrowRight className="h-4 w-4" />
              </Button>
            ) : null}
            <Button href="/contact" variant="outline" size="lg">
              Start a Project Like This
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24" aria-labelledby="preview-heading">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 id="preview-heading" className="sr-only">
              Website Preview
            </h2>
            <div className="relative">
              <BrowserMockup label={`${caseStudy.name.toLowerCase().replace(/\s+/g, "")}.example`}>
                <div
                  className="flex h-64 flex-col justify-end gap-3 p-6 sm:h-80"
                  style={{ backgroundColor: caseStudy.accent }}
                  role="img"
                  aria-label={`Concept preview graphic for ${caseStudy.name}, a fictional ${caseStudy.category.toLowerCase()} project`}
                >
                  <div className="h-3 w-1/2 rounded-full bg-white/70" />
                  <div className="h-2.5 w-1/3 rounded-full bg-white/40" />
                  <div className="mt-3 h-9 w-36 rounded-md bg-white/90" />
                </div>
              </BrowserMockup>
              <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-600 shadow-sm">
                Demo Project
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-10 lg:col-span-2">
            <div className="flex flex-col gap-3">
              <h2 className="text-lg">Design Approach</h2>
              <p className="text-sm text-ink-600">{caseStudy.designApproach}</p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-lg">Key Features</h2>
              <ul className="flex flex-col gap-2.5">
                {caseStudy.keyFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-ink-600">
                    <IconChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <FinalCta
        heading={`Want something like ${caseStudy.name}?`}
        text="Every project starts as a conversation about your business — we'll shape a design and plan around what you actually need."
        buttonLabel="Start Your Project"
        buttonHref="/contact"
      />
    </>
  );
}
