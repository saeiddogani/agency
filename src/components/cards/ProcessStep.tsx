import type { ProcessStepData } from "@/lib/data";

export function ProcessStep({ number, title, description }: ProcessStepData) {
  return (
    <div className="flex flex-col gap-3 border-t border-ink-200 pt-6">
      <span className="font-heading text-2xl font-bold text-brand-600">{number}</span>
      <h3 className="text-lg">{title}</h3>
      <p className="text-sm text-ink-500">{description}</p>
    </div>
  );
}
