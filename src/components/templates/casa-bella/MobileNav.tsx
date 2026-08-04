"use client";

import { useState } from "react";
import { IconMenu, IconClose } from "@/components/icons";
import { cbNavLinks } from "./content";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="cb-mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="flex h-10 w-10 items-center justify-center rounded-md text-[#2B1B1B]"
      >
        {isOpen ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
      </button>

      {isOpen ? (
        <div id="cb-mobile-menu" className="fixed inset-x-0 top-[73px] bottom-0 z-40 bg-[#FBF7F0]">
          <nav aria-label="Mobile" className="flex flex-col px-6 py-8">
            {cbNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-[#E7DDCB] py-4 text-lg font-medium text-[#2B1B1B]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-6 rounded-sm bg-[#6B1E1E] px-5 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white"
            >
              Reserve a Table
            </a>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
