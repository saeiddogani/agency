import { npTeam } from "./content";

export function Team() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
            Meet the Team
          </span>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">The agents behind NorthPoint</h2>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {npTeam.map((member) => (
            <div key={member.name} className="flex flex-col items-start gap-4">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 text-lg font-semibold text-white"
                aria-hidden
              >
                {member.initials}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{member.name}</h3>
                <p className="text-sm text-slate-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
