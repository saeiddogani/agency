export function Cta() {
  return (
    <section className="bg-[#F6F4EE] py-20 lg:py-24">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 px-6 text-center sm:px-8 lg:px-10">
        <h2 className="text-balance max-w-xl text-3xl font-medium text-stone-900 sm:text-4xl">
          Let&apos;s Create Your Outdoor Space.
        </h2>
        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded-full bg-green-800 px-7 py-3.5 text-base font-semibold text-white hover:bg-green-900"
        >
          Request a Quote
        </a>
      </div>
    </section>
  );
}
