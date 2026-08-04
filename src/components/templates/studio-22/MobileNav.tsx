"use client";

import { useState } from "react";
import { IconMenu, IconClose } from "@/components/icons";
import { s22NavLinks } from "./content";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="s22-mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="flex h-10 w-10 items-center justify-center rounded-md text-white"
      >
        {isOpen ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
      </button>

      {isOpen ? (
        <div id="s22-mobile-menu" className="fixed inset-x-0 top-[65px] bottom-0 z-40 bg-black">
          <nav aria-label="Mobile" className="flex flex-col px-6 py-8">
            {s22NavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-white/10 py-4 text-lg font-medium uppercase tracking-wide text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-6 rounded-none bg-[#B8860B] px-5 py-3 text-center text-sm font-bold uppercase tracking-widest text-black"
            >
              Book Appointment
            </a>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
