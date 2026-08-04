export function Hero() {
  return (
    <section className="bg-black">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-7 px-6 py-24 sm:px-8 lg:px-10 lg:py-36">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B8860B]">
          Barbershop &amp; Salon
        </span>
        <h1 className="text-balance text-6xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
          Your Style.
          <br />
          Your Space.
        </h1>
        <p className="max-w-md text-lg text-white/70">
          Studio 22 is a modern barbershop and salon for anyone who takes their style seriously — expert
          cuts, color, and grooming in a space built for it.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center justify-center bg-[#B8860B] px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-black hover:bg-[#a6790a]"
        >
          Book Appointment
        </a>
      </div>
    </section>
  );
}
