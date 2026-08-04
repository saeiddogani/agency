import { s22Team } from "./content";

export function Team() {
  return (
    <section id="team" className="bg-black py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B8860B]">
            Our Team
          </span>
          <h2 className="text-3xl font-bold uppercase text-white sm:text-4xl">Meet the stylists</h2>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {s22Team.map((member) => (
            <div key={member.name} className="flex flex-col items-center gap-4 text-center">
              <div
                className="flex h-24 w-24 items-center justify-center rounded-full border border-[#B8860B] text-xl font-bold text-[#B8860B]"
                aria-hidden
              >
                {member.initials}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-sm text-white/60">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
