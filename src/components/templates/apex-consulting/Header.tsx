import { MobileNav } from "./MobileNav";
import { acNavLinks } from "./content";

export function Header() {
  return (
    <header id="top" className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-6 sm:px-8 lg:px-10">
        <a href="#top" className="text-lg font-semibold tracking-tight text-slate-900">
          Apex Consulting
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {acNavLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm font-medium text-slate-600 hover:text-slate-900">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#contact"
          className="hidden rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 md:inline-flex"
        >
          Start a Conversation
        </a>

        <MobileNav />
      </div>
    </header>
  );
}
