import { cbMenu } from "./content";

export function Menu() {
  return (
    <section id="menu" className="py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-14 px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6B1E1E]">
            Featured Menu
          </span>
          <h2 className="text-3xl font-medium text-[#2B1B1B] sm:text-4xl">An evening, one course at a time</h2>
        </div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-3">
          {Object.entries(cbMenu).map(([course, items]) => (
            <div key={course} className="flex flex-col gap-6">
              <h3 className="border-b border-[#E7DDCB] pb-3 text-xl font-medium text-[#2B1B1B]">
                {course}
              </h3>
              <ul className="flex flex-col gap-5">
                {items.map((item) => (
                  <li key={item.name} className="flex flex-col gap-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-base font-medium text-[#2B1B1B]">{item.name}</span>
                      <span className="text-sm font-semibold text-[#6B1E1E]">{item.price}</span>
                    </div>
                    <p className="text-sm text-[#6B5A4E]">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
