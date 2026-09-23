"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Layers } from "lucide-react";
import Reveal from "./Reveal";

export default function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="relative w-full px-4 py-20 sm:px-8 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <div className="mb-16 text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-cyan-400/80 uppercase">
              Why Whizzly Lab
            </p>
            <h2
              className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl font-heading"
            >
              Engineered for velocity and longevity
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-hero-sub/80 text-base">
              We turn research prototypes and raw machine learning concepts into resilient production software your team can actually run and scale.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
          <Reveal delay={0.05}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="liquid-glass relative flex h-full min-h-[420px] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 p-8"
            >
              <div className="pointer-events-none absolute top-0 -right-20 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="mt-8 text-2xl font-semibold leading-snug text-white font-heading">
                  Preemptive Risk &amp; Anomaly Detection
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-hero-sub/75">
                  Whizzly Lab embeds observability into every pipeline. We monitor data drifts, latency anomalies, and model hallucination rates before they hit production users.
                </p>
              </div>
              <div className="border-t border-white/10 pt-4 text-xs font-medium text-cyan-300/80">
                0% Silent Pipeline Failures
              </div>
            </motion.div>
          </Reveal>

          <Reveal delay={0.12}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="liquid-glass relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-3xl border border-white/10"
            >
              <div className="relative h-[240px] w-full overflow-hidden">
                <video
                  className="block h-full w-full object-cover transition duration-700 hover:scale-105"
                  autoPlay
                  loop
                  muted
                  playsInline
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260421_072701_f6a01abb-eb30-4559-9d6e-774362defbc3.mp4"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05010f] via-transparent to-transparent" />
              </div>
              <div className="flex flex-1 flex-col justify-between p-8">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
                    <Cpu className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold leading-snug text-white font-heading">
                    Domain Rigor &amp; Sector Awareness
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-hero-sub/75">
                    From HIPAA-conscious healthcare systems to fintech fraud streams and enterprise e-commerce architectures.
                  </p>
                </div>
              </div>
            </motion.div>
          </Reveal>

          <Reveal delay={0.18}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="liquid-glass relative flex h-full min-h-[420px] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 p-8"
            >
              <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-purple-500/15 blur-3xl" />
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-500/10 text-purple-400">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="mt-8 text-2xl font-semibold leading-snug text-white font-heading">
                  Production AI That Actually Ships
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-hero-sub/75">
                  We don&apos;t leave you with Jupyter notebooks. We deliver deployed APIs, containerized microservices, interactive dashboards, and CI/CD pipelines.
                </p>
              </div>
              <div className="border-t border-white/10 pt-4 text-xs font-medium text-purple-300/80">
                End-to-End Delivery &amp; SLA
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
