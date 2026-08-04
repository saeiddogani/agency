import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { TemplateCard } from "@/components/cards/TemplateCard";
import { featuredTemplates } from "@/lib/templates";
import { IconArrowRight } from "@/components/icons";

export function TemplatesPreview() {
  return (
    <section className="border-t border-ink-200 bg-surface-alt py-20 lg:py-28" aria-labelledby="templates-heading">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          id="templates-heading"
          align="center"
          eyebrow="Templates"
          title="Start With a Design You Love"
          description="Choose from professionally designed website concepts built for different types of businesses."
          className="mx-auto"
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTemplates.map((template) => (
            <TemplateCard key={template.slug} {...template} />
          ))}
        </div>

        <div className="mx-auto">
          <Button href="/templates" variant="outline" size="md">
            View All Templates
            <IconArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
