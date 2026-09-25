import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { ServicePage } from "@/lib/services";
import { SERVICES } from "@/lib/services";
import PageNavbar from "./PageNavbar";
import AuroraCTASection from "./AuroraCTASection";
import Footer from "./Footer";

export default function ServiceDetail({ service }: { service: ServicePage }) {
  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

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

      {/* Giant Watermark Background Text */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-36 left-1/2 -translate-x-1/2 w-screen flex justify-center items-center select-none z-0"
      >
        <span className="text-[13vw] font-bold uppercase tracking-[0.24em] text-white/[0.035] leading-none font-sans whitespace-nowrap">
          {service.title.split(" ")[0]}
        </span>
      </div>

      {/* ===================== HERO SECTION ===================== */}
      <section className="relative z-10 pt-20 sm:pt-28 pb-16 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-xs font-medium text-indigo-300 mb-8 backdrop-blur-md">
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <span className="text-white/40">/</span>
            <span>{service.title}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.12]">
            {service.title} <br />
            <span className="italic font-light text-white">Engineering</span>
          </h1>

          <p className="mt-8 text-base sm:text-lg lg:text-xl text-gray-300/85 font-light leading-relaxed max-w-2xl">
            {service.headline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/schedule"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-sm font-medium text-white hover:border-white transition-all duration-300"
            >
              <span>Schedule Architecture Review</span>
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
          </div>
        </div>

        {/* ===================== TECHNICAL DEEP DIVE & DELIVERABLES ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-20">
          {/* Main Narrative (cols 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 sm:p-10 rounded-[28px] bg-[#090b12] border border-white/[0.08] relative overflow-hidden">
              <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight mb-6 font-sans">
                Production-Ready Implementation
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-gray-300/85 font-light leading-relaxed">
                {service.body.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Technology Stack / Tooling */}
              {service.stack && service.stack.length > 0 && (
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-300/80 mb-3 font-medium">
                    Core Technologies &amp; Tooling
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.stack.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.05] border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Signature Antimatter Diagonal Dot Matrix */}
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-4 right-4 w-28 h-28 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255, 255, 255, 0.75) 1.2px, transparent 1.2px)",
                  backgroundSize: "8px 8px",
                  maskImage: "linear-gradient(to top left, black 25%, transparent 75%)",
                  WebkitMaskImage: "linear-gradient(to top left, black 25%, transparent 75%)",
                }}
              />
            </div>
          </div>

          {/* Deliverables Card (cols 8-12) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 sm:p-10 rounded-[28px] bg-[#434a8c] border border-indigo-300/25 shadow-[0_20px_50px_rgba(30,35,80,0.4)] relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-200/80 font-medium">
                  Deliverables Standard
                </span>
                <ArrowUpRight className="w-5 h-5 text-white/80" />
              </div>

              <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight mb-6 font-sans">
                What We Deploy
              </h3>

              <ul className="space-y-3.5">
                {service.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-indigo-100/90 font-light leading-snug">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-indigo-300/20">
                <Link
                  href="/schedule"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-white text-black font-medium text-xs sm:text-sm transition-all hover:bg-white/90 hover:scale-[1.02]"
                >
                  <span>Build This System</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ===================== EXPLORE OTHER SERVICES ===================== */}
        <div className="mt-28 border-t border-white/[0.08] pt-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl sm:text-3xl font-medium text-white tracking-tight font-sans">
                Related Services
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 font-light mt-1">
                Complementary capabilities to scale your digital architecture.
              </p>
            </div>
            <Link
              href="/services"
              className="text-xs sm:text-sm text-indigo-300 hover:text-white transition-colors"
            >
              All Services →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {others.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group p-7 rounded-[26px] bg-[#090b12] border border-white/[0.08] hover:border-indigo-400/40 hover:bg-[#0c0f1a] transition-all flex flex-col justify-between select-none relative overflow-hidden"
              >
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <h4 className="text-xl font-medium text-white tracking-tight font-sans group-hover:text-indigo-200 transition-colors">
                      {item.title}
                    </h4>
                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 font-light line-clamp-2 leading-relaxed">
                    {item.short}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Unified Antimatter Aurora CTA & Live Clock Footer */}
      <AuroraCTASection />
      <Footer />
    </main>
  );
}
