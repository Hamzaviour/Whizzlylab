"use client";

import React, { useState, useEffect, useRef, useId } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquareCode,
  ShieldCheck,
  FileCode2,
  Users,
  GitBranch,
  Rocket,
  CheckCircle2,
  Sparkles,
  LucideIcon,
} from "lucide-react";

export interface LifecycleItem {
  id: string;
  step: string;
  title: string;
  badge: string;
  description: string;
  icon: LucideIcon;
  accentColor: string;
  glowColor: string;
  details: {
    heading: string;
    points: string[];
    tagline: string;
  };
}

export const ENGAGEMENT_LIFECYCLE: LifecycleItem[] = [
  {
    id: "discovery",
    step: "Phase 01 · Initial Contact",
    title: "Direct Tech Lead Discovery",
    badge: "30-Min Strategic Audit",
    description:
      "Connect directly with our engineering leadership for a focused technical discovery session to dissect your architecture, challenges, and deliverables.",
    icon: MessageSquareCode,
    accentColor: "#3b82f6", // Electric Blue
    glowColor: "rgba(59, 130, 246, 0.45)",
    details: {
      heading: "Discovery & Architecture Audit",
      points: [
        "Direct consultation with Principal Engineer (no sales reps)",
        "Feasibility, tech stack, and scalability assessment",
        "Clear alignment on timelines, budget, and business outcomes",
      ],
      tagline: "30-Min Actionable Technical Review",
    },
  },
  {
    id: "security",
    step: "Phase 02 · Confidentiality",
    title: "Mutual NDA & Full IP Security",
    badge: "100% Client Ownership",
    description:
      "100% of the IP, code, and trained models remain exclusively yours. We execute bilateral non-disclosure agreements before examining your proprietary data or architecture.",
    icon: ShieldCheck,
    accentColor: "#10b981", // Cyber Emerald
    glowColor: "rgba(16, 185, 129, 0.45)",
    details: {
      heading: "Enterprise IP & Privacy Protection",
      points: [
        "Mutual NDA signed prior to any technical disclosure",
        "Full intellectual property transferred with clean licensing",
        "Air-gapped and isolated development environments",
      ],
      tagline: "Bank-Grade Confidentiality Standards",
    },
  },
  {
    id: "proposal",
    step: "Phase 03 · Scoping & Roadmap",
    title: "48-Hour Technical Proposal",
    badge: "Clear Milestones & Pricing",
    description:
      "Receive an actionable engineering blueprint featuring sprint-by-sprint milestones, cost breakdown, tech stack selection, and deliverable commitments in 48 hours.",
    icon: FileCode2,
    accentColor: "#00f0ff", // Vibrant Cyan
    glowColor: "rgba(0, 240, 255, 0.45)",
    details: {
      heading: "Sprint Blueprint & Architecture Spec",
      points: [
        "Concrete 2-week sprint deliverables and milestones",
        "Transparent pricing with no hidden engineering fees",
        "Recommended modern stack (Next.js, Three.js, Groq, PyTorch)",
      ],
      tagline: "Committed Deliverables & Transparent Scope",
    },
  },
  {
    id: "team",
    step: "Phase 04 · Team Assembly",
    title: "Dedicated Senior Pod",
    badge: "Zero Junior Hand-offs",
    description:
      "Work with handpicked, senior full-stack and AI engineers embedded directly into your communications cadence with daily commits and bi-weekly reviews.",
    icon: Users,
    accentColor: "#a855f7", // Deep Violet
    glowColor: "rgba(168, 85, 247, 0.45)",
    details: {
      heading: "Dedicated Senior Engineering Pod",
      points: [
        "Principal AI architect & senior full-stack developers",
        "Zero outsourced junior hand-offs or generic agencies",
        "Direct integration into your Slack, Discord, and GitHub",
      ],
      tagline: "High-Velocity Embedded Engineering",
    },
  },
  {
    id: "sprints",
    step: "Phase 05 · Active Development",
    title: "Transparent Sprints & Live Demos",
    badge: "Continuous Delivery",
    description:
      "Inspect progress in real-time through private GitHub repository access, continuous staging builds, and scheduled bi-weekly interactive demonstration walk-throughs.",
    icon: GitBranch,
    accentColor: "#ec4899", // Neon Pink
    glowColor: "rgba(236, 72, 153, 0.45)",
    details: {
      heading: "Continuous Delivery & Complete Visibility",
      points: [
        "Private GitHub repository with daily code commits",
        "Automated CI/CD staging environments for instant testing",
        "Bi-weekly live video walk-throughs and sprint reviews",
      ],
      tagline: "Total Code Transparency Every Sprint",
    },
  },
  {
    id: "launch",
    step: "Phase 06 · Go-Live & Scale",
    title: "Zero-Downtime Launch & SLAs",
    badge: "Enterprise Reliability",
    description:
      "Rigorous staging validation, automated load testing, zero-downtime production deployment, and 24/7 post-launch support guarantees to ensure seamless scale.",
    icon: Rocket,
    accentColor: "#f59e0b", // Warm Amber
    glowColor: "rgba(245, 158, 11, 0.45)",
    details: {
      heading: "Production Launch & Enterprise Support",
      points: [
        "Automated load benchmarks, security scans & stress tests",
        "Zero-downtime production release with instant rollback",
        "Dedicated post-launch SLAs and continuous scaling",
      ],
      tagline: "Mission-Critical 99.99% Reliability",
    },
  },
];

