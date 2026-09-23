import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Zap,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Globe2,
  Clock,
  ExternalLink,
} from "lucide-react";
import PageNavbar from "@/components/PageNavbar";
import CtaFooter from "@/components/CtaFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import TakeawaysBox from "@/components/TakeawaysBox";
import { BASE_URL, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Our AI & Engineering Studio",
  description:
    "Whizzly Lab is an elite AI, ML, and full-stack engineering studio. We build intelligent agent systems, real-time data streams, and production-grade software.",
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
  openGraph: {
    title: "About Our AI & Engineering Studio | Whizzly Lab",
    description:
      "Whizzly Lab is an elite AI, ML, and full-stack engineering studio building production-grade software.",
    url: `${BASE_URL}/about`,
    images: [
      {
        url: ogImage("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "About Whizzly Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Our AI & Engineering Studio | Whizzly Lab",
    description: "AI, ML & full-stack engineering studio building intelligent systems that ship.",
    images: [ogImage("/og-image.png")],
  },
};

const STATS = [
  {
    icon: Cpu,
    stat: "100%",
    label: "Production-Grade",
    desc: "Zero prototype vaporware: real systems with high throughput and telemetry.",
  },
  {
    icon: Globe2,
    stat: "4+",
    label: "Continents Served",
    desc: "Active client systems across North America, Europe, the Middle East, and Asia.",
  },
  {
    icon: Clock,
    stat: "<24h",
    label: "Response SLA",
    desc: "Direct communication with engineering leads across all active time zones.",
  },
  {
    icon: Layers,
    stat: "End-to-End",
    label: "Stack Delivery",
    desc: "From algorithmic RAG & Kafka pipelines to sleek React/Next.js interfaces.",
  },
];

const PRINCIPLES = [
  {
    icon: Zap,
    title: "Production-First Architecture",
    description:
      "We design every system from the start to handle production traffic, concurrency spikes, data drift, and stringent security constraints.",
    tag: "High Velocity",
  },
  {
    icon: ShieldCheck,
    title: "Observability & Anomaly Guard",
    description:
      "Telemetry, alerting, and drift detection are built directly into our AI pipelines, ensuring zero silent failures before end-users notice.",
    tag: "Resilient",
  },
  {
    icon: CheckCircle2,
    title: "Transparent, Agile Delivery",
    description:
      "Weekly deployed demo builds, transparent GitHub/Slack integration, and crisp milestone deliverables with no ambiguity.",
    tag: "Full Visibility",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    phase: "Discover",
    title: "01 · Discover & Architecture Audit",
    desc: "We analyze your problem, data pipelines, compliance boundaries (HIPAA/SOC2), and latency constraints to formulate a de-risked blueprint.",
    output: "Architecture Blueprint & Threat Model",
  },
  {
    number: "02",
    phase: "De-risk",
    title: "02 · De-risk & Algorithmic Engineering",
    desc: "Custom RAG vectors, PySpark/Kafka stream topology, fine-tuned neural models, and automated accuracy benchmarks against baseline datasets.",
    output: "Benchmarked Vector & Stream Engine",
  },
  {
    number: "03",
    phase: "Deploy",
    title: "03 · Deploy & Full-Stack Integration",
    desc: "Next.js interfaces, secure REST/gRPC API layers, containerized cloud orchestration, and weekly deployed demo builds on staging.",
    output: "Live Weekly Deployed Environments",
  },
  {
    number: "04",
    phase: "Defend",
    title: "04 · Defend & Continuous Observability",
    desc: "Deterministic guardrails (0% silent failures), continuous drift detection, sub-100ms latency SLAs, and complete documentation handover.",
    output: "Production SLA & Runbook Handover",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-transparent text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "@id": `${BASE_URL}/about#webpage`,
              url: `${BASE_URL}/about`,
              name: "About Whizzly Lab: AI, ML & Full-Stack Engineering Studio",
              description:
                "Whizzly Lab is an AI, machine learning, and full-stack engineering studio. We engineer intelligent software systems that ship and scale.",
              isPartOf: {
                "@id": `${BASE_URL}/#website`,
              },
              about: {
                "@id": `${BASE_URL}/#organization`,
              },
              mainEntity: {
                "@id": `${BASE_URL}/#organization`,
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What services does Whizzly Lab offer?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We offer AI engineering, machine learning, RAG multi-agent pipelines, real-time data pipelines (Kafka/Spark), full-stack web platforms, automation, computer vision, and custom software systems, all production-grade and shipped to global clients.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "How long does a typical project take?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Project timelines vary by scope. A targeted feature or pipeline takes 2–4 weeks, an end-to-end AI system 4–8 weeks, and a full enterprise SaaS platform 2–4 months. We provide a detailed architectural roadmap after the discovery call.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "Do you sign NDAs before discussing projects?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. We sign mutual NDAs before any sensitive project discussions. Your intellectual property, proprietary algorithms, and datasets remain 100% confidential and secure.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "What is your response time and communication model?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We commit to a sub-24-hour response SLA across all global time zones. For active sprint delivery, we integrate directly into your preferred tools (Slack, Discord, GitHub, Jira) with weekly live demos.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "Can you augment or collaborate with our existing in-house team?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. We operate both as a standalone delivery partner and as specialized engineering augmentation. We embed seamlessly into your CI/CD pipelines, code reviews, and sprint planning.",
                  },
                },
              ],
            },
          ]),
        }}
      />
      <PageNavbar />

      {/* Hero Header Section */}
      <section className="relative overflow-hidden px-4 pt-12 pb-20 sm:px-8 sm:pt-20 sm:pb-28">
        <div className="pointer-events-none absolute top-20 right-0 h-[500px] w-[500px] rounded-full bg-[#00F0FF]/15 blur-3xl" />
        <div className="pointer-events-none absolute top-80 -left-40 h-[500px] w-[500px] rounded-full bg-[#6366f1]/15 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "About" },
            ]}
          />

          <div className="mt-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span>Engineering Studio &amp; Systems Team</span>
            </div>
            
            <h1
              className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl leading-[1.05]"
              style={{ fontFamily: "var(--font-display-primary), sans-serif" }}
            >
              We engineer intelligent software systems that{" "}
              <span className="bg-gradient-to-r from-[#00F0FF] via-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
                ship and scale
              </span>
              .
            </h1>

            <p className="mt-6 max-w-3xl text-lg sm:text-xl leading-relaxed text-hero-sub/85">
              Whizzly Lab is an AI, machine learning, and full stack engineering studio. We turn prototypes into production software, specializing in autonomous RAG agents, AI automation, web development, digital marketing, and full stack engineering products.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/schedule"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#00f0ff] px-8 py-3.5 text-sm font-semibold text-black shadow-[0_0_25px_rgba(0,240,255,0.35)] transition-all hover:opacity-95"
              >
                Book a Consult →
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/10"
              >
                Explore Shipped Work
              </Link>
            </div>

            {/* Key Takeaways Box for Fast Extraction & LLMs */}
            <div className="mt-10">
              <TakeawaysBox
                title="Whizzly Lab Core Engineering Standards"
                takeaways={[
                  "14-Day working production prototypes on dedicated engineering sprints",
                  "Direct Slack/Discord access to senior AI systems architects",
                  "0% Silent Pipeline Failures with automated hallucination guardrails",
                  "100% Client-Owned IP, private VPC deployments & zero data leakage",
                ]}
              />
            </div>
          </div>

          {/* Stats & Capability Highlights */}
          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="liquid-glass relative flex flex-col justify-between rounded-3xl border border-white/10 p-7 transition-all duration-300 hover:border-white/25 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="mt-6 text-3xl font-bold tracking-tight text-white font-heading">
                      {item.stat}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-cyan-300">
                      {item.label}
                    </p>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-hero-sub/70 border-t border-white/10 pt-3">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Founder Spotlight & Studio Mission */}
          <div className="mt-28 liquid-glass rounded-3xl border border-white/10 p-8 sm:p-12 lg:p-16">
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/15 bg-black/40 lg:col-span-5 flex items-center justify-center p-8">
                <Image
                  src="/transparent-logo.png"
                  alt="Whizzly Lab AI Engineering Studio Logo"
                  width={360}
                  height={360}
                  className="object-contain drop-shadow-[0_0_35px_rgba(0,240,255,0.3)]"
                  priority
                />
              </div>

              <div className="space-y-6 lg:col-span-7">
                <span className="text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase">
                  Leadership &amp; Origins
                </span>
                <h2
                  className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading"
                >
                  Built by engineers with a bias for shipping
                </h2>
                <p className="text-base leading-relaxed text-hero-sub/85">
                  Whizzly Lab brings together specialized full-stack developers, ML engineers, and systems architects who treat every project like a scalable product.
                </p>
                <p className="text-base leading-relaxed text-hero-sub/80">
                  Our portfolio includes mission-critical architectures such as{" "}
                  <strong className="text-white">EchoSense</strong> (real-time crisis NLP streaming on Kafka &amp; Spark),{" "}
                  <strong className="text-white">CureCMS</strong> (HIPAA-conscious healthcare revenue cycle automation),{" "}
                  <strong className="text-white">XecureAI</strong> (AI governance &amp; cybersecurity platform), and{" "}
                  <strong className="text-white">Al-Deewan Collection</strong> (fashion e-commerce), plus more.
                </p>
              </div>
            </div>
          </div>

          {/* Core Engineering Principles */}
          <div className="mt-28">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-semibold tracking-[0.2em] text-cyan-400/80 uppercase">
                Our Engineering Philosophy
              </span>
              <h2
                className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl font-heading"
              >
                Principles that guide every deployment
              </h2>
              <p className="mt-4 text-base text-hero-sub/75">
                We believe exceptional software is defined by stability under pressure, clear architecture, and measurable business ROI.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {PRINCIPLES.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="liquid-glass relative flex flex-col justify-between rounded-3xl border border-white/10 p-8 transition-all duration-300 hover:border-white/25 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold text-hero-sub/70">
                          {p.tag}
                        </span>
                      </div>
                      <h3 className="mt-6 text-xl font-bold text-white font-heading">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-hero-sub/80">
                        {p.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* The Whizzly 4-D Velocity Engine Methodology */}
          <div className="mt-28" id="methodology">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-semibold tracking-[0.2em] text-cyan-400/80 uppercase">
                Proprietary Delivery Framework
              </span>
              <h2
                className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
                style={{ fontFamily: "var(--font-display-primary), sans-serif" }}
              >
                The Whizzly 4-D Velocity Engine
              </h2>
              <p className="mt-4 text-base text-hero-sub/75 max-w-2xl mx-auto">
                Our battle-tested 4-phase framework engineered to eliminate prototype risk and transition complex AI &amp; data streaming architectures into reliable production in weeks.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS_STEPS.map((step) => (
                <div
                  key={step.number}
                  className="liquid-glass relative flex flex-col justify-between rounded-3xl border border-white/10 p-7 transition hover:border-cyan-400/30 hover:shadow-[0_10px_30px_rgba(0,240,255,0.15)]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-3xl font-bold text-cyan-400/50">
                        {step.number}
                      </span>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                        {step.phase}
                      </span>
                    </div>
                    <h3 className="mt-4 text-base font-bold text-white tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-hero-sub/80">
                      {step.desc}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-xs text-emerald-400 font-medium border-t border-white/10 pt-3">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>{step.output}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Photo & Culture Section */}
          <div className="mt-28 grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6 order-2 lg:order-1">
              <span className="text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase">
                The Collective
              </span>
              <h2
                className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading"
              >
                The Team Behind The Build
              </h2>
              <p className="text-base leading-relaxed text-hero-sub/80">
                Whizzly Lab operates as a high-density team of engineers. We don&apos;t pass you off to account managers: you collaborate directly with the software architects and ML practitioners writing your code.
              </p>
              <p className="text-base leading-relaxed text-hero-sub/80">
                Working smoothly across US, European, and Asian time zones, we bring certainty to complex algorithmic problems and speed to ambitious delivery roadmaps.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/services"
                  className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  View All Services
                </Link>
                <Link
                  href="/schedule"
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  Schedule an Intro Call
                </Link>
              </div>
            </div>

            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.6)] order-1 lg:order-2 bg-gradient-to-br from-indigo-950/80 via-[#0d0520] to-cyan-950/60 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(99,102,241,0.18)_0%,transparent_70%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,rgba(6,182,212,0.12)_0%,transparent_60%)]" />
              <div className="relative z-10 flex flex-col items-center gap-4 p-8 text-center">
                <div className="flex items-center gap-3">
                  {["AI","ML","Cloud","Kafka","RAG"].map((tag) => (
                    <span key={tag} className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold text-cyan-300">{tag}</span>
                  ))}
                </div>
                <p className="text-2xl font-bold text-white font-heading">Global Engineering Collective</p>
                <p className="text-sm text-hero-sub/70 max-w-xs">Specialized engineers across AI, ML, and full stack building systems that scale.</p>
              </div>
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-[#05010f]/80 p-3 backdrop-blur-md text-xs text-hero-sub/80 flex items-center justify-between">
                <span>Dedicated remote engineering teams</span>
                <span className="text-cyan-300">Global Delivery</span>
              </div>
            </div>
          </div>

          {/* EEAT Engineering Credentials & Trust Badges */}
          <div className="mt-28 liquid-glass rounded-3xl border border-white/10 p-8 sm:p-12 bg-white/[0.01]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 pb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400">
                  Experience, Expertise, Authoritativeness &amp; Trust (E-E-A-T)
                </span>
                <h3
                  className="mt-2 text-2xl font-bold text-white tracking-tight"
                  style={{ fontFamily: "var(--font-display-primary), sans-serif" }}
                >
                  Verified Engineering Pedigree
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-cyan-300">
                <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1">
                  50+ Production Deployments
                </span>
                <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-purple-300">
                  10+ Years Cloud Experience
                </span>
              </div>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-3 text-xs sm:text-sm text-hero-sub/80">
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                <h4 className="font-semibold text-white mb-1.5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />
                  Deep Systems Architecture
                </h4>
                <p className="text-xs leading-relaxed text-slate-300">
                  Engineered distributed microservices, low-latency streaming topologies, and fault-tolerant Redis/Kafka clusters handling over 500,000 events/second in live production.
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                <h4 className="font-semibold text-white mb-1.5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-400" />
                  Neural &amp; RAG Specialization
                </h4>
                <p className="text-xs leading-relaxed text-slate-300">
                  Specialized in vector embeddings, reciprocal rank fusion (RRF), semantic caching, and custom LLM evaluation harnesses with strict zero-hallucination standards.
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                <h4 className="font-semibold text-white mb-1.5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Security &amp; Compliance Standards
                </h4>
                <p className="text-xs leading-relaxed text-slate-300">
                  Architectures designed for zero data leakage, HIPAA readiness, automated threat modeling, and SOC2-aligned continuous audit trails.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive FAQ Section */}
          <FAQSection />
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}
