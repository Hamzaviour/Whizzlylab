"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartPulse,
  TrendingUp,
  ShoppingBag,
  Truck,
  Code2,
  ShieldCheck,
  Zap,
  ArrowRight,
  Database,
  Lock,
} from "lucide-react";
import Link from "next/link";

interface IndustryTab {
  id: string;
  name: string;
  badge: string;
  icon: typeof HeartPulse;
  title: string;
  headline: string;
  description: string;
  painPoints: string[];
  metrics: { label: string; value: string }[];
  techStack: string[];
  roleTarget: string;
  href: string;
}

const INDUSTRIES: IndustryTab[] = [
  {
    id: "healthcare",
    name: "Healthcare & MedTech",
    badge: "HIPAA Compliant",
    icon: HeartPulse,
    title: "Healthcare & Life Sciences",
    headline: "Zero-Data-Leakage RAG & Clinical Workflow Automation",
    description:
      "Empower clinicians and diagnostic teams with sub-100ms multi-stage RAG systems, de-identified patient data pipelines, and strict hallucination guardrails certified against HIPAA requirements.",
    painPoints: [
      "Slow retrieval across thousands of EHR records and PDF medical guidelines",
      "Severe compliance penalties for unencrypted or leaked patient health information (PHI)",
      "Clinical risk from LLM hallucination or ambiguous diagnostic references",
    ],
    metrics: [
      { label: "Retrieval Latency", value: "<85ms" },
      { label: "Zero PHI Leakage", value: "100%" },
      { label: "Hours Saved / Clinician", value: "12h/wk" },
    ],
    techStack: ["Private VPC", "Milvus / Qdrant", "NeMo Guardrails", "FastAPI", "FHIR API"],
    roleTarget: "Chief Medical Officers, HealthTech CTOs & Compliance Leads",
    href: "/schedule?industry=healthcare",
  },
  {
    id: "fintech",
    name: "FinTech & Payments",
    badge: "Sub-50ms Latency",
    icon: TrendingUp,
    title: "FinTech, Trading & Payments",
    headline: "Real-Time Event Streams & Anomaly Detection at Scale",
    description:
      "Handle millions of transaction events per second with distributed Apache Kafka and Spark pipelines. Detect fraudulent transactions, run KYC workflows, and power algorithmic analytics in real time.",
    painPoints: [
      "Silent stream failures during high market volatility or payment surges",
      "Expensive batch processing delays causing hours of lag in ledger reconciliation",
      "Regulatory scrutiny demanding audit-logged deterministic decisioning",
    ],
    metrics: [
      { label: "Pipeline Uptime SLA", value: "99.99%" },
      { label: "Anomaly Detection", value: "<40ms" },
      { label: "Throughput Capacity", value: "500k+ ev/s" },
    ],
    techStack: ["Apache Kafka", "Apache Spark", "PySpark", "Redis Cluster", "ClickHouse"],
    roleTarget: "FinTech CTOs, Heads of Risk & Quant Engineering Leads",
    href: "/schedule?industry=fintech",
  },
  {
    id: "ecommerce",
    name: "E-Commerce & Retail",
    badge: "High Conversion",
    icon: ShoppingBag,
    title: "E-Commerce & High-Volume Commerce",
    headline: "Autonomous Agentic Search & Dynamic Cart Personalization",
    description:
      "Convert browsing traffic with semantic neural product search, autonomous cart-recovery agents, dynamic real-time inventory pricing, and automated multichannel customer workflows.",
    painPoints: [
      "Keyword search returning empty or irrelevant results for natural language queries",
      "High cart abandonment rates due to generic follow-ups and unhelpful support bots",
      "Manual product catalog tagging and catalog enrichment bottlenecks",
    ],
    metrics: [
      { label: "Catalog Search Latency", value: "45ms" },
      { label: "Checkout Conversion Lift", value: "+28%" },
      { label: "Automated Support Resolution", value: "72%" },
    ],
    techStack: ["Pinecone", "Next.js 16", "OpenAI / Anthropic API", "Stripe", "PostgreSQL"],
    roleTarget: "VP of E-Commerce, Retail Founders & Growth Directors",
    href: "/schedule?industry=ecommerce",
  },
  {
    id: "logistics",
    name: "Logistics & Fleet",
    badge: "IoT Telemetry",
    icon: Truck,
    title: "Logistics, Supply Chain & Telematics",
    headline: "Predictive Dispatch & Sensor Telemetry Streaming",
    description:
      "Stream millions of IoT GPS coordinates, sensor telemetry, and warehouse status signals to automate fleet dispatching, cut deadhead mileage, and preempt mechanical breakdowns.",
    painPoints: [
      "Unoptimized multi-stop route dispatch causing excess fuel waste and delayed SLAs",
      "Disconnected legacy telematics databases with no real-time event aggregation",
      "Manual driver allocation and lack of live predictive ETA updates",
    ],
    metrics: [
      { label: "Fleet Fuel Cost Drop", value: "-18%" },
      { label: "Dispatch Automation", value: "94%" },
      { label: "ETA Accuracy Window", value: "±3 min" },
    ],
    techStack: ["Kafka Streams", "FastAPI", "PostGIS", "Docker Swarm", "TimescaleDB"],
    roleTarget: "Chief Operating Officers & Logistics Fleet Directors",
    href: "/schedule?industry=logistics",
  },
  {
    id: "founders",
    name: "CTOs & Tech Founders",
    badge: "14-Day Delivery",
    icon: Code2,
    title: "Technical Founders & CTO Engineering Sprints",
    headline: "From Zero to Production-Grade Architecture in 14 Days",
    description:
      "Stop wasting runway on amateur prototypes or months-long hiring delays. We drop in as your dedicated senior engineering studio, shipping clean, typed codebases, verified infrastructure, and automated CI/CD.",
    painPoints: [
      "Stuck with unstable investor demo code that crashes under real user load",
      "Struggling to hire elite senior ML & Kafka engineers without burning $250k+/hire",
      "Overwhelmed by messy technical debt and lack of proper deployment guardrails",
    ],
    metrics: [
      { label: "Production Sprint Time", value: "14 Days" },
      { label: "Full Code Ownership", value: "100%" },
      { label: "Engineering Review", value: "Direct SLA" },
    ],
    techStack: ["Next.js / TypeScript", "Tailwind CSS", "FastAPI", "Python", "Kubernetes"],
    roleTarget: "Seed-to-Series-B Founders, CTOs & Engineering Managers",
    href: "/schedule?role=founder",
  },
];

