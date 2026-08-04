import { npFilters } from "./content";

export function Hero() {
  return (
    <section className="relative bg-slate-900">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "linear-gradient(135deg, rgba(15,118,110,0.35) 0%, rgba(15,23,42,0) 55%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-start gap-10 px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="flex flex-col gap-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5EEAD4]">
            Vancouver &amp; the Lower Mainland
          </span>
          <h1 className="text-balance max-w-2xl text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
            Find a Place to Call Home.
          </h1>
          <p className="max-w-xl text-lg text-slate-300">
            NorthPoint Realty helps you buy, sell, and navigate the local market with clear guidance and
            properties that actually fit what you&apos;re looking for.
          </p>
        </div>

        <form
          aria-label="Property search (demo only, no results are connected)"
          className="grid w-full grid-cols-1 gap-3 rounded-xl bg-white p-4 shadow-xl sm:grid-cols-2 lg:grid-cols-5 lg:items-end"
        >
          <div className="flex flex-col gap-1.5 lg:col-span-1">
            <label htmlFor="np-transaction" className="text-xs font-medium text-slate-500">
              Buy / Rent
            </label>
            <select
              id="np-transaction"
              className="rounded-md border border-slate-200 px-3 py-2.5 text-sm text-slate-900"
              defaultValue={npFilters.transactionTypes[0]}
            >
              {npFilters.transactionTypes.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5 lg:col-span-1">
            <label htmlFor="np-location" className="text-xs font-medium text-slate-500">
              Location
            </label>
            <input
              id="np-location"
              type="text"
              placeholder="City or neighborhood"
              className="rounded-md border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-col gap-1.5 lg:col-span-1">
            <label htmlFor="np-type" className="text-xs font-medium text-slate-500">
              Property Type
            </label>
            <select
              id="np-type"
              className="rounded-md border border-slate-200 px-3 py-2.5 text-sm text-slate-900"
              defaultValue={npFilters.propertyTypes[0]}
            >
              {npFilters.propertyTypes.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5 lg:col-span-1">
            <label htmlFor="np-price" className="text-xs font-medium text-slate-500">
              Price Range
            </label>
            <select
              id="np-price"
              className="rounded-md border border-slate-200 px-3 py-2.5 text-sm text-slate-900"
              defaultValue={npFilters.priceRanges[0]}
            >
              {npFilters.priceRanges.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <a
            href="#properties"
            className="inline-flex items-center justify-center rounded-md bg-[#0F766E] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0d6259] lg:col-span-1"
          >
            Search
          </a>
        </form>
      </div>
    </section>
  );
}
