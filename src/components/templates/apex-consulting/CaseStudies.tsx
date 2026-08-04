import { acCaseStudies } from "./content";

export function CaseStudies() {
  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 lg:max-w-lg">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0e7490]">
            Case Studies
          </span>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Example client work</h2>
          <p className="text-sm text-slate-500">
            Illustrative examples shown for demonstration purposes — not real client names or results.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {acCaseStudies.map((study) => (
            <div key={study.title} className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6">
              <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                {study.tag}
              </span>
              <h3 className="text-lg font-semibold text-slate-900">{study.title}</h3>
              <p className="text-sm text-slate-500">{study.summary}</p>
              <span className="text-xs font-medium text-slate-500">Example / demo case study</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
