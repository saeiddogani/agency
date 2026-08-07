import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { whyChooseUs } from "@/lib/data";

export function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28" aria-labelledby="why-heading">
      <Container className="flex flex-col gap-12">
        <FadeUp>
          <SectionHeading
            id="why-heading"
            eyebrow="What You Can Expect"
            title="A website built around your business, not a generic kit"
            description="We combine strong design fundamentals with a process that keeps things simple for you."
          />
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 divide-y divide-ink-200/70 border-t border-ink-200/70 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3">
          {whyChooseUs.map(({ title, description, icon: Icon }, index) => (
            <StaggerItem key={title} className="flex flex-col gap-4 px-0 py-8 sm:px-8 sm:first:pl-0">
              <div className="flex items-center justify-between">
                <Icon className="h-6 w-6 text-brand-600" />
                <span className="font-heading text-2xl font-bold text-ink-100">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-lg">{title}</h3>
              <p className="text-sm text-ink-500">{description}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
