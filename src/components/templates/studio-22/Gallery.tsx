import { s22Gallery } from "./content";

const tones = ["#1a1a1a", "#B8860B", "#2b2b2b", "#3d3d3d", "#8a660a", "#0d0d0d"];

export function Gallery() {
  return (
    <section id="gallery" className="bg-white py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a660a]">
            Gallery
          </span>
          <h2 className="text-3xl font-bold uppercase text-black sm:text-4xl">The work speaks for itself</h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {s22Gallery.map((label, index) => (
            <div
              key={label}
              className="flex aspect-square items-end p-4"
              style={{ backgroundColor: tones[index % tones.length] }}
              role="img"
              aria-label={`Gallery placeholder image: ${label}`}
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-white/85">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
