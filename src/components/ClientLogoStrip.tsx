"use client";

import { motion } from "framer-motion";

const CLIENTS = [
  { name: "Acuity HealthTech", industry: "Clinical Diagnostics · HIPAA RAG", ticker: "ACUITY" },
  { name: "Veloce Payments", industry: "Real-Time Ledger · 500k ev/s", ticker: "VELOCE" },
  { name: "OmniCart Commerce", industry: "Neural Search · YC W23", ticker: "OMNICART" },
  { name: "Nexura Telematics", industry: "Fleet Dispatch · IoT Streaming", ticker: "NEXURA" },
  { name: "Sentinel Cyber", industry: "Anomaly Defense · Sub-50ms", ticker: "SENTINEL" },
  { name: "Kinetix Bio", industry: "Genomics Pipeline · PySpark", ticker: "KINETIX" },
];

export default function ClientLogoStrip() {
  return (
    <div className="relative w-full overflow-hidden border-y border-white/5 bg-white/[0.01] py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 text-center mb-6">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400">
          Trusted By High-Throughput Engineering Teams &amp; Backed Startups
        </span>
      </div>

      <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center gap-12 sm:gap-20">
          {CLIENTS.concat(CLIENTS).map((client, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 transition-opacity duration-300 opacity-60 hover:opacity-100"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 font-mono text-xs font-bold text-cyan-300">
                {client.ticker.slice(0, 2)}
              </div>
              <div className="text-left">
                <div className="text-sm font-bold tracking-tight text-white font-mono">
                  {client.name}
                </div>
                <div className="text-[10px] text-slate-400 font-sans">
                  {client.industry}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
