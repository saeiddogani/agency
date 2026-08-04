export function ReservationCta() {
  return (
    <section className="bg-[#6B1E1E] py-20 lg:py-24">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 px-6 text-center sm:px-8 lg:px-10">
        <h2 className="text-balance max-w-xl text-3xl font-medium text-white sm:text-4xl">
          Join Us for Dinner
        </h2>
        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded-sm bg-[#D8B984] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#241615] hover:bg-[#c9a76f]"
        >
          Reserve a Table
        </a>
      </div>
    </section>
  );
}
