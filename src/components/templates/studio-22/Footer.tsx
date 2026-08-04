import Link from "next/link";
import { IconMail, IconPhone, IconMapPin, IconInstagram, IconFacebook } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";
import { s22NavLinks, s22Contact } from "./content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-white/10 bg-black text-white/70">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-12 px-6 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-10">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <span className="text-lg font-bold uppercase tracking-widest text-white">Studio 22</span>
          <p className="max-w-xs text-sm">Your Style. Your Space.</p>
          <div className="mt-2 flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/70 hover:border-[#B8860B] hover:text-[#B8860B]"
            >
              <IconInstagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/70 hover:border-[#B8860B] hover:text-[#B8860B]"
            >
              <IconFacebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Navigation</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {s22NavLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Hours</h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            {s22Contact.hours.map((entry) => (
              <li key={entry.day} className="flex flex-col">
                <span>{entry.day}</span>
                <span className="text-white/50">{entry.hours}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Contact</h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            <li className="flex items-center gap-2">
              <IconMail className="h-4 w-4 shrink-0" />
              <a href={`mailto:${s22Contact.email}`} className="hover:text-white">
                {s22Contact.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <IconPhone className="h-4 w-4 shrink-0" />
              <a href={`tel:${s22Contact.phone}`} className="hover:text-white">
                {s22Contact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <IconMapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{s22Contact.location}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-white/50 sm:flex-row sm:px-8 lg:px-10">
          <p>© {year} Studio 22. Demo website — not a real business.</p>
          <p>
            Demo built by{" "}
            <Link href="/" className="hover:text-white">
              {siteConfig.name}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
