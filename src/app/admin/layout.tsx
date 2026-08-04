import type { Metadata } from "next";

/**
 * Thin, shared shell for everything under /admin (both the authenticated
 * dashboard and the public-facing /admin/login page) — just the noindex
 * metadata. The dashboard's own auth check and <AdminShell> sidebar/topbar
 * live one level down, in src/app/admin/(dashboard)/layout.tsx, scoped
 * specifically to exclude /admin/login (which must never require auth to
 * view, or it becomes impossible to log in).
 *
 * Internal tool, not a marketing page — keep it out of search results
 * regardless of what robots.ts allows for the rest of the site.
 */
export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
