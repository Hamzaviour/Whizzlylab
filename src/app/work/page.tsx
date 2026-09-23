import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import PageNavbar from "@/components/PageNavbar";
import CtaFooter from "@/components/CtaFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrustBadges from "@/components/TrustBadges";
import { BASE_URL, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projects & Production Builds",
  description:
    "Explore Whizzly Lab's portfolio of production-grade case studies and client projects: AI systems, real-time pipelines, healthcare automation, cybersecurity platforms, e-commerce, and more.",
  alternates: {
    canonical: `${BASE_URL}/work`,
  },
  openGraph: {
    title: "Projects & Production Builds | Whizzly Lab",
    description:
      "Explore Whizzly Lab's portfolio of production-grade projects: AI, ML, cybersecurity, e-commerce, EdTech, and enterprise software.",
    url: `${BASE_URL}/work`,
    images: [
      {
        url: ogImage("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Whizzly Lab Projects & Work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects & Production Builds | Whizzly Lab",
    description:
      "Production-grade shipped systems by Whizzly Lab: AI, cybersecurity, healthcare, e-commerce, and more.",
    images: [ogImage("/og-image.png")],
  },
};

interface ProjectItem {
  id: string;
  category: "Websites I Built" | "ML & AI Projects";
  projectNumber?: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  live?: string | null;
  liveLabel?: string;
  github?: string | null;
}

const websiteProjects: ProjectItem[] = [
  {
    id: "aldeewan",
    category: "Websites I Built",
    title: "Al-Deewan Collection",
    description:
      "High-converting modern e-commerce storefront for designer apparel, seasonal lawn collections, and luxury fashion retail with automated cataloging.",
    image: "/images/websites/aldeewan.webp",
    tags: ["E-commerce", "Fashion Retail", "Modern Web"],
    live: "https://aldeewancollection.com/",
    liveLabel: "Live Website",
    github: "https://github.com/Hamzaviour/Al-Deewan-Website",
  },
  {
    id: "optionpackaging",
    category: "Websites I Built",
    title: "Option Packaging",
    description:
      "Full-scale custom packaging e-commerce platform offering wholesale boxes, automated quote estimation, category filtering, and client order workflows.",
    image: "/images/websites/optionpackaging.webp",
    tags: ["Custom Packaging", "B2B E-commerce", "Full-Stack"],
    live: "https://optionpackaging.com/",
    liveLabel: "Live Website",
    github: "https://github.com/Hamzaviour/optionpackaging",
  },
  {
    id: "xecureai",
    category: "Websites I Built",
    title: "XecureAI",
    description:
      "Enterprise cybersecurity, GRC compliance, and AI governance portal featuring penetration testing services and global SOC advisory integrations.",
    image: "/images/websites/xecureai.webp",
    tags: ["Cybersecurity", "GRC & Compliance", "AI Governance"],
    live: "https://xecureai.com/",
    liveLabel: "Live Website",
    github: "https://github.com/Hamzaviour/XecureAi",
  },
  {
    id: "whizzlylab",
    category: "Websites I Built",
    title: "Whizzly Lab",
    description:
      "Digital engineering agency platform showcasing intelligent AI systems, real-time data streaming pipelines, and production-grade client apps.",
    image: "/images/websites/whizzlylab.webp",
    tags: ["Agency", "AI Systems", "Engineering Studio"],
    live: "https://www.whizzlylab.com/",
    liveLabel: "Live Website",
    github: "https://github.com/Hamzaviour/Whizzlylab",
  },
  {
    id: "curecmsolution",
    category: "Websites I Built",
    title: "CureCMS Solution",
    description:
      "AI-powered medical billing and revenue cycle management platform built for healthcare providers, HIPAA compliant with intelligent RCM workflows.",
    image: "/images/websites/curecmsolution.webp",
    tags: ["Healthcare", "Medical Billing", "AI Agents"],
    live: "https://curercmsolution.com/",
    liveLabel: "Live Website",
    github: "https://github.com/Hamzaviour/Curecmsolution",
  },
];

const mlProjects: ProjectItem[] = [
  {
    id: "echosense",
    category: "ML & AI Projects",
    projectNumber: "Project 01",
    title: "EchoSense",
    description:
      "Real-time crisis intervention pipeline using Kafka and Spark NLP to detect and flag high-priority crisis indicators with clinical AI assistant.",
    image: "/images/projects/echosense.webp",
    tags: ["Kafka", "Spark NLP", "Flask", "ChromaDB", "Python"],
    live: "https://hamzavelous-echosense-ai.hf.space/login",
    liveLabel: "Live Demo",
    github: "https://github.com/Hamzaviour",
  },
  {
    id: "marginalia",
    category: "ML & AI Projects",
    projectNumber: "Project 02",
    title: "Marginalia",
    description:
      "Intelligent AI research companion that dives deep into scientific literature: searches arXiv, synthesizes papers, cites sources inline, and tracks research journeys.",
    image: "/images/projects/marginalia.webp",
    tags: ["Next.js", "TypeScript", "arXiv API", "LLMs", "RAG"],
    live: "https://marginalia-ochre-nu.vercel.app/chat",
    liveLabel: "Live Demo",
    github: "https://github.com/Hamzaviour/Marginalia",
  },
  {
    id: "sentiment-analyzer",
    category: "ML & AI Projects",
    projectNumber: "Project 03",
    title: "Sentiment Analyzer",
    description:
      "AI-powered text classification and sentiment analytics web application for customer feedback, brand perception, and real-time opinion mining.",
    image: "/images/projects/sentiment-analyzer.webp",
    tags: ["NLP", "Transformers", "React", "Python", "FastAPI"],
    live: "https://huaweisentiment.vercel.app/",
    liveLabel: "Live Demo",
    github: "https://github.com/Hamzaviour/Sentiment-Analyzer",
  },
  {
    id: "deewan-pos",
    category: "ML & AI Projects",
    projectNumber: "Project 04",
    title: "Al-Deewan POS System",
    description:
      "Advanced AI-based enterprise point-of-sale ERP software with wholesale & retail inventory, double-entry accounting, SQLite, and Cloudflare Tunnel remote portal.",
    image: "/images/projects/deewan-pos.webp",
    tags: ["Electron", "React 18", "TypeScript", "Vite", "SQLite"],
    live: null,
    github: "https://github.com/Hamzaviour/Deewan-POS-System",
  },
  {
    id: "intelligent-support-engine",
    category: "ML & AI Projects",
    projectNumber: "Project 05",
    title: "Intelligent Support Engine",
    description:
      "Autonomous multi-agent customer support engine powered by LangGraph, FastAPI, and Next.js for real-time ticket triage, intent routing, and self-service resolution.",
    image: "/images/projects/intelligent-support-engine.webp",
    tags: ["LangGraph", "Multi-Agent AI", "FastAPI", "Python", "Next.js"],
    live: null,
    github: "https://github.com/Hamzaviour/Intelligent_Support_Engine",
  },
  {
    id: "knowly",
    category: "ML & AI Projects",
    projectNumber: "Project 06",
    title: "Knowly",
    description:
      "Enterprise document AI workspace offering hybrid semantic search, multi-agent orchestration, deep research synthesis, and automated document analysis.",
    image: "/images/projects/knowly.webp",
    tags: ["Next.js 16", "FastAPI", "Document AI", "Semantic Search", "RAG"],
    live: null,
    github: "https://github.com/Hamzaviour/Knowly",
  },
  {
    id: "cyberbrainids",
    category: "ML & AI Projects",
    projectNumber: "Project 07",
    title: "CyberBrain IDS",
    description:
      "AI-powered Intrusion Detection System featuring live packet capture, Random Forest + XGBoost hybrid anomaly detection, ChromaDB RAG, and SOC dashboard.",
    image: "/images/projects/cyberbrainids.webp",
    tags: ["Python", "PyShark", "XGBoost", "ChromaDB", "React"],
    live: "https://cybervenoms.netlify.app/",
    liveLabel: "Live Demo",
    github: "https://github.com/Hamzaviour/CyberBrainIDS",
  },
];

const allProjects = [...websiteProjects, ...mlProjects];

const STATS = [
  { value: "12", label: "Production Builds" },
  { value: "5", label: "Web Platforms" },
  { value: "7", label: "ML & AI Systems" },
  { value: "100%", label: "Live Codebases" },
];

export default function WorkPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE_URL}/work#webpage`,
    url: `${BASE_URL}/work`,
    name: "Projects & Production Builds | Whizzly Lab",
    description:
      "Whizzly Lab portfolio of production-grade systems spanning AI, machine learning, cybersecurity, e-commerce, and enterprise software.",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: allProjects.map((c, idx) => ({
        "@type": "CreativeWork",
        position: idx + 1,
        name: c.title,
        description: c.description,
        url: c.live || `${BASE_URL}/work`,
      })),
    },
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-transparent text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PageNavbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-12 pb-16 sm:px-8 sm:pt-20 sm:pb-24">
        <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-[#00F0FF]/10 blur-3xl" />
        <div className="pointer-events-none absolute top-60 -left-40 h-[500px] w-[500px] rounded-full bg-[#a855f7]/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Projects" },
            ]}
          />

          <div className="mt-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span>Shipped Systems and Production Portfolio</span>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl leading-[1.05] font-heading">
              My Projects
            </h1>

            <p className="mt-6 max-w-3xl text-lg sm:text-xl leading-relaxed text-hero-sub/80">
              A comprehensive showcase of high-performance web applications, scalable e-commerce systems, and production ML/AI pipelines.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/schedule"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#00f0ff] px-8 py-3.5 text-sm font-semibold text-black shadow-[0_0_25px_rgba(0,240,255,0.25)] transition-all hover:opacity-95"
              >
                Start Your Project
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/10"
              >
                View Services
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="liquid-glass rounded-2xl border border-white/10 p-5 text-center"
              >
                <p className="text-3xl font-bold text-white font-heading">{s.value}</p>
                <p className="mt-1 text-xs font-medium text-hero-sub/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="relative px-4 pb-28 sm:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Section 1: Websites I Built */}
          <div className="mb-20">
            <div className="mb-8 flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight text-white font-heading sm:text-3xl">
                Websites I Built
              </h2>
              <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium text-cyan-300">
                {websiteProjects.length} Projects
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {websiteProjects.map((item) => (
                <ProjectCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Section 2: ML & AI Projects */}
          <div className="mb-20">
            <div className="mb-8 flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight text-white font-heading sm:text-3xl">
                ML & AI Projects
              </h2>
              <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium text-cyan-300">
                {mlProjects.length} Projects
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mlProjects.map((item) => (
                <ProjectCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Verified Client Testimonial on Work */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-1 text-amber-400 mb-2 text-sm">
                  {"★★★★★"}
                </div>
                <blockquote className="text-base sm:text-lg italic text-slate-200">
                  &ldquo;Whizzly Lab delivered our real-time crisis NLP pipeline in under 6 weeks. Their direct access to engineering leads eliminated all the usual agency friction.&rdquo;
                </blockquote>
                <div className="mt-3 text-xs sm:text-sm text-cyan-300 font-semibold font-mono">
                  Sarah Chen, CTO, FinTech Startup
                </div>
              </div>
              <Link
                href="/schedule"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-6 py-3 text-xs sm:text-sm font-bold text-black transition hover:opacity-90"
              >
                Book a Consult
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <TrustBadges className="mt-8" />

          {/* Bottom CTA block */}
          <div className="mt-16 liquid-glass rounded-3xl border border-white/10 p-8 sm:p-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span>Next Project</span>
            </div>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl font-heading">
              Let&apos;s engineer your next system.
            </h2>
            <p className="mt-3 text-base text-hero-sub/75 max-w-xl mx-auto">
              From AI agents and data pipelines to full stack platforms, we build production systems that deliver real outcomes.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/schedule"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#00f0ff] px-8 py-3.5 text-sm font-semibold text-black shadow-[0_0_25px_rgba(0,240,255,0.3)] transition-all hover:opacity-95"
              >
                Schedule Strategy Consult
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}

function ProjectCard({ item }: { item: ProjectItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_8px_32px_rgba(0,240,255,0.15)]">
      {/* Preview Image in 16/10 aspect ratio matching hamzayounas.netlify.app */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-black/60">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover object-top transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05010f]/80 via-transparent to-transparent" />
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {item.projectNumber && (
          <p className="mb-2 font-mono text-xs tracking-[0.25em] text-cyan-400 uppercase">
            {item.projectNumber}
          </p>
        )}
        <h3 className="mb-2 text-xl font-bold text-white transition group-hover:text-cyan-300">
          {item.title}
        </h3>
        <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-300/80">
          {item.description}
        </p>

        {/* Tags */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-white/10">
          {item.live && (
            <a
              href={item.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition"
            >
              {item.liveLabel || "Live Website"}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          {item.github && (
            <a
              href={item.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition"
            >
              GitHub
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
          {!item.live && !item.github && (
            <span className="text-xs text-slate-500">Internal Tool</span>
          )}
        </div>
      </div>
    </article>
  );
}
