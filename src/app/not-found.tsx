import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageNavbar from "@/components/PageNavbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white font-sans overflow-x-hidden flex flex-col justify-between">
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

      {/* Giant Watermark Background Text: "404" */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 left-1/2 -translate-x-1/2 w-screen flex justify-center items-center select-none z-0"
      >
        <span className="text-[20vw] font-bold uppercase tracking-[0.24em] text-white/[0.035] leading-none font-sans whitespace-nowrap">
          404
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-24 sm:py-32 text-center max-w-2xl mx-auto my-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-xs font-medium text-indigo-300 mb-6 backdrop-blur-md">
          <span>Error 404</span>
          <span className="text-white/40">·</span>
          <span>Route Not Found</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-white leading-[1.15]">
          Latent Space <br />
          <span className="italic font-light text-white">Undefined</span>.
        </h1>

        <p className="mt-6 text-base sm:text-lg text-gray-400 font-light leading-relaxed max-w-lg">
          The requested coordinate does not resolve to an active service endpoint. Let&apos;s redirect back to production reality.
        </p>

        {/* Action button */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-white/20 bg-white text-black font-medium text-sm hover:bg-gray-200 transition-all duration-300"
          >
            <span>Return to Studio</span>
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:scale-110">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </Link>

          <Link
            href="/case-studies"
            className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-gray-300 hover:text-white hover:border-white/20 transition-all"
          >
            View Case Studies →
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
