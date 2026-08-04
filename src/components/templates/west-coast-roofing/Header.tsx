import { MobileNav } from "./MobileNav";
import { wcrNavLinks } from "./content";

export function Header() {
  return (
    <header id="top" className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-6 sm:px-8 lg:px-10">
        <a href="#top" className="text-lg font-bold tracking-tight text-stone-900">
          West Coast Roofing
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {wcrNavLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm font-medium text-stone-600 hover:text-stone-900">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#contact"
          className="hidden rounded-md bg-orange-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-800 md:inline-flex"
        >
          Get a Free Estimate
        </a>

        <MobileNav />
      </div>
    </header>
  );
}
