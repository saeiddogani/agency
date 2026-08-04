import { wcrWhyUs } from "./content";

export function WhyUs() {
  return (
    <section className="bg-stone-900 py-16 lg:py-24">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-400">
            Why Choose Us
          </span>
          <h2 className="max-w-xl text-3xl font-bold text-white sm:text-4xl">
            Roofing done the right way
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {wcrWhyUs.map((item) => (
            <div key={item.title} className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-stone-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
