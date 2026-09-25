import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageNavbar from "@/components/PageNavbar";
import AuroraCTASection from "@/components/AuroraCTASection";
import Footer from "@/components/Footer";
import PricingContent from "@/components/PricingContent";
import { BASE_URL, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing & Plans (USD)",
  description:
    "Transparent pricing for AI systems, machine learning, data pipelines, web development, automation, and full-stack products in USD.",
  alternates: {
    canonical: `${BASE_URL}/pricing`,
  },
  openGraph: {
    title: "Pricing & Plans (USD) | Whizzly Lab",
    description: "Transparent pricing for AI, ML & full-stack engineering in USD by Whizzly Lab.",
    url: `${BASE_URL}/pricing`,
    images: [
      {
        url: ogImage("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Pricing: Whizzly Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing & Plans (USD) | Whizzly Lab",
    description: "Transparent AI & full-stack engineering pricing in USD.",
    images: [ogImage("/og-image.png")],
  },
};

export default function PricingPage() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white font-sans overflow-x-hidden">
      <PageNavbar />

      {/* Volumetric Top Spotlight Beam */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-28 w-[600px] sm:w-[750px] h-[900px] origin-top-left -rotate-[35deg] z-0 overflow-hidden"
      >
        <div
          className="w-full h-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(165,180,252,0.35) 0%, rgba(99,102,241,0.18) 28%, rgba(79,70,229,0.04) 60%, transparent 100%)",
            filter: "blur(45px)",
            clipPath: "polygon(18% 0%, 58% 0%, 100% 100%, 0% 100%)",
          }}
        />
      </div>

      {/* Giant Watermark Background Text: "PRICING" */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-36 left-1/2 -translate-x-1/2 w-screen flex justify-center items-center select-none z-0"
      >
        <span className="text-[14vw] font-bold uppercase tracking-[0.24em] text-white/[0.035] leading-none font-sans whitespace-nowrap">
          PRICING
        </span>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 sm:pt-28 pb-16 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-xs font-medium text-indigo-300 mb-8 backdrop-blur-md">
            <span>Transparent Framework</span>
            <span className="text-white/40">·</span>
            <span>Engineering Sprints</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.12]">
            Clear Benchmarks. <br />
            <span className="italic font-light text-white">Transparent</span> Architecture.
          </h1>

          <p className="mt-8 text-base sm:text-lg lg:text-xl text-gray-300/85 font-light leading-relaxed max-w-2xl">
            Honest, production-grade engineering rates in USD. From rapid 2-week MVPs to multi-agent enterprise clusters. No hidden retainers.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/schedule"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-sm font-medium text-white hover:border-white transition-all duration-300"
            >
              <span>Book Strategy Call</span>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:scale-110">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          </div>
        </div>

        {/* Pricing Interactive System */}
        <PricingContent />
      </section>

      {/* Unified Antimatter Aurora CTA & Live Clock Footer */}
      <AuroraCTASection />
      <Footer />
    </main>
  );
}