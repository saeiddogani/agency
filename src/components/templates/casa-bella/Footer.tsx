import Link from "next/link";
import { IconMail, IconPhone, IconMapPin, IconInstagram, IconFacebook } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";
import { cbNavLinks, cbHours, cbContact } from "./content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-[#3A2A26] bg-[#241615] text-[#C9BBA8]">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-12 px-6 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-10">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <span className="text-lg font-semibold text-white">Casa Bella</span>
          <p className="max-w-xs text-sm">Good Food. Good Wine. Good Company.</p>
          <div className="mt-2 flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#4A3B33] text-[#C9BBA8] hover:border-[#D8B984] hover:text-[#D8B984]"
            >
              <IconInstagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#4A3B33] text-[#C9BBA8] hover:border-[#D8B984] hover:text-[#D8B984]"
            >
              <IconFacebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className="text-sm font-semibold text-white">Navigation</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {cbNavLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold text-white">Hours</h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            {cbHours.map((entry) => (
              <li key={entry.day} className="flex flex-col">
                <span>{entry.day}</span>
                <span className="text-[#9c8b7a]">{entry.hours}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Contact</h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            <li className="flex items-center gap-2">
              <IconMail className="h-4 w-4 shrink-0" />
              <a href={`mailto:${cbContact.email}`} className="hover:text-white">
                {cbContact.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <IconPhone className="h-4 w-4 shrink-0" />
              <a href={`tel:${cbContact.phone}`} className="hover:text-white">
                {cbContact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <IconMapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{cbContact.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#3A2A26]">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-[#9c8b7a] sm:flex-row sm:px-8 lg:px-10">
          <p>© {year} Casa Bella. Demo website — not a real business.</p>
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
