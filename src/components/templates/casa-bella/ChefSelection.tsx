import { cbChefSelection } from "./content";

export function ChefSelection() {
  return (
    <section className="bg-[#241615] py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D8B984]">
            Chef&apos;s Selection
          </span>
          <h2 className="text-3xl font-medium text-white sm:text-4xl">A few of our favorites</h2>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {cbChefSelection.map((dish) => (
            <div key={dish.name} className="flex flex-col items-center gap-2 text-center">
              <div className="h-px w-10 bg-[#D8B984]" aria-hidden />
              <h3 className="text-lg font-medium text-white">{dish.name}</h3>
              <p className="text-sm text-[#C9BBA8]">{dish.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
