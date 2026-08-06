import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { Button } from "@/components/ui/Button";
import type { TemplateDefinition } from "@/lib/templates";

export function TemplateCard({ slug, name, category, description, accent }: TemplateDefinition) {
  return (
    <div className="group flex flex-col gap-4">
      <BrowserMockup
        label={`${name.toLowerCase().replace(/\s+/g, "")}.example`}
        className="transition-[border-color,box-shadow] duration-200 ease-out group-hover:border-ink-300/80 group-hover:shadow-[0_1px_1px_rgba(16,21,29,0.04),0_28px_56px_-24px_rgba(16,21,29,0.28)]"
      >
        <div
          className="flex flex-col gap-2 p-4"
          style={{ backgroundColor: `${accent}0d` }}
          role="img"
          aria-label={`Preview mockup of a ${name.toLowerCase()} website template`}
        >
          <div className="flex items-center justify-between">
            <div className="h-2.5 w-16 rounded-full" style={{ backgroundColor: accent }} />
            <div className="flex gap-2">
              <div className="h-2 w-6 rounded-full bg-ink-200" />
              <div className="h-2 w-6 rounded-full bg-ink-200" />
              <div className="h-2 w-6 rounded-full bg-ink-200" />
            </div>
          </div>
          <div className="mt-2 h-3 w-3/4 rounded bg-ink-800" />
          <div className="h-2 w-1/2 rounded bg-ink-200" />
          <div className="mt-3 h-16 w-full rounded-md" style={{ backgroundColor: `${accent}22` }} />
          <div className="mt-2 grid grid-cols-3 gap-2">
            <div className="h-10 rounded bg-white border border-ink-100" />
            <div className="h-10 rounded bg-white border border-ink-100" />
            <div className="h-10 rounded bg-white border border-ink-100" />
          </div>
        </div>
      </BrowserMockup>

      <div className="flex flex-col gap-2 px-1">
        <span className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-600">
          {category}
        </span>
        <h3 className="text-lg">{name}</h3>
        <p className="text-sm text-ink-500">{description}</p>
      </div>

      <Button href={`/templates/${slug}`} variant="outline" size="md" className="w-fit">
        View Demo
      </Button>
    </div>
  );
}
