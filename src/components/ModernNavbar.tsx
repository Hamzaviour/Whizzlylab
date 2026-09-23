"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import PAGE_NAV from "@/lib/nav";
import {
  COMPANY_PHONE,
  PHONE_URL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  GITHUB_URL,
} from "@/lib/contact";
import { LinkedInIcon, InstagramIcon, FacebookIcon, GitHubIcon } from "./icons";
import { CurrencyToggle } from "@/lib/currency";

export default function ModernNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full px-3 pt-3 transition-all duration-300 sm:px-6 sm:pt-4">
      <div
        className={`mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border transition-all duration-300 ${
          scrolled
            ? "border-white/15 bg-[#05010f]/85 px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            : "border-white/10 bg-[#05010f]/60 px-4 py-3 backdrop-blur-md"
        }`}
      >
        {/* Brand Logo & Name */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-white/5 transition-transform duration-300 group-hover:scale-105 group-hover:border-cyan-400/40">
            <Image
              src="/icon.png"
              alt="Whizzly Lab: AI & Full-Stack Engineering Studio Icon"
              width={28}
              height={28}
              className="h-6 w-6 object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              Whizzly <span className="bg-gradient-to-r from-[#00F0FF] to-[#a855f7] bg-clip-text text-transparent">Lab</span>
            </span>
            <span className="hidden text-[10px] font-medium tracking-wider text-hero-sub/60 uppercase sm:inline-block">
              AI & Engineering
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 lg:flex">
          {PAGE_NAV.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white/15 text-white shadow-sm"
                    : "text-hero-sub/80 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action Group */}
        <div className="hidden items-center gap-3 lg:flex">
          <CurrencyToggle />
          <a
            href={PHONE_URL}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-slate-300 transition-all hover:border-cyan-400/40 hover:text-cyan-300"
          >
            <Phone className="h-3 w-3 text-cyan-400" />
            <span>{COMPANY_PHONE}</span>
          </a>
          <Link
            href="/schedule"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#00f0ff] px-4 py-1.5 text-xs font-semibold text-black transition-all hover:opacity-90 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
          >
            Book a Consult
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <CurrencyToggle className="scale-90" />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-3 left-3 z-50 mt-2 overflow-hidden rounded-2xl border border-white/15 bg-[#05010f]/95 p-4 shadow-2xl backdrop-blur-2xl sm:right-6 sm:left-6 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {PAGE_NAV.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-white/15 text-white font-semibold"
                        : "text-hero-sub/80 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
                <Link
                  href="/schedule"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#00f0ff] px-4 py-3 text-center text-sm font-semibold text-black"
                >
                  Book a Consult
                </Link>
                <a
                  href={PHONE_URL}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-center text-sm font-medium text-slate-200"
                >
                  <Phone className="h-4 w-4 text-cyan-400" />
                  Call {COMPANY_PHONE}
                </a>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:border-cyan-400/40 hover:text-cyan-300"
                  >
                    <LinkedInIcon className="h-4 w-4" />
                  </a>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:border-cyan-400/40 hover:text-cyan-300"
                  >
                    <InstagramIcon className="h-4 w-4" />
                  </a>
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:border-cyan-400/40 hover:text-cyan-300"
                  >
                    <FacebookIcon className="h-4 w-4" />
                  </a>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:border-cyan-400/40 hover:text-cyan-300"
                  >
                    <GitHubIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
