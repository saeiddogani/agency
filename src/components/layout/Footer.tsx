import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { IconMail, IconPhone, IconMapPin, IconInstagram, IconLinkedin, IconFacebook } from "@/components/icons";
import { siteConfig, footerNavLinks, footerServiceLinks } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-200 bg-surface-alt">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <span className="font-heading text-lg font-bold text-ink-950">{siteConfig.name}</span>
          <p className="max-w-xs text-sm text-ink-500">{siteConfig.description}</p>
          <div className="mt-2 flex items-center gap-3">
            <a
              href={siteConfig.social.instagram}
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-ink-200 text-ink-500 transition-colors hover:border-brand-600 hover:text-brand-600"
            >
              <IconInstagram className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.social.linkedin}
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-ink-200 text-ink-500 transition-colors hover:border-brand-600 hover:text-brand-600"
            >
              <IconLinkedin className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.social.facebook}
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-ink-200 text-ink-500 transition-colors hover:border-brand-600 hover:text-brand-600"
            >
              <IconFacebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className="text-sm font-semibold text-ink-950">Navigation</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {footerNavLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-ink-500 hover:text-ink-950">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer services">
          <h3 className="text-sm font-semibold text-ink-950">Services</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {footerServiceLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm text-ink-500 hover:text-ink-950">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold text-ink-950">Contact</h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-ink-500">
            <li className="flex items-center gap-2">
              <IconMail className="h-4 w-4 shrink-0 text-ink-400" />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-ink-950">
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <IconPhone className="h-4 w-4 shrink-0 text-ink-400" />
              <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-ink-950">
                {siteConfig.contact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <IconMapPin className="h-4 w-4 shrink-0 text-ink-400" />
              <span>{siteConfig.contact.location}</span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-ink-200">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-ink-500 sm:flex-row">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>Serving small businesses across {siteConfig.serviceArea}.</p>
        </Container>
      </div>
    </footer>
  );
}
