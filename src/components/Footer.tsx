"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GitHubIcon, LinkedInIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Whizzly Lab"
            width={140}
            height={112}
            className="h-12 w-auto object-contain sm:h-14"
          />
          <div>
            <div className="text-gradient text-sm font-semibold tracking-[0.12em] uppercase">
              Whizzly Lab
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              Intelligent solutions. Infinite possibilities.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <motion.a
            whileHover={{ y: -3, scale: 1.08 }}
            href="https://github.com/WhizzlyLab"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="rounded-full border border-white/10 p-2.5 text-white/70 transition hover:border-[var(--cyan)]/40 hover:text-[var(--cyan)]"
          >
            <GitHubIcon className="h-4 w-4" />
          </motion.a>
          <motion.a
            whileHover={{ y: -3, scale: 1.08 }}
            href="https://www.linkedin.com/company/whizzly-lab"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="rounded-full border border-white/10 p-2.5 text-white/70 transition hover:border-[var(--cyan)]/40 hover:text-[var(--cyan)]"
          >
            <LinkedInIcon className="h-4 w-4" />
          </motion.a>
        </div>

        <p className="text-xs text-[var(--text-muted)]">
          © {new Date().getFullYear()} Whizzly Lab. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
