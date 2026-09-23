"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, ArrowUpRight } from "lucide-react";

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

const allProjects: ProjectItem[] = [
  // Websites I Built
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

  // ML & AI Projects
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

type FilterCategory = "All" | "Websites I Built" | "ML & AI Projects";

export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");

  const filteredProjects =
    activeFilter === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeFilter);

  const websiteProjects = allProjects.filter((p) => p.category === "Websites I Built");
  const mlProjects = allProjects.filter((p) => p.category === "ML & AI Projects");

  return (
    <section id="work" className="relative z-10 px-4 py-20 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase">
              Portfolio
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl font-heading">
              Featured Projects
            </h2>
            <p className="mt-3 max-w-2xl text-hero-sub/80 text-base">
              Explore production applications, high-performance web platforms, and autonomous ML systems engineered for real-world reliability.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-md self-start md:self-auto">
            {(["All", "Websites I Built", "ML & AI Projects"] as FilterCategory[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`rounded-xl px-4 py-2 text-xs font-medium transition-all ${
                  activeFilter === tab
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {tab === "All"
                  ? `All (${allProjects.length})`
                  : tab === "Websites I Built"
                  ? `Websites (${websiteProjects.length})`
                  : `ML & AI (${mlProjects.length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Section 1: Websites I Built (when All or Websites selected) */}
        {(activeFilter === "All" || activeFilter === "Websites I Built") && (
          <div className="mb-16">
            {activeFilter === "All" && (
              <div className="mb-8 flex items-center gap-3">
                <h3 className="text-2xl font-bold tracking-tight text-white font-heading">
                  Websites I Built
                </h3>
                <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium text-cyan-300">
                  {websiteProjects.length} Projects
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(activeFilter === "All" ? websiteProjects : filteredProjects).map((item, i) => (
                <ProjectCard key={item.id} item={item} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Section 2: ML & AI Projects (when All or ML & AI selected) */}
        {(activeFilter === "All" || activeFilter === "ML & AI Projects") && (
          <div>
            {activeFilter === "All" && (
              <div className="mb-8 flex items-center gap-3">
                <h3 className="text-2xl font-bold tracking-tight text-white font-heading">
                  ML & AI Projects
                </h3>
                <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium text-cyan-300">
                  {mlProjects.length} Projects
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(activeFilter === "All" ? mlProjects : filteredProjects).map((item, i) => (
                <ProjectCard key={item.id} item={item} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ item, index }: { item: ProjectItem; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_8px_32px_rgba(0,240,255,0.15)]"
    >
      {/* Preview Image in exact 16/10 aspect ratio matching hamzayounas.netlify.app */}
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
        <h4 className="mb-2 text-xl font-bold text-white transition group-hover:text-cyan-300">
          {item.title}
        </h4>
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
    </motion.article>
  );
}
