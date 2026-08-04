export function About() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-6 sm:px-8 lg:max-w-2xl lg:px-10">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a660a]">About</span>
        <h2 className="text-3xl font-bold uppercase text-black sm:text-4xl">A space built for style</h2>
        <p className="text-base leading-relaxed text-stone-600">
          Studio 22 is a barbershop and salon built for people who care about how they look. Our stylists
          work across cuts, color, and grooming, in a space designed to feel more like a lounge than a
          waiting room. Walk-ins are welcome, but we recommend booking ahead.
        </p>
      </div>
    </section>
  );
}
