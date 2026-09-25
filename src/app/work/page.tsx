import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageNavbar from "@/components/PageNavbar";
import AuroraCTASection from "@/components/AuroraCTASection";
import Footer from "@/components/Footer";
import WorkProjectsShowcase from "@/components/WorkProjectsShowcase";
import { BASE_URL, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Work & Production Case Studies",
  description:
    "Explore Whizzly Lab's portfolio of production-grade software: full-stack web development, workflow automation, RAG systems, SaaS platforms, mobile apps, and custom AI integrations.",
  alternates: {
    canonical: `${BASE_URL}/work`,
  },
  openGraph: {
    title: "Work & Production Case Studies | Whizzly Lab",
    description:
      "Explore Whizzly Lab's portfolio of full-stack web platforms, workflow automation, RAG systems, SaaS products, and apps.",
    url: `${BASE_URL}/work`,
    images: [
      {
        url: ogImage("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Whizzly Lab Shipped Work & Case Studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Work & Production Case Studies | Whizzly Lab",
    description:
      "Production-grade web development, automation, RAG systems, SaaS products, and custom AI integrations by Whizzly Lab.",
    images: [ogImage("/og-image.png")],
  },
};

export default function WorkPage() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white font-sans overflow-x-hidden">
      <PageNavbar />

      {/* Top-Left Volumetric Spotlight Beam (Subtle Balanced Volumetric Light) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-36 w-[800px] sm:w-[950px] lg:w-[1100px] h-[1200px] origin-top-left -rotate-[32deg] z-0 overflow-hidden"
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
        className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 sm:w-96 sm:h-96 rounded-full z-0 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(224,231,255,0.42) 0%, rgba(165,180,252,0.26) 30%, rgba(99,102,241,0.10) 60%, transparent 75%)",
        }}
      />

      {/* Giant Watermark Background Text: "WORK" */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-36 left-1/2 -translate-x-1/2 w-screen flex justify-center items-center select-none z-0"
      >
        <span className="text-[14vw] font-bold uppercase tracking-[0.24em] text-white/[0.035] leading-none font-sans whitespace-nowrap">
          WORK
        </span>
      </div>

      {/* ===================== HERO SECTION ===================== */}
      <section className="relative z-10 pt-20 sm:pt-28 pb-16 px-5 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <div className="max-w-4xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-xs font-medium text-indigo-300 mb-8 backdrop-blur-md">
            <span>Production Portfolio</span>
            <span className="text-white/40">·</span>
            <span>Websites &amp; AI Systems</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.12]">
            Production Systems. <br />
            Measurable <span className="italic font-light text-white">Outcomes</span>.
          </h1>

          <p className="mt-8 text-base sm:text-lg lg:text-xl text-gray-300/85 font-light leading-relaxed max-w-2xl">
            Live client websites, production AI systems, and real-time data streaming pipelines — built end to end with performance, design, and enterprise-grade reliability.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/schedule"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-sm font-medium text-white hover:border-white transition-all duration-300"
            >
              <span>Build With Us</span>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:scale-110">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors px-4 py-2"
            >
              Explore Capabilities →
            </Link>
          </div>
        </div>

        {/* ===================== ALL 12 PROJECTS SHOWCASE ===================== */}
        <WorkProjectsShowcase />
      </section>

      {/* Unified Antimatter Aurora CTA & Live Clock Footer */}
      <AuroraCTASection />
      <Footer />
    </main>
  );
}
