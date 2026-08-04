"use client";

import { useState } from "react";
import { IconMenu, IconClose } from "@/components/icons";
import { acNavLinks } from "./content";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="ac-mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="flex h-10 w-10 items-center justify-center rounded-md text-slate-900"
      >
        {isOpen ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
      </button>

      {isOpen ? (
        <div id="ac-mobile-menu" className="fixed inset-x-0 top-[65px] bottom-0 z-40 bg-white">
          <nav aria-label="Mobile" className="flex flex-col px-6 py-8">
            {acNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-slate-100 py-4 text-lg font-medium text-slate-900"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-6 rounded-md bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Start a Conversation
            </a>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
