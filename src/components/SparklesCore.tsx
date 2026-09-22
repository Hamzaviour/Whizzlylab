"use client";

import React, { useEffect, useRef, useState } from "react";

export interface SparklesProps {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleColor2?: string;
  particleColor3?: string;
  particleDensity?: number;
  enableTwinkle?: boolean;
}

export default function SparklesCore({
  id = "sparkles-canvas",
  className = "",
  background = "transparent",
  minSize = 0.6,
  maxSize = 2.2,
  speed = 0.6,
  particleColor = "#FFFFFF",
  particleColor2 = "#00F0FF",
  particleColor3 = "#A855F7",
  particleDensity = 350,
  enableTwinkle = true,
}: SparklesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState<{ w: number; h: number }>(() => ({
    w: typeof window !== "undefined" ? window.innerWidth : 1440,
    h: typeof window !== "undefined" ? window.innerHeight : 900,
  }));

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth || window.innerWidth;
        const h = containerRef.current.offsetHeight || window.innerHeight;
        setDimensions({ w, h });
      } else if (typeof window !== "undefined") {
        setDimensions({ w: window.innerWidth, h: window.innerHeight });
      }
    };

    updateSize();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      resizeObserver = new ResizeObserver(() => updateSize());
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.w === 0 || dimensions.h === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 1.5) : 1;
    canvas.width = dimensions.w * dpr;
    canvas.height = dimensions.h * dpr;
    ctx.scale(dpr, dpr);

    const colors = [particleColor, particleColor2, particleColor3, "#38BDF8", "#E0AEFF"];
    const isSmallScreen = dimensions.w < 768;
    // Scale count gracefully: between 60 on mobile and 220 on desktop for maximum smoothness
    const maxAllowed = isSmallScreen ? 75 : 240;
    const minAllowed = isSmallScreen ? 45 : 100;
    const particleCount = Math.min(
      maxAllowed,
      Math.max(minAllowed, Math.floor(((dimensions.w * dimensions.h) / 12000) * (particleDensity / 100)))
    );

    let animationFrameId: number;
    let isRunning = true;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      twinklePhase: number;
      twinkleSpeed: number;

      constructor() {
        this.x = Math.random() * dimensions.w;
        this.y = Math.random() * dimensions.h;
        this.size = Math.random() * (maxSize - minSize) + minSize;
        this.speedX = (Math.random() - 0.5) * speed * 0.4;
        this.speedY = (Math.random() * 0.6 + 0.3) * speed;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.twinklePhase = Math.random() * Math.PI * 2;
        this.twinkleSpeed = 0.02 + Math.random() * 0.04;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;

        if (enableTwinkle) {
          this.twinklePhase += this.twinkleSpeed;
          this.opacity = 0.25 + Math.abs(Math.sin(this.twinklePhase)) * 0.75;
        } else {
          this.opacity += (Math.random() - 0.5) * 0.05;
          this.opacity = Math.max(0.1, Math.min(1, this.opacity));
        }

        // Wrap around vertically
        if (this.y > dimensions.h) {
          this.y = 0;
          this.x = Math.random() * dimensions.w;
        } else if (this.y < 0) {
          this.y = dimensions.h;
        }

        // Wrap around horizontally
        if (this.x > dimensions.w) {
          this.x = 0;
        } else if (this.x < 0) {
          this.x = dimensions.w;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;

        // Outer glow without expensive shadowBlur
        if (this.size > 1.3) {
          ctx.globalAlpha = this.opacity * 0.22;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Star core
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const render = () => {
      if (!ctx || !isRunning) return;
      ctx.clearRect(0, 0, dimensions.w, dimensions.h);

      if (background !== "transparent") {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, dimensions.w, dimensions.h);
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(render);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    render();

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [
    dimensions,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleColor2,
    particleColor3,
    particleDensity,
    enableTwinkle,
    background,
  ]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none relative h-full w-full overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        id={id}
        className="pointer-events-none absolute inset-0 block h-full w-full"
        style={{ width: "100%", height: "100%", background: "transparent" }}
      />
    </div>
  );
}