interface CircularInteractionProps {
  className?: string;
  heading?: string;
  subheading?: string;
  items?: LifecycleItem[];
  radius?: number;
  iconSize?: number;
  centerWidth?: number;
  centerHeight?: number;
  labelWidth?: number;
  breakpoint?: number;
}

export default function CircularInteraction({
  className = "",
  heading = "How We Collaborate With You",
  subheading = "From your initial inquiry to scaled production deployment — our structured, high-velocity engineering lifecycle.",
  items = ENGAGEMENT_LIFECYCLE,
  radius = 195,
  iconSize = 54,
  centerWidth = 360,
  centerHeight = 280,
  labelWidth = 310,
  breakpoint = 720,
}: CircularInteractionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCompact, setIsCompact] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const idSafe = reactId.replace(/[^a-zA-Z0-9]/g, "");

  // Responsive measurement using ResizeObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    let lastState: boolean | null = null;
    const update = () => {
      const w = el.getBoundingClientRect().width;
      if (w <= 0) return;
      const next = w < breakpoint;
      if (next !== lastState) {
        lastState = next;
        setIsCompact(next);
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [breakpoint]);

  const safeItems = items && items.length > 0 ? items : ENGAGEMENT_LIFECYCLE;
  const activeItem = safeItems[activeIndex] || safeItems[0];

  // Effective dimensions for mobile vs desktop
  const eff = isCompact
    ? {
        radius: Math.min(radius, 126),
        iconSize: Math.min(iconSize, 42),
        centerWidth: Math.min(centerWidth, 230),
        centerHeight: Math.min(centerHeight, 185),
        titleSize: 17,
        descSize: 13,
      }
    : {
        radius,
        iconSize,
        centerWidth,
        centerHeight,
        titleSize: 20,
        descSize: 14,
      };

  // Math: -135° places first item at top-left
  const startAngle = -135;
  const getPosition = (index: number, total: number) => {
    const step = 360 / Math.max(total, 1);
    const angleDeg = startAngle + step * index;
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: Math.cos(rad) * eff.radius,
      y: Math.sin(rad) * eff.radius,
      angleDeg,
    };
  };

  const activePos = getPosition(activeIndex, safeItems.length);
  const labelOnRight = activePos.x >= 0;
  // Subtle clamped dynamic offset: floats slightly with active node but never overflows container bounds
  const clampedOffset = Math.max(-45, Math.min(45, activePos.y * 0.25));
  const ease = [0.32, 0.72, 0, 1] as const;
  const spring = { type: "spring", stiffness: 240, damping: 28, mass: 0.9 } as const;
  const wheelSize = eff.radius * 2 + eff.iconSize * 2 + 20;

  // Reusable text label content with clear hierarchy and deliverable bullet points
  const renderLabelContent = () => (
    <div className="flex flex-col gap-3 max-w-sm">
      <div className="flex items-center gap-2">
        <span
          className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold border"
          style={{
            borderColor: `${activeItem.accentColor}55`,
            backgroundColor: `${activeItem.accentColor}18`,
            color: activeItem.accentColor,
          }}
        >
          {activeItem.step}
        </span>
      </div>

      <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white font-sans mt-0.5">
        {activeItem.title}
      </h3>

      <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
        {activeItem.description}
      </p>

      {/* Deliverable Checkpoints */}
      <div className="space-y-2 pt-2 border-t border-white/[0.08]">
        {activeItem.details.points.map((pt, idx) => (
          <div key={idx} className="flex items-start gap-2.5 text-left">
            <CheckCircle2
              className="w-4 h-4 shrink-0 mt-0.5"
              style={{ color: activeItem.accentColor }}
            />
            <span className="text-xs sm:text-[13px] text-gray-300 font-light leading-snug">
              {pt}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-1 flex items-center gap-2 text-xs font-mono text-gray-400">
        <Sparkles className="w-3.5 h-3.5" style={{ color: activeItem.accentColor }} />
        <span>{activeItem.badge}</span>
      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-[32px] bg-[#070913]/90 border border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.7)] backdrop-blur-xl overflow-hidden pt-10 pb-16 sm:pb-20 px-4 sm:px-8 select-none min-h-[580px] lg:min-h-[620px] ${className}`}
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
        className="pointer-events-none absolute bottom-4 right-4 w-28 h-28 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255, 255, 255, 0.75) 1.2px, transparent 1.2px)",
          backgroundSize: "8px 8px",
          maskImage: "linear-gradient(to top left, black 25%, transparent 75%)",
          WebkitMaskImage: "linear-gradient(to top left, black 25%, transparent 75%)",
        }}
      />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 relative z-10 px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-xs font-mono uppercase tracking-wider text-indigo-300 mb-4 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>Interactive Engagement Wheel</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white font-sans">
          {heading}
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
          {subheading}
        </p>
      </div>

      {/* Wheel Stage Area */}
      {isCompact ? (
        // Mobile / Compact Layout: Wheel on top, Details card below
        <div className="relative z-10 w-full flex flex-col items-center gap-6">
          {/* Wheel */}
          <div
            style={{ width: wheelSize, height: wheelSize }}
            className="relative flex items-center justify-center shrink-0"
          >
            {/* Soft Ambient Halo Behind Wheel */}
            <div
              style={{
                width: eff.radius * 2 + 20,
                height: eff.radius * 2 + 20,
              }}
              className="absolute rounded-full border border-indigo-500/20 bg-[radial-gradient(circle_at_50%_40%,rgba(99,102,241,0.18)_0%,transparent_75%)] pointer-events-none"
            />

            {/* Orbit Ring Guideline */}
            <div
              style={{
                width: eff.radius * 2,
                height: eff.radius * 2,
              }}
              className="absolute rounded-full border border-dashed border-white/10 pointer-events-none"
            />

            {/* Center Core: Clean Ambient Glow & Core Hub */}
            <div className="relative flex items-center justify-center pointer-events-none">
              <div className="absolute w-24 h-24 rounded-full border border-indigo-500/20 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.2)_0%,transparent_70%)] animate-pulse" />
              <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-[#090b16]/95 border border-white/10 p-2 shadow-[0_0_30px_rgba(99,102,241,0.35)] backdrop-blur-xl">
                <Image
                  src="/whizzly-icon-crisp.png"
                  alt="Whizzly Lab Hub"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(99,102,241,0.6)]"
                />
              </div>
            </div>

            {/* Orbiting Icons */}
            {safeItems.map((item, i) => {
              const pos = getPosition(i, safeItems.length);
              const isActive = i === activeIndex;
              const platformRotate = pos.angleDeg + 90;
              const IconComponent = item.icon;
              const activate = () => setActiveIndex(i);

              return (
                <motion.div
                  key={item.id}
                  onClick={activate}
                  role="button"
                  tabIndex={0}
                  aria-label={item.title}
                  aria-pressed={isActive}
                  animate={{
                    x: pos.x,
                    y: pos.y,
                    scale: isActive ? 1.15 : 1.0,
                    zIndex: isActive ? 10 : 2,
                  }}
                  transition={spring}
                  style={{
                    position: "absolute",
                    width: eff.iconSize,
                    height: eff.iconSize,
                    cursor: "pointer",
                    outline: "none",
                    touchAction: "manipulation",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {/* 3D Angled Platform Effect on Active Icon */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.6, rotateX: 0 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 22 }}
                        exit={{ opacity: 0, scale: 0.7, rotateX: 0 }}
                        transition={{ duration: 0.5, ease }}
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: "50%",
                          width: eff.iconSize * 1.5,
                          height: eff.iconSize * 1.5,
                          marginLeft: -(eff.iconSize * 1.5) / 2,
                          marginTop: -(eff.iconSize * 1.5) / 2,
                          borderRadius: 16,
                          background: `linear-gradient(160deg, ${item.glowColor} 0%, rgba(99,102,241,0.2) 100%)`,
                          boxShadow: `0 14px 28px -6px ${item.glowColor}, inset 0 1px 0 rgba(255,255,255,0.4)`,
                          border: `1px solid ${item.accentColor}66`,
                          transform: `rotateZ(${platformRotate}deg)`,
                          transformStyle: "preserve-3d",
                          pointerEvents: "none",
                          zIndex: -1,
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Icon Button Frame */}
                  <motion.div
                    animate={{
                      background: isActive
                        ? `linear-gradient(135deg, ${item.accentColor} 0%, #1e1b4b 100%)`
                        : "#0a0d18",
                      borderColor: isActive ? item.accentColor : "rgba(255, 255, 255, 0.12)",
                      boxShadow: isActive
                        ? `0 0 20px ${item.glowColor}, inset 0 1px 0 rgba(255,255,255,0.3)`
                        : "0 4px 12px rgba(0,0,0,0.5)",
                    }}
                    transition={{ duration: 0.35, ease }}
                    className="relative w-full h-full rounded-xl flex items-center justify-center border transition-all"
                  >
                    <IconComponent
                      className="w-4 h-4 transition-transform"
                      style={{ color: isActive ? "#ffffff" : item.accentColor }}
                      strokeWidth={isActive ? 2.2 : 1.8}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Label for Mobile */}
          <div className="w-full max-w-sm text-center px-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease }}
              >
                {renderLabelContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      ) : (
        // Desktop Layout: [Left Gutter] [Wheel + Center Card] [Right Gutter]
        <div className="relative z-10 w-full flex items-center justify-center min-w-0">
          {/* Left Gutter Label */}
          <div
            style={{ width: labelWidth, height: wheelSize }}
            className="relative shrink-1 min-w-0"
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                left: 0,
                width: labelWidth,
              }}
              className="pr-6 flex justify-end pointer-events-none"
            >
              <AnimatePresence mode="wait" initial={false}>
                {!labelOnRight && (
                  <motion.div
                    key={`left-${activeIndex}`}
                    initial={{ opacity: 0, y: clampedOffset + 12, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: clampedOffset, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: clampedOffset - 12, filter: "blur(4px)" }}
                    transition={{ duration: 0.35, ease }}
                    className="w-full max-w-sm pointer-events-auto"
                  >
                    {renderLabelContent()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Wheel & Center Showcase */}
          <div
            style={{ width: wheelSize, height: wheelSize }}
            className="relative flex items-center justify-center shrink-0"
          >
            {/* Outer Ambient Glow Ring */}
            <div
              style={{
                width: eff.radius * 2 + 28,
                height: eff.radius * 2 + 28,
              }}
              className="absolute rounded-full border border-indigo-500/20 bg-[radial-gradient(circle_at_50%_35%,rgba(99,102,241,0.18)_0%,transparent_75%)] pointer-events-none"
            />

            {/* Orbit Track Dotted Guide */}
            <div
              style={{
                width: eff.radius * 2,
                height: eff.radius * 2,
              }}
              className="absolute rounded-full border border-dashed border-white/10 pointer-events-none"
            />

            {/* Center Core: Clean Ambient Glow & Core Hub */}
            <div className="relative flex items-center justify-center pointer-events-none">
              <div className="absolute w-32 h-32 rounded-full border border-indigo-500/20 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.2)_0%,transparent_70%)] animate-pulse" />
              <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-[#090b16]/95 border border-white/10 p-2.5 shadow-[0_0_35px_rgba(99,102,241,0.35)] backdrop-blur-xl">
                <Image
                  src="/whizzly-icon-crisp.png"
                  alt="Whizzly Lab Hub"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_10px_rgba(99,102,241,0.6)]"
                />
              </div>
            </div>

            {/* Orbiting Interaction Nodes */}
            {safeItems.map((item, i) => {
              const pos = getPosition(i, safeItems.length);
              const isActive = i === activeIndex;
              const platformRotate = pos.angleDeg + 90;
              const IconComponent = item.icon;
              const activate = () => setActiveIndex(i);

              return (
                <motion.div
                  key={item.id}
                  onMouseEnter={activate}
                  onClick={activate}
                  role="button"
                  tabIndex={0}
                  aria-label={item.title}
                  aria-pressed={isActive}
                  animate={{
                    x: pos.x,
                    y: pos.y,
                    scale: isActive ? 1.18 : 1.0,
                    zIndex: isActive ? 10 : 2,
                  }}
                  transition={spring}
                  style={{
                    position: "absolute",
                    width: eff.iconSize,
                    height: eff.iconSize,
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  {/* 3D Angled Platform Effect on Active Icon */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.6, rotateX: 0 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 22 }}
                        exit={{ opacity: 0, scale: 0.7, rotateX: 0 }}
                        transition={{ duration: 0.5, ease }}
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: "50%",
                          width: eff.iconSize * 1.55,
                          height: eff.iconSize * 1.55,
                          marginLeft: -(eff.iconSize * 1.55) / 2,
                          marginTop: -(eff.iconSize * 1.55) / 2,
                          borderRadius: 20,
                          background: `linear-gradient(160deg, ${item.glowColor} 0%, rgba(99,102,241,0.25) 100%)`,
                          boxShadow: `0 24px 45px -10px ${item.glowColor}, inset 0 1px 0 rgba(255,255,255,0.5)`,
                          border: `1px solid ${item.accentColor}88`,
                          transform: `rotateZ(${platformRotate}deg)`,
                          transformStyle: "preserve-3d",
                          pointerEvents: "none",
                          zIndex: -1,
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Icon Button Frame */}
                  <motion.div
                    animate={{
                      background: isActive
                        ? `linear-gradient(135deg, ${item.accentColor} 0%, #1e1b4b 100%)`
                        : "#090d18",
                      borderColor: isActive ? item.accentColor : "rgba(255, 255, 255, 0.12)",
                      boxShadow: isActive
                        ? `0 0 25px ${item.glowColor}, inset 0 1px 0 rgba(255,255,255,0.3)`
                        : "0 4px 16px rgba(0,0,0,0.5)",
                    }}
                    transition={{ duration: 0.35, ease }}
                    className="relative w-full h-full rounded-2xl flex items-center justify-center border transition-all"
                  >
                    <IconComponent
                      className="w-5 h-5 transition-transform"
                      style={{ color: isActive ? "#ffffff" : item.accentColor }}
                      strokeWidth={isActive ? 2.2 : 1.8}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Gutter Label */}
          <div
            style={{ width: labelWidth, height: wheelSize }}
            className="relative shrink-1 min-w-0"
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                right: 0,
                width: labelWidth,
              }}
              className="pl-6 flex justify-start pointer-events-none"
            >
              <AnimatePresence mode="wait" initial={false}>
                {labelOnRight && (
                  <motion.div
                    key={`right-${activeIndex}`}
                    initial={{ opacity: 0, y: clampedOffset + 12, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: clampedOffset, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: clampedOffset - 12, filter: "blur(4px)" }}
                    transition={{ duration: 0.35, ease }}
                    className="w-full max-w-sm pointer-events-auto"
                  >
                    {renderLabelContent()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
