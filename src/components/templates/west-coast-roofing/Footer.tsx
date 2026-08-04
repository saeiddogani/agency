import Link from "next/link";
import { IconMail, IconPhone, IconMapPin, IconInstagram, IconFacebook } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";
import { wcrNavLinks, wcrServices, wcrContact } from "./content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-stone-800 bg-stone-900 text-stone-300">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-12 px-6 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-10">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <span className="text-lg font-bold text-white">West Coast Roofing</span>
          <p className="max-w-xs text-sm text-stone-400">
            Reliable Roofing. Built for the West Coast.
          </p>
          <div className="mt-2 flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-stone-700 text-stone-400 hover:border-orange-500 hover:text-orange-500"
            >
              <IconInstagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-stone-700 text-stone-400 hover:border-orange-500 hover:text-orange-500"
            >
              <IconFacebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className="text-sm font-semibold text-white">Navigation</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {wcrNavLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-stone-400 hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer services">
          <h3 className="text-sm font-semibold text-white">Services</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {wcrServices.map((service) => (
              <li key={service.title}>
                <a href="#services" className="text-sm text-stone-400 hover:text-white">
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold text-white">Contact</h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-stone-400">
            <li className="flex items-center gap-2">
              <IconMail className="h-4 w-4 shrink-0" />
              <a href={`mailto:${wcrContact.email}`} className="hover:text-white">
                {wcrContact.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <IconPhone className="h-4 w-4 shrink-0" />
              <a href={`tel:${wcrContact.phone}`} className="hover:text-white">
                {wcrContact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <IconMapPin className="h-4 w-4 shrink-0" />
              <span>{wcrContact.location}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-800">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-stone-500 sm:flex-row sm:px-8 lg:px-10">
          <p>© {year} West Coast Roofing. Demo website — not a real business.</p>
          <p>
            Demo built by{" "}
            <Link href="/" className="text-stone-400 hover:text-white">
              {siteConfig.name}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
