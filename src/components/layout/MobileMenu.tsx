"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu, IconClose } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { mainNavLinks } from "@/lib/site-config";
import { DURATION, EASE_OUT, STAGGER } from "@/lib/motion";

/** A single link/button row inside the mobile menu — fades/slides in with the stagger driven by its parent's `visible` variant. */
const menuItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.fast, ease: EASE_OUT } },
};

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

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 top-18 bottom-0 z-40 flex flex-col overflow-y-auto bg-white"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: DURATION.fast, ease: EASE_OUT }}
          >
            <motion.nav
              aria-label="Mobile"
              className="flex flex-1 flex-col px-6 py-8"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{ visible: { transition: { staggerChildren: STAGGER.tight } } }}
            >
              <ul className="flex flex-col gap-1">
                {mainNavLinks.map((link) => (
                  <motion.li key={link.href} variants={menuItemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block border-b border-ink-100 py-4 text-lg font-medium text-ink-900"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div className="mt-8" variants={menuItemVariants}>
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
              </motion.div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
