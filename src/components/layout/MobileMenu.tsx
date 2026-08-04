"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IconMenu, IconClose } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { mainNavLinks } from "@/lib/site-config";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="flex h-10 w-10 items-center justify-center rounded-md text-ink-900"
      >
        {isOpen ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
      </button>

      {isOpen ? (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-18 bottom-0 z-40 flex flex-col overflow-y-auto bg-white"
        >
          <nav aria-label="Mobile" className="flex flex-1 flex-col px-6 py-8">
            <ul className="flex flex-col gap-1">
              {mainNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block border-b border-ink-100 py-4 text-lg font-medium text-ink-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button
                href="/contact"
                size="lg"
                className="w-full"
                onClick={() => setIsOpen(false)}
                gaEvent="cta_click"
                gaEventParams={{ cta_label: "Get Started", cta_location: "mobile_menu" }}
              >
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
