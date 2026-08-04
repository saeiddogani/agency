import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PortfolioCard } from "@/components/cards/PortfolioCard";
import { portfolioCaseStudies } from "@/lib/portfolio";
import { IconArrowRight } from "@/components/icons";

export function Portfolio() {
  return (
    <section className="py-20 lg:py-28" aria-labelledby="portfolio-heading">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          id="portfolio-heading"
          eyebrow="Our Work"
          title="A look at what we can build"
          description="These are demo projects created to demonstrate our design and development approach — not real client work."
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioCaseStudies.map((item) => (
            <PortfolioCard key={item.slug} {...item} />
          ))}
        </div>

        <div>
          <Button href="/portfolio" variant="outline" size="md">
            View All Case Studies
            <IconArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
