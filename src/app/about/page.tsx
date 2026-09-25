import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Zap, ShieldCheck, CheckCircle2, ChevronDown } from "lucide-react";
import PageNavbar from "@/components/PageNavbar";
import AuroraCTASection from "@/components/AuroraCTASection";
import Footer from "@/components/Footer";
import AnimatedFlowPaths from "@/components/AnimatedFlowPaths";
import OrbitTeamSection from "@/components/OrbitTeamSection";
import { BASE_URL, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Our AI & Engineering Studio",
  description:
    "Whizzly Lab is an elite AI engineering studio and full-stack software development collective. We build web development, workflow automation, RAG systems, SaaS products, apps, and AI integrations.",
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
  openGraph: {
    title: "About Our AI & Engineering Studio | Whizzly Lab",
    description:
      "Whizzly Lab is an elite AI engineering studio delivering web development, workflow automation, RAG systems, SaaS products, apps, and custom AI integration.",
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
    description: "AI engineering studio delivering web development, automation, RAG, SaaS products, and apps.",
    images: [ogImage("/og-image.png")],
  },
};

const PRINCIPLES = [
  {
    number: "01",
    title: "Production-First Architecture",
    description:
      "We design every system from day one to handle real production traffic, concurrency spikes, data drift, and rigorous compliance constraints.",
    tag: "Scalability",
  },
  {
    number: "02",
    title: "Observability & Guardrails",
    description:
      "Telemetry, alerting, and automated eval benchmarks are integrated directly into our AI pipelines, preventing regressions before end-users notice.",
    tag: "Reliability",
  },
  {
    number: "03",
    title: "Transparent & Agile Cadence",
    description:
      "Weekly deployed builds, transparent GitHub workflows, and crisp milestone deliverables with no ambiguity or bureaucratic layers.",
    tag: "Velocity",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    phase: "Discover",
    title: "Architecture & Data Audit",
    desc: "We analyze your problem, data pipelines, compliance boundaries (HIPAA/SOC2), and latency constraints to formulate a de-risked engineering blueprint.",
    deliverable: "Architecture Blueprint & Threat Model",
  },
  {
    number: "02",
    phase: "De-risk",
    title: "Algorithmic Engineering",
    desc: "Custom RAG vectors, Kafka stream topology, fine-tuned neural models, and automated accuracy benchmarks against baseline datasets.",
    deliverable: "Benchmarked Vector & Stream Engine",
  },
  {
    number: "03",
    phase: "Deploy",
    title: "Full-Stack Production Release",
    desc: "Hardened infrastructure on AWS/GCP, automated CI/CD pipelines, container orchestration, and sleek modern user interfaces.",
    deliverable: "Live Production Platform & Runbooks",
  },
];

