"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import StickyMobileCTA from "./StickyMobileCTA";
import StickySocialBar from "./StickySocialBar";
import CookieConsent from "./CookieConsent";
import Analytics from "./Analytics";
import SparklesCore from "./SparklesCore";

const WhizzlyChatbot = dynamic(() => import("./chat/WhizzlyChatbot"), {
  ssr: false,
});

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
    // Keep home page clean dark background for 3D particle canvas
    setShowSparkles(false);
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
        className={`pointer-events-none fixed inset-0 z-[1] transition-opacity duration-700 ${
          showSparkles ? "opacity-100" : "opacity-0"
        }`}
      >
        <SparklesCore
          id="global-sparkles-canvas"
          minSize={0.6}
          maxSize={2.4}
          speed={0.65}
          particleDensity={400}
          particleColor="#FFFFFF"
          particleColor2="#00F0FF"
          particleColor3="#A855F7"
          enableTwinkle={true}
        />
      </div>

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
      <div className="relative z-[2]">{children}</div>
      {pathname !== "/" && <StickyMobileCTA />}
      <StickySocialBar />
      <WhizzlyChatbot />
      <CookieConsent />
      <Analytics />
    </>
  );
}

