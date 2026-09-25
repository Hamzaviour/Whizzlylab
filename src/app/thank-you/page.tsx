import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import PageNavbar from "@/components/PageNavbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Inquiry Received | Whizzly Lab",
  description:
    "Thank you for contacting Whizzly Lab. Our systems architects will review your project brief within 24 hours.",
};

export default function ThankYouPage() {
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

      {/* Giant Watermark Background Text: "CONFIRMED" */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 left-1/2 -translate-x-1/2 w-screen flex justify-center items-center select-none z-0"
      >
        <span className="text-[14vw] font-bold uppercase tracking-[0.24em] text-white/[0.035] leading-none font-sans whitespace-nowrap">
          RECEIVED
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-24 sm:py-32 text-center max-w-3xl mx-auto my-auto">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-400 mb-8">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-xs font-medium text-indigo-300 mb-6 backdrop-blur-md">
          <span>Inquiry Logged</span>
          <span className="text-white/40">·</span>
          <span>Priority Queue</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-white leading-[1.15]">
          Brief Received. <br />
          <span className="italic font-light text-white">We're on It</span>.
        </h1>

        <p className="mt-6 text-base sm:text-lg text-gray-400 font-light leading-relaxed max-w-lg">
          Your project specifications have been routed to our systems architecture team. A lead architect will review your technical requirements.
        </p>

        {/* SLA benchmarks */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {[
            "Lead Architect Review",
            "Mutual NDA Ready",
            "Fixed-Price Sprints",
          ].map((item) => (
            <span
              key={item}
              className="px-3.5 py-1.5 rounded-full border border-white/10 bg-[#090b12] text-xs font-mono text-gray-300"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Action button */}
        <div className="mt-10">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-white/20 bg-white text-black font-medium text-sm hover:bg-gray-200 transition-all duration-300"
          >
            <span>Return to Studio</span>
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:scale-110">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
