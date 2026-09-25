"use client";

import { ShieldCheck, Lock, Award, CheckCircle2, Server, Terminal, Cpu, Zap } from "lucide-react";

const BADGES = [
  {
    icon: ShieldCheck,
    title: "HIPAA Ready",
    subtitle: "Zero Data Leakage",
    iconColor: "text-emerald-400",
    glow: "rgba(52, 211, 153, 0.15)",
  },
  {
    icon: Lock,
    title: "SOC2 Aligned",
    subtitle: "Encrypted VPCs",
    iconColor: "text-cyan-400",
    glow: "rgba(0, 240, 255, 0.15)",
  },
  {
    icon: Server,
    title: "99.98% Uptime",
    subtitle: "Kafka Production SLA",
    iconColor: "text-indigo-400",
    glow: "rgba(99, 102, 241, 0.15)",
  },
  {
    icon: CheckCircle2,
    title: "Senior Review",
    subtitle: "Direct Engineer SLA",
    iconColor: "text-purple-400",
    glow: "rgba(168, 85, 247, 0.15)",
  },
  {
    icon: Award,
    title: "Clutch Top AI",
    subtitle: "5.0 Client Rating",
    iconColor: "text-amber-400",
    glow: "rgba(251, 191, 36, 0.15)",
  },
  {
    icon: Terminal,
    title: "Verified Code",
    subtitle: "100% Client Owned",
    iconColor: "text-cyan-300",
    glow: "rgba(0, 240, 255, 0.15)",
  },
  {
    icon: Cpu,
    title: "Sub 100ms",
    subtitle: "Real-Time Inference",
    iconColor: "text-teal-400",
    glow: "rgba(45, 212, 191, 0.15)",
  },
  {
    icon: Zap,
    title: "Zero Silent Drops",
    subtitle: "Automated Telemetry",
    iconColor: "text-blue-400",
    glow: "rgba(96, 165, 250, 0.15)",
  },
];

export default function TrustBadges({ className = "" }: { className?: string }) {
  // Duplicate array for seamless infinite marquee loop
  const duplicated = [...BADGES, ...BADGES];

  return (
    <div className={`relative w-full overflow-hidden py-4 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] py-3.5 backdrop-blur-md [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max items-center gap-4 sm:gap-6 animate-marquee hover:[animation-play-state:paused]">
            {duplicated.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div
                  key={`${badge.title}-${idx}`}
                  className="flex shrink-0 items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06] hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]"
                >
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5"
                    style={{ boxShadow: `0 0 12px ${badge.glow}` }}
                  >
                    <Icon className={`h-4 w-4 ${badge.iconColor} shrink-0`} />
                  </div>
                  <div className="text-left whitespace-nowrap">
                    <div className="text-xs font-semibold text-white leading-tight">
                      {badge.title}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {badge.subtitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
