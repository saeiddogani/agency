import { MobileNav } from "./MobileNav";
import { cbNavLinks } from "./content";

export function Header() {
  return (
    <header id="top" className="sticky top-0 z-50 border-b border-[#E7DDCB] bg-[#FBF7F0]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-18 w-full max-w-[1200px] items-center justify-between px-6 sm:px-8 lg:px-10">
        <a href="#top" className="text-xl font-semibold tracking-wide text-[#2B1B1B]">
          Casa Bella
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {cbNavLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6B5A4E] hover:text-[#2B1B1B]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#contact"
          className="hidden rounded-sm bg-[#6B1E1E] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-white hover:bg-[#551616] md:inline-flex"
        >
          Reserve a Table
        </a>

        <MobileNav />
      </div>
    </header>
  );
}
