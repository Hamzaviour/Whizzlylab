"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Shield, Cpu, Code2, Globe } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  domain: string;
  avatar: string;
  accentColor: string;
  isFounder?: boolean;
}

const INNER_ORBIT_TEAM: TeamMember[] = [
  {
    id: "hamza-younas",
    name: "Hamza Younas",
    role: "Founder & Lead Systems Architect",
    domain: "Distributed AI & Neural Engines",
    avatar: "/my-image.png",
    accentColor: "#00F0FF", // Electric Cyan
    isFounder: true,
  },
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    role: "Principal ML Researcher",
    domain: "Transformer Fine-Tuning & RAG",
    avatar: "/images/avatars/sarah-chen.webp",
    accentColor: "#A855F7", // Deep Violet
  },
  {
    id: "marcus-webb",
    name: "Marcus Webb",
    role: "Distributed Systems Lead",
    domain: "Kafka Streaming & Telemetry",
    avatar: "/images/avatars/marcus-webb.webp",
    accentColor: "#3B82F6", // Electric Blue
  },
  {
    id: "jennifer-liu",
    name: "Jennifer Liu",
    role: "Lead Full-Stack Architect",
    domain: "Next.js & High-Scale Cloud",
    avatar: "/images/avatars/jennifer-liu.webp",
    accentColor: "#EC4899", // Neon Pink
  },
];

const OUTER_ORBIT_TEAM: TeamMember[] = [
  {
    id: "david-park",
    name: "David Park",
    role: "DevOps & Cloud Architect",
    domain: "Kubernetes & AWS Infra",
    avatar: "/images/avatars/david-park.webp",
    accentColor: "#10B981", // Emerald
  },
  {
    id: "ayesha-rahman",
    name: "Ayesha Rahman",
    role: "AI Safety & Guardrails Lead",
    domain: "Hallucination Evals",
    avatar: "/images/avatars/ayesha-rahman.webp",
    accentColor: "#F59E0B", // Amber Gold
  },
  {
    id: "alexandre-moreau",
    name: "Alexandre Moreau",
    role: "Real-Time Systems Specialist",
    domain: "Vector Indexing & Low Latency",
    avatar: "/images/avatars/alexandre-moreau.webp",
    accentColor: "#06B6D4", // Cyan
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    role: "WebGL & 3D Graphics Engineer",
    domain: "Three.js & GLSL Shaders",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    accentColor: "#8B5CF6", // Purple
  },
  {
    id: "karan-mehta",
    name: "Karan Mehta",
    role: "Automation & Workflow Lead",
    domain: "n8n & Voice AI Orchestration",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    accentColor: "#F43F5E", // Rose
  },
];