const FAQS = [
  {
    q: "How does Whizzly Lab differ from traditional software agencies?",
    a: "We are an engineering studio, not a generalist agency. Our core team consists of senior ML researchers and distributed systems architects. We don't build throwaway prototypes—we engineer robust, scalable production platforms that integrate directly into your technical ecosystem.",
  },
  {
    q: "What technical stacks do you specialize in?",
    a: "We specialize in modern AI (PyTorch, LangChain, HuggingFace, OpenAI, Vector DBs), real-time data pipelines (Kafka, Redis, PostgreSQL), and full-stack web/mobile architectures (Next.js, React, TypeScript, Node.js, Docker, Kubernetes).",
  },
  {
    q: "What is your typical engagement model?",
    a: "We offer dedicated studio sprints for greenfield product builds and embedded engineering squads for scaling existing platforms. Every engagement includes direct access to tech leads, weekly production builds, and full IP ownership.",
  },
  {
    q: "How do you guarantee IP security and compliance?",
    a: "All code, models, and data pipelines are developed within your private cloud environments or isolated secure infrastructure. We sign mutual NDAs, enforce SOC2/HIPAA compliance patterns, and transfer 100% intellectual property ownership to you.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white font-sans overflow-x-hidden">
      <PageNavbar />

      {/* Top-Left Volumetric Spotlight Beam (Subtle Balanced Volumetric Light) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-36 w-[800px] sm:w-[950px] lg:w-[1100px] h-[1200px] origin-top-left -rotate-[32deg] z-0 overflow-hidden"
      >
        {/* Layer 1: Ambient Atmospheric Soft Glow Cone */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(165,180,252,0.42) 0%, rgba(129,140,248,0.25) 24%, rgba(99,102,241,0.11) 50%, rgba(79,70,229,0.025) 75%, transparent 100%)",
            filter: "blur(55px)",
            clipPath: "polygon(14% 0%, 64% 0%, 100% 100%, 0% 100%)",
          }}
        />
        {/* Layer 2: Core Volumetric Light Beam (Focused & Softly Luminous) */}
        <div
          className="absolute inset-0 w-full h-full mix-blend-screen"
          style={{
            background:
              "linear-gradient(180deg, rgba(238,242,255,0.49) 0%, rgba(199,210,254,0.35) 18%, rgba(129,140,248,0.19) 42%, rgba(99,102,241,0.07) 70%, transparent 100%)",
            filter: "blur(28px)",
            clipPath: "polygon(22% 0%, 54% 0%, 84% 100%, 8% 100%)",
          }}
        />
      </div>

      {/* Top-Left Spotlight Source Emitter Flare */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 sm:w-96 sm:h-96 rounded-full z-0 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(224,231,255,0.42) 0%, rgba(165,180,252,0.26) 30%, rgba(99,102,241,0.10) 60%, transparent 75%)",
        }}
      />

      {/* Giant Watermark Background Text: "COMPANY" */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-36 left-1/2 -translate-x-1/2 w-screen flex justify-center items-center select-none z-0"
      >
        <span className="text-[14vw] font-bold uppercase tracking-[0.24em] text-white/[0.035] leading-none font-sans whitespace-nowrap">
          COMPANY
        </span>
      </div>

      {/* ===================== HERO SECTION ===================== */}
      <section className="relative z-10 pt-20 sm:pt-28 pb-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-xs font-medium text-indigo-300 mb-8 backdrop-blur-md">
            <span>Engineering Studio</span>
            <span className="text-white/40">·</span>
            <span>Production First</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.12]">
            Engineering Intelligence. <br />
            Building Systems <span className="italic font-light text-white">That Matter</span>.
          </h1>

          <p className="mt-8 text-base sm:text-lg lg:text-xl text-gray-300/85 font-light leading-relaxed max-w-2xl">
            Whizzly Lab is an elite AI engineering studio and full-stack software development collective. We build web development, workflow automation, RAG systems, SaaS products, mobile apps, and custom AI integrations for high-growth ventures and global enterprises.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/schedule"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-sm font-medium text-white hover:border-white transition-all duration-300"
            >
              <span>Work With Us</span>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:scale-110">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </Link>

            <Link
              href="/careers"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-full border border-indigo-400/30 bg-indigo-500/10 backdrop-blur-md text-sm font-medium text-indigo-200 hover:text-white hover:border-indigo-400/60 hover:bg-indigo-500/20 transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
            >
              <span>Explore Careers</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/[0.03] text-sm font-medium text-gray-300 hover:text-white hover:border-white/20 transition-all duration-300"
            >
              <span>View Case Studies</span>
            </Link>
          </div>
        </div>

      </section>

      {/* ===================== OUR PRINCIPLES ===================== */}
      <section className="relative z-10 py-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-t border-white/[0.06]">
        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white font-sans">
            Our Principles
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400 font-light max-w-xl">
            The foundational engineering standards that govern how we build, validate, and scale digital products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRINCIPLES.map((principle, idx) => (
            <div
              key={idx}
              className="relative p-8 rounded-[28px] bg-[#090b12] border border-white/[0.08] hover:border-indigo-400/30 hover:bg-[#0c0f18] transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-4xl font-medium text-white/90 font-sans tracking-tight">
                    {principle.number}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-white/10 text-indigo-300">
                    {principle.tag}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight mb-4 font-sans">
                  {principle.title}
                </h3>

                <p className="text-sm text-gray-400 font-light leading-relaxed">
                  {principle.description}
                </p>
              </div>

              {/* Signature Antimatter Diagonal Dot Matrix */}
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-4 right-4 w-24 h-24 opacity-20 group-hover:opacity-40 transition-opacity"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255, 255, 255, 0.75) 1.2px, transparent 1.2px)",
                  backgroundSize: "8px 8px",
                  maskImage: "linear-gradient(to top left, black 25%, transparent 75%)",
                  WebkitMaskImage: "linear-gradient(to top left, black 25%, transparent 75%)",
                }}
              />
            </div>
          ))}
        </div>

        {/* ===================== ANIMATED FLOW PATHS ===================== */}
        <div className="mt-16 sm:mt-20">
          <AnimatedFlowPaths />
        </div>
      </section>

      {/* ===================== OUR PROCESS ===================== */}
      <section className="relative z-10 py-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-t border-white/[0.06]">
        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white font-sans">
            How We Build
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400 font-light max-w-xl">
            A de-risked, high-velocity methodology that moves from architectural clarity to production deployment in weeks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="relative p-8 rounded-[28px] bg-[#090b12] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-3">
                  Phase {step.number} · {step.phase}
                </div>

                <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight mb-4 font-sans">
                  {step.title}
                </h3>

                <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
                  {step.desc}
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 mt-auto">
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500 block mb-1">
                  Deliverable
                </span>
                <span className="text-xs font-medium text-indigo-200">
                  {step.deliverable}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== ORBIT TEAM SECTION ===================== */}
      <OrbitTeamSection />

      {/* ===================== CAREERS CALLOUT BANNER ===================== */}
      <section className="relative z-10 py-10 px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto">
        <div className="relative p-8 sm:p-10 rounded-[32px] bg-gradient-to-br from-[#10121d] via-[#090b12] to-[#0d101d] border border-indigo-400/25 overflow-hidden shadow-[0_20px_60px_rgba(30,35,80,0.35)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.25)_0%,transparent_70%)] blur-3xl"
          />
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/30 bg-indigo-500/10 text-xs font-mono uppercase tracking-wider text-indigo-300 mb-3">
              We&apos;re Hiring
            </div>
            <h3 className="text-2xl sm:text-3xl font-normal text-white tracking-tight font-sans">
              Want to join our engineering collective?
            </h3>
            <p className="mt-2 text-sm text-gray-300/80 font-light leading-relaxed">
              We are looking for autonomous systems architects, ML researchers, and full-stack builders who take pride in their craft.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              href="/careers"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-black text-sm font-medium hover:bg-indigo-300 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
            >
              <span>Explore Open Roles</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== FAQ SECTION ===================== */}
      <section className="relative z-10 pt-4 sm:pt-6 pb-20 px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto border-t border-white/[0.06]">
        <div className="mb-14 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white font-sans">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400 font-light">
            Everything you need to know about partnering with Whizzly Lab.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <details
              key={idx}
              className="group p-6 sm:p-7 rounded-[22px] bg-[#090b12] border border-white/[0.08] transition-all duration-200 open:border-indigo-400/30"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none text-base sm:text-lg font-medium text-white font-sans">
                <span>{faq.q}</span>
                <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform duration-200" />
              </summary>
              <p className="mt-4 text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Unified Antimatter Aurora CTA & Live Clock Footer */}
      <AuroraCTASection />
      <Footer />
    </main>
  );
}
