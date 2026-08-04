import { acServices } from "./content";

export function Services() {
  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 lg:max-w-lg">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0e7490]">
            Services
          </span>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            Focused expertise where it matters most
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
          {acServices.map((service) => (
            <div key={service.title} className="flex flex-col gap-3 border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-900">{service.title}</h3>
              <p className="text-sm text-slate-500">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
