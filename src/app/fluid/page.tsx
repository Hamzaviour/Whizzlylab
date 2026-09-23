import type { Metadata } from "next";
import FluidCanvas from "@/components/FluidCanvas";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Fluid | Whizzly Lab",
  description: "Animated plasma fluid background experience by Whizzly Lab.",
};

export default function FluidPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05010f]">
      <FluidCanvas
        color1="#1a0533"
        color2="#0a1a4a"
        color3="#00f0ff"
        scale={0.75}
        rotation={0}
        proportion={0.63}
        softness={1}
        distortion={0.1}
        swirl={0.61}
        swirlIterations={5}
        shape={0}
        shapeScale={0.28}
        seed={0}
      />

      {/* Overlay content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <h1
          className="text-[clamp(2rem,8vw,5rem)] font-extrabold tracking-tight text-white font-heading"
        >
          Fluid <span className="text-cyan-300">Canvas</span>
        </h1>
        <p className="mt-4 max-w-md text-lg text-white/60">
          WebGL plasma shader: animated, full-bleed, cursor-reactive.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
        >
          Back to home
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
