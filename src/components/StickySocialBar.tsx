"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Share2, Phone } from "lucide-react";
import {
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon,
  GitHubIcon,
} from "./icons";
import {
  LINKEDIN_URL,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  PHONE_URL,
  GITHUB_URL,
} from "@/lib/contact";

const SOCIAL_ITEMS = [
  {
    name: "LinkedIn",
    url: LINKEDIN_URL,
    icon: LinkedInIcon,
    hoverColor: "hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:shadow-[0_0_16px_rgba(10,102,194,0.35)]",
    glowColor: "rgba(10, 102, 194, 0.4)",
  },
  {
    name: "Instagram",
    url: INSTAGRAM_URL,
    icon: InstagramIcon,
    hoverColor: "hover:text-[#E1306C] hover:border-[#E1306C]/40 hover:shadow-[0_0_16px_rgba(225,48,108,0.35)]",
    glowColor: "rgba(225, 48, 108, 0.4)",
  },
  {
    name: "Facebook",
    url: FACEBOOK_URL,
    icon: FacebookIcon,
    hoverColor: "hover:text-[#1877F2] hover:border-[#1877F2]/40 hover:shadow-[0_0_16px_rgba(24,119,242,0.35)]",
    glowColor: "rgba(24, 119, 242, 0.4)",
  },
  {
    name: "Call Us",
    url: PHONE_URL,
    icon: Phone,
    hoverColor: "hover:text-[#00F0FF] hover:border-[#00F0FF]/40 hover:shadow-[0_0_16px_rgba(0,240,255,0.35)]",
    glowColor: "rgba(0, 240, 255, 0.4)",
  },
  {
    name: "GitHub",
    url: GITHUB_URL,
    icon: GitHubIcon,
    hoverColor: "hover:text-[#00F0FF] hover:border-[#00F0FF]/40 hover:shadow-[0_0_16px_rgba(0,240,255,0.35)]",
    glowColor: "rgba(0, 240, 255, 0.4)",
  },
];

export default function StickySocialBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ── Desktop & Tablet: Fixed Left Vertical Dock ────────────────────────── */}
      <motion.aside
        aria-label="Official Social Channels"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-3 sm:left-4 md:left-5 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center"
      >
        <div className="relative flex flex-col items-center gap-2 p-2 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.8)]">
          {/* Subtle top indicator pip */}
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mb-0.5 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />

          {SOCIAL_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.name} className="relative group">
                <motion.a
                  whileHover={{ scale: 1.12, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit Whizzly Lab on ${item.name}`}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/70 transition-all duration-300 ${item.hoverColor}`}
                >
                  <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                </motion.a>

                {/* Floating tooltip */}
                <span
                  role="tooltip"
                  className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden group-hover:inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium tracking-wide bg-[#090b12] border border-white/15 text-white whitespace-nowrap shadow-2xl backdrop-blur-md transition-all z-50 font-sans"
                >
                  {item.name}
                  <span className="absolute right-full top-1/2 -translate-y-1/2 -mr-1 border-4 border-transparent border-r-[#090b12]" />
                </span>
              </div>
            );
          })}

          {/* Subtle bottom indicator pip */}
          <div className="w-1 h-1 rounded-full bg-indigo-400/50 mt-0.5" />
        </div>
      </motion.aside>

      {/* ── Mobile Viewport: Floating Collapsible Dock ────────────────────────── */}
      <aside
        aria-label="Official Social Channels Mobile"
        className="fixed left-2 top-1/2 -translate-y-1/2 z-40 flex sm:hidden items-center"
      >
        <AnimatePresence mode="wait">
          {mobileOpen ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, x: -15, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -15, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-2 p-2 rounded-2xl border border-white/15 bg-[#05010f]/95 shadow-[0_8px_32px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
            >
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Collapse social channels"
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-white/50 hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex flex-col gap-1.5">
                {SOCIAL_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Visit Whizzly Lab on ${item.name}`}
                      className={`flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 active:scale-95 transition ${item.hoverColor}`}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.button
              key="trigger"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open social channels"
              className="group flex flex-col items-center gap-1.5 py-3 px-1.5 rounded-r-xl border-y border-r border-white/15 bg-[#05010f]/90 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-xl text-white/70 active:scale-95 transition-all"
            >
              <Share2 className="h-3.5 w-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="[writing-mode:vertical-lr] rotate-180 text-[10px] font-medium tracking-widest uppercase text-white/60">
                Socials
              </span>
              <ChevronRight className="h-3 w-3 text-white/40" />
            </motion.button>
          )}
        </AnimatePresence>
      </aside>
    </>
  );
}
