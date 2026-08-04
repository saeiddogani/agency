import { IconStar } from "@/components/icons";
import type { Testimonial } from "@/lib/data";

export function TestimonialCard({ quote, name, role }: Testimonial) {
  return (
    <figure className="flex h-full flex-col gap-5 rounded-lg border border-ink-200 bg-white p-7">
      <div className="flex gap-1 text-brand-600" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <IconStar key={i} className="h-4 w-4" />
        ))}
      </div>
      <blockquote className="text-[15px] leading-relaxed text-ink-700">&ldquo;{quote}&rdquo;</blockquote>
      <figcaption className="mt-auto flex flex-col border-t border-ink-100 pt-4">
        <span className="text-sm font-semibold text-ink-900">{name}</span>
        <span className="text-xs text-ink-500">{role}</span>
      </figcaption>
    </figure>
  );
}
