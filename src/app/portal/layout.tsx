import type { Metadata } from "next";
import Link from "next/link";
import { getUser } from "@/lib/portal/auth";
import { logoutAction } from "@/lib/portal/actions";
import { btnGhost } from "@/components/portal/ui";

export const metadata: Metadata = {
  title: "Client Portal",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  const staff = user && user.role !== "client";

  return (
    <div className="relative z-10 min-h-screen bg-[#fafbfc] text-slate-900 [color-scheme:light]">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/portal" className="font-heading text-base font-bold tracking-tight text-slate-900">
              Whizzly <span className="text-[#066bf5]">Portal</span>
            </Link>
            {user && (
              <nav className="flex items-center gap-4 text-sm text-slate-600">
                <Link href="/portal" className="hover:text-slate-900">
                  {staff ? "Dashboard" : "My projects"}
                </Link>
                {staff && (
                  <Link href="/portal/clients" className="hover:text-slate-900">
                    Clients
                  </Link>
                )}
                {user.role === "admin" && (
                  <Link href="/portal/team" className="hover:text-slate-900">
                    Team
                  </Link>
                )}
              </nav>
            )}
          </div>
          {user && (
            <div className="flex items-center gap-3">
              <Link href="/portal/account" className="text-sm text-slate-600 hover:text-slate-900">
                Account
              </Link>
              <span className="hidden text-right text-xs leading-tight text-slate-500 sm:block">
                <span className="block font-medium text-slate-800">{user.name}</span>
                <span className="capitalize">{user.role}</span>
              </span>
              <form action={logoutAction}>
                <button type="submit" className={btnGhost}>
                  Sign out
                </button>
              </form>
            </div>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
