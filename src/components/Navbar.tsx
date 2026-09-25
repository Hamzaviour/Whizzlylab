"use client";

import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import MagneticButton from "./MagneticButton";

const links = [
  { label: "Services", href: "/services" },
  { label: "Tech Arsenal", href: "#tech" },
  { label: "Case Studies", href: "#cases" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`glass-strong flex w-full max-w-6xl items-center justify-between overflow-visible rounded-full px-4 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled ? "shadow-[0_0_40px_rgba(0,240,255,0.12)]" : ""
        }`}
      >
        {/* Layout height stays h-9; logo visually scaled up without enlarging the bar */}
        <a
          href="#top"
          className="relative z-10 flex h-9 w-36 shrink-0 items-center overflow-visible sm:w-44"
        >
          <motion.div
            initial={false}
            animate={{ scale: 2.35 }}
            whileHover={{ scale: 2.45 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="origin-left"
          >
            <Image
              src="/logo.png"
              alt="Whizzly Lab"
              width={200}
              height={160}
              className="h-10 w-auto max-w-none object-contain drop-shadow-[0_0_22px_rgba(0,240,255,0.55)]"
              priority
            />
          </motion.div>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              whileHover={{ y: -2 }}
              className="text-sm text-[var(--text-secondary)] transition-colors hover:text-white"
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <MagneticButton href="#contact" className="hidden sm:block">
            <span className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0a0a0f] transition hover:bg-white/90">
              Start a Project
            </span>
          </MagneticButton>

          <button
            type="button"
            aria-label="Toggle menu"
            className="rounded-full border border-white/10 p-2.5 text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-0.5 w-5 bg-white" />
            <span className="mt-1.5 block h-0.5 w-5 bg-white" />
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong absolute top-20 left-4 right-4 rounded-2xl p-4 md:hidden"
        >
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-[var(--text-secondary)] hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-full bg-white px-4 py-3 text-center text-sm font-semibold text-[#0a0a0f]"
            >
              Start a Project
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
