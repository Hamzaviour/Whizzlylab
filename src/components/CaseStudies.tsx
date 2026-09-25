"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Globe,
  Smartphone,
  Sparkles,
  TrendingUp,
  Code2,
  Cpu,
  Shield,
  ArrowUpRight,
  Lock,
  Wifi,
} from "lucide-react";

interface TagItem {
  label: string;
  icon: "globe" | "phone" | "ai" | "gtm" | "code" | "cpu" | "shield";
}

interface CaseStudyItem {
  id: string;
  name: string;
  subtitle: string;
  tags: TagItem[];
  image: string;
  mobileImage: string;
  link?: string;
  domainUrl: string;
}

// 100% Real Whizzly Lab Client Projects with Real Names & Real Mobile Previews from Mobile View folder
const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: "01",
    name: "Al-Deewan Collection",
    subtitle: "High-Performance Fashion Commerce Storefront & ERP",
    tags: [
      { label: "App Design", icon: "phone" },
      { label: "GTM", icon: "gtm" },
      { label: "ERP / POS", icon: "cpu" },
    ],
    image: "/images/websites/aldeewan.webp",
    mobileImage: "/images/websites/aldeewan-mobile.png",
    link: "https://aldeewancollection.com/",
    domainUrl: "aldeewancollection.com",
  },
  {
    id: "02",
    name: "Option Packaging",
    subtitle: "Automated Packaging Estimation Engine",
    tags: [
      { label: "Web Design", icon: "globe" },
      { label: "Development", icon: "code" },
      { label: "B2B E-Commerce", icon: "gtm" },
    ],
    image: "/images/websites/optionpackaging.webp",
    mobileImage: "/images/websites/optionpackaging-mobile.png",
    link: "https://optionpackaging.com/",
    domainUrl: "optionpackaging.com",
  },
  {
    id: "03",
    name: "Whizzly Lab",
    subtitle: "Autonomous Multi-Agent Systems & Engineering Studio",
    tags: [
      { label: "AI Systems", icon: "ai" },
      { label: "Web Design", icon: "globe" },
      { label: "Engineering", icon: "code" },
    ],
    image: "/images/websites/whizzlylab.webp",
    mobileImage: "/images/websites/whizzlylab-mobile.png",
    link: "https://www.whizzlylab.com/",
    domainUrl: "whizzlylab.com",
  },
  {
    id: "04",
    name: "XecureAI",
    subtitle: "Enterprise Cybersecurity & Autonomous SOC Platform",
    tags: [
      { label: "Web Design", icon: "globe" },
      { label: "Development", icon: "code" },
      { label: "Cybersecurity", icon: "shield" },
    ],
    image: "/images/websites/xecureai.webp",
    mobileImage: "/images/websites/xecureai-mobile.png",
    link: "https://xecureai.com/",
    domainUrl: "xecureai.com",
  },
  {
    id: "05",
    name: "CureCMS Solution",
    subtitle: "AI Healthcare & RCM Billing Platform",
    tags: [
      { label: "Web Design", icon: "globe" },
      { label: "App Design", icon: "phone" },
      { label: "AI Development", icon: "ai" },
      { label: "GTM", icon: "gtm" },
    ],
    image: "/images/websites/curecmsolution.webp",
    mobileImage: "/images/websites/curecmsolution-mobile.png",
    link: "https://curercmsolution.com/",
    domainUrl: "curercmsolution.com",
  },
];

function renderTagIcon(icon: TagItem["icon"]) {
  switch (icon) {
    case "globe":
      return <Globe className="w-3 h-3 text-gray-400" />;
    case "phone":
      return <Smartphone className="w-3 h-3 text-gray-400" />;
    case "ai":
      return <Sparkles className="w-3 h-3 text-indigo-400" />;
    case "gtm":
      return <TrendingUp className="w-3 h-3 text-amber-400" />;
    case "code":
      return <Code2 className="w-3 h-3 text-cyan-400" />;
    case "cpu":
      return <Cpu className="w-3 h-3 text-purple-400" />;
    case "shield":
      return <Shield className="w-3 h-3 text-emerald-400" />;
    default:
      return <Code2 className="w-3 h-3 text-gray-400" />;
  }
}

