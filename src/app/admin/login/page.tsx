import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;
  const next = params.next && params.next.startsWith("/admin") ? params.next : "/admin";
  const inactiveNotice = params.error === "inactive";

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-50 px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-600 text-base font-bold text-white">
            {siteConfig.shortName.slice(0, 1)}
          </span>
          <div>
            <h1 className="font-heading text-xl font-bold text-ink-950">{siteConfig.name} Admin</h1>
            <p className="mt-1 text-sm text-ink-500">Sign in to manage your agency.</p>
          </div>
        </div>

        <div className="rounded-xl border border-ink-200 bg-white p-6 shadow-sm">
          <LoginForm next={next} inactiveNotice={inactiveNotice} />
        </div>
      </div>
    </div>
  );
}
