export function Hero() {
  return (
    <section className="border-b border-stone-200 bg-stone-50">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-14 px-6 py-16 sm:px-8 lg:grid-cols-2 lg:gap-10 lg:px-10 lg:py-24">
        <div className="flex flex-col items-start gap-6">
          <span className="rounded-full border border-stone-300 px-3 py-1 text-xs font-medium text-stone-600">
            Residential &amp; Commercial Roofing
          </span>
          <h1 className="text-balance text-4xl font-bold text-stone-900 sm:text-5xl lg:text-6xl">
            Reliable Roofing for Every Season.
          </h1>
          <p className="max-w-lg text-lg text-stone-600">
            West Coast Roofing installs, repairs, and maintains roofs built to handle everything the
            coast can throw at them — backed by clear communication and careful work from start to
            finish.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-md bg-orange-700 px-7 py-3.5 text-base font-semibold text-white hover:bg-orange-800"
            >
              Get a Free Estimate
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-md border border-stone-300 px-7 py-3.5 text-base font-semibold text-stone-900 hover:border-stone-900"
            >
              View Our Work
            </a>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <svg
            viewBox="0 0 480 360"
            className="w-full max-w-md"
            role="img"
            aria-label="Illustration of angled rooflines representing residential roofing"
          >
            <rect x="0" y="0" width="480" height="360" rx="16" fill="#1c1917" />
            <polygon points="60,240 180,120 300,240" fill="#B5502E" />
            <polygon points="180,240 300,140 420,240" fill="#8C4B6B" opacity="0.85" />
            <rect x="90" y="240" width="60" height="70" fill="#44403c" />
            <rect x="330" y="240" width="60" height="70" fill="#44403c" />
            <line x1="40" y1="240" x2="440" y2="240" stroke="#78716c" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </section>
  );
}
