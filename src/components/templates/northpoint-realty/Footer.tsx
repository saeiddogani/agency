import Link from "next/link";
import { IconMail, IconPhone, IconMapPin, IconInstagram, IconLinkedin } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";
import { npNavLinks, npServices, npContact } from "./content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-slate-800 bg-slate-900 text-slate-300">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-12 px-6 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-10">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <span className="text-lg font-semibold text-white">NorthPoint Realty</span>
          <p className="max-w-xs text-sm text-slate-400">Find a Place to Call Home.</p>
          <div className="mt-2 flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-400 hover:border-[#5EEAD4] hover:text-[#5EEAD4]"
            >
              <IconInstagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-400 hover:border-[#5EEAD4] hover:text-[#5EEAD4]"
            >
              <IconLinkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className="text-sm font-semibold text-white">Navigation</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {npNavLinks.map((link) => (
              <li key={`${link.label}-${link.href}`}>
                <a href={link.href} className="text-sm text-slate-400 hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer services">
          <h3 className="text-sm font-semibold text-white">Services</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {npServices.map((service) => (
              <li key={service.title}>
                <a href="#services" className="text-sm text-slate-400 hover:text-white">
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold text-white">Contact</h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            <li className="flex items-center gap-2">
              <IconMail className="h-4 w-4 shrink-0" />
              <a href={`mailto:${npContact.email}`} className="hover:text-white">
                {npContact.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <IconPhone className="h-4 w-4 shrink-0" />
              <a href={`tel:${npContact.phone}`} className="hover:text-white">
                {npContact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <IconMapPin className="h-4 w-4 shrink-0" />
              <span>{npContact.location}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-slate-500 sm:flex-row sm:px-8 lg:px-10">
          <p>© {year} NorthPoint Realty. Demo website — not a real business.</p>
          <p>
            Demo built by{" "}
            <Link href="/" className="text-slate-400 hover:text-white">
              {siteConfig.name}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
