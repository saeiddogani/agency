import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { TemplateCard } from "@/components/cards/TemplateCard";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { featuredTemplates } from "@/lib/templates";
import { IconArrowRight } from "@/components/icons";

export function TemplatesPreview() {
  return (
    <section className="border-t border-ink-200/60 bg-surface-alt py-20 lg:py-28" aria-labelledby="templates-heading">
      <Container className="flex flex-col gap-12">
        <FadeUp>
          <SectionHeading
            id="templates-heading"
            align="center"
            eyebrow="Templates"
            title="A Design That Already Looks Like Your Business"
            description="Browse real website concepts built for businesses like yours — then we'll customize it around your brand."
            className="mx-auto"
          />
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTemplates.map((template) => (
            <StaggerItem key={template.slug}>
              <TemplateCard {...template} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp className="mx-auto">
          <Button href="/templates" variant="outline" size="md">
            View All Templates
            <IconArrowRight className="h-4 w-4" />
          </Button>
        </FadeUp>
      </Container>
    </section>
  );
}
