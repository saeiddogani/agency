import { acApproach } from "./content";

export function Approach() {
  return (
    <section className="bg-slate-900 py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 lg:max-w-lg">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5EEAD4]">
            Our Approach
          </span>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">A clear path from problem to plan</h2>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {acApproach.map((step) => (
            <div key={step.number} className="flex flex-col gap-3">
              <span className="text-3xl font-semibold text-[#0891B2]">{step.number}</span>
              <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              <p className="text-sm text-slate-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
