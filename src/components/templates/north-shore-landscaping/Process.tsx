import { nslProcess } from "./content";

export function Process() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-14 px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 lg:max-w-lg">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-green-800">
            Our Process
          </span>
          <h2 className="text-3xl font-medium text-stone-900 sm:text-4xl">From first visit to finished space</h2>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {nslProcess.map((step) => (
            <div key={step.number} className="flex flex-col gap-3">
              <span className="text-3xl font-medium text-green-800">{step.number}</span>
              <h3 className="text-lg font-medium text-stone-900">{step.title}</h3>
              <p className="text-sm text-stone-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
