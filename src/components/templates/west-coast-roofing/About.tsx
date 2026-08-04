export function About() {
  return (
    <section id="about" className="border-t border-stone-200 bg-stone-50 py-16 lg:py-24">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-6 sm:px-8 lg:max-w-3xl lg:px-10">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-700">About</span>
        <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl">A local roofing crew you can rely on</h2>
        <p className="text-base text-stone-600">
          West Coast Roofing is a residential and commercial roofing company focused on quality
          workmanship and straightforward communication. From small repairs to full roof replacements,
          every project gets the same careful attention — clear estimates, tidy job sites, and roofing
          built to handle the local climate.
        </p>
      </div>
    </section>
  );
}
