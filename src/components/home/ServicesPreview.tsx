import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { services } from "@/lib/data";
import { IconArrowRight } from "@/components/icons";

export function ServicesPreview() {
  return (
    <section className="py-20 lg:py-28" aria-labelledby="services-heading">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            id="services-heading"
            eyebrow="What We Do"
            title="Everything your business needs online"
            description="From first design to ongoing support, we handle the technical side so you can focus on running your business."
          />
          <Button href="/services" variant="outline" size="md" className="shrink-0">
            View All Services
            <IconArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
