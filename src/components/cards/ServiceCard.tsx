import type { Service } from "@/lib/data";

export function ServiceCard({ title, description, icon: Icon }: Service) {
  return (
    <div className="group flex flex-col gap-4 rounded-lg border border-ink-200 bg-white p-6 transition-colors hover:border-brand-300">
      <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-50 text-brand-600">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg">{title}</h3>
      <p className="text-sm text-ink-500">{description}</p>
    </div>
  );
}
