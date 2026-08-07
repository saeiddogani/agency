import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessStep } from "@/components/cards/ProcessStep";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { processSteps } from "@/lib/data";

export function Process() {
  return (
    <section className="border-t border-ink-200/60 bg-surface-alt py-20 lg:py-28" aria-labelledby="process-heading">
      <Container className="flex flex-col gap-12">
        <FadeUp>
          <SectionHeading
            id="process-heading"
            align="center"
            eyebrow="How It Works"
            title="A simple, guided path to launch"
            description="No jargon, no guesswork — just a clear process from first conversation to a live website."
            className="mx-auto"
          />
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <StaggerItem key={step.number}>
              <ProcessStep {...step} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
