export function Cta() {
  return (
    <section className="bg-orange-700 py-16 lg:py-20">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 px-6 text-center sm:px-8 lg:px-10">
        <h2 className="text-balance max-w-xl text-3xl font-bold text-white sm:text-4xl">
          Ready to Protect Your Home?
        </h2>
        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded-md bg-stone-900 px-7 py-3.5 text-base font-semibold text-white hover:bg-stone-800"
        >
          Request a Free Estimate
        </a>
      </div>
    </section>
  );
}
