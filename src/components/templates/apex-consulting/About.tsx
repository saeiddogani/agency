export function About() {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0e7490]">
            About Apex Consulting
          </span>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            Straightforward advice, built around your business
          </h2>
        </div>
        <div className="flex flex-col gap-5 text-base text-slate-500">
          <p>
            Apex Consulting works with business owners and leadership teams who want a clearer view of
            where things stand — and a realistic plan for what comes next. We focus on strategy and
            operations that hold up in practice, not just on paper.
          </p>
          <p>
            Every engagement starts with listening. We take the time to understand how your business
            actually runs before recommending any changes, so the plans we build are ones your team can
            realistically carry out.
          </p>
          <p>
            This page is a demonstration of a professional services website built by our agency, showing
            how a consulting brand can be presented with clarity and confidence.
          </p>
        </div>
      </div>
    </section>
  );
}
