"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring } from "framer-motion";
import ScrollProgress from "./ScrollProgress";
import StickyMobileCTA from "./StickyMobileCTA";
import CookieConsent from "./CookieConsent";
import Analytics from "./Analytics";
import WhizzlyChatbot from "./chat/WhizzlyChatbot";
import SparklesCore from "./SparklesCore";

/**
 * Site-wide: scroll progress, soft cursor glow (desktop), and ambient sparkles background.
 * On home page, sparkles are excluded from the hero section and fade in across all other sections.
 */
export default function InteractiveShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const [showSparkles, setShowSparkles] = useState(pathname !== "/");
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const x = useSpring(mx, { stiffness: 120, damping: 28 });
  const y = useSpring(my, { stiffness: 120, damping: 28 });

  useEffect(() => {
    if (pathname !== "/") {
      setShowSparkles(true);
      return;
    }

    const checkScroll = () => {
      // Exclude hero section on home page; fade in as soon as user scrolls past hero
      const heroThreshold = Math.min(window.innerHeight * 0.6, 450);
      setShowSparkles(window.scrollY > heroThreshold);
    };

    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, [pathname]);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduce);
    if (!fine || reduce) return;

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <>
      {/* Background Sparkles: Active across all sections and pages, excluded from home hero */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-700 ${
          showSparkles ? "opacity-100" : "opacity-0"
        }`}
      >
        <SparklesCore
          id="global-sparkles-canvas"
          minSize={0.5}
          maxSize={1.8}
          speed={0.4}
          particleDensity={85}
          particleColor="#FFFFFF"
          particleColor2="#00F0FF"
          particleColor3="#A855F7"
          enableTwinkle={true}
        />
      </div>

      <ScrollProgress />
      {enabled && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed top-0 left-0 z-[55] hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 mix-blend-screen md:block"
          style={{
            x,
            y,
            background:
              "radial-gradient(circle, rgba(0,240,255,0.22) 0%, rgba(168,85,247,0.12) 35%, transparent 70%)",
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
      <StickyMobileCTA />
      <WhizzlyChatbot />
      <CookieConsent />
      <Analytics />
    </>
  );
}