export default function OrbitTeamSection() {
  const [hoveredMember, setHoveredMember] = useState<TeamMember | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  return (
    <section className="relative z-10 pt-20 sm:pt-24 pb-6 sm:pb-8 px-5 sm:px-10 lg:px-16 max-w-7xl mx-auto border-t border-white/[0.06] overflow-hidden">
      {/* Background Volumetric Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.14)_0%,rgba(0,240,255,0.06)_40%,transparent_75%)] blur-3xl"
      />

      {/* Header */}
      <div className="mb-14 sm:mb-20 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-mono uppercase tracking-widest text-indigo-300 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>The Engineering Squad</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white font-sans leading-[1.12]">
          An Elite Squad Orbiting <br />
          <span className="italic font-light text-white">One Shared Mission</span>.
        </h2>

        <p className="mt-4 text-sm sm:text-base text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
          Distributed AI researchers, distributed systems architects, and product engineers crafting production-grade software.
        </p>
      </div>

      {/* ===================== ORBIT STAGE ===================== */}
      <div
        className="relative w-full max-w-[700px] aspect-square mx-auto flex items-center justify-center my-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setHoveredMember(null);
        }}
      >
        {/* SVG Orbital Track Rings */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 700 700"
          fill="none"
        >
          {/* Inner Orbit Track */}
          <circle
            cx="350"
            cy="350"
            r="165"
            stroke="rgba(255, 255, 255, 0.09)"
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />
          {/* Outer Orbit Track */}
          <circle
            cx="350"
            cy="350"
            r="285"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          {/* Subtle Outer Boundary Ring */}
          <circle
            cx="350"
            cy="350"
            r="340"
            stroke="rgba(255, 255, 255, 0.025)"
            strokeWidth="1"
          />
        </svg>

        {/* Ambient Ring Lighting */}
        <div className="pointer-events-none absolute w-[330px] h-[330px] rounded-full border border-indigo-500/10 bg-indigo-500/[0.02]" />
        <div className="pointer-events-none absolute w-[570px] h-[570px] rounded-full border border-cyan-500/10 bg-cyan-500/[0.01]" />

        {/* ===================== CENTER HUB (WHIZZLY LAB LOGO) ===================== */}
        <div className="relative z-20 group">
          {/* Beacon pulse */}
          <div className="absolute inset-0 rounded-full bg-indigo-500/25 blur-xl scale-150 animate-pulse pointer-events-none" />

          {/* Glowing Center Glass Hub */}
          <Link
            href="/"
            aria-label="Whizzly Lab Center"
            className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#080a14]/95 border border-indigo-400/50 shadow-[0_0_50px_rgba(99,102,241,0.55)] backdrop-blur-xl transition-all duration-300 group-hover:scale-110 group-hover:border-indigo-300 group-hover:shadow-[0_0_70px_rgba(99,102,241,0.8)]"
          >
            <Image
              src="/transparent-icon.png"
              alt="Whizzly Lab"
              width={64}
              height={64}
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain filter drop-shadow-[0_2px_14px_rgba(99,102,241,0.7)]"
              priority
            />
          </Link>

          {/* Center Badge */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <span className="px-2.5 py-0.5 rounded-full bg-black/90 border border-indigo-500/30 text-[10px] font-mono uppercase tracking-wider text-indigo-300">
              Whizzly Lab Core
            </span>
          </div>
        </div>

        {/* ===================== INNER ORBIT ===================== */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            animation: "orbit-spin 34s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {INNER_ORBIT_TEAM.map((member, index) => {
            const angle = (360 / INNER_ORBIT_TEAM.length) * index;
            // Radius ~165px in 700x700 space
            const radius = 165;
            const x = Math.round(Math.cos((angle * Math.PI) / 180) * radius);
            const y = Math.round(Math.sin((angle * Math.PI) / 180) * radius);

            return (
              <div
                key={member.id}
                className="absolute pointer-events-auto"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                {/* Counter-rotation to keep avatar upright */}
                <div
                  style={{
                    animation: "orbit-counter-spin 34s linear infinite",
                    animationPlayState: isPaused ? "paused" : "running",
                  }}
                >
                  <div
                    className="relative group cursor-pointer"
                    onMouseEnter={() => setHoveredMember(member)}
                    onMouseLeave={() => setHoveredMember(null)}
                  >
                    {/* Hover Glow */}
                    <div
                      className="absolute inset-0 rounded-full blur-md opacity-40 group-hover:opacity-100 transition-all duration-300 scale-125"
                      style={{ backgroundColor: member.accentColor }}
                    />

                    {/* Avatar Container */}
                    <div
                      className={`relative rounded-full overflow-hidden border-2 bg-[#090b14] transition-all duration-300 ${
                        member.isFounder
                          ? "w-14 h-14 sm:w-16 sm:h-16 shadow-[0_0_25px_rgba(0,240,255,0.45)]"
                          : "w-11 h-11 sm:w-13 sm:h-13"
                      } group-hover:scale-120 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]`}
                      style={{ borderColor: member.accentColor }}
                    >
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>

                    {/* Status beacon dot */}
                    <span
                      className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-black"
                      style={{ backgroundColor: member.accentColor }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ===================== OUTER ORBIT ===================== */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            animation: "orbit-spin-reverse 48s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {OUTER_ORBIT_TEAM.map((member, index) => {
            const angle = (360 / OUTER_ORBIT_TEAM.length) * index;
            // Radius ~285px in 700x700 space
            const radius = 285;
            const x = Math.round(Math.cos((angle * Math.PI) / 180) * radius);
            const y = Math.round(Math.sin((angle * Math.PI) / 180) * radius);

            return (
              <div
                key={member.id}
                className="absolute pointer-events-auto"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                {/* Counter-rotation to keep avatar upright */}
                <div
                  style={{
                    animation: "orbit-counter-spin-reverse 48s linear infinite",
                    animationPlayState: isPaused ? "paused" : "running",
                  }}
                >
                  <div
                    className="relative group cursor-pointer"
                    onMouseEnter={() => setHoveredMember(member)}
                    onMouseLeave={() => setHoveredMember(null)}
                  >
                    {/* Hover Glow */}
                    <div
                      className="absolute inset-0 rounded-full blur-md opacity-30 group-hover:opacity-90 transition-all duration-300 scale-125"
                      style={{ backgroundColor: member.accentColor }}
                    />

                    {/* Avatar Container */}
                    <div
                      className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 bg-[#090b14] transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                      style={{ borderColor: member.accentColor }}
                    >
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        fill
                        sizes="50px"
                        className="object-cover"
                      />
                    </div>

                    {/* Status beacon dot */}
                    <span
                      className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-black"
                      style={{ backgroundColor: member.accentColor }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===================== FLOATING PROFILE CARD (ON HOVER) ===================== */}
      {hoveredMember && (
        <div className="relative max-w-md mx-auto mt-4 mb-2 flex items-center justify-center text-center">
          <div className="w-full p-4 rounded-2xl bg-[#090b16]/90 border border-white/15 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.8)] transition-all duration-300 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-base sm:text-lg font-semibold text-white font-sans">
                {hoveredMember.name}
              </span>
              {hoveredMember.isFounder && (
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-[10px] font-mono uppercase tracking-wider text-cyan-300">
                  Founder
                </span>
              )}
            </div>
            <div className="text-xs sm:text-sm text-gray-300 font-medium font-sans">
              {hoveredMember.role}
            </div>
            <div
              className="mt-1.5 inline-block text-[11px] font-mono tracking-wider uppercase font-semibold"
              style={{ color: hoveredMember.accentColor }}
            >
              {hoveredMember.domain}
            </div>
          </div>
        </div>
      )}

      {/* Keyframe Styles for True Orbital Motion with Upright Avatars */}
      <style jsx>{`
        @keyframes orbit-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes orbit-counter-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        @keyframes orbit-spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        @keyframes orbit-counter-spin-reverse {
          from {
            transform: rotate(-360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </section>
  );
}
