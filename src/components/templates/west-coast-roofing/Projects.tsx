import { wcrProjects } from "./content";

export function Projects() {
  return (
    <section id="projects" className="py-16 lg:py-24">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-700">
            Our Work
          </span>
          <h2 className="max-w-xl text-3xl font-bold text-stone-900 sm:text-4xl">
            Recent roofing projects
          </h2>
          <p className="max-w-xl text-base text-stone-600">
            A few example projects shown for demonstration purposes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {wcrProjects.map((project) => (
            <div key={project.title} className="flex flex-col gap-3">
              <div className="relative">
                <div
                  className="flex aspect-[4/3] w-full flex-col justify-end gap-2 rounded-lg p-5"
                  style={{
                    background: `linear-gradient(135deg, ${project.accent} 0%, #1c1917 100%)`,
                  }}
                  role="img"
                  aria-label={`Demo project photo placeholder for ${project.title}`}
                >
                  <div className="h-2.5 w-2/5 rounded-full bg-white/70" />
                  <div className="h-2 w-1/4 rounded-full bg-white/40" />
                </div>
                <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-stone-700 shadow-sm">
                  Demo Project
                </span>
              </div>
              <h3 className="text-base font-semibold text-stone-900">{project.title}</h3>
              <p className="text-sm text-stone-600">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
