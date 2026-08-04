import { acInsights } from "./content";

const accents = ["#0891B2", "#334155", "#5EEAD4"];

export function Insights() {
  return (
    <section id="insights" className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 lg:max-w-lg">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0e7490]">
            Insights
          </span>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            Perspective on strategy and operations
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {acInsights.map((article, index) => (
            <article
              key={article.title}
              className="flex flex-col gap-5 overflow-hidden rounded-lg border border-slate-200 bg-white"
            >
              <div
                className="flex h-32 items-center justify-center"
                style={{ backgroundColor: accents[index % accents.length] }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 64 64" className="h-10 w-10 opacity-90">
                  <rect x="8" y="14" width="48" height="36" rx="3" fill="none" stroke="#ffffff" strokeWidth="2" />
                  <line x1="16" y1="26" x2="48" y2="26" stroke="#ffffff" strokeWidth="2" />
                  <line x1="16" y1="34" x2="42" y2="34" stroke="#ffffff" strokeWidth="2" />
                  <line x1="16" y1="42" x2="36" y2="42" stroke="#ffffff" strokeWidth="2" />
                </svg>
              </div>
              <div className="flex flex-col gap-3 px-6 pb-6">
                <h3 className="text-lg font-semibold text-slate-900">{article.title}</h3>
                <p className="text-sm text-slate-500">{article.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
