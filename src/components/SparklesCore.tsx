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

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    canvas.width = dimensions.w * dpr;
    canvas.height = dimensions.h * dpr;
    ctx.scale(dpr, dpr);

    const colors = [particleColor, particleColor2, particleColor3, "#38BDF8", "#E0AEFF"];
    // Scale count gracefully: between 150 and 550 particles for a rich starry field
    const particleCount = Math.min(
      550,
      Math.max(140, Math.floor(((dimensions.w * dimensions.h) / 10000) * (particleDensity / 100)))
    );

    let animationFrameId: number;

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
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;

        // Glowing halo on medium-to-large stars
        if (this.size > 1.2) {
          ctx.shadowBlur = 7;
          ctx.shadowColor = this.color;
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const render = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, dimensions.w, dimensions.h);

      if (background !== "transparent") {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, dimensions.w, dimensions.h);
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
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
