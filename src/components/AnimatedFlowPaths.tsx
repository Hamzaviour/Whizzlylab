"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import {
  Code2,
  Sparkles,
  BrainCircuit,
  Workflow,
  TrendingUp,
  ShieldCheck,
  LucideIcon,
} from "lucide-react";

interface DomainItem {
  id: string;
  title: string;
  icon: LucideIcon;
  accentColor: string;
  glowColor: string;
  href: string;
}

const DOMAINS: DomainItem[] = [
  {
    id: "web-dev",
    title: "Web Development",
    icon: Code2,
    accentColor: "#3b82f6", // Electric Blue
    glowColor: "rgba(59, 130, 246, 0.4)",
    href: "/services/web-development",
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    icon: Sparkles,
    accentColor: "#00f0ff", // Vibrant Cyan
    glowColor: "rgba(0, 240, 255, 0.45)",
    href: "/services/ai",
  },
  {
    id: "ml",
    title: "Machine Learning",
    icon: BrainCircuit,
    accentColor: "#a855f7", // Deep Violet / Purple
    glowColor: "rgba(168, 85, 247, 0.4)",
    href: "/services/machine-learning",
  },
  {
    id: "automation",
    title: "Automation",
    icon: Workflow,
    accentColor: "#ec4899", // Neon Pink
    glowColor: "rgba(236, 72, 153, 0.4)",
    href: "/services/automation",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: TrendingUp,
    accentColor: "#f59e0b", // Amber / Gold
    glowColor: "rgba(245, 158, 11, 0.4)",
    href: "/contact",
  },
  {
    id: "cyber-security",
    title: "Cyber Security",
    icon: ShieldCheck,
    accentColor: "#10b981", // Emerald / Cyber Green
    glowColor: "rgba(16, 185, 129, 0.4)",
    href: "/services/business-solutions",
  },
];

interface AnimatedFlowPathsProps {
  className?: string;
  speed?: number; // duration in seconds
  shimmerLength?: number; // length as % of path (default 26)
  curvature?: number; // 0.5 to 2.0 (default 1.15)
}

function ShimmerPath({
  path,
  gradientId,
  strokeWidth = 2.5,
  shimmerLength = 24,
  progressMotionValue,
}: {
  path: string;
  gradientId: string;
  strokeWidth?: number;
  shimmerLength?: number;
  progressMotionValue: any;
}) {
  const start = 100 + shimmerLength * 2;
  const end = shimmerLength;

  const strokeDashoffset = useTransform(
    progressMotionValue,
    [0, 1],
    [start, end]
  );

  const opacity = useTransform(progressMotionValue, (value: number) => {
    const lowerThreshold = 0.03;
    const upperThreshold = 0.97;
    if (value <= lowerThreshold) {
      return value / lowerThreshold;
    } else if (value >= upperThreshold) {
      return (1 - value) / (1 - upperThreshold);
    } else {
      return 1;
    }
  });

  return (
    <motion.path
      d={path}
      fill="none"
      stroke={`url(#${gradientId})`}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeDasharray={`${shimmerLength} 100`}
      pathLength={100}
      filter="url(#flow-glow)"
      style={{
        strokeDashoffset,
        opacity,
      }}
    />
  );
}

