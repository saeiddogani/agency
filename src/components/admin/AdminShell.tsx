"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

/**
 * Three responsive tiers:
 *  - lg+   : full sidebar with labels, fixed at 16rem.
 *  - md-lg : collapsed icon-only rail, fixed at 4rem.
 *  - <md   : no persistent sidebar — a hamburger button opens a full drawer.
 */
export function AdminShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="min-h-screen bg-ink-50">
      {/* Tablet: collapsed icon rail */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-16 flex-col border-r border-ink-200 bg-white md:flex lg:hidden">
        <AdminSidebar collapsed />
      </aside>

      {/* Desktop: full sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-ink-200 bg-white lg:flex">
        <AdminSidebar />
      </aside>

      {/* Mobile: drawer */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-ink-950/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-50 flex h-full w-72 max-w-[85vw] flex-col bg-white shadow-xl">
            <AdminSidebar onNavigate={() => setMobileOpen(false)} onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="flex flex-col md:pl-16 lg:pl-64">
        <AdminHeader onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
