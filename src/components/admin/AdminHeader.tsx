"use client";

import { useEffect, useRef, useState } from "react";
import { IconMenu, IconSearch, IconBell, IconChevronDown, IconPlus } from "@/components/icons";
import { currentAdminUser, demoQuickActions } from "@/lib/admin-demo-data";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const [addOpen, setAddOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setAddOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setAddOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-ink-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open menu"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-ink-600 md:hidden"
          >
            <IconMenu className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <h1 className="truncate font-heading text-lg font-bold text-ink-950 sm:text-xl">
              {getGreeting()}, {currentAdminUser.name}
            </h1>
            <p className="hidden text-xs text-ink-500 sm:block">Here&apos;s what needs your attention today.</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <label className="relative hidden md:block">
            <span className="sr-only">Search</span>
            <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              type="search"
              placeholder="Search leads, clients, projects…"
              className="w-48 rounded-lg border border-ink-200 bg-ink-50/60 py-2 pl-9 pr-3 text-sm text-ink-700 placeholder:text-ink-400 focus:border-brand-400 focus:bg-white focus:outline-none lg:w-72"
            />
          </label>

          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-ink-500 hover:bg-ink-50"
          >
            <IconBell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brand-600" aria-hidden="true" />
          </button>

          <span
            aria-hidden="true"
            className="hidden h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white sm:flex"
          >
            {currentAdminUser.name.slice(0, 1)}
          </span>

          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setAddOpen((open) => !open)}
              aria-expanded={addOpen}
              aria-haspopup="menu"
              className="flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700 sm:px-3.5"
            >
              <IconPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Add</span>
              <IconChevronDown className={`h-3.5 w-3.5 transition-transform ${addOpen ? "rotate-180" : ""}`} />
            </button>

            {addOpen ? (
              <div
                role="menu"
                className="absolute right-0 z-30 mt-2 w-52 overflow-hidden rounded-lg border border-ink-200 bg-white py-1.5 shadow-lg"
              >
                {demoQuickActions.map((action) => (
                  <button
                    key={action.id}
                    type="button"
                    role="menuitem"
                    onClick={() => setAddOpen(false)}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm text-ink-700 hover:bg-ink-50"
                  >
                    <action.icon className="h-4 w-4 text-ink-400" />
                    {action.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
