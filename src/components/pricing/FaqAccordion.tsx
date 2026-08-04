import { IconChevronRight } from "@/components/icons";
import type { FaqItem } from "@/lib/data";

interface FaqAccordionProps {
  items: FaqItem[];
}

/**
 * Accessible accordion built on native <details>/<summary> — no client-side
 * JavaScript required, and it works with keyboard and screen readers by default.
 */
export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="flex flex-col divide-y divide-ink-200 border-t border-b border-ink-200">
      {items.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-ink-900 marker:content-none">
            {item.question}
            <IconChevronRight className="h-4 w-4 shrink-0 text-ink-400 transition-transform duration-150 group-open:rotate-90" />
          </summary>
          <p className="mt-3 max-w-3xl text-sm text-ink-500">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
