import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceDetailSection } from "@/components/services/ServiceDetailSection";
import { FinalCta } from "@/components/home/FinalCta";
import { serviceDetails } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

const title = "Services";
const description =
  "Website design, development, SEO, hosting, and maintenance for small and local businesses in Vancouver and the surrounding areas.";

export const metadata: Metadata = buildMetadata({ title, description, path: "/services" });

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-ink-200 bg-white py-16 lg:py-24">
        <Container>
          <SectionHeading
            as="h1"
            id="services-heading"
            eyebrow="Services"
            title="Digital services built for small businesses"
            description="Website design, development, SEO, hosting, and maintenance — everything you need to build and grow your online presence, handled by one team."
          />
        </Container>
      </section>

      <section className="py-4 lg:py-6" aria-labelledby="services-heading">
        <Container>
          {serviceDetails.map((service, index) => (
            <ServiceDetailSection key={service.title} {...service} reverse={index % 2 === 1} />
          ))}
        </Container>
      </section>

      <FinalCta
        heading="Not sure which service is right for you?"
        text="Tell us about your business and we'll recommend where to start — no pressure, just a clear plan."
        buttonLabel="Talk to Us"
        buttonHref="/contact"
      />
    </>
  );
}
