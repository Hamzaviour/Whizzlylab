"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight 3D neural field simulation.
 * Replaces Three.js with pure 2D Canvas perspective projection:
 * zero external dependencies, pauses when offscreen, silky smooth 60fps.
 */
export default function ThreeNeuralField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let isVisible = true;
    let raf = 0;
    let w = 0;
    let h = 0;

    const count = 70;
    const points: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < count; i++) {
      points.push({
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 4.5,
        z: (Math.random() - 0.5) * 5,
      });
    }

    // Precalculate connections
    const connections: [number, number][] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dz = points[i].z - points[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 1.7) {
          connections.push([i, j]);
        }
      }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = container.clientWidth || window.innerWidth;
      h = container.clientHeight || 480;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    let frame = 0;
    const cameraDist = 5.5;

    const render = () => {
      if (!isVisible) return;

      frame += 0.0035;
      const angleY = frame;
      const angleX = Math.sin(frame * 0.6) * 0.12;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const scale = Math.min(w, h) * 0.75;

      const projected: { sx: number; sy: number; alpha: number }[] = [];

      for (let i = 0; i < count; i++) {
        const p = points[i];
        // Rotate around Y
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        // Rotate around X
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX + cameraDist;

        if (z2 <= 0.1) {
          projected.push({ sx: -9999, sy: -9999, alpha: 0 });
          continue;
        }

        const invZ = 1 / z2;
        const sx = cx + x1 * invZ * scale;
        const sy = cy + y2 * invZ * scale;
        const alpha = Math.max(0.1, Math.min(0.85, 1.2 - z2 / cameraDist));

        projected.push({ sx, sy, alpha });
      }

      // Draw lines
      ctx.lineWidth = 1;
      for (let k = 0; k < connections.length; k++) {
        const [i, j] = connections[k];
        const p1 = projected[i];
        const p2 = projected[j];
        if (p1.alpha <= 0 || p2.alpha <= 0) continue;

        const lineAlpha = ((p1.alpha + p2.alpha) / 2) * 0.28;
        ctx.strokeStyle = `rgba(99, 102, 241, ${lineAlpha})`;
        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.stroke();
      }

      // Draw points
      for (let i = 0; i < count; i++) {
        const p = projected[i];
        if (p.alpha <= 0) continue;

        ctx.fillStyle = "#00f0ff";
        ctx.globalAlpha = p.alpha * 0.75;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!reduce) {
        raf = requestAnimationFrame(render);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nowVisible = entry.isIntersecting;
        if (nowVisible && !isVisible) {
          isVisible = true;
          raf = requestAnimationFrame(render);
        } else if (!nowVisible) {
          isVisible = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const onVisibility = () => {
      if (document.hidden) {
        isVisible = false;
        cancelAnimationFrame(raf);
      } else {
        isVisible = true;
        raf = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 -z-0 opacity-70 ${className}`}
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
    </div>
  );
}

