"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Phone } from "lucide-react";
import Hls from "hls.js";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import {
  PHONE_URL,
  COMPANY_PHONE,
  COMPANY_EMAIL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  GITHUB_URL,
} from "@/lib/contact";

const HLS_SRC =
  "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

export default function CtaFooter() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
      return () => hls.destroy();
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_SRC;
    }
  }, []);

  return (
    <footer
      id="cta"
      className="relative overflow-hidden bg-black px-4 pt-20 pb-12 sm:px-8 sm:pt-32"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-60"
      />

      <div
        className="pointer-events-none absolute top-0 right-0 left-0 z-[1] h-48 bg-gradient-to-b from-[#05010f] to-transparent"
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 z-[1] h-64 bg-gradient-to-t from-black via-black/80 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Main CTA Block */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs font-medium text-slate-300 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>Ready for Deployment</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading mx-auto text-4xl leading-[1.05] font-bold tracking-tight text-white not-italic sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Schedule a strategy consult.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-body mx-auto mt-6 max-w-xl text-base text-hero-sub/85"
          >
            Book a 20 to 30 minute discovery call. Discuss technical feasibility, architecture, and scope clarity with no pressure.
          </motion.p>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 px-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 md:gap-5">
            <MagneticButton href="/schedule">
              <span className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#00f0ff] px-8 py-3.5 text-sm font-semibold text-black shadow-[0_0_25px_rgba(0,240,255,0.35)] transition-all hover:opacity-90 sm:w-auto">
                Schedule a Consult
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </MagneticButton>
            <MagneticButton href={PHONE_URL} strength={0.28}>
              <span className="font-body flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-slate-200 transition-colors hover:border-cyan-400/40 hover:text-cyan-300 sm:w-auto">
                <Phone className="h-4 w-4 text-cyan-400" />
                Call {COMPANY_PHONE}
              </span>
            </MagneticButton>
            <MagneticButton href="/pricing" strength={0.28}>
              <span className="font-body flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/10 sm:w-auto">
                View Pricing
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </MagneticButton>
          </div>
        </div>

        {/* Structured Multi-Column Footer */}
        <div className="liquid-glass rounded-3xl border border-white/10 p-8 sm:p-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {/* Brand column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-white/5">
                  <Image
                    src="/icon.png"
                    alt="Whizzly Lab: Engineering Studio Logo Mark"
                    width={32}
                    height={32}
                    className="h-7 w-7 object-contain"
                  />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">
                  Whizzly <span className="bg-gradient-to-r from-[#00F0FF] to-[#a855f7] bg-clip-text text-transparent">Lab</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed text-hero-sub/70 max-w-sm">
                AI and full-stack engineering studio building intelligent systems, real-time data pipelines, and production products that scale.
              </p>
              <div className="text-xs text-hero-sub/60 space-y-1">
                <p>Email: <a href={`mailto:${COMPANY_EMAIL}`} className="text-white hover:underline">{COMPANY_EMAIL}</a></p>
                <p>Phone: <a href={PHONE_URL} className="text-white hover:underline">{COMPANY_PHONE}</a></p>
                <p className="mt-1">Delivering globally across time zones</p>
              </div>
            </div>

            {/* Navigation Column */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Pages</h4>
              <ul className="mt-4 space-y-2 text-sm text-hero-sub/70">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li><Link href="/about" className="hover:text-white transition">About</Link></li>
                <li><Link href="/services" className="hover:text-white transition">Services</Link></li>
                <li><Link href="/work" className="hover:text-white transition">Work</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
                <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Services</h4>
              <ul className="mt-4 space-y-2 text-sm text-hero-sub/70">
                <li><Link href="/services/ai" className="hover:text-white transition">AI &amp; RAG</Link></li>
                <li><Link href="/services/machine-learning" className="hover:text-white transition">Machine Learning</Link></li>
                <li><Link href="/services/data-pipelines" className="hover:text-white transition">Data Pipelines</Link></li>
                <li><Link href="/services/web-development" className="hover:text-white transition">Web Development</Link></li>
                <li><Link href="/services/automation" className="hover:text-white transition">Automation</Link></li>
              </ul>
            </div>

            {/* Ecosystem & Socials */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Ecosystem</h4>
              <ul className="mt-4 space-y-2 text-sm text-hero-sub/70">
                <li><a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="hover:text-white transition">LinkedIn</a></li>
                <li><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-white transition">Instagram</a></li>
                <li><a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="hover:text-white transition">Facebook</a></li>
                <li><a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-white transition">GitHub</a></li>

                <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row text-xs text-hero-sub/50">
            <p>&copy; {new Date().getFullYear()} Whizzly Lab. All rights reserved.</p>
            <p>Designed and engineered for production excellence.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
