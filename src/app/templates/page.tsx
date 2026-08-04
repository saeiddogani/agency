import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { TemplatesGrid } from "@/components/templates/TemplatesGrid";
import { FinalCta } from "@/components/home/FinalCta";
import { templates } from "@/lib/templates";
import { buildMetadata } from "@/lib/seo";

const title = "Templates";
const description =
  "Browse professionally designed website concepts for contractors, restaurants, real estate, and other small businesses.";

export const metadata: Metadata = buildMetadata({ title, description, path: "/templates" });

export default function TemplatesPage() {
  return (
    <>
      <section className="border-b border-ink-200 bg-white py-16 lg:py-24">
        <Container className="flex flex-col items-start gap-6">
          <SectionHeading
            as="h1"
            eyebrow="Templates"
            title="Website Designs Built for Your Business"
            description="Explore professionally designed website concepts for different types of businesses. Every website can be customized to match your brand, services, and goals."
          />
          <Button href="/contact" size="lg">
            Start Your Project
          </Button>
        </Container>
      </section>

      <section className="py-16 lg:py-24" aria-label="Browse templates by category">
        <Container>
          <TemplatesGrid templates={templates} />
        </Container>
      </section>

      <FinalCta
        heading="Like what you see?"
        text="Every template is a starting point — we'll customize the design, content, and layout around your business."
        buttonLabel="Start Your Project"
        buttonHref="/contact"
      />
    </>
  );
}
