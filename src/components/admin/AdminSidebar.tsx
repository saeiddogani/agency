"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconClose, IconSettings, IconLogOut, IconArrowRight } from "@/components/icons";
import { adminNavGroups } from "@/lib/admin-demo-data";
import { siteConfig } from "@/lib/site-config";
import { signOut } from "@/app/admin/login/actions";

interface AdminSidebarProps {
  /** Icon-only rail, used at tablet widths. */
  collapsed?: boolean;
  /** Called after clicking a live nav link — used to close the mobile drawer. */
  onNavigate?: () => void;
  /** Renders a close button next to the brand — used only in the mobile drawer. */
  onClose?: () => void;
}

export function AdminSidebar({ collapsed = false, onNavigate, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className={`flex items-center ${collapsed ? "justify-center px-0 py-5" : "justify-between px-5 py-5"}`}>
        <Link href="/admin" onClick={onNavigate} className="flex items-center gap-2.5" title={siteConfig.name}>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-600 text-sm font-bold text-white">
            {siteConfig.shortName.slice(0, 1)}
          </span>
          {!collapsed ? (
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-ink-950">{siteConfig.name}</span>
              <span className="text-[11px] font-medium uppercase tracking-wide text-ink-400">Admin</span>
            </span>
          ) : null}
        </Link>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-md text-ink-500 hover:bg-ink-50"
          >
            <IconClose className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      <nav aria-label="Admin sections" className="flex flex-1 flex-col gap-4 overflow-y-auto px-3 pb-4">
        {adminNavGroups.map((group) => (
          <div key={group.label}>
            {collapsed ? (
              <div className="my-2 border-t border-ink-100" />
            ) : (
              <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                {group.label}
              </p>
            )}
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                if (!item.href) {
                  return (
                    <div
                      key={item.label}
                      aria-disabled="true"
                      title={collapsed ? `${item.label} — Coming soon` : undefined}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-ink-400 ${
                        collapsed ? "justify-center" : "justify-between"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <item.icon className="h-[18px] w-[18px] shrink-0" />
                        {!collapsed ? item.label : null}
                      </span>
                      {!collapsed ? (
                        <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-400">
                          Soon
                        </span>
                      ) : null}
                    </div>
                  );
                }

                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={isActive ? "page" : undefined}
                    title={collapsed ? item.label : undefined}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      collapsed ? "justify-center" : ""
                    } ${isActive ? "bg-brand-600 text-white" : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"}`}
                  >
                    <item.icon className="h-[18px] w-[18px] shrink-0" />
                    {!collapsed ? item.label : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-ink-100 px-3 py-3">
        <div className="flex flex-col gap-0.5">
          <button
            type="button"
            title={collapsed ? "Settings" : undefined}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-ink-500 hover:bg-ink-50 hover:text-ink-900 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <IconSettings className="h-[18px] w-[18px] shrink-0" />
            {!collapsed ? "Settings" : null}
          </button>
          <button
            type="button"
            onClick={() => {
              void signOut();
            }}
            title={collapsed ? "Logout" : undefined}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-ink-500 hover:bg-ink-50 hover:text-ink-900 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <IconLogOut className="h-[18px] w-[18px] shrink-0" />
            {!collapsed ? "Logout" : null}
          </button>
        </div>
        <Link
          href="/"
          title={collapsed ? "Back to public site" : undefined}
          className={`mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-ink-400 hover:bg-ink-50 hover:text-ink-700 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <IconArrowRight className="h-3.5 w-3.5 shrink-0 rotate-180" />
          {!collapsed ? "Back to public site" : null}
        </Link>
      </div>
    </div>
  );
}