export default function CaseStudies() {
  // Default to item 01 (Al-Deewan Collection)
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="work" className="bg-black text-white pt-8 sm:pt-14 pb-16 sm:pb-24 relative z-40 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono uppercase tracking-wider text-indigo-300 mb-3 sm:mb-4">
              Featured Case Studies
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white font-sans">
              Case Studies
            </h2>
          </div>
          <p className="text-gray-400 max-w-xs md:text-right text-xs sm:text-sm leading-relaxed font-light">
            Proven results, measurable impact—explore <br className="hidden sm:inline" />
            the transformations we&apos;ve delivered.
          </p>
        </div>

        {/* 2-Column Split: Left List, Right Accurate Phone Mockup Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT COLUMN: Interactive Project List */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {CASE_STUDIES.map((study, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={study.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative flex flex-col md:flex-row md:items-center justify-between py-3.5 sm:py-5 px-4 sm:px-6 cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "bg-[#10121a] border border-indigo-400/40 rounded-2xl shadow-[0_8px_32px_rgba(30,35,80,0.35)] opacity-100"
                      : "border-b border-white/[0.08] rounded-2xl hover:bg-white/[0.02] opacity-65 hover:opacity-100"
                  }`}
                >
                  {/* Left: ID & Project Name */}
                  <div className="flex items-center gap-3 sm:gap-6 min-w-0 sm:min-w-[210px]">
                    <span className="text-xs sm:text-sm font-mono text-indigo-300/80 font-medium w-5 sm:w-6 shrink-0">
                      {study.id}
                    </span>
                    <h3 className="text-base sm:text-xl font-medium text-white tracking-tight group-hover:text-indigo-200 transition-colors truncate sm:whitespace-normal">
                      {study.name}
                    </h3>
                  </div>

                  {/* Right: Tag Pills */}
                  <div className="mt-2.5 md:mt-0 flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {study.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border text-[11px] sm:text-xs font-light transition-all ${
                          isActive
                            ? "border-indigo-400/30 bg-indigo-500/10 text-white"
                            : "border-white/10 bg-white/[0.03] text-gray-400 group-hover:border-white/20 group-hover:text-gray-200"
                        }`}
                      >
                        {renderTagIcon(tag.icon)}
                        <span>{tag.label}</span>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Photorealistic Smartphone Showcase with Accurate Mobile Preview */}
          <div className="lg:col-span-5 relative w-full h-[520px] sm:h-[580px] lg:h-[620px] rounded-3xl overflow-hidden bg-[#0a0b10] border border-white/10 shadow-2xl flex items-center justify-center p-6">
            {/* Ambient Volumetric Backdrop Glow */}
            <div
              aria-hidden
              className="absolute -top-16 -right-16 w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.25)_0%,rgba(168,85,247,0.12)_40%,transparent_70%)] blur-3xl pointer-events-none"
            />
            <div
              aria-hidden
              className="absolute -bottom-16 -left-16 w-[320px] h-[320px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.2)_0%,transparent_65%)] blur-3xl pointer-events-none"
            />

            {/* Subtle Vignette Gradient */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none z-10"
            />

            {/* Active Project Mock Mobile Device with Cross-Fade */}
            {CASE_STUDIES.map((study, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={study.id}
                  className={`absolute inset-0 flex items-center justify-center p-4 transition-all duration-700 ease-out ${
                    isActive
                      ? "opacity-100 scale-100 pointer-events-auto z-20"
                      : "opacity-0 scale-95 pointer-events-none z-0"
                  }`}
                >
                  <div className="relative flex flex-col items-center justify-center w-full h-full">
                    {/* Accurate iPhone 16 Pro Frame with 414x896 Screen Ratio */}
                    <div
                      className="relative w-[235px] sm:w-[260px] md:w-[275px] h-[450px] sm:h-[490px] md:h-[515px] rounded-[42px] sm:rounded-[46px] bg-[#12131c] border-[6px] sm:border-[7px] border-[#252839] shadow-[0_30px_70px_rgba(0,0,0,0.9),0_0_30px_rgba(99,102,241,0.2)] overflow-hidden transition-all duration-700 flex flex-col"
                      style={{
                        transform: "rotateY(-4deg) rotateX(2deg)",
                      }}
                    >
                      {/* Top Bezel: Dynamic Island Notch & Status Bar */}
                      <div className="relative w-full h-9 sm:h-10 bg-black/90 backdrop-blur-md px-5 flex items-center justify-between shrink-0 z-30 border-b border-white/5">
                        {/* Clock */}
                        <span className="text-[11px] font-semibold text-white/90 font-mono tracking-tight">
                          9:41
                        </span>

                        {/* Dynamic Island Pill Notch */}
                        <div className="w-18 sm:w-20 h-4 bg-black rounded-full border border-white/10 flex items-center justify-end px-1.5 gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#101018]" />
                          <div className="w-2 h-2 rounded-full bg-[#181824] border border-indigo-400/40" />
                        </div>

                        {/* Status Icons */}
                        <div className="flex items-center gap-1.5 text-white/80">
                          <Wifi className="w-3 h-3" />
                          <div className="w-4 h-2 rounded-[2px] border border-white/70 p-[1px] flex items-center">
                            <div className="w-full h-full bg-white rounded-[1px]" />
                          </div>
                        </div>
                      </div>

                      {/* Screen Content: Authentic Pixel-Perfect Mobile Screenshot */}
                      <div className="relative w-full flex-1 overflow-hidden bg-[#05060a]">
                        <Image
                          src={study.mobileImage}
                          alt={`${study.name} mobile preview`}
                          fill
                          sizes="(max-width: 768px) 260px, 300px"
                          className="object-cover object-top"
                          priority={index === 0}
                        />

                        {/* Glass Gloss Sheen */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent pointer-events-none z-20" />
                      </div>

                      {/* Bottom Mobile Browser Address Pill (Safari / Chrome Mobile) */}
                      <div className="w-full bg-black/95 backdrop-blur-lg px-4 py-2 flex flex-col items-center shrink-0 border-t border-white/10 z-30">
                        <div className="w-full py-1 px-3 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center gap-1.5">
                          <Lock className="w-2.5 h-2.5 text-emerald-400" />
                          <span className="text-[10px] text-white/80 font-mono tracking-tight truncate max-w-[170px]">
                            {study.domainUrl}
                          </span>
                        </div>
                        {/* iOS Home Indicator Bar */}
                        <div className="w-24 h-1 bg-white/35 rounded-full mt-1.5" />
                      </div>
                    </div>

                    {/* Bottom Floating Card: Project Name & Live Link */}
                    <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-4 sm:right-4 z-40 flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/15 shadow-2xl">
                      <div className="min-w-0 pr-2">
                        <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-indigo-300 truncate">
                          {study.subtitle}
                        </p>
                        <h4 className="text-sm sm:text-base font-semibold text-white tracking-tight truncate">
                          {study.name}
                        </h4>
                      </div>
                      {study.link && (
                        <Link
                          href={study.link}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-indigo-300 transition-colors shrink-0 shadow-md"
                          aria-label={`Visit live site for ${study.name}`}
                        >
                          <span>Live Site</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
