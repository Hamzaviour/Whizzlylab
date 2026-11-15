"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowUpRight, Menu, X, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleMorphCanvas, { ParticleMorphHandle, ShapeType } from "./ParticleMorphCanvas";
import { SERVICES_DATA } from "@/lib/servicesData";
import { COMPANY_PHONE, HAS_PHONE, PHONE_URL } from "@/lib/contact";
import Link from "next/link";
import Image from "next/image";

// Register GSAP ScrollTrigger plugin on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroWithServicesTransition() {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const servicesTrackRef = useRef<HTMLElement>(null);
  const servicesContentRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const nebulaGlowRef = useRef<HTMLDivElement>(null);
  const cardsTrackRef = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<ParticleMorphHandle>(null);

  // Synchronized navigation lock refs to prevent ScrollTrigger fight during card click
  const isClickNavigatingRef = useRef(false);
  const clickNavTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const activeServiceIndexRef = useRef(0);

  // Touch gesture refs for horizontal card swiping on mobile
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const touchDeltaXRef = useRef(0);

  // Listen for user wheel or touch interrupts to immediately release click navigation lock
  useEffect(() => {
    const handleUserInterrupt = () => {
      if (isClickNavigatingRef.current) {
        isClickNavigatingRef.current = false;
        if (clickNavTimeoutRef.current) {
          clearTimeout(clickNavTimeoutRef.current);
          clickNavTimeoutRef.current = null;
        }
      }
    };

    window.addEventListener("wheel", handleUserInterrupt, { passive: true });
    window.addEventListener("touchstart", handleUserInterrupt, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleUserInterrupt);
      window.removeEventListener("touchstart", handleUserInterrupt);
      if (clickNavTimeoutRef.current) {
        clearTimeout(clickNavTimeoutRef.current);
      }
    };
  }, []);

  // Track scroll position: pastHero = show CTA in navbar, scrolled = glassmorphism bg
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);
      setPastHero(scrollY > window.innerHeight * 0.55);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update cards track transform on window resize
  useEffect(() => {
    const handleResize = () => {
      if (cardsTrackRef.current) {
        const firstCard = cardsTrackRef.current.children[0] as HTMLElement | undefined;
        const isDesktop = window.innerWidth >= 1024;
        const cardStep = firstCard ? firstCard.offsetWidth + 24 : (isDesktop ? 394 : 330);
        cardsTrackRef.current.style.transform = `translate3d(${-activeServiceIndexRef.current * cardStep}px, 0, 0)`;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP ScrollTrigger setup for nebula glow movement and services card tracking
  useEffect(() => {
    if (!servicesTrackRef.current || !canvasContainerRef.current) return;

    const isDesktop = window.innerWidth >= 1024;

    // 1. Move nebula backdrop glow from center in Hero directly behind the left 3D docking bay in Services
    const glowTrigger = ScrollTrigger.create({
      trigger: servicesTrackRef.current,
      start: "top bottom",
      end: "top top",
      scrub: 2,
      onUpdate: (self) => {
        if (nebulaGlowRef.current) {
          const dock = document.getElementById("services-3d-dock");
          if (dock && isDesktop) {
            const rect = dock.getBoundingClientRect();
            const targetScreenX = rect.left + rect.width / 2;
            const targetScreenY = rect.top + rect.height / 2;
            const startX = window.innerWidth / 2;
            const startY = window.innerHeight / 2;
            const curX = startX + (targetScreenX - startX) * self.progress;
            const curY = startY + (targetScreenY - startY) * self.progress;
            nebulaGlowRef.current.style.transform = `translate3d(${curX - startX}px, ${curY - startY}px, 0)`;
          } else {
            nebulaGlowRef.current.style.transform = "translate3d(0, 0, 0)";
          }
        }
      },
      onLeaveBack: () => {
        if (nebulaGlowRef.current) {
          nebulaGlowRef.current.style.transform = "translate3d(0, 0, 0)";
        }
      },
    });

    // 2. Sequential cards & shape morphing as user scrolls through pinned Services section
    const cardCount = SERVICES_DATA.length;

    const servicesCardsTrigger = ScrollTrigger.create({
      trigger: servicesTrackRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
      onUpdate: (self) => {
        // Prevent ScrollTrigger from overriding card click navigation while smooth scrolling
        if (isClickNavigatingRef.current) return;

        const progress = Math.min(Math.max(self.progress, 0), 0.999);
        const newIndex = Math.min(cardCount - 1, Math.floor(progress * cardCount));

        // Only update when index actually changes to preserve 60fps CSS transitions
        if (newIndex !== activeServiceIndexRef.current) {
          activeServiceIndexRef.current = newIndex;
          setActiveServiceIndex(newIndex);

          if (particleCanvasRef.current) {
            const targetShape: ShapeType = SERVICES_DATA[newIndex]?.shape || "cube";
            particleCanvasRef.current.setShape(targetShape);
          }

          if (cardsTrackRef.current) {
            const firstCard = cardsTrackRef.current.children[0] as HTMLElement | undefined;
            const cardStep = firstCard ? firstCard.offsetWidth + 24 : (isDesktop ? 394 : 330);
            cardsTrackRef.current.style.transform = `translate3d(${-newIndex * cardStep}px, 0, 0)`;
          }
        }
      },
      onLeaveBack: () => {
        if (isClickNavigatingRef.current) return;
        activeServiceIndexRef.current = 0;
        setActiveServiceIndex(0);
        if (cardsTrackRef.current) {
          cardsTrackRef.current.style.transform = "translate3d(0, 0, 0)";
        }
        if (particleCanvasRef.current) {
          particleCanvasRef.current.setShape("cube");
        }
      },
    });

    // 3. Fade out hero bottom stats gracefully as user starts scrolling to eliminate collision with Services
    const heroFadeTrigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "top+=240px top",
      scrub: 0.4,
      onUpdate: (self) => {
        const heroBottom = document.getElementById("hero-bottom-actions");
        if (heroBottom) {
          heroBottom.style.opacity = `${Math.max(0, 1.0 - self.progress)}`;
          heroBottom.style.transform = `translate3d(0, ${-self.progress * 24}px, 0)`;
        }
      },
      onLeaveBack: () => {
        const heroBottom = document.getElementById("hero-bottom-actions");
        if (heroBottom) {
          heroBottom.style.opacity = "1";
          heroBottom.style.transform = "translate3d(0, 0, 0)";
        }
      },
    });

    // 4. Hide the fixed canvas layer (incl. blurred nebula glow) once past Services, so it isn't
    // composited over every section below on each scroll frame (major jank on mobile GPUs)
    const layerHideTrigger = ScrollTrigger.create({
      trigger: servicesTrackRef.current,
      start: "bottom+=120px top",
      onEnter: () => {
        if (canvasContainerRef.current) canvasContainerRef.current.style.visibility = "hidden";
      },
      onLeaveBack: () => {
        if (canvasContainerRef.current) canvasContainerRef.current.style.visibility = "visible";
      },
    });

    return () => {
      layerHideTrigger.kill();
      glowTrigger.kill();
      servicesCardsTrigger.kill();
      heroFadeTrigger.kill();
    };
  }, []);

  const handleSelectService = useCallback((index: number) => {
    if (index < 0 || index >= SERVICES_DATA.length) return;

    // 1. Lock ScrollTrigger updates during smooth click transition
    isClickNavigatingRef.current = true;
    activeServiceIndexRef.current = index;
    setActiveServiceIndex(index);

    // 2. Morph 3D particle canvas immediately
    if (particleCanvasRef.current) {
      const targetShape: ShapeType = SERVICES_DATA[index]?.shape || "cube";
      particleCanvasRef.current.setShape(targetShape);
    }

    // 3. Smoothly animate carousel track to the targeted card
    if (cardsTrackRef.current) {
      const firstCard = cardsTrackRef.current.children[0] as HTMLElement | undefined;
      const isDesktop = window.innerWidth >= 1024;
      const cardStep = firstCard ? firstCard.offsetWidth + 24 : (isDesktop ? 394 : 330);
      cardsTrackRef.current.style.transform = `translate3d(${-index * cardStep}px, 0, 0)`;
    }

    // 4. Smooth scroll the window to the exact position within the pinned services track
    if (servicesTrackRef.current) {
      const winH = window.innerHeight;
      const servicesTop = window.scrollY + servicesTrackRef.current.getBoundingClientRect().top;
      const servicesTotalScroll = servicesTrackRef.current.offsetHeight - winH;
      const targetScrollWithin = (index + 0.5) * (servicesTotalScroll / SERVICES_DATA.length);

      window.scrollTo({
        top: servicesTop + targetScrollWithin,
        behavior: "smooth",
      });
    }

    // 5. Release lock after smooth scroll completes
    if (clickNavTimeoutRef.current) {
      clearTimeout(clickNavTimeoutRef.current);
    }
    clickNavTimeoutRef.current = setTimeout(() => {
      isClickNavigatingRef.current = false;
    }, 750);
  }, []);

  const handleScrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const sEl = document.getElementById("services");
    if (sEl) {
      sEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full bg-black text-white">
      {/* ===================== 1. THE PERSISTENT 3D PARTICLE CANVAS ===================== */}
      <div
        ref={canvasContainerRef}
        className="pointer-events-none fixed inset-0 z-20 select-none overflow-hidden"
        style={{ willChange: "opacity" }}
      >
        {/* Circular Purple-Indigo Atmospheric Nebula Glow Backdrop (Responsive on mobile) */}
        <div
          ref={nebulaGlowRef}
          aria-hidden
          className="absolute top-[46%] sm:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[440px] sm:h-[440px] lg:w-[500px] lg:h-[500px] rounded-full bg-[radial-gradient(circle,rgba(80,85,175,0.48)_0%,rgba(65,70,150,0.22)_42%,transparent_72%)] blur-[55px] sm:blur-[75px] pointer-events-none transition-transform duration-75"
        />

        {/* 3D Particle Canvas Viewport */}
        <ParticleMorphCanvas
          ref={particleCanvasRef}
          cameraZ={7.5}
          rotationSpeed={0.0045}
          className="w-full h-full"
        />
      </div>

      {/* ===================== 2. HERO SECTION ===================== */}
      <section
        ref={heroRef}
        className="relative z-30 w-full min-h-screen flex flex-col justify-between pt-16 sm:pt-18 pb-12 px-6 sm:px-10 lg:px-16 overflow-hidden pointer-events-auto"
      >
        {/* Top-Left Volumetric Spotlight Beam (Subtle Balanced Volumetric Light) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -left-36 w-[800px] sm:w-[950px] lg:w-[1150px] h-[1300px] origin-top-left -rotate-[32deg] z-10 overflow-hidden"
        >
          {/* Layer 1: Ambient Atmospheric Soft Glow Cone */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              background:
                "linear-gradient(180deg, rgba(165,180,252,0.42) 0%, rgba(129,140,248,0.25) 24%, rgba(99,102,241,0.11) 50%, rgba(79,70,229,0.025) 75%, transparent 100%)",
              filter: "blur(55px)",
              clipPath: "polygon(14% 0%, 64% 0%, 100% 100%, 0% 100%)",
            }}
          />
          {/* Layer 2: Core Volumetric Light Beam (Focused & Softly Luminous) */}
          <div
            className="absolute inset-0 w-full h-full mix-blend-screen"
            style={{
              background:
                "linear-gradient(180deg, rgba(238,242,255,0.49) 0%, rgba(199,210,254,0.35) 18%, rgba(129,140,248,0.19) 42%, rgba(99,102,241,0.07) 70%, transparent 100%)",
              filter: "blur(28px)",
              clipPath: "polygon(22% 0%, 54% 0%, 84% 100%, 8% 100%)",
            }}
          />
        </div>

        {/* Top-Left Spotlight Source Emitter Flare */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 sm:w-96 sm:h-96 rounded-full z-10 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(224,231,255,0.42) 0%, rgba(165,180,252,0.26) 30%, rgba(99,102,241,0.10) 60%, transparent 75%)",
          }}
        />

        {/* Watermark Background Text: "WHIZZLY LAB" */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen flex justify-center items-center select-none z-5"
        >
          <span className="text-[13vw] font-bold uppercase tracking-[0.24em] text-white/[0.045] leading-none font-sans whitespace-nowrap">
            WHIZZLY LAB
          </span>
        </div>

      {/* ===================== FIXED STICKY NAVIGATION HEADER ===================== */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-[60] flex items-center justify-between w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-3 sm:py-4 pointer-events-auto transition-[background-color,border-color,box-shadow] duration-500 ${
          scrolled
            ? "bg-black/70 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent backdrop-blur-none"
        }`}
        style={{ left: 0, right: 0 }}
      >
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="relative flex items-center justify-center w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] shrink-0">
              <Image
                src="/whizzly-icon-crisp.png"
                alt="Whizzly Lab Logo"
                width={40}
                height={40}
                unoptimized
                className="w-full h-full object-contain filter drop-shadow-[0_2px_10px_rgba(99,102,241,0.5)] transition-transform duration-300 group-hover:scale-110"
                priority
              />
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-wider text-white uppercase font-sans">
              WHIZZLY LAB
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <Link href="/work" className="hover:text-white transition-colors">
              Work
            </Link>
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              Company
            </Link>
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {HAS_PHONE && (
              <>
                {/* Phone Number CTA */}
                <a
                  href={PHONE_URL}
                  className="hidden lg:inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 text-xs sm:text-sm font-medium text-gray-200 hover:text-white transition-all duration-300 backdrop-blur-md group"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                    <Phone className="h-3 w-3" />
                  </div>
                  <span className="font-mono tracking-tight text-xs sm:text-sm">{COMPANY_PHONE}</span>
                </a>

                {/* Mobile / Tablet Quick Call Trigger */}
                <a
                  href={PHONE_URL}
                  aria-label={`Call ${COMPANY_PHONE}`}
                  className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-indigo-300 hover:text-white hover:bg-white/10 transition"
                >
                  <Phone className="h-4 w-4" />
                </a>
              </>
            )}

            {/* Start Your Project CTA: always in the desktop nav; on mobile it appears
                once the hero's own button has scrolled away. */}
            <Link
              href="/schedule"
              className={`group items-center gap-2 sm:gap-2.5 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-xs sm:text-sm font-medium text-white hover:border-white transition-all duration-300 ${
                pastHero ? "flex" : "hidden md:flex"
              }`}
            >
              <span>
                Start<span className="hidden sm:inline"> Your Project</span>
              </span>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:scale-110">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </Link>

            {/* Mobile Hamburger Trigger */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white md:hidden hover:bg-white/10 transition"
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </motion.header>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-x-4 top-[60px] z-[55] rounded-3xl border border-white/15 bg-black/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl pointer-events-auto"
            >
              <nav className="flex flex-col gap-3 text-base font-medium">
                <Link
                  href="/work"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-gray-300 hover:text-white transition-colors border-b border-white/10"
                >
                  Work
                </Link>
                <Link
                  href="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-gray-300 hover:text-white transition-colors border-b border-white/10"
                >
                  Services
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-gray-300 hover:text-white transition-colors border-b border-white/10"
                >
                  Company
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-gray-300 hover:text-white transition-colors border-b border-white/10"
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-gray-300 hover:text-white transition-colors border-b border-white/10"
                >
                  Contact
                </Link>
                {HAS_PHONE && (
                  <a
                    href={PHONE_URL}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 rounded-full border border-white/15 bg-white/5 text-gray-200 text-sm font-medium hover:bg-white/10 hover:text-white transition"
                  >
                    <Phone className="h-4 w-4 text-indigo-400" />
                    <span>Call: {COMPANY_PHONE}</span>
                  </a>
                )}

                <Link
                  href="/schedule"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-1 flex items-center justify-center gap-2 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-200 transition"
                >
                  <span>Start Your Project</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Asymmetric Staggered Main Headline Over Globe (Top-Left & Bottom-Right) */}
        <div className="relative z-20 w-full max-w-5xl lg:max-w-6xl mx-auto my-auto px-4 sm:px-6 lg:px-8 pointer-events-none select-none">
          <h1 className="w-full flex flex-col gap-2 sm:gap-4 md:gap-5 lg:gap-6 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.4rem] font-light leading-[1.18] sm:leading-[1.2] tracking-tight text-white font-sans drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            {/* Top-Left: "Building Digital" — staggered word entrance */}
            <span className="self-start text-left whitespace-normal sm:whitespace-nowrap font-light text-white/95 pb-1">
              <motion.span
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block pb-1"
              >
                Building{" "}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block italic font-bold text-white font-sans pr-2 pb-1"
              >
                Digital
              </motion.span>
            </span>

            {/* Bottom-Right: "Solutions That Matter" — staggered word entrance */}
            <span className="self-end text-right whitespace-normal sm:whitespace-nowrap font-light text-white/95 pb-1">
              <motion.span
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block italic font-bold text-white font-sans pr-2 pb-1"
              >
                Solutions{" "}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block pb-1"
              >
                That Matter
              </motion.span>
            </span>
          </h1>
        </div>

        {/* Bottom Hero Elements: Subtext & CTA on left, Stats on right */}
        <div
          id="hero-bottom-actions"
          className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:pr-24 relative z-30 pointer-events-auto transition-opacity"
        >
          {/* Subtext & CTA — fade in after headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-sm sm:max-w-md text-left"
          >
            <p className="text-gray-300/90 text-sm sm:text-base mb-6 font-light leading-relaxed">
              We empower organizations with AI that turns complex challenges into real-world outcomes.
            </p>
            <Link
              href="/schedule"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#5b6bf0] hover:bg-[#4b5be0] text-white font-medium text-sm sm:text-base shadow-[0_0_32px_rgba(91,107,240,0.6)] transition-all hover:scale-105 duration-300"
            >
              Start Your Project
            </Link>
          </motion.div>

          {/* Stats — animate up from bottom with stagger */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 1.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-start sm:items-center gap-7 sm:gap-10 lg:gap-14 pr-16 sm:pr-0"
          >
            <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2.5">
              <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-white font-sans">
                50+
              </span>
              <span className="text-[11px] sm:text-xs text-gray-400 font-light leading-tight text-left">
                Projects
                <br />
                Delivered
              </span>
            </div>

            <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2.5">
              <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-white font-sans">
                100%
              </span>
              <span className="text-[11px] sm:text-xs text-gray-400 font-light leading-tight text-left">
                Client
                <br />
                Satisfaction
              </span>
            </div>

            <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2.5">
              <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-white font-sans">
                24/7
              </span>
              <span className="text-[11px] sm:text-xs text-gray-400 font-light leading-tight text-left">
                Support
                <br />
                Available
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== 3. OUR SERVICES SECTION (Scroll-Pinned Track) ===================== */}
      <section
        id="services"
        ref={servicesTrackRef}
        className="services-section relative z-30 w-full min-h-[220vh] lg:min-h-[300vh]"
      >
        {/* Sticky Full-Viewport Container */}
        <div
          ref={servicesContentRef}
          className="sticky top-0 h-screen w-full flex items-center px-4 sm:px-10 lg:px-14 overflow-hidden"
        >
          <div className="w-full max-w-[1540px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left 5 Columns: Dedicated 3D Shape Docking Bay */}
            <div
              id="services-3d-dock"
              className="hidden lg:flex lg:col-span-5 items-center justify-center w-full h-[520px] pointer-events-none"
            />

            {/* Right 7 Columns: Services Header & Glassmorphism Interactive Cards */}
            <div className="lg:col-span-7 flex flex-col relative z-40 pointer-events-auto">
              {/* Header Row: Title on left, subtitle on right */}
              <div className="mb-7 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pr-4">
                <div>
                  <h2 className="text-4xl sm:text-5xl font-normal tracking-tight text-white font-sans">
                    Our Services
                  </h2>
                </div>
                <p className="max-w-sm text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                  We offer comprehensive digital solutions that transform your business and drive innovation across every touchpoint.
                </p>
              </div>

              {/* Cards Carousel Window with Smooth Sliding Track & Touch Swipe */}
              <div className="relative w-full overflow-hidden py-3">
                <div
                  ref={cardsTrackRef}
                  className="flex gap-4 sm:gap-6 will-change-transform"
                  style={{
                    transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onTouchStart={(e) => {
                    touchStartXRef.current = e.touches[0].clientX;
                    touchStartYRef.current = e.touches[0].clientY;
                    touchDeltaXRef.current = 0;
                  }}
                  onTouchMove={(e) => {
                    const deltaX = e.touches[0].clientX - touchStartXRef.current;
                    const deltaY = e.touches[0].clientY - touchStartYRef.current;
                    if (Math.abs(deltaX) > Math.abs(deltaY)) {
                      touchDeltaXRef.current = deltaX;
                    }
                  }}
                  onTouchEnd={() => {
                    if (Math.abs(touchDeltaXRef.current) > 35) {
                      if (touchDeltaXRef.current < 0) {
                        handleSelectService(Math.min(SERVICES_DATA.length - 1, activeServiceIndexRef.current + 1));
                      } else {
                        handleSelectService(Math.max(0, activeServiceIndexRef.current - 1));
                      }
                    }
                    touchDeltaXRef.current = 0;
                  }}
                >
                  {SERVICES_DATA.map((service, idx) => {
                    const isActive = activeServiceIndex === idx;

                    return (
                      <Link
                        key={service.id}
                        href={`/services/${service.id}`}
                        onClick={(e) => {
                          // Prevent navigation if user was swiping horizontally on mobile
                          if (Math.abs(touchDeltaXRef.current) > 15) {
                            e.preventDefault();
                            return;
                          }
                        }}
                        className={`service-card group relative shrink-0 w-[270px] xs:w-[310px] sm:w-[350px] md:w-[370px] min-h-[390px] xs:min-h-[420px] sm:min-h-[460px] sm:h-[490px] rounded-[24px] sm:rounded-[28px] p-5 sm:p-8 cursor-pointer select-none flex flex-col justify-between overflow-hidden transition-all duration-500 ease-out ${
                          isActive
                            ? "bg-[#434a8c] border border-indigo-300/30 shadow-[0_20px_50px_rgba(30,35,80,0.45)] ring-1 ring-indigo-400/20"
                            : "bg-[#090b12] border border-white/[0.08] hover:border-white/25 hover:bg-[#0d101a]"
                        }`}
                      >
                        {/* INACTIVE CARD CONTENT (Smoothly fades out when active) */}
                        <div
                          className={`absolute inset-0 p-6 sm:p-8 flex flex-col justify-between transition-opacity duration-300 ease-out ${
                            isActive ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
                          }`}
                        >
                          {/* Top: Large Number & Arrow */}
                          <div className="flex items-start justify-between">
                            <span className="text-4xl sm:text-5xl font-medium text-white/90 font-sans tracking-tight">
                              {service.number}
                            </span>
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                              <ArrowUpRight className="h-4.5 w-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>
                          </div>

                          {/* Bottom: Title */}
                          <div className="relative z-10">
                            <h4 className="text-xl sm:text-2xl font-medium tracking-tight text-white group-hover:text-indigo-200 transition-colors font-sans">
                              {service.title}
                            </h4>
                          </div>

                          {/* Signature Antimatter.ai Diagonal Stippled Dot Matrix in bottom-right corner */}
                          <div
                            aria-hidden
                            className="pointer-events-none absolute bottom-4 right-4 w-28 h-28 opacity-25 group-hover:opacity-45 transition-opacity"
                            style={{
                              backgroundImage:
                                "radial-gradient(circle, rgba(255, 255, 255, 0.75) 1.2px, transparent 1.2px)",
                              backgroundSize: "8px 8px",
                              maskImage:
                                "linear-gradient(to top left, black 25%, transparent 75%)",
                              WebkitMaskImage:
                                "linear-gradient(to top left, black 25%, transparent 75%)",
                            }}
                          />
                        </div>

                        {/* ACTIVE CARD CONTENT (Smoothly fades in when active) */}
                        <div
                          className={`relative z-10 h-full flex flex-col justify-between transition-opacity duration-400 ease-out ${
                            isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                          }`}
                        >
                          {/* Top: Title & Arrow */}
                          <div>
                            <div className="flex items-start justify-between mb-4">
                              <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white font-sans">
                                {service.title}
                              </h3>
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-all duration-300 shrink-0">
                                <ArrowUpRight className="h-4.5 w-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              </div>
                            </div>

                            <p className="text-sm leading-relaxed text-indigo-100/90 font-light mb-3">
                              {service.description}
                            </p>

                            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-200 group-hover:text-white transition-colors">
                              <span>Explore Service Page</span>
                              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>
                          </div>

                          {/* Bottom: Services List on left, Tools Icon Grid on right */}
                          <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-4 border-t border-indigo-300/20 pt-5 mt-auto">
                            <div>
                              <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-200/75 mb-3 font-medium">
                                Services
                              </div>
                              <ul className="space-y-1.5 text-xs text-indigo-100/90 font-light leading-snug">
                                {service.services.slice(0, 4).map((s, i) => (
                                  <li key={i}>{s}</li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-200/75 mb-3 font-medium">
                                Tools
                              </div>
                              <ul className="space-y-1.5 text-xs text-indigo-100/90 font-light leading-snug">
                                {service.tools.slice(0, 6).map((tool, i) => (
                                  <li key={i}>{tool}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Pagination Indicators */}
              <div className="flex items-center gap-2 mt-4 px-1">
                {SERVICES_DATA.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Select service ${i + 1}`}
                    onClick={() => handleSelectService(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeServiceIndex
                        ? "w-8 bg-indigo-400"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
