export function Cta() {
  return (
    <section id="contact" className="bg-slate-900 py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-8 px-6 sm:px-8 lg:px-10">
        <h2 className="max-w-2xl text-balance text-3xl font-semibold text-white sm:text-4xl">
          Let&apos;s Talk About Your Business.
        </h2>
        <p className="max-w-lg text-base text-slate-300">
          Tell us where things stand today, and we&apos;ll help you find a clear, realistic path forward.
        </p>
        <a
          href="mailto:hello@apexconsulting.example"
          className="inline-flex items-center justify-center rounded-md bg-[#0e7490] px-8 py-3.5 text-base font-semibold text-white hover:bg-[#0c6079]"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
}
