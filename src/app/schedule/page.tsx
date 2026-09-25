"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Clock, Cpu, CheckCircle2 } from "lucide-react";
import PageNavbar from "@/components/PageNavbar";
import AuroraCTASection from "@/components/AuroraCTASection";
import Footer from "@/components/Footer";
import BudgetSelect from "@/components/BudgetSelect";
import { useCurrency } from "@/lib/currency";
import { COMPANY_EMAIL, COMPANY_PHONE, submitWeb3Form } from "@/lib/contact";

const SERVICE_OPTIONS = [
  "Autonomous AI Agents & RAG",
  "High-Volume Data Pipelines",
  "Machine Learning & MLOps",
  "Full-Stack Web Platforms",
  "Workflow Automation",
  "Technical Architecture Audit",
];

export default function SchedulePage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const { currency } = useCurrency();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      await submitWeb3Form({
        subject: `Whizzly Lab Consultation: ${String(data.get("service") || "Discovery")}`,
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        phone: String(data.get("phone") || ""),
        service: String(data.get("service") || ""),
        budget: String(data.get("budget") || ""),
        preferred_time: String(data.get("when") || ""),
        message: String(data.get("message") || ""),
      });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

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

      {/* Giant Watermark Background Text: "SCHEDULE" */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-36 left-1/2 -translate-x-1/2 w-screen flex justify-center items-center select-none z-0"
      >
        <span className="text-[14vw] font-bold uppercase tracking-[0.24em] text-white/[0.035] leading-none font-sans whitespace-nowrap">
          SCHEDULE
        </span>
      </div>

      {/* Hero & Form Section */}
      <section className="relative z-10 pt-20 sm:pt-28 pb-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-xs font-medium text-indigo-300 mb-8 backdrop-blur-md">
            <span>Engineering Consult</span>
            <span className="text-white/40">·</span>
            <span>Discovery &amp; Scoping</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.12]">
            Initiate Discovery. <br />
            <span className="italic font-light text-white">Architectural</span> Consult.
          </h1>

          <p className="mt-8 text-base sm:text-lg lg:text-xl text-gray-300/85 font-light leading-relaxed max-w-2xl">
            Book a 30-minute deep technical review with our lead systems architects. We analyze feasibility, recommend architecture, and provide scoped delivery timelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Studio Guarantees & Protocols */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-[28px] p-8 bg-[#090b12] border border-white/[0.08] overflow-hidden select-none">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="h-5 w-5 text-indigo-400" />
                <h3 className="text-lg font-medium text-white font-sans">
                  Rapid Architectural Review
                </h3>
              </div>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Direct review from a senior AI or systems architect. We immediately evaluate your technical requirements and prepare an engineering assessment.
              </p>
            </div>

            <div className="relative rounded-[28px] p-8 bg-[#090b12] border border-white/[0.08] overflow-hidden select-none">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="h-5 w-5 text-indigo-400" />
                <h3 className="text-lg font-medium text-white font-sans">
                  Direct Engineering Access
                </h3>
              </div>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                No salespeople or account reps. You collaborate directly with principal engineers who write production code and design your infrastructure.
              </p>
            </div>

            <div className="relative rounded-[28px] p-8 bg-[#090b12] border border-white/[0.08] overflow-hidden select-none">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="h-5 w-5 text-indigo-400" />
                <h3 className="text-lg font-medium text-white font-sans">
                  Enterprise NDA &amp; IP Protection
                </h3>
              </div>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                We sign mutual confidentiality agreements prior to discussing proprietary datasets, weights, or trade secrets. 100% IP ownership transfers upon launch.
              </p>
              {/* Corner dot matrix */}
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-3 right-3 w-20 h-20 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255, 255, 255, 0.75) 1.2px, transparent 1.2px)",
                  backgroundSize: "8px 8px",
                  maskImage: "linear-gradient(to top left, black 25%, transparent 75%)",
                  WebkitMaskImage: "linear-gradient(to top left, black 25%, transparent 75%)",
                }}
              />
            </div>

            <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <div className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                Alternative Inquiries
              </div>
              <p className="text-sm text-gray-300 font-light mb-2">
                Prefer email? Reach our founders directly at{" "}
                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="text-indigo-300 hover:text-white underline underline-offset-4"
                >
                  {COMPANY_EMAIL}
                </a>
              </p>
              <p className="text-sm text-gray-300 font-light">
                Direct call:{" "}
                <a
                  href="tel:+14244510714"
                  className="text-indigo-300 hover:text-white underline underline-offset-4"
                >
                  +1 (424) 451-0714
                </a>
              </p>
            </div>
          </div>

          {/* Right Column: Dark Glass Booking Form */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[32px] p-8 sm:p-12 bg-[#090b12] border border-white/[0.08] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                      Full Name *
                    </label>
                    <input
                      name="name"
                      required
                      placeholder="e.g. Alex Vance"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-indigo-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                      Work Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="alex@enterprise.com"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-indigo-400 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-indigo-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                      Primary Domain *
                    </label>
                    <select
                      name="service"
                      required
                      defaultValue=""
                      className="w-full rounded-xl border border-white/10 bg-[#090b12] px-4 py-3.5 text-sm text-white outline-none focus:border-indigo-400 transition"
                    >
                      <option value="" disabled className="text-gray-500">
                        Select engineering domain
                      </option>
                      {SERVICE_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                      Estimated Budget ({currency})
                    </label>
                    <BudgetSelect />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                      Preferred Timeline
                    </label>
                    <input
                      name="when"
                      placeholder="Immediate / Next 30 days"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-indigo-400 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                    Project Brief &amp; Technical Requirements *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Describe your current tech stack, scale targets, or specific engineering bottleneck..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-indigo-400 transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 rounded-full bg-white text-black font-medium text-sm hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  <span>
                    {status === "sending"
                      ? "Submitting to Engineering..."
                      : "Schedule Strategy Call"}
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                </button>

                {status === "sent" && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                    <p className="text-sm text-emerald-400 font-medium">
                      Consultation requested successfully. Our lead architect will follow up within 24 hours.
                    </p>
                  </div>
                )}
                {status === "error" && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
                    <p className="text-sm text-red-400 font-medium">
                      Submission encountered an error. Please email us directly at {COMPANY_EMAIL}.
                    </p>
                  </div>
                )}
              </form>

              {/* Signature Antimatter Diagonal Dot Matrix in bottom-right corner */}
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
        </div>
      </section>

      {/* Unified Antimatter Aurora CTA & Live Clock Footer */}
      <AuroraCTASection />
      <Footer />
    </main>
  );
}
