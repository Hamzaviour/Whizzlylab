"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Clock, Tag, Cpu, Database, ShieldAlert } from "lucide-react";
import Link from "next/link";

const ARTICLES = [
  {
    slug: "production-rag-latency-optimization",
    category: "Architecture Deep-Dive",
    readTime: "7 min read",
    title: "Designing Sub-100ms Multi-Stage RAG: Hybrid BM25 & Vector Search in Production",
    summary:
      "A technical walkthrough of how we eliminated latency bottlenecks in multi-tenant RAG pipelines using Milvus HNSW indexing, reciprocal rank fusion (RRF), and streaming token delivery.",
    badge: "AI Engineering",
    icon: Cpu,
    date: "Sept 2026",
  },
  {
    slug: "kafka-vs-spark-realtime-ai-pipelines",
    category: "Data Streaming",
    readTime: "9 min read",
    title: "Kafka vs. Spark Structured Streaming: Architecting Real-Time LLM Observability",
    summary:
      "Why traditional batch pipelines fail for autonomous agent systems, and how to structure Apache Kafka event buses with PySpark micro-batches to catch silent failures and data drifts instantly.",
    badge: "Data Pipelines",
    icon: Database,
    date: "Sept 2026",
  },
  {
    slug: "deterministic-guardrails-preventing-llm-hallucinations",
    category: "Enterprise Security",
    readTime: "6 min read",
    title: "Deterministic Guardrails: Preventing Hallucinations in High-Stakes FinTech & Healthcare AI",
    summary:
      "How to implement dual-layer guardrails combining NeMo semantic boundaries and JSON schema validators to achieve 0% silent failures on customer-facing agents.",
    badge: "Governance & MLOps",
    icon: ShieldAlert,
    date: "Sept 2026",
  },
];

export default function InsightsSection() {
  return (
    <section className="relative px-4 py-20 sm:px-8 sm:py-28" id="insights">
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300">
              <BookOpen className="h-3.5 w-3.5" />
              Engineering Insights &amp; Technical Playbooks
            </div>
            <h2
              className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-white"
              style={{ fontFamily: "var(--font-display-primary), sans-serif" }}
            >
              How We Build: <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Architecture Breakdowns</span>
            </h2>
            <p className="mt-2 text-base text-slate-300 max-w-2xl">
              Real-world engineering guides, benchmark evaluations, and production playbooks written by Whizzly Lab's lead AI engineers.
            </p>
          </div>

          <Link
            href="/schedule?topic=insights"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition shrink-0"
          >
            Request Custom Architecture Session →
          </Link>
        </div>

        {/* Article Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {ARTICLES.map((article, idx) => {
            const Icon = article.icon;
            return (
              <div
                key={article.slug}
                className="group liquid-glass relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#090914]/80 p-6 transition-all duration-300 hover:border-cyan-400/40 hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-cyan-300 font-mono">
                      <Tag className="h-3 w-3" />
                      {article.badge}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3
                    className="text-lg font-bold text-white group-hover:text-cyan-200 transition-colors leading-snug tracking-tight"
                    style={{ fontFamily: "var(--font-display-primary), sans-serif" }}
                  >
                    {article.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">{article.date}</span>
                  <Link
                    href={`/services?topic=${article.badge.toLowerCase().replace(/\s+/g, "-")}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform"
                  >
                    Read Playbook
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
