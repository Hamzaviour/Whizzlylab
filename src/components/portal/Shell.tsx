"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  UserCog,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { logoutAction } from "@/lib/portal/actions";

interface ShellUser {
  name: string;
  email: string;
  role: "admin" | "team" | "client";
}

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  match: (p: string) => boolean;
}

function navFor(role: ShellUser["role"]): NavItem[] {
  const items: NavItem[] = [
    {
      href: "/portal",
      label: role === "client" ? "Overview" : "Dashboard",
      icon: LayoutDashboard,
      match: (p) => p === "/portal",
    },
  ];
  if (role === "client") {
    items.push({ href: "/portal/projects", label: "My projects", icon: FolderKanban, match: (p) => p.startsWith("/portal/projects") });
  } else {
    items.push(
      { href: "/portal/projects", label: "Projects", icon: FolderKanban, match: (p) => p.startsWith("/portal/projects") },
      { href: "/portal/clients", label: "Clients", icon: Users, match: (p) => p.startsWith("/portal/clients") }
    );
  }
  if (role === "admin") {
    items.push({ href: "/portal/team", label: "Team", icon: ShieldCheck, match: (p) => p.startsWith("/portal/team") });
  }
  items.push({ href: "/portal/account", label: "Account", icon: UserCog, match: (p) => p.startsWith("/portal/account") });
  return items;
}

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function Brand() {
  return (
    <Link href="/portal" className="flex items-center gap-2.5">
      <Image src="/portal-mark.png" alt="" width={34} height={34} priority className="drop-shadow-[0_4px_10px_rgba(124,58,237,0.35)]" />
      <span className="leading-tight">
        <span className="block font-heading text-[15px] font-bold tracking-tight text-slate-900">Whizzly Lab</span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#066bf5]">Client Portal</span>
      </span>
    </Link>
  );
}

function NavList({ items, pathname, onNavigate }: { items: NavItem[]; pathname: string; onNavigate?: () => void }) {
  return (
    <ul className="space-y-1">
      {items.map((item) => {
        const active = item.match(pathname);
        const Icon = item.icon;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-gradient-to-r from-[#7c3aed]/10 via-[#066bf5]/10 to-transparent text-slate-900"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-lg transition ${
                  active ? "bg-gradient-to-br from-[#7c3aed] to-[#066bf5] text-white shadow-sm" : "text-slate-400 group-hover:text-slate-600"
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function UserCard({ user }: { user: ShellUser }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7c3aed] to-[#066bf5] text-xs font-semibold text-white">
          {initials(user.name)}
        </span>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-900">{user.name}</div>
          <div className="truncate text-[11px] capitalize text-slate-500">{user.role === "client" ? "Client" : user.role}</div>
        </div>
      </div>
      <form action={logoutAction} className="mt-3">
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
        >
          <LogOut className="h-3.5 w-3.5" /> Sign out
        </button>
      </form>
    </div>
  );
}

export default function Shell({ user, children }: { user: ShellUser; children: React.ReactNode }) {
  const pathname = usePathname() || "/portal";
  const [open, setOpen] = useState(false);
  const items = navFor(user.role);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="relative z-10 min-h-screen bg-[#f5f7fb] text-slate-900 [color-scheme:light]">
      {/* Ambient brand glow */}
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 h-72 bg-[radial-gradient(60%_100%_at_70%_0%,rgba(124,58,237,0.08),transparent_70%),radial-gradient(40%_80%_at_20%_0%,rgba(0,212,248,0.08),transparent_70%)]" />

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200/80 bg-white/90 px-4 py-5 backdrop-blur lg:flex">
        <div className="px-2">
          <Brand />
        </div>
        <nav className="mt-8 flex-1" aria-label="Portal">
          <NavList items={items} pathname={pathname} />
        </nav>
        <UserCard user={user} />
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
        <Brand />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button type="button" aria-label="Close menu" className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col bg-white px-4 py-5 shadow-2xl">
            <div className="flex items-center justify-between px-2">
              <Brand />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="mt-8 flex-1" aria-label="Portal">
              <NavList items={items} pathname={pathname} onNavigate={() => setOpen(false)} />
            </nav>
            <UserCard user={user} />
          </div>
        </div>
      )}

      <main className="relative lg:pl-64">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10">{children}</div>
      </main>
    </div>
  );
}
