export function Cta() {
  return (
    <section className="bg-[#0F766E] py-20 lg:py-24">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 px-6 text-center sm:px-8 lg:px-10">
        <h2 className="text-balance max-w-xl text-3xl font-semibold text-white sm:text-4xl">
          Looking for Your Next Home?
        </h2>
        <a
          href="#properties"
          className="inline-flex items-center justify-center rounded-md bg-white px-7 py-3.5 text-base font-semibold text-slate-900 hover:bg-slate-100"
        >
          Start Your Search
        </a>
      </div>
    </section>
  );
}
