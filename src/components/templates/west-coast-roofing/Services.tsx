import { wcrServices } from "./content";

export function Services() {
  return (
    <section id="services" className="py-16 lg:py-24">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-700">
            Services
          </span>
          <h2 className="max-w-xl text-3xl font-bold text-stone-900 sm:text-4xl">
            Roofing services built to last
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {wcrServices.map((service) => (
            <div key={service.title} className="flex flex-col gap-3 border-t-2 border-orange-700 pt-5">
              <h3 className="text-lg font-semibold text-stone-900">{service.title}</h3>
              <p className="text-sm text-stone-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
