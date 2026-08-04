import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { mainNavLinks, siteConfig } from "@/lib/site-config";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-200 bg-white/90 backdrop-blur-sm">
      <Container className="flex h-18 items-center justify-between py-4">
        <Link
          href="/"
          className="font-heading text-lg font-bold tracking-tight text-ink-950"
          aria-label={`${siteConfig.name} — Home`}
        >
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {mainNavLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-ink-600 transition-colors hover:text-ink-950"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <Button
            href="/contact"
            size="md"
            gaEvent="cta_click"
            gaEventParams={{ cta_label: "Get Started", cta_location: "header" }}
          >
            Get Started
          </Button>
        </div>

        <MobileMenu />
      </Container>
    </header>
  );
}
