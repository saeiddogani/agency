"use client";

import { useState } from "react";
import { IconMenu, IconClose } from "@/components/icons";
import { nslNavLinks } from "./content";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="nsl-mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="flex h-10 w-10 items-center justify-center rounded-md text-stone-900"
      >
        {isOpen ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
      </button>

      {isOpen ? (
        <div id="nsl-mobile-menu" className="fixed inset-x-0 top-[73px] bottom-0 z-40 bg-white">
          <nav aria-label="Mobile" className="flex flex-col px-6 py-8">
            {nslNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-stone-100 py-4 text-lg font-medium text-stone-900"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-6 rounded-full bg-green-800 px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Request a Quote
            </a>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
