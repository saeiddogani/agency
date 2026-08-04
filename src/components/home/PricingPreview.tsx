import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PricingCard } from "@/components/cards/PricingCard";
import { pricingTiers } from "@/lib/data";

export function PricingPreview() {
  return (
    <section className="border-t border-ink-200 bg-surface-alt py-20 lg:py-28" aria-labelledby="pricing-heading">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          id="pricing-heading"
          align="center"
          eyebrow="Pricing"
          title="Straightforward pricing to get started"
          description="Every project is different, so these are starting prices — we'll provide an exact quote once we understand your needs."
          className="mx-auto"
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.name} {...tier} />
          ))}
        </div>

        <div className="mx-auto flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-ink-500">Not sure which plan fits your business?</p>
          <Button
            href="/contact"
            variant="secondary"
            size="md"
            gaEvent="cta_click"
            gaEventParams={{ cta_label: "Get a Quote", cta_location: "pricing_preview" }}
          >
            Get a Quote
          </Button>
        </div>
      </Container>
    </section>
  );
}
