"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Coffee,
  HeartPulse,
  KeyRound,
  Package,
  ScanEye,
  ShieldCheck,
  Shirt,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

// Real Whizzly Lab clients, rendered as icon + wordmark
type ClientMark = {
  name: string;
  Icon: LucideIcon;
  className?: string;
};

const CLIENTS: ClientMark[] = [
  { name: "COMPLYSECOPS", Icon: ShieldCheck, className: "tracking-[0.08em] font-extrabold" },
  { name: "XecureAI", Icon: ScanEye },
  { name: "CureCMS", Icon: HeartPulse },
  { name: "OXO Packaging", Icon: Box },
  { name: "Option Packaging", Icon: Package },
  { name: "Al-Deewan", Icon: Shirt },
  { name: "Rakanda Gold", Icon: Coffee },
  { name: "Keyspace Studio", Icon: KeyRound },
  { name: "RT Direct", Icon: Stethoscope },
];

function ClientLogo({ name, Icon, className = "tracking-tight font-bold" }: ClientMark) {
  return (
    <div className="flex items-center gap-2 select-none whitespace-nowrap">
      <Icon className="w-6 h-6 text-white shrink-0" strokeWidth={2.25} />
      <span className={`text-xl sm:text-2xl text-white ${className}`}>{name}</span>
    </div>
  );
}

// Two passes so the ring is always full across the curve
const LOGO_COMPONENTS = [1, 2].flatMap((pass) =>
  CLIENTS.map((client) => ({ id: `${client.name}-${pass}`, client }))
);

export default function CurvedHorizonMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileScreen(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Animate logos moving right to left along the curved horizon
  // Only runs while the stage is on screen: this re-renders React every frame, which
  // otherwise keeps the main thread busy while scrolling the rest of the page
  useEffect(() => {
    const stage = containerRef.current;
    if (!stage) return;

    let animId = 0;
    let lastTime = performance.now();
    const speed = 46; // pixels per second moving leftwards

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      setOffset((prev) => {
        // Continuous leftward progression
        return prev + speed * dt;
      });

      animId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(animId);
      if (entry.isIntersecting) {
        lastTime = performance.now();
        animId = requestAnimationFrame(tick);
      }
    });
    observer.observe(stage);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  const totalLogos = LOGO_COMPONENTS.length; // 18
  const logoSpacing = 250; // horizontal spacing between logo centers (client names are longer)
  const totalTrackWidth = totalLogos * logoSpacing; // 4500px
  const curveHalfWidth = isMobileScreen ? 360 : 620; // width over which the curve acts
  const dropHeight = isMobileScreen ? 44 : 72; // vertical drop at the curve edges

  return (
    <section className="relative z-40 w-full bg-black text-white pt-8 sm:pt-16 pb-4 sm:pb-8 overflow-hidden flex flex-col items-center">
      {/* 1. Header Text */}
      <div className="text-center mb-6 sm:mb-12 px-4 z-20 relative">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold mb-2 sm:mb-3 tracking-tight text-white font-sans">
          Trusted by Industry Leaders
        </h2>
        <p className="text-gray-400 text-xs sm:text-base font-light">
          Powering Innovation for Companies Worldwide
        </p>
      </div>

      {/* 2. Curved Horizon Stage */}
      <div
        ref={containerRef}
        className="relative w-full max-w-6xl h-[180px] sm:h-[260px] flex items-center justify-center overflow-hidden"
        style={{ perspective: "1000px" }}
      >
        {/* --- LOGOS MOVING RIGHT TO LEFT ALONG THE 3D CURVE --- */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {LOGO_COMPONENTS.map((item, index) => {
            // Positive wrapping modulo math for seamless right-to-left motion
            const normOffset = ((offset % totalTrackWidth) + totalTrackWidth) % totalTrackWidth;
            const rawX = ((index * logoSpacing - normOffset) % totalTrackWidth + totalTrackWidth) % totalTrackWidth;
            const posX = rawX > totalTrackWidth / 2 ? rawX - totalTrackWidth : rawX;

            // Normalized position along the visible curve (-1 to +1)
            const u = posX / curveHalfWidth;

            // Outside visible bounds, don't render
            if (Math.abs(u) > 1.25) return null;

            // Parabolic drop: Y increases (drops down) as |u| increases
            const posY = Math.pow(u, 2) * dropHeight;

            // Rotation tangent to the parabolic curve:
            // dY/dX = 2 * (dropHeight / curveHalfWidth) * u
            // rotZ in degrees:
            const rotZ = u * 15;
            // 3D perspective rotation around Y axis:
            const rotY = u * 25;

            // Opacity smoothly fades to 0 at the left and right edges
            const opacity = Math.max(0, Math.min(1, 1 - Math.pow(Math.abs(u), 3.0)));

            // Scale shrinks slightly at the distant horizon edges
            const scale = 1 - Math.abs(u) * 0.15;

            return (
              <div
                key={item.id}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto transition-transform duration-75"
                style={{
                  transform: `translate3d(${posX}px, ${posY - 26}px, ${-Math.abs(u) * 60}px) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`,
                  opacity,
                  filter: `drop-shadow(0 2px 8px rgba(0,0,0,0.8))`,
                }}
              >
                <ClientLogo {...item.client} />
              </div>
            );
          })}
        </div>

        {/* --- ELECTRIC BLUE GLOWING PLANET HORIZON ARC --- */}
        {/* SVG curved path directly underneath the logos */}
        <div className="absolute inset-x-0 bottom-6 sm:bottom-8 z-0 flex justify-center pointer-events-none">
          <svg
            className="w-full max-w-[1400px] h-[160px] overflow-visible"
            viewBox="0 0 1400 160"
            fill="none"
          >
            <defs>
              <linearGradient id="horizonGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
                <stop offset="15%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
                <stop offset="85%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
              </linearGradient>

              {/* Multi-layered electric glow filter */}
              <filter id="arcGlow" x="-20%" y="-40%" width="140%" height="200%">
                <feGaussianBlur stdDeviation="4" result="glow1" />
                <feGaussianBlur stdDeviation="14" result="glow2" />
                <feGaussianBlur stdDeviation="28" result="glow3" />
                <feMerge>
                  <feMergeNode in="glow3" />
                  <feMergeNode in="glow2" />
                  <feMergeNode in="glow1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Glowing Planet Curve Line matching the exact trajectory of the logos */}
            <path
              d="M 60 145 Q 700 35 1340 145"
              stroke="url(#horizonGlow)"
              strokeWidth="2.5"
              filter="url(#arcGlow)"
              opacity="0.95"
            />
            {/* Core bright white-blue highlight */}
            <path
              d="M 60 145 Q 700 35 1340 145"
              stroke="#93c5fd"
              strokeWidth="1.2"
              opacity="0.9"
            />
          </svg>
        </div>

        {/* Atmospheric Blue Backlight Halo */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[120px] rounded-full bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.35)_0%,rgba(59,130,246,0.12)_45%,transparent_75%)] blur-2xl z-0"
        />

        {/* Deep Planet Body (Dark shade below the arc line) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-[480px] left-1/2 -translate-x-1/2 w-[140%] h-[560px] rounded-[50%] bg-[#030308] border-t border-blue-500/20 z-0"
        />
      </div>
    </section>
  );
}
