import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { Button } from "@/components/ui/Button";
import type { PortfolioCaseStudy } from "@/lib/portfolio";

export function PortfolioCard({ slug, name, category, summary, accent }: PortfolioCaseStudy) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <BrowserMockup label={`${name.toLowerCase().replace(/\s+/g, "")}.example`}>
          <div
            className="flex h-40 flex-col justify-end gap-2 p-5"
            style={{ backgroundColor: accent }}
            role="img"
            aria-label={`Concept preview graphic for ${name}, a fictional ${category.toLowerCase()} project`}
          >
            <div className="h-2.5 w-2/5 rounded-full bg-white/70" />
            <div className="h-2 w-1/4 rounded-full bg-white/40" />
          </div>
        </BrowserMockup>
        <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-600 shadow-sm">
          Demo Project
        </span>
      </div>

      <div className="flex flex-col gap-1 px-1">
        <span className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-600">
          {category}
        </span>
        <h3 className="text-lg">{name}</h3>
        <p className="text-sm text-ink-500">{summary}</p>
      </div>

      <Button href={`/portfolio/${slug}`} variant="outline" size="md" className="w-fit">
        View Case Study
      </Button>
    </div>
  );
}
