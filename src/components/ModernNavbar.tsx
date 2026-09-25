"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight, Phone } from "lucide-react";
import { COMPANY_PHONE, PHONE_URL } from "@/lib/contact";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Company", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

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
    <header className="sticky top-0 z-50 w-full px-4 sm:px-8 lg:px-12 pt-4 transition-all duration-300">
      <div
        className={`mx-auto flex w-full max-w-7xl items-center justify-between transition-all duration-300 ${
          scrolled
            ? "rounded-full border border-white/15 bg-black/80 px-6 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            : "px-2 py-3"
        }`}
      >
        {/* Brand Name */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
          <div className="relative flex items-center justify-center w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] shrink-0">
            <Image
              src="/whizzly-icon-crisp.png"
              alt="Whizzly Lab Logo"
              width={40}
              height={40}
              unoptimized
              className="w-full h-full object-contain filter drop-shadow-[0_2px_10px_rgba(99,102,241,0.5)] transition-transform duration-300 group-hover:scale-110"
              priority
            />
          </div>
          <span className="text-xl sm:text-2xl font-bold tracking-wider text-white uppercase font-sans">
            WHIZZLY LAB
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`transition-colors font-sans ${
                  isActive ? "text-white font-semibold" : "hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action: Antimatter Pill Button & Phone CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Phone Number CTA */}
          <a
            href={PHONE_URL}
            className="hidden lg:inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 text-xs sm:text-sm font-medium text-gray-200 hover:text-white transition-all duration-300 backdrop-blur-md group"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
              <Phone className="h-3 w-3" />
            </div>
            <span className="font-mono tracking-tight text-xs sm:text-sm">{COMPANY_PHONE}</span>
          </a>

          <Link
            href="/schedule"
            className="group flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-xs sm:text-sm font-medium text-white hover:border-white transition-all duration-300"
          >
            <span>Start Your Project</span>
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:scale-110">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center gap-2.5 md:hidden">
          <a
            href={PHONE_URL}
            aria-label={`Call ${COMPANY_PHONE}`}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-indigo-300 hover:text-white hover:bg-white/10 transition"
          >
            <Phone className="h-3.5 w-3.5" />
          </a>
          <Link
            href="/schedule"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 bg-black/60 text-xs font-medium text-white"
          >
            <span>Start</span>
            <ArrowUpRight className="h-3 w-3" />
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-4 left-4 z-50 mt-3 overflow-hidden rounded-3xl border border-white/15 bg-[#090b14]/95 p-6 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-2xl px-4 py-3 text-base font-medium transition ${
                      isActive
                        ? "bg-white/10 text-white font-semibold"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                <a
                  href={PHONE_URL}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-white/15 bg-white/5 text-gray-200 text-sm font-medium hover:bg-white/10 hover:text-white transition"
                >
                  <Phone className="h-4 w-4 text-indigo-400" />
                  <span>Call: {COMPANY_PHONE}</span>
                </a>

                <Link
                  href="/schedule"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-full bg-indigo-600 text-white font-medium text-sm shadow-[0_0_24px_rgba(99,102,241,0.5)]"
                >
                  <span>Start Your Project</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
