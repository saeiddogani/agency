import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PricingCard } from "@/components/cards/PricingCard";
import { FaqAccordion } from "@/components/pricing/FaqAccordion";
import { FinalCta } from "@/components/home/FinalCta";
import { pricingTiers, pricingFaqs } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

const title = "Pricing";
const description =
  "Starting prices for website design and development packages for small and local businesses — Starter, Business, and Professional.";

export const metadata: Metadata = buildMetadata({ title, description, path: "/pricing" });

export default function PricingPage() {
  return (
    <>
      <section className="border-b border-ink-200 bg-white py-16 lg:py-24">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Pricing"
            title="Straightforward pricing to get started"
            description="Every project is different, so the prices below are starting points. We'll provide an exact quote once we understand your business and what you need."
          />
        </Container>
      </section>

      <section className="py-16 lg:py-24" aria-labelledby="packages-heading">
        <Container className="flex flex-col gap-12">
          <h2 id="packages-heading" className="sr-only">
            Pricing Packages
          </h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {pricingTiers.map((tier) => (
              <PricingCard key={tier.name} {...tier} />
            ))}
          </div>
          <p className="text-center text-sm text-ink-500">
            Prices shown are starting points — your final quote depends on the size and scope of your
            project. Add-ons like hosting, extra pages, and ongoing maintenance are available on any
            package.
          </p>
        </Container>
      </section>

      <section className="border-t border-ink-200 bg-surface-alt py-16 lg:py-24" aria-labelledby="faq-heading">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            id="faq-heading"
            align="center"
            eyebrow="Common Questions"
            title="Frequently asked questions"
            className="mx-auto"
          />
          <div className="mx-auto w-full max-w-3xl">
            <FaqAccordion items={pricingFaqs} />
          </div>
        </Container>
      </section>

      <FinalCta
        heading="Ready for a real quote?"
        text="Tell us a bit about your business and what you're looking for, and we'll put together a clear, no-pressure quote."
        buttonLabel="Get a Quote"
        buttonHref="/contact"
      />
    </>
  );
}
