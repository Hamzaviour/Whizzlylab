"use client";

import ModernNavbar from "./ModernNavbar";
import HeroVideoBackground from "./HeroVideoBackground";
import ProTextType from "./ProTextType";
import LogoMarquee from "./LogoMarquee";
import MagneticButton from "./MagneticButton";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  return (
    <div
      id="top"
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
    >
      <HeroVideoBackground />

      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[527px] w-[984px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 overflow-visible bg-gray-950 opacity-90 blur-[82px]"
      />

      <div className="relative z-10 flex w-full flex-1 flex-col justify-between">
        <ModernNavbar />

        <main className="flex flex-1 flex-col items-center justify-center px-4 py-8 text-center sm:py-12">
          {/* Studio Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs text-slate-300 backdrop-blur-md transition-colors hover:border-white/20"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="font-medium tracking-wide">Production Engineering Studio</span>
            <span className="text-white/20">/</span>
            <span className="text-slate-400">Deploying Q2 2026</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: "1200px" }}
            className="relative flex flex-col items-center"
          >
            {/* Ambient glow behind logo */}
            <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[320px] w-[320px] -translate-x-1/2 -translate-y-[60%] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.45)_0%,rgba(168,85,247,0.25)_40%,rgba(0,240,255,0.12)_60%,transparent_80%)] blur-2xl sm:h-[400px] sm:w-[400px] md:h-[480px] md:w-[480px]" />
            <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[200px] w-[200px] -translate-x-1/2 -translate-y-[50%] rounded-full bg-[radial-gradient(circle,rgba(0,240,255,0.3)_0%,rgba(99,102,241,0.15)_60%,transparent_80%)] blur-xl sm:h-[260px] sm:w-[260px] md:h-[320px] md:w-[320px]" />

            {/* Cursor-following particles */}
            <HeroCursorParticles />

            {/* Logo */}
            <Image
              src="/transparent-icon.png"
              alt="Whizzly Lab AI Systems, Real-Time Data Pipelines and Full-Stack Products"
              width={360}
              height={360}
              style={{ width: "auto" }}
              className="relative z-10 my-2 h-36 object-contain sm:h-44 md:h-52 lg:h-60"
              priority
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-general text-[clamp(2.2rem,6.5vw,78px)] leading-[1.08] font-bold tracking-[-0.035em] max-w-5xl"
          >
            <span className="text-white">Ship Production AI Systems That</span>{" "}
            <span
              className="bg-gradient-to-r from-[#00F0FF] via-[#6366f1] to-[#a855f7] bg-clip-text text-transparent"
              style={{ filter: "drop-shadow(0 0 35px rgba(0,240,255,0.4))" }}
            >
              Save Time & Scale
            </span>
            <span className="sr-only"> Whizzly Lab AI Studio and Software Engineering</span>
          </motion.h1>

          <div className="mt-4 max-w-2xl">
            <ProTextType
              as="p"
              className="text-hero-sub text-base leading-relaxed sm:text-lg sm:leading-8 font-normal"
              text="We turn prototypes into production software, specializing in autonomous RAG agents, AI automation, web development, digital marketing, and full stack engineering products."
              speed={16}
              delay={350}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8 flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
          >
            <MagneticButton href="/schedule">
              <span className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#00f0ff] px-7 py-3.5 text-sm font-semibold text-black shadow-[0_0_25px_rgba(0,240,255,0.35)] transition-all hover:opacity-95 sm:w-auto sm:px-8 sm:py-4">
                Book a Consult →
              </span>
            </MagneticButton>
            <MagneticButton href="/#work" strength={0.25}>
              <span className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition-all hover:border-white/40 hover:bg-white/10 sm:w-auto sm:px-7 sm:py-4">
                View Case Studies
              </span>
            </MagneticButton>
          </motion.div>

          {/* Quick Capability & Trust Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-hero-sub/70"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> Zero Silent Pipeline Failures
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" /> Sub 100ms Inference Latency
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> HIPAA and SOC2 Compliant
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> 24h Response SLA
            </span>
          </motion.div>
        </main>

        <LogoMarquee />
      </div>
    </div>
  );
}

function HeroCursorParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999, active: false });
  const raf = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !finePointer) return;

    type P = { x: number; y: number; vx: number; vy: number; r: number; life: number; maxLife: number; color: string };
    let particles: P[] = [];
    let w = 0;
    let h = 0;
    let isVisible = true;
    let isLooping = false;

    const COLORS = ["#6366f1", "#a855f7", "#00f0ff", "#60a5fa", "#c084fc"];

    const resize = () => {
      const parent = canvas.parentElement;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = parent?.clientWidth || window.innerWidth;
      h = parent?.clientHeight || window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (cx: number, cy: number) => {
      const count = 2;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + 0.5;
        particles.push({
          x: cx + (Math.random() - 0.5) * 20,
          y: cy + (Math.random() - 0.5) * 20,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: Math.random() * 2 + 1,
          life: 1,
          maxLife: 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    };

    const startLoop = () => {
      if (!isLooping && isVisible) {
        isLooping = true;
        raf.current = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom || e.clientX < rect.left || e.clientX > rect.right) {
        mouse.current.active = false;
        return;
      }
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      mouse.current.active = true;
      startLoop();
    };
    const onLeave = () => { mouse.current.active = false; };

    const tick = () => {
      if (!isVisible) {
        isLooping = false;
        return;
      }

      ctx.clearRect(0, 0, w, h);

      if (mouse.current.active) {
        spawn(mouse.current.x, mouse.current.y);
      }

      particles = particles.filter((p) => p.life > 0);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.life -= 0.02;

        if (p.life <= 0) continue;

        const alpha = Math.max(0, p.life * 0.8);
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (particles.length > 0 || mouse.current.active) {
        raf.current = requestAnimationFrame(tick);
      } else {
        isLooping = false;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && (particles.length > 0 || mouse.current.active)) {
          startLoop();
        } else if (!isVisible) {
          isLooping = false;
          cancelAnimationFrame(raf.current);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) {
        isVisible = false;
        isLooping = false;
        cancelAnimationFrame(raf.current);
      } else {
        isVisible = true;
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);

    return () => {
      cancelAnimationFrame(raf.current);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