export default function IndustriesSection() {
  const [activeTab, setActiveTab] = useState<string>("healthcare");
  const selected = INDUSTRIES.find((i) => i.id === activeTab) || INDUSTRIES[0];

  return (
    <section className="relative px-4 py-20 sm:px-8 sm:py-28" id="industries">
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-purple-500/10 blur-[100px]"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-purple-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            Specialized Industry Solutions
          </div>
          <h2
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
            style={{ fontFamily: "var(--font-display-primary), sans-serif" }}
          >
            Engineering Built For Your <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Exact Industry Stakes</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Tailored engineering blueprints for high-compliance healthcare, low-latency fintech, e-commerce, and fast-moving technical founders.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {INDUSTRIES.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-purple-500/20 text-white border border-cyan-400/50 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                    : "bg-white/[0.03] text-slate-400 border border-white/10 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Active Industry Card Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="liquid-glass-strong relative overflow-hidden rounded-3xl border border-white/15 bg-[#090912]/80 p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
          >
            <div className="grid gap-10 lg:grid-cols-12 items-start">
              {/* Left Column: Solution Detail */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-300">
                  <Zap className="h-3 w-3" />
                  {selected.badge}
                </div>

                <h3
                  className="mt-4 text-2xl sm:text-3xl font-bold text-white tracking-tight"
                  style={{ fontFamily: "var(--font-display-primary), sans-serif" }}
                >
                  {selected.headline}
                </h3>

                <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300">
                  {selected.description}
                </p>

                {/* Specific Pains Resolved */}
                <div className="mt-6 space-y-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Pains We Eliminate:
                  </span>
                  {selected.painPoints.map((pain, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-400">
                        ✕
                      </div>
                      <span>{pain}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
                    Architectural Stack:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selected.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Outcomes & Quick Action */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-4">
                    Target Role Profile:
                  </span>
                  <p className="text-sm font-medium text-white mb-6 bg-white/[0.04] p-3 rounded-xl border border-white/5">
                    🎯 {selected.roleTarget}
                  </p>

                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-4">
                    Proven Delivery Benchmarks:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                    {selected.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-cyan-500/20 bg-cyan-500/[0.05] p-3.5 text-center"
                      >
                        <div className="text-xl sm:text-2xl font-bold text-cyan-300 font-mono">
                          {m.value}
                        </div>
                        <div className="mt-1 text-[11px] leading-tight text-slate-400">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <Link
                    href={selected.href}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-6 py-3.5 text-sm font-bold text-black shadow-[0_0_25px_rgba(0,240,255,0.3)] transition hover:opacity-95"
                  >
                    Discuss {selected.name} Sprint
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <p className="mt-2 text-center text-[11px] text-slate-400">
                    Direct review with senior engineering leads · Zero sales pressure
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
