import type { Service } from "@/lib/data";

export function ServiceCard({ title, description, icon: Icon }: Service) {
  return (
    <div className="group flex flex-col gap-4 rounded-lg border border-ink-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(16,21,29,0.03)] transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-brand-300/70 hover:shadow-[0_16px_32px_-18px_rgba(16,21,29,0.25)] motion-reduce:hover:translate-y-0">
      <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg">{title}</h3>
      <p className="text-sm text-ink-500">{description}</p>
    </div>
  );
}