export default function AnimatedFlowPaths({
  className = "",
  speed = 3.2,
  shimmerLength = 25,
  curvature = 1.18,
}: AnimatedFlowPathsProps) {
  const [mounted, setMounted] = useState(false);
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null);

  // SVG coordinate space
  const viewBoxWidth = 880;
  const viewBoxHeight = 500;
  const startX = 125;
  const centerY = 250;
  const endX = 755;
  const spacing = 72;
  const total = DOMAINS.length;
  const maxSpread = ((total - 1) * spacing) / 2;

  const progressMotionValue = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
    const controls = animate(0, 1, {
      duration: speed,
      ease: [0.42, 0, 0.58, 1],
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0.5,
      onUpdate: (latest) => {
        progressMotionValue.set(latest);
      },
    });

    return () => controls.stop();
  }, [speed, progressMotionValue]);

  // Generate cubic Bézier path for each index
  const generatePath = (index: number) => {
    const offset = index * spacing - maxSpread;
    const endY = centerY + offset;
    const dx = endX - startX;

    const cp1X = startX + dx * 0.42 * curvature;
    const cp1Y = centerY + offset * 0.12 * curvature;
    const cp2X = endX - dx * 0.42 * curvature;
    const cp2Y = endY - offset * 0.12 * curvature;

    return `M ${startX},${centerY} C ${cp1X},${cp1Y} ${cp2X},${cp2Y} ${endX},${endY}`;
  };

  return (
    <div
      onClick={() => setHoveredDomain(null)}
      className={`relative w-full rounded-[22px] sm:rounded-[32px] bg-[#070913]/90 border border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.7)] backdrop-blur-xl overflow-hidden group/canvas ${className}`}
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-600/[0.12] blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-600/[0.08] blur-[110px]"
      />

      {/* Signature Antimatter Diagonal Dot Matrix in bottom-right corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-4 right-4 w-28 h-28 opacity-20 transition-opacity duration-300 group-hover/canvas:opacity-35"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255, 255, 255, 0.75) 1.2px, transparent 1.2px)",
          backgroundSize: "8px 8px",
          maskImage: "linear-gradient(to top left, black 25%, transparent 75%)",
          WebkitMaskImage:
            "linear-gradient(to top left, black 25%, transparent 75%)",
        }}
      />

      {/* Subtle top indicator bar */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 pt-3.5 sm:pt-5 pb-2 text-xs font-mono border-b border-white/[0.04]">
        <div className="flex items-center gap-2 text-gray-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="uppercase tracking-widest text-[10px] sm:text-[11px] text-gray-300">
            Connected Engineering Flow
          </span>
        </div>
        <div className="text-[10px] sm:text-[11px] text-gray-500 uppercase tracking-widest hidden sm:block">
          Autonomous Architecture
        </div>
      </div>

      {/* Main Flow Canvas Wrapper: fits 100% on mobile screens at once without scrolling */}
      <div className="relative w-full overflow-hidden py-3 sm:py-6 px-2 sm:px-6">
        <div className="relative w-full max-w-5xl mx-auto aspect-[880/740] xs:aspect-[880/660] sm:aspect-[880/500]">
          {/* SVG Connection Lines & Shimmers */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Soft luminous glow filter for the shimmers */}
              <filter
                id="flow-glow"
                x="-30%"
                y="-30%"
                width="160%"
                height="160%"
              >
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Dynamic Gradients for each domain path */}
              {DOMAINS.map((domain, i) => (
                <linearGradient
                  key={domain.id}
                  id={`flow-grad-${i}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                  <stop offset="45%" stopColor={domain.accentColor} stopOpacity="1" />
                  <stop offset="90%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="100%" stopColor={domain.accentColor} stopOpacity="1" />
                </linearGradient>
              ))}
            </defs>

            {/* Background static circuit tracks */}
            {DOMAINS.map((domain, i) => {
              const pathD = generatePath(i);
              const isHovered = hoveredDomain === domain.id;
              return (
                <path
                  key={`track-${domain.id}`}
                  d={pathD}
                  fill="none"
                  stroke={
                    isHovered
                      ? domain.accentColor
                      : "rgba(255, 255, 255, 0.08)"
                  }
                  strokeWidth={isHovered ? 2.2 : 1.5}
                  strokeDasharray={isHovered ? "none" : "4 4"}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              );
            })}

            {/* Animated Shimmer Paths */}
            {mounted &&
              DOMAINS.map((domain, i) => (
                <ShimmerPath
                  key={`shimmer-${domain.id}`}
                  path={generatePath(i)}
                  gradientId={`flow-grad-${i}`}
                  strokeWidth={2.4}
                  shimmerLength={shimmerLength}
                  progressMotionValue={progressMotionValue}
                />
              ))}

            {/* Small anchor dots on SVG directly behind nodes */}
            <circle
              cx={startX}
              cy={centerY}
              r={4}
              fill="#6366f1"
              className="animate-pulse"
            />
            {DOMAINS.map((domain, i) => {
              const offset = i * spacing - maxSpread;
              return (
                <circle
                  key={`dot-${domain.id}`}
                  cx={endX}
                  cy={centerY + offset}
                  r={3.5}
                  fill={domain.accentColor}
                />
              );
            })}
          </svg>

          {/* ===================== LEFT ORIGIN NODE (WHIZZLY LAB) ===================== */}
          <div
            style={{
              left: `${(startX / viewBoxWidth) * 100}%`,
              top: `${(centerY / viewBoxHeight) * 100}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
          >
            {/* Ambient beacon pulse */}
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-indigo-500/20 blur-md sm:blur-xl scale-125 animate-pulse" />

            {/* Left Node Frame */}
            <div className="relative flex items-center justify-center w-11 h-11 xs:w-13 xs:h-13 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-[#090b16]/95 border border-indigo-400/40 p-1.5 xs:p-2 sm:p-2.5 shadow-[0_0_20px_rgba(99,102,241,0.35)] sm:shadow-[0_0_35px_rgba(99,102,241,0.35)] backdrop-blur-xl transition-all duration-300 group-hover:scale-105 group-hover:border-indigo-300 group-hover:shadow-[0_0_50px_rgba(99,102,241,0.55)]">
              <Image
                src="/transparent-icon.png"
                alt="Whizzly Lab Hub"
                width={80}
                height={80}
                className="w-full h-full object-contain filter drop-shadow-[0_2px_12px_rgba(99,102,241,0.6)]"
                priority
              />
            </div>

            {/* Subtle Origin Badge */}
            <div className="absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
              <span className="px-2 py-0.5 rounded-full bg-black/80 border border-indigo-500/30 text-[9px] sm:text-[10px] font-mono text-indigo-300">
                Whizzly Lab Hub
              </span>
            </div>
          </div>

          {/* ===================== RIGHT DESTINATION NODES (ICONS ONLY) ===================== */}
          {DOMAINS.map((domain, i) => {
            const offset = i * spacing - maxSpread;
            const endY = centerY + offset;
            const Icon = domain.icon;
            const isHovered = hoveredDomain === domain.id;

            return (
              <div
                key={domain.id}
                style={{
                  left: `${(endX / viewBoxWidth) * 100}%`,
                  top: `${(endY / viewBoxHeight) * 100}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                onMouseEnter={() => setHoveredDomain(domain.id)}
                onMouseLeave={() => setHoveredDomain(null)}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  setHoveredDomain(hoveredDomain === domain.id ? null : domain.id);
                }}
              >
                {/* Glow behind the icon node */}
                <div
                  aria-hidden
                  className={`absolute inset-0 rounded-lg xs:rounded-xl sm:rounded-2xl blur-md sm:blur-lg transition-all duration-300 ${
                    isHovered ? "scale-150 opacity-100" : "scale-100 opacity-40"
                  }`}
                  style={{ backgroundColor: domain.glowColor }}
                />

                {/* Target Icon Button / Link */}
                <Link
                  href={domain.href}
                  aria-label={domain.title}
                  className={`relative flex items-center justify-center w-7 h-7 xs:w-8 xs:h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg xs:rounded-xl sm:rounded-2xl bg-[#090d18]/95 border backdrop-blur-xl transition-all duration-300 ${
                    isHovered
                      ? "scale-115 shadow-[0_0_30px_rgba(255,255,255,0.25)]"
                      : "scale-100 hover:scale-105"
                  }`}
                  style={{
                    borderColor: isHovered
                      ? domain.accentColor
                      : "rgba(255, 255, 255, 0.12)",
                    boxShadow: isHovered
                      ? `0 0 25px ${domain.glowColor}`
                      : "0 4px 20px rgba(0,0,0,0.5)",
                  }}
                >
                  <Icon
                    className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: domain.accentColor }}
                    strokeWidth={2}
                  />
                </Link>

                {/* Tooltip on hover (Icons-only visually, title shows on hover/touch) */}
                <div
                  className={`absolute right-full mr-2 sm:mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap transition-all duration-200 pointer-events-none z-30 ${
                    isHovered
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-1"
                  }`}
                >
                  <span
                    className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-black/90 border text-[10px] sm:text-xs font-sans font-medium text-white shadow-lg backdrop-blur-md"
                    style={{ borderColor: `${domain.accentColor}55` }}
                  >
                    {domain.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
