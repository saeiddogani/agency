"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { mainNavLinks, siteConfig } from "@/lib/site-config";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    // A 1px sentinel at the very top of the page + IntersectionObserver is
    // far cheaper than a scroll listener: this only fires when the
    // threshold is crossed (i.e. twice per scroll session), never per frame.
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setScrolled(!entry.isIntersecting);
      },
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="pointer-events-none absolute top-0 h-px w-full" aria-hidden />
      <header
        className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-sm transition-[background-color,border-color,box-shadow] duration-200 ease-out ${
          scrolled
            ? "border-ink-200 bg-white/95 shadow-[0_1px_2px_rgba(16,21,29,0.04),0_8px_24px_-16px_rgba(16,21,29,0.18)] backdrop-blur-md"
            : "border-transparent shadow-none"
        }`}
      >
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
    </>
  );
}
