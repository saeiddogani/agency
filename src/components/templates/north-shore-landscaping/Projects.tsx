import { nslProjects } from "./content";

export function Projects() {
  return (
    <section id="projects" className="bg-[#F6F4EE] py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-14 px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 lg:max-w-lg">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-green-800">
            Featured Projects
          </span>
          <h2 className="text-3xl font-medium text-stone-900 sm:text-4xl">A few spaces we&apos;ve shaped</h2>
          <p className="text-base text-stone-600">Example projects shown for demonstration purposes.</p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {nslProjects.map((project) => (
            <div key={project.title} className="flex flex-col gap-4">
              <div className="relative">
                <div
                  className="aspect-[4/3] w-full rounded-2xl"
                  style={{ background: `linear-gradient(160deg, ${project.accent} 0%, #2f3b2a 100%)` }}
                  role="img"
                  aria-label={`Demo project photo placeholder for ${project.title}`}
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-stone-700 shadow-sm">
                  Demo Project
                </span>
              </div>
              <h3 className="text-lg font-medium text-stone-900">{project.title}</h3>
              <p className="text-sm text-stone-600">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
