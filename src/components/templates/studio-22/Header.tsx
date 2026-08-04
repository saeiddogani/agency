import { MobileNav } from "./MobileNav";
import { s22NavLinks } from "./content";

export function Header() {
  return (
    <header id="top" className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-6 sm:px-8 lg:px-10">
        <a href="#top" className="text-2xl font-bold tracking-widest text-white">
          STUDIO 22
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {s22NavLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#contact"
          className="hidden bg-[#B8860B] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-black hover:bg-[#a6790a] md:inline-flex"
        >
          Book Appointment
        </a>

        <MobileNav />
      </div>
    </header>
  );
}
