import { s22Services } from "./content";

export function Services() {
  return (
    <section id="services" className="bg-white py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a660a]">
            Services
          </span>
          <h2 className="text-3xl font-bold uppercase text-black sm:text-4xl">Book your next look</h2>
        </div>

        <div className="flex flex-col divide-y divide-stone-200 border-t border-b border-stone-200">
          {s22Services.map((service) => (
            <div key={service.title} className="flex items-center justify-between gap-4 py-5">
              <div>
                <h3 className="text-lg font-semibold text-black">{service.title}</h3>
                <p className="text-sm text-stone-500">{service.description}</p>
              </div>
              <span className="shrink-0 text-lg font-bold text-[#8a660a]">{service.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
