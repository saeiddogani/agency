export function About() {
  return (
    <section id="about" className="bg-slate-900 py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-6 sm:px-8 lg:max-w-2xl lg:px-10">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5EEAD4]">About</span>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Local knowledge, straightforward advice</h2>
        <p className="text-base leading-relaxed text-slate-300">
          NorthPoint Realty helps buyers and sellers navigate the local market with clear, honest advice
          — no pressure, no jargon. Whether you&apos;re buying your first home or listing a property you&apos;ve
          outgrown, we focus on making the process straightforward from the first conversation to closing
          day.
        </p>
      </div>
    </section>
  );
}
