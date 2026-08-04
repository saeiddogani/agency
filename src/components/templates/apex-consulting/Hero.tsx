export function Hero() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-14 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:gap-10 lg:px-10 lg:py-28">
        <div className="flex flex-col items-start gap-6">
          <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500">
            Strategy &amp; Operations Consulting
          </span>
          <h1 className="text-balance text-4xl font-semibold text-slate-900 sm:text-5xl lg:text-6xl">
            Clarity for Better Business Decisions.
          </h1>
          <p className="max-w-lg text-lg text-slate-500">
            Apex Consulting helps businesses cut through complexity with clear strategy, streamlined
            operations, and a realistic plan for growth.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-md bg-slate-900 px-7 py-3.5 text-base font-semibold text-white hover:bg-slate-800"
            >
              Start a Conversation
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 px-7 py-3.5 text-base font-semibold text-slate-900 hover:border-slate-900"
            >
              Explore Our Services
            </a>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <svg
            viewBox="0 0 480 320"
            className="w-full max-w-md"
            role="img"
            aria-label="Abstract chart illustration representing strategic data and growth"
          >
            <rect x="0" y="0" width="480" height="320" rx="16" fill="#0F172A" />
            <line x1="40" y1="260" x2="440" y2="260" stroke="#334155" strokeWidth="1.5" />
            <rect x="60" y="180" width="40" height="80" rx="3" fill="#334155" />
            <rect x="130" y="140" width="40" height="120" rx="3" fill="#0891B2" />
            <rect x="200" y="200" width="40" height="60" rx="3" fill="#334155" />
            <rect x="270" y="100" width="40" height="160" rx="3" fill="#0891B2" />
            <rect x="340" y="160" width="40" height="100" rx="3" fill="#334155" />
            <polyline
              points="60,150 150,110 220,170 290,70 380,120"
              fill="none"
              stroke="#5EEAD4"
              strokeWidth="2.5"
            />
            <circle cx="290" cy="70" r="5" fill="#5EEAD4" />
          </svg>
        </div>
      </div>
    </section>
  );
}
