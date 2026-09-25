import type { Metadata } from "next";
import PageNavbar from "@/components/PageNavbar";
import AuroraCTASection from "@/components/AuroraCTASection";
import Footer from "@/components/Footer";
import BlogSectionFramer from "@/components/BlogSectionFramer";
import { BASE_URL, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Engineering Blog & AI Systems Insights",
  description:
    "In-depth technical articles, architectural teardowns, and engineering benchmarks on enterprise RAG, workflow automation, SaaS products, web development, and custom AI integration.",
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    title: "Engineering Blog & AI Systems Insights | Whizzly Lab",
    description:
      "Deep technical teardowns on enterprise RAG, workflow automation, SaaS products, web development & AI integration.",
    url: `${BASE_URL}/blog`,
    images: [
      {
        url: ogImage("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Whizzly Lab Engineering Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Blog & AI Systems Insights | Whizzly Lab",
    description:
      "Deep technical teardowns on enterprise RAG, workflow automation, web development & AI integration.",
    images: [ogImage("/og-image.png")],
  },
};

export default function BlogIndexPage() {
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

      {/* Giant Watermark Background Text: "INSIGHTS" */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-36 left-1/2 -translate-x-1/2 w-screen flex justify-center items-center select-none z-0"
      >
        <span className="text-[13vw] font-bold uppercase tracking-[0.24em] text-white/[0.035] leading-none font-sans whitespace-nowrap">
          INSIGHTS
        </span>
      </div>

      {/* ===================== HERO SECTION ===================== */}
      <section className="relative z-10 pt-20 sm:pt-28 pb-16 px-5 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-xs font-medium text-indigo-300 mb-8 backdrop-blur-md">
            <span>Engineering Insights</span>
            <span className="text-white/40">·</span>
            <span>Architectural Teardowns</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.12]">
            Studio Insights. <br />
            Engineering <span className="italic font-light text-white">Knowledge</span>.
          </h1>

          <p className="mt-8 text-base sm:text-lg lg:text-xl text-gray-300/85 font-light leading-relaxed max-w-2xl">
            In-depth architectural breakdowns, benchmarks, and production playbooks covering generative AI, real-time distributed data systems, and high-performance WebGL.
          </p>
        </div>

        {/* ===================== FRAMER BLOG SECTION ===================== */}
        <div className="mt-8 sm:mt-12">
          <BlogSectionFramer />
        </div>
      </section>

      {/* Unified Antimatter Aurora CTA & Live Clock Footer */}
      <AuroraCTASection />
      <Footer />
    </main>
  );
}
