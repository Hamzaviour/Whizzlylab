"use client";

import { motion } from "framer-motion";
import { Check, X, Shield, Zap, Clock, Users, Award } from "lucide-react";

const COMPARISON_DATA = [
  {
    dimension: "Speed to First Working Deployment",
    whizzly: "14 Days (Working Production Prototype)",
    freelancers: "Unpredictable (Often 8–12 weeks)",
    genericAgencies: "2–4 Months (Heavy discovery phase)",
    inHouse: "4–6 Months (Hiring + Onboarding)",
    highlight: true,
  },
  {
    dimension: "Direct Senior Engineering Access",
    whizzly: "Direct Slack/Discord with Lead Engineers",
    freelancers: "Single point of failure",
    genericAgencies: "Filtered through non-technical PMs",
    inHouse: "Yes, but costly to recruit",
  },
  {
    dimension: "Production RAG & Kafka Specialization",
    whizzly: "Deep Core Specialization (Proven at scale)",
    freelancers: "Rare full-stack + MLOps skillset",
    genericAgencies: "Generalist web/mobile developers",
    inHouse: "Requires $250k+/yr senior AI talent",
    highlight: true,
  },
  {
    dimension: "Direct Technical Leadership",
    whizzly: "Direct Lead Architect Access",
    freelancers: "Variable availability (Ghosting risk)",
    genericAgencies: "Filtered through non-technical PMs",
    inHouse: "Dependent on internal bandwidth",
  },
  {
    dimension: "Hallucination & Error Guardrails",
    whizzly: "0% Silent Failure Standard (Automated Evals)",
    freelancers: "Rarely implemented",
    genericAgencies: "Basic prompt wrappers",
    inHouse: "Custom engineering required",
    highlight: true,
  },
  {
    dimension: "IP Ownership & Model Privacy",
    whizzly: "100% Client-Owned Code & Private VPCs",
    freelancers: "Varied licensing terms",
    genericAgencies: "Often proprietary agency frameworks",
    inHouse: "100% Owned",
  },
];

export default function ComparisonMatrix() {
  return (
    <section className="relative px-4 py-20 sm:px-8 sm:py-28" id="comparison">
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] max-w-full rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.08)_0%,rgba(0,240,255,0.04)_50%,transparent_75%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300">
            <Zap className="h-3.5 w-3.5" />
            Competitive Differentiation
          </div>
          <h2
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
            style={{ fontFamily: "var(--font-display-primary), sans-serif" }}
          >
            Why High-Growth Teams Choose <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Whizzly Lab</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            How our dedicated AI &amp; data engineering sprints contrast with hiring in-house, generic agencies, and freelancers.
          </p>
        </div>

        {/* Comparison Table with 3D Glass Styling */}
        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#090912]/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <table className="w-full text-left text-sm border-collapse min-w-[720px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="p-5 font-semibold text-slate-400 text-xs uppercase tracking-wider">Evaluation Vector</th>
                <th className="p-5 font-bold text-cyan-300 bg-cyan-500/[0.08] border-x border-cyan-500/30">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                    Whizzly Lab Sprints
                  </div>
                </th>
                <th className="p-5 font-semibold text-slate-400 text-xs uppercase tracking-wider">Freelancers</th>
                <th className="p-5 font-semibold text-slate-400 text-xs uppercase tracking-wider">Generic Dev Agencies</th>
                <th className="p-5 font-semibold text-slate-400 text-xs uppercase tracking-wider">In-House Hiring</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {COMPARISON_DATA.map((row, idx) => (
                <tr
                  key={row.dimension}
                  className={`transition-colors hover:bg-white/[0.02] ${
                    row.highlight ? "bg-white/[0.01]" : ""
                  }`}
                >
                  <td className="p-5 font-medium text-white flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                    {row.dimension}
                  </td>
                  <td className="p-5 font-semibold text-cyan-200 bg-cyan-500/[0.04] border-x border-cyan-500/20">
                    <div className="flex items-center gap-2">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-cyan-300">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                      <span>{row.whizzly}</span>
                    </div>
                  </td>
                  <td className="p-5 text-slate-400">{row.freelancers}</td>
                  <td className="p-5 text-slate-400">{row.genericAgencies}</td>
                  <td className="p-5 text-slate-400">{row.inHouse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Micro proof bar under table */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-400" />
            <span>Zero Lock-in: You own 100% of git repos, weights, and infra manifests</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-cyan-400" />
            <span>Deployable sprint kickoffs within 48 business hours</span>
          </div>
          <a
            href="/schedule"
            className="text-cyan-400 font-semibold hover:underline flex items-center gap-1"
          >
            Review Available Engineering Sprints →
          </a>
        </div>
      </div>
    </section>
  );
}
