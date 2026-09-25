"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import PageNavbar from "@/components/PageNavbar";
import AuroraCTASection from "@/components/AuroraCTASection";
import Footer from "@/components/Footer";
import { submitWeb3Form, LINKEDIN_URL } from "@/lib/contact";

const SERVICES_OPTIONS = [
  "AI & ML Systems",
  "Full-Stack Web / Next.js",
  "Product Design",
  "Real-time Data Streaming",
  "Healthcare / HIPAA Software",
  "IoT & Embedded Systems",
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [selectedService, setSelectedService] = useState("AI & ML Systems");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      await submitWeb3Form({
        subject: `Whizzly Lab Inquiry: ${selectedService} from ${String(data.get("name") || "")}`,
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        service: selectedService,
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

      {/* Giant Watermark Background Text: "CONTACT" */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-36 left-1/2 -translate-x-1/2 w-screen flex justify-center items-center select-none z-0"
      >
        <span className="text-[14vw] font-bold uppercase tracking-[0.24em] text-white/[0.035] leading-none font-sans whitespace-nowrap">
          CONTACT
        </span>
      </div>

      {/* ===================== HERO SECTION ===================== */}
      <section className="relative z-10 pt-20 sm:pt-28 pb-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-xs font-medium text-indigo-300 mb-8 backdrop-blur-md">
            <span>Get in Touch</span>
            <span className="text-white/40">·</span>
            <span>Direct Engineering Access</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.12]">
            Let's Build Something <br />
            <span className="italic font-light text-white">Meaningful</span> Together.
          </h1>

          <p className="mt-8 text-base sm:text-lg lg:text-xl text-gray-300/85 font-light leading-relaxed max-w-2xl">
            Have a product vision, technical challenge, or architectural question? Reach out to speak directly with our engineering leadership.
          </p>
        </div>

        {/* ===================== TWO-COLUMN CONTACT GRID ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Details & Standards (cols 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 sm:p-10 rounded-[32px] bg-[#090b12] border border-white/[0.08] relative overflow-hidden select-none">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-300 font-medium block mb-3">
                Direct Contact
              </span>

              <a
                href="mailto:contact@whizzlylab.com"
                className="text-2xl sm:text-3xl font-light hover:text-indigo-300 transition-colors tracking-tight font-sans block mb-2"
              >
                contact@whizzlylab.com
              </a>

              <a
                href="tel:+14244510714"
                className="text-xl sm:text-2xl font-light text-gray-300 hover:text-indigo-300 transition-colors tracking-tight font-sans block mb-6"
              >
                +1 (424) 451-0714
              </a>

              <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
                We review every inquiry directly with lead engineers. Expect technical scope clarity and direct architectural feedback.
              </p>

              <div className="space-y-4 border-t border-white/10 pt-6">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-300 font-light">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Direct Communication with Tech Leads</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-300 font-light">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Mutual NDA on Initial Consultation</span>
                </div>
              </div>

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

          {/* Right Column: Sleek Contact Form (cols 6-12) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-[32px] bg-[#090b12] border border-white/[0.08] relative overflow-hidden">
              <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight font-sans mb-3">
                Send a Message
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 font-light mb-8">
                Tell us about your project or system requirements.
              </p>

              {status === "sent" ? (
                <div className="py-12 text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 mb-6">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-2">
                    Message Received
                  </h3>
                  <p className="text-sm text-gray-400 font-light max-w-md mx-auto">
                    Thank you for reaching out. An engineering lead will review your requirements and respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-6">
                  {/* Service selector pills */}
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-400 block mb-3 font-medium">
                      Select Primary Domain
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICES_OPTIONS.map((srv) => {
                        const isSelected = selectedService === srv;
                        return (
                          <button
                            key={srv}
                            type="button"
                            onClick={() => setSelectedService(srv)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                              isSelected
                                ? "bg-white text-black shadow-md"
                                : "bg-white/[0.04] text-gray-300 border border-white/10 hover:border-white/20"
                            }`}
                          >
                            {srv}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-gray-400 block mb-2 font-medium">
                        Your Name
                      </label>
                      <input
                        required
                        type="text"
                        name="name"
                        placeholder="Alex Vance"
                        className="w-full rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-3.5 text-sm text-white placeholder:text-gray-600 focus:border-indigo-400 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-gray-400 block mb-2 font-medium">
                        Work Email
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="alex@company.com"
                        className="w-full rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-3.5 text-sm text-white placeholder:text-gray-600 focus:border-indigo-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-400 block mb-2 font-medium">
                      Project Scope &amp; Details
                    </label>
                    <textarea
                      required
                      name="message"
                      rows={5}
                      placeholder="Describe your system requirements, target deliverables, or engineering challenges..."
                      className="w-full rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-3.5 text-sm text-white placeholder:text-gray-600 focus:border-indigo-400 focus:outline-none transition-colors"
                    />
                  </div>

                  {status === "error" && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300">
                      An error occurred while submitting your message. Please email us directly at contact@whizzlylab.com.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-black font-medium text-sm transition-all hover:bg-white/90 hover:scale-105 duration-300 disabled:opacity-50"
                  >
                    <span>{status === "sending" ? "Sending..." : "Send Message"}</span>
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:scale-110">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </button>
                </form>
              )}
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
