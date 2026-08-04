import { Button } from "@/components/ui/Button";
import type { ServiceDetail } from "@/lib/data";

interface ServiceDetailSectionProps extends ServiceDetail {
  /** Used to alternate the icon column between left/right on large screens. */
  reverse?: boolean;
}

export function ServiceDetailSection({
  title,
  icon: Icon,
  whatItIs,
  whatYouGet,
  whyItMatters,
  ctaLabel,
  reverse = false,
}: ServiceDetailSectionProps) {
  return (
    <div className="grid grid-cols-1 gap-8 border-t border-ink-200 py-12 lg:grid-cols-12 lg:gap-10 lg:py-16">
      <div
        className={`flex flex-col items-start gap-4 lg:col-span-4 ${
          reverse ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-50 text-brand-600">
          <Icon className="h-6 w-6" />
        </div>
        <h2 className="text-2xl">{title}</h2>
        <Button href="/contact" variant="outline" size="md">
          {ctaLabel}
        </Button>
      </div>

      <div className={`flex flex-col gap-8 lg:col-span-8 ${reverse ? "lg:order-1" : "lg:order-2"}`}>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-ink-500">What It Is</h3>
          <p className="text-base text-ink-600">{whatItIs}</p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-ink-500">
            What You Get
          </h3>
          <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {whatYouGet.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-ink-500">
            Why It Matters
          </h3>
          <p className="text-base text-ink-600">{whyItMatters}</p>
        </div>
      </div>
    </div>
  );
}
