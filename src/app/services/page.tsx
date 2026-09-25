import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageNavbar from "@/components/PageNavbar";
import AuroraCTASection from "@/components/AuroraCTASection";
import Footer from "@/components/Footer";
import { BASE_URL, ogImage } from "@/lib/seo";
import { SERVICES_DATA } from "@/lib/servicesData";
import ServiceCarousel3D from "@/components/ServiceCarousel3D";
import TechStackWavyTicker from "@/components/TechStackWavyTicker";

export const metadata: Metadata = {
  title: "AI, ML & Software Engineering Services",
  description:
    "Comprehensive engineering services: full-stack web development, workflow automation, RAG systems, SaaS products, mobile apps, and custom AI integration.",
  alternates: {
    canonical: `${BASE_URL}/services`,
  },
  openGraph: {
    title: "AI, ML & Software Engineering Services | Whizzly Lab",
    description:
      "Full-stack web development, workflow automation, RAG systems, SaaS products, mobile apps & custom AI integration by Whizzly Lab.",
    url: `${BASE_URL}/services`,
    images: [
      {
        url: ogImage("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Services: Whizzly Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI, ML & Software Engineering Services | Whizzly Lab",
    description:
      "Web development, workflow automation, RAG systems, SaaS products, apps & AI integration by Whizzly Lab.",
    images: [ogImage("/og-image.png")],
  },
};

export default function ServicesPage() {
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

      {/* Giant Watermark Background Text: "SERVICES" */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-36 left-1/2 -translate-x-1/2 w-screen flex justify-center items-center select-none z-0"
      >
        <span className="text-[14vw] font-bold uppercase tracking-[0.24em] text-white/[0.035] leading-none font-sans whitespace-nowrap">
          SERVICES
        </span>
      </div>

      {/* ===================== HERO SECTION ===================== */}
      <section className="relative z-10 pt-20 sm:pt-28 pb-16 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-xs font-medium text-indigo-300 mb-8 backdrop-blur-md">
            <span>Studio Capabilities</span>
            <span className="text-white/40">·</span>
            <span>Full-Lifecycle Delivery</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.12]">
            Transformative <span className="italic font-light text-white">Digital</span> <br />
            &amp; AI Solutions.
          </h1>

          <p className="mt-8 text-base sm:text-lg lg:text-xl text-gray-300/85 font-light leading-relaxed max-w-2xl">
            We offer end-to-end digital engineering and AI services that transform your business, accelerate roadmap execution, and drive sustained technological advantage.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/schedule"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-sm font-medium text-white hover:border-white transition-all duration-300"
            >
              <span>Start Your Project</span>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:scale-110">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </Link>
            <Link
              href="/pricing"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-full border border-indigo-400/30 bg-indigo-500/10 backdrop-blur-md text-sm font-medium text-indigo-200 hover:text-white hover:border-indigo-400/60 hover:bg-indigo-500/20 transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
            >
              <span>View Pricing &amp; Plans</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/work"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors px-4 py-2"
            >
              Explore Shipped Work →
            </Link>
          </div>
        </div>

        {/* ===================== WAVY TECH STACK TICKER ===================== */}
        <div className="my-8 sm:my-12">
          <TechStackWavyTicker />
        </div>

        {/* ===================== ALL SERVICES GRID ===================== */}
        <div className="mt-14 sm:mt-20">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono uppercase tracking-wider text-indigo-300 mb-3">
              Comprehensive Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal text-white tracking-tight font-sans">
              All Engineering Domains
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-gray-400 font-light">
              Deep architectural specializations designed for high-scale enterprise environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SERVICES_DATA.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group relative rounded-[28px] p-8 bg-[#090b12] border border-white/[0.08] hover:border-indigo-400/40 hover:bg-[#434a8c] transition-all duration-500 flex flex-col justify-between select-none overflow-hidden hover:shadow-[0_20px_50px_rgba(30,35,80,0.45)] hover:-translate-y-1 min-h-[460px]"
              >
                {/* Top Row: Number & Arrow */}
                <div>
                  <div className="flex items-start justify-between mb-8">
                    <span className="text-4xl sm:text-5xl font-medium text-white/90 font-sans tracking-tight">
                      {service.number}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white font-sans mb-4">
                    {service.title}
                  </h3>

                  <p className="text-sm text-gray-400 font-light leading-relaxed group-hover:text-indigo-100/90 transition-colors">
                    {service.description}
                  </p>
                </div>

                {/* Bottom: Services List & Tools Tags */}
                <div className="border-t border-white/10 group-hover:border-indigo-300/20 pt-5 mt-8 transition-colors">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-300/80 mb-3 font-medium">
                    Core Competencies
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.tools.slice(0, 4).map((tool, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/[0.06] border border-white/10 text-gray-300 group-hover:bg-white/15 group-hover:text-white transition-colors"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Signature Antimatter Diagonal Dot Matrix in bottom-right corner */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute bottom-4 right-4 w-28 h-28 opacity-25 group-hover:opacity-40 transition-opacity"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(255, 255, 255, 0.75) 1.2px, transparent 1.2px)",
                    backgroundSize: "8px 8px",
                    maskImage: "linear-gradient(to top left, black 25%, transparent 75%)",
                    WebkitMaskImage: "linear-gradient(to top left, black 25%, transparent 75%)",
                  }}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* ===================== TRANSPARENT PRICING CALLOUT BANNER ===================== */}
        <div className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-[32px] bg-gradient-to-br from-[#10121d] via-[#090b12] to-[#0d101d] border border-indigo-400/25 relative overflow-hidden shadow-[0_20px_60px_rgba(30,35,80,0.35)]">
          {/* Ambient Nebula Glow Behind */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.25)_0%,transparent_70%)] blur-3xl"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/30 bg-indigo-500/10 text-xs font-mono uppercase tracking-wider text-indigo-300 mb-4">
                Clear &amp; Predictable Pricing
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-white tracking-tight font-sans">
                Looking for project estimates or sprint rates?
              </h3>
              <p className="mt-3 text-sm sm:text-base text-gray-300/80 font-light leading-relaxed">
                We offer transparent engineering pricing in USD — from rapid 2-week MVPs to enterprise-grade dedicated pods. No hidden retainers, no guesswork.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                href="/pricing"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-black text-sm font-medium hover:bg-indigo-300 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
              >
                <span>Explore Pricing &amp; Plans</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ===================== PURE 3D SERVICE CAROUSEL (UNBOXED) ===================== */}
        <div className="my-20 sm:my-28 w-full overflow-visible">
          <ServiceCarousel3D showHeader={false} />
        </div>
      </section>

      {/* Unified Antimatter Aurora CTA & Live Clock Footer */}
      <AuroraCTASection />
      <Footer />
    </main>
  );
}
