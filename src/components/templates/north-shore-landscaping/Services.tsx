import { nslServices } from "./content";

export function Services() {
  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-14 px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 lg:max-w-lg">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-green-800">
            What We Do
          </span>
          <h2 className="text-3xl font-medium text-stone-900 sm:text-4xl">
            Landscaping services for every outdoor space
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
          {nslServices.map((service) => (
            <div key={service.title} className="flex flex-col gap-3">
              <div className="h-px w-12 bg-green-800" aria-hidden />
              <h3 className="text-xl font-medium text-stone-900">{service.title}</h3>
              <p className="text-base text-stone-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
