"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, ChevronUp, Layers, Cpu, Globe } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { ALL_PROJECTS, ProjectItem, ProjectCategory } from "@/lib/projectsData";

export default function WorkProjectsShowcase() {
  const [activeTab, setActiveTab] = useState<"all" | ProjectCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const websiteProjects = ALL_PROJECTS.filter((p) => p.category === "website");
  const mlProjects = ALL_PROJECTS.filter((p) => p.category === "ml-ai");

  // Filter based on search query
  const matchesSearch = (p: ProjectItem) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.domain.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  };

  const filteredWebsites = websiteProjects.filter(matchesSearch);
  const filteredMl = mlProjects.filter(matchesSearch);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full">
      {/* ===================== FILTER TABS & SEARCH BAR ===================== */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-14 sm:mb-20">
        {/* Category Tabs */}
        <div className="inline-flex p-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md self-start sm:self-auto overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              activeTab === "all"
                ? "bg-white text-black shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Projects</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === "all" ? "bg-black/15 text-black" : "bg-white/10 text-white/70"
              }`}
            >
              12
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("website")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              activeTab === "website"
                ? "bg-white text-black shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Websites Built</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === "website" ? "bg-black/15 text-black" : "bg-white/10 text-white/70"
              }`}
            >
              5
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("ml-ai")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              activeTab === "ml-ai"
                ? "bg-white text-black shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>ML &amp; AI Systems</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === "ml-ai" ? "bg-black/15 text-black" : "bg-white/10 text-white/70"
              }`}
            >
              7
            </span>
          </button>
        </div>

        {/* Quick Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by stack, AI, Kafka..."
            className="w-full px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400/60 focus:bg-white/[0.07] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ===================== SECTION 1: WEBSITES I BUILT ===================== */}
      {(activeTab === "all" || activeTab === "website") && filteredWebsites.length > 0 && (
        <section className="mb-24 sm:mb-32">
          <div className="mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono uppercase tracking-wider text-indigo-300 mb-3">
              Client Production Platforms
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight font-sans">
              Websites We Built
            </h2>
            <p className="mt-3 max-w-2xl text-sm sm:text-base text-gray-400 font-light leading-relaxed">
              Production websites deployed for clients — from healthcare billing and cybersecurity to high-converting luxury e-commerce packaging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredWebsites.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isExpanded={expandedId === project.id}
                onToggleExpand={() => toggleExpand(project.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* ===================== SECTION 2: ML & AI PROJECTS ===================== */}
      {(activeTab === "all" || activeTab === "ml-ai") && filteredMl.length > 0 && (
        <section className="mb-20">
          <div className="mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono uppercase tracking-wider text-indigo-300 mb-3">
              Algorithmic Rigor &amp; Autonomous Agents
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight font-sans">
              ML &amp; AI Projects
            </h2>
            <p className="mt-3 max-w-2xl text-sm sm:text-base text-gray-400 font-light leading-relaxed">
              Most developers glue parts together and call it a day. We engineer end-to-end intelligence where logic, algorithmic rigor, and production finish are one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredMl.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isExpanded={expandedId === project.id}
                onToggleExpand={() => toggleExpand(project.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Zero State if search has no results */}
      {filteredWebsites.length === 0 && filteredMl.length === 0 && (
        <div className="text-center py-20 border border-white/10 rounded-3xl bg-white/[0.02]">
          <p className="text-gray-400 text-base">No projects found matching &ldquo;{searchQuery}&rdquo;</p>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-4 px-4 py-2 rounded-full border border-white/20 text-xs text-white hover:border-white transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SINGLE PROJECT CARD COMPONENT
// ─────────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  isExpanded,
  onToggleExpand,
}: {
  project: ProjectItem;
  isExpanded: boolean;
  onToggleExpand: () => void;
}) {
  return (
    <div className="group relative flex flex-col h-full rounded-[26px] sm:rounded-[28px] overflow-hidden bg-[#090b12] border border-white/[0.08] hover:border-indigo-400/50 hover:bg-[#0c0f1d] hover:shadow-[0_20px_50px_rgba(30,35,80,0.35)] hover:-translate-y-1.5 transition-all duration-500 select-none">
      {/* ===================== IMAGE ZONE ===================== */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/[0.08] bg-black/60">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition duration-700 group-hover:scale-105"
        />

        {/* Ambient bottom gradient blend into card body */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090b12] via-transparent to-transparent opacity-85" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
          {project.number ? (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/15 text-indigo-300 font-semibold">
              Project {project.number}
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/15 text-indigo-300 font-semibold">
              Client Production
            </span>
          )}

          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/10 backdrop-blur-md border border-white/10 text-gray-200">
            {project.domain.split("&")[0].trim()}
          </span>
        </div>
      </div>

      {/* ===================== CARD BODY ZONE ===================== */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-200 transition-colors font-sans mb-1.5">
          {project.title}
        </h3>

        <p className="text-xs text-indigo-300/80 font-medium mb-3.5 line-clamp-1">
          {project.tagline}
        </p>

        <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed mb-6 flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-white/[0.05] border border-white/10 text-gray-300 group-hover:border-white/20 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Expandable Architecture Drawer (Challenge / Solution / Impact Metrics) */}
        {isExpanded && (
          <div className="mb-6 pt-5 border-t border-white/10 space-y-4 text-xs animate-fadeIn">
            {/* Impact Metrics Row */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/5">
              {project.impactMetrics.map((m, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-sm sm:text-base font-bold text-white font-sans">{m.value}</div>
                  <div className="text-[10px] font-mono text-gray-400 uppercase tracking-tight mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Challenge */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                The Challenge:
              </span>
              <p className="text-gray-300 font-light leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* Solution */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 block mb-1">
                Engineering Solution:
              </span>
              <p className="text-gray-300 font-light leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>
        )}

        {/* ===================== FOOTER ACTIONS ===================== */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.08] mt-auto">
          {/* Architecture Toggle Button */}
          <button
            type="button"
            onClick={onToggleExpand}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-indigo-300 transition-colors"
          >
            <span>{isExpanded ? "Hide Specs" : "Specs & Metrics"}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {/* Links (Live Site / GitHub) */}
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View GitHub repository for ${project.title}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/[0.08] transition-all"
              >
                <GitHubIcon className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live site for ${project.title}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-medium hover:bg-white/90 hover:scale-105 transition-all shadow-md"
              >
                <span>Live</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Signature Antimatter Diagonal Dot Matrix in bottom-right corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-4 right-4 w-28 h-28 opacity-15 group-hover:opacity-30 transition-opacity"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255, 255, 255, 0.75) 1.2px, transparent 1.2px)",
          backgroundSize: "8px 8px",
          maskImage: "linear-gradient(to top left, black 25%, transparent 75%)",
          WebkitMaskImage: "linear-gradient(to top left, black 25%, transparent 75%)",
        }}
      />
    </div>
  );
}
