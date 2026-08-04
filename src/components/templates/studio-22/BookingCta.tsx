export function BookingCta() {
  return (
    <section className="bg-[#B8860B] py-20 lg:py-24">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 px-6 text-center sm:px-8 lg:px-10">
        <h2 className="text-balance max-w-xl text-3xl font-bold uppercase text-black sm:text-4xl">
          Ready for Your Next Look?
        </h2>
        <a
          href="#contact"
          className="inline-flex items-center justify-center bg-black px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white hover:bg-stone-900"
        >
          Book Appointment
        </a>
      </div>
    </section>
  );
}
