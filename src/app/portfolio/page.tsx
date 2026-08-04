import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PortfolioCard } from "@/components/cards/PortfolioCard";
import { FinalCta } from "@/components/home/FinalCta";
import { portfolioCaseStudies } from "@/lib/portfolio";
import { buildMetadata } from "@/lib/seo";

const title = "Portfolio";
const description =
  "Demo projects and website concepts showing how our agency designs and builds sites for home services, restaurants, real estate, and more.";

export const metadata: Metadata = buildMetadata({ title, description, path: "/portfolio" });

export default function PortfolioPage() {
  return (
    <>
      <section className="border-b border-ink-200 bg-white py-16 lg:py-24">
        <Container className="flex flex-col items-start gap-6">
          <SectionHeading
            as="h1"
            eyebrow="Portfolio"
            title="Demo projects and website concepts"
            description="These case studies show how we approach design and development for different industries. They're demo projects built to demonstrate our process — not real client work."
          />
          <Button href="/contact" size="lg">
            Start Your Project
          </Button>
        </Container>
      </section>

      <section className="py-16 lg:py-24" aria-label="Case studies">
        <Container>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioCaseStudies.map((item) => (
              <PortfolioCard key={item.slug} {...item} />
            ))}
          </div>
        </Container>
      </section>

      <FinalCta
        heading="See your business here next?"
        text="Tell us about your business and we'll show you how a similar approach could work for you."
        buttonLabel="Start Your Project"
        buttonHref="/contact"
      />
    </>
  );
}
