import { Button } from "@/components/ui/Button";
import type { PricingTier } from "@/lib/data";

export function PricingCard({ name, price, bestFor, description, features, featured = false }: PricingTier) {
  return (
    <div
      className={`flex flex-col gap-6 rounded-lg border p-8 ${
        featured ? "border-brand-600 bg-ink-950 text-white" : "border-ink-200 bg-white"
      }`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h3 className={`text-lg ${featured ? "text-white" : "text-ink-950"}`}>{name}</h3>
          {featured ? (
            <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
              Most Popular
            </span>
          ) : null}
        </div>
        <div className="flex items-baseline gap-2 pt-2">
          <span className={`text-xs uppercase tracking-wide ${featured ? "text-ink-300" : "text-ink-500"}`}>
            Starting at
          </span>
        </div>
        <span className={`font-heading text-4xl font-bold ${featured ? "text-white" : "text-ink-950"}`}>
          {price}
        </span>
        <p className={`text-sm ${featured ? "text-ink-300" : "text-ink-500"}`}>{description}</p>
        <p className={`text-xs ${featured ? "text-ink-300" : "text-ink-500"}`}>Best for: {bestFor}</p>
      </div>

      <ul className="flex flex-col gap-3">
        {features.map((feature) => (
          <li
            key={feature}
            className={`flex items-start gap-2 text-sm ${featured ? "text-ink-200" : "text-ink-600"}`}
          >
            <span
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                featured ? "bg-brand-300" : "bg-brand-600"
              }`}
              aria-hidden
            />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        href="/contact"
        variant={featured ? "primary" : "outline"}
        size="md"
        className={featured ? "" : "border-ink-300"}
      >
        Get a Quote
      </Button>
    </div>
  );
}
