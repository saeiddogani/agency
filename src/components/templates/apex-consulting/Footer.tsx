import { acContact, acNavLinks } from "./content";

export function Footer() {
  return (
    <footer className="bg-slate-950 py-14 text-slate-400">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-6 sm:px-8 lg:flex-row lg:items-start lg:justify-between lg:px-10">
        <div className="flex flex-col gap-3">
          <span className="text-lg font-semibold text-white">Apex Consulting</span>
          <p className="max-w-xs text-sm text-slate-400">
            Clarity for better business decisions. A demonstration website built by our agency.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Navigate</span>
          <ul className="flex flex-col gap-2">
            {acNavLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-slate-400 hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Contact</span>
          <a href={`tel:${acContact.phone}`} className="text-sm text-slate-400 hover:text-white">
            {acContact.phoneDisplay}
          </a>
          <a href={`mailto:${acContact.email}`} className="text-sm text-slate-400 hover:text-white">
            {acContact.email}
          </a>
          <span className="text-sm text-slate-400">{acContact.location}</span>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-[1200px] border-t border-slate-800 px-6 pt-6 text-xs text-slate-400 sm:px-8 lg:px-10">
        Apex Consulting is a fictional business created for demonstration purposes. &copy; {new Date().getFullYear()}.
      </div>
    </footer>
  );
}
