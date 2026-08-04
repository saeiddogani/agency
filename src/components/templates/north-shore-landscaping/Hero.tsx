export function Hero() {
  return (
    <section className="bg-[#F6F4EE]">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-16 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:py-28">
        <div className="flex flex-col items-start gap-7">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-green-800">
            Landscape Design &amp; Build
          </span>
          <h1 className="text-balance text-4xl font-medium text-stone-900 sm:text-5xl lg:text-6xl">
            Outdoor Spaces Designed to Be Enjoyed.
          </h1>
          <p className="max-w-lg text-lg text-stone-600">
            North Shore Landscaping designs and builds gardens, patios, and outdoor living spaces that
            feel like a natural extension of your home.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-green-800 px-7 py-3.5 text-base font-semibold text-white hover:bg-green-900"
            >
              Request a Quote
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full border border-stone-300 px-7 py-3.5 text-base font-semibold text-stone-900 hover:border-stone-900"
            >
              Explore Our Work
            </a>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <svg
            viewBox="0 0 480 400"
            className="w-full max-w-md"
            role="img"
            aria-label="Illustration of layered rolling garden hills"
          >
            <circle cx="380" cy="80" r="46" fill="#D8C9A3" />
            <path d="M0,260 C90,190 150,230 240,200 C330,170 390,210 480,180 L480,400 L0,400 Z" fill="#BFD8A8" />
            <path d="M0,300 C100,250 180,290 260,260 C350,226 400,270 480,240 L480,400 L0,400 Z" fill="#8FB874" />
            <path d="M0,350 C110,310 200,340 280,320 C360,300 410,330 480,310 L480,400 L0,400 Z" fill="#166534" />
          </svg>
        </div>
      </div>
    </section>
  );
}
