import { cbGallery } from "./content";

const tones = ["#6B1E1E", "#8C4B4B", "#D8B984", "#4A3B33", "#241615", "#A9866B"];

export function Gallery() {
  return (
    <section id="gallery" className="bg-[#FBF7F0] py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6B1E1E]">
            Gallery
          </span>
          <h2 className="text-3xl font-medium text-[#2B1B1B] sm:text-4xl">A glimpse inside</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {cbGallery.map((item, index) => (
            <div
              key={item.label}
              className="flex aspect-square items-end rounded-sm p-4"
              style={{ backgroundColor: tones[index % tones.length] }}
              role="img"
              aria-label={`Gallery placeholder image: ${item.label}`}
            >
              <span className="text-xs font-medium uppercase tracking-wide text-white/85">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
