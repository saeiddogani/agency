import { Container } from "@/components/ui/Container";
import { trustPoints } from "@/lib/data";

export function TrustBar() {
  return (
    <section className="border-b border-ink-200/60 bg-surface-alt" aria-label="Why businesses choose us">
      <Container className="grid grid-cols-2 gap-6 py-10 sm:grid-cols-4 sm:gap-8">
        {trustPoints.map(({ title, icon: Icon }) => (
          <div key={title} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
            <Icon className="h-5 w-5 shrink-0 text-brand-600" />
            <span className="text-sm font-medium text-ink-700">{title}</span>
          </div>
        ))}
      </Container>
    </section>
  );
}
