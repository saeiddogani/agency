import { npProperties } from "./content";

export function Properties() {
  return (
    <section id="properties" className="py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
            Featured Properties
          </span>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Example listings</h2>
          <p className="max-w-xl text-base text-slate-500">
            Shown for demonstration purposes — these are example listings, not real properties for sale.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {npProperties.map((property) => (
            <div key={property.address} className="flex flex-col gap-4">
              <div className="relative">
                <div
                  className="aspect-[4/3] w-full rounded-lg"
                  style={{ background: `linear-gradient(150deg, ${property.accent} 0%, #0f172a 100%)` }}
                  role="img"
                  aria-label={`Demo listing photo placeholder for ${property.address}`}
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-700 shadow-sm">
                  Example Listing
                </span>
                <span className="absolute right-3 top-3 rounded-full bg-slate-900/85 px-3 py-1 text-[11px] font-semibold text-white">
                  {property.type}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-lg font-semibold text-slate-900">{property.price}</span>
                <span className="text-sm text-slate-500">{property.address}</span>
                <span className="text-sm text-slate-500">
                  {property.beds} bed · {property.baths} bath
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
