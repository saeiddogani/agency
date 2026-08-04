export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#241615]">
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(169,135,83,0.35), transparent 45%), radial-gradient(circle at 80% 70%, rgba(107,30,30,0.55), transparent 55%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center gap-8 px-6 py-28 text-center sm:px-8 lg:px-10 lg:py-40">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D8B984]">
          Italian-Inspired Dining
        </span>
        <h1 className="text-balance text-5xl font-medium text-white sm:text-6xl lg:text-7xl">Casa Bella</h1>
        <p className="max-w-xl text-lg italic text-[#E9DFCF]">Good Food. Good Wine. Good Company.</p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-sm bg-[#D8B984] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#241615] hover:bg-[#c9a76f]"
          >
            Reserve a Table
          </a>
          <a
            href="#menu"
            className="inline-flex items-center justify-center rounded-sm border border-[#8a7b6c] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:border-white"
          >
            View Menu
          </a>
        </div>
      </div>
    </section>
  );
}
