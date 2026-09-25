"use client";

import { useState, FormEvent } from "react";
import {
  Briefcase,
  Code2,
  Globe,
  Clock,
  Rocket,
  ArrowUpRight,
  Send,
  Zap,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";
import {
  OPEN_POSITIONS,
  STUDIO_PERKS,
  CAREER_STATS,
} from "@/lib/careers";
import { COMPANY_EMAIL, submitWeb3Form } from "@/lib/contact";

const DEPARTMENTS = ["All", "AI & ML", "Full-Stack", "Data & Cloud", "Leadership"] as const;

export default function CareersView() {
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [expandedRole, setExpandedRole] = useState<string | null>(OPEN_POSITIONS[0]?.id || null);
  const [applyingRole, setApplyingRole] = useState<string>(
    OPEN_POSITIONS[0]?.title || "Senior AI & LLM Systems Engineer"
  );

  // Application Form State
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const filteredPositions =
    selectedDept === "All"
      ? OPEN_POSITIONS
      : OPEN_POSITIONS.filter(
          (pos) => pos.department === selectedDept || pos.department === "General"
        );

  const handleApplyClick = (roleTitle: string) => {
    setApplyingRole(roleTitle);
    const formElement = document.getElementById("apply-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const onApplicationSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const portfolio = String(formData.get("portfolio") || "").trim();
    const experience = String(formData.get("experience") || "").trim();
    const role = String(formData.get("role") || applyingRole).trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email) return;

    setStatus("sending");
    setErrorMessage("");

    try {
      await submitWeb3Form({
        subject: `Job Application: ${role} (${name})`,
        candidate_name: name,
        candidate_email: email,
        target_role: role,
        portfolio_url: portfolio || "Not provided",
        years_experience: experience || "Not specified",
        application_note: message,
      });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Encountered an issue submitting. Please email your CV directly.");
    }
  };

  return (
    <div className="space-y-24">
      {/* 1. Studio Stats Row */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CAREER_STATS.map((item) => (
            <div
              key={item.label}
              className="relative rounded-[24px] p-6 sm:p-8 bg-[#090b12] border border-white/[0.08] overflow-hidden"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white font-sans">
                {item.value}
              </div>
              <div className="mt-2 text-xs font-mono uppercase tracking-wider text-indigo-300">
                {item.label}
              </div>
              <p className="mt-2 text-xs text-gray-400 font-light leading-relaxed">
                {item.desc}
              </p>
              {/* Dot matrix */}
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-2 right-2 w-16 h-16 opacity-15"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255, 255, 255, 0.75) 1.2px, transparent 1.2px)",
                  backgroundSize: "6px 6px",
                  maskImage: "linear-gradient(to top left, black 20%, transparent 80%)",
                  WebkitMaskImage: "linear-gradient(to top left, black 20%, transparent 80%)",
                }}
              />
            </div>
          ))}
        </div>
      </section>



      {/* 3. Open Roles Section */}
      <section id="open-roles" className="scroll-mt-24">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-mono uppercase tracking-wider text-indigo-300 mb-3">
              <Briefcase className="h-3.5 w-3.5" />
              <span>Active Openings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal text-white tracking-tight font-sans">
              Open Positions
            </h2>
            <p className="mt-1 text-sm text-gray-400 font-light">
              Explore open roles across our distributed engineering collective.
            </p>
          </div>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap gap-1.5 rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-md">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  selectedDept === dept
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Roles List */}
        <div className="mt-8 space-y-4">
          {filteredPositions.map((pos) => {
            const isExpanded = expandedRole === pos.id;

            return (
              <div
                key={pos.id}
                className={`relative rounded-[28px] border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? "border-indigo-400/40 bg-[#0d101c]"
                    : "border-white/[0.08] bg-[#090b12] hover:border-white/20 hover:bg-[#0c0f1b]"
                }`}
              >
                {/* Header Strip */}
                <div
                  className="cursor-pointer p-6 sm:p-8"
                  onClick={() => setExpandedRole(isExpanded ? null : pos.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setExpandedRole(isExpanded ? null : pos.id);
                    }
                  }}
                >
                  <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs mb-3">
                        <span className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2.5 py-0.5 font-mono text-[11px] text-indigo-300">
                          {pos.department}
                        </span>
                        <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-gray-300">
                          <Globe className="h-3 w-3 text-indigo-400" />
                          {pos.location}
                        </span>
                        <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-gray-300">
                          <Clock className="h-3 w-3 text-indigo-400" />
                          {pos.type}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-gray-400">
                          {pos.experience}
                        </span>
                        {pos.isFeatured && (
                          <span className="rounded-full border border-indigo-400/40 bg-indigo-400/20 px-2.5 py-0.5 text-[10px] font-mono text-indigo-200 uppercase tracking-wider">
                            Featured
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight font-sans">
                        {pos.title}
                      </h3>
                      <p className="mt-2 max-w-3xl text-sm text-gray-400 font-light leading-relaxed">
                        {pos.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-end lg:self-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApplyClick(pos.title);
                        }}
                        className="group flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white text-black text-xs sm:text-sm font-medium hover:bg-gray-200 transition-all duration-300"
                      >
                        <span>Apply Now</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>

                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70">
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Skills Pills */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {pos.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-white/5 bg-white/[0.03] px-2.5 py-1 text-[11px] font-mono text-gray-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-white/10 bg-black/40 p-6 sm:p-8">
                    <div className="grid gap-8 lg:grid-cols-2">
                      {/* Responsibilities */}
                      <div className="space-y-3">
                        <h4 className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-300">
                          <Rocket className="h-4 w-4" />
                          What You&apos;ll Build &amp; Own
                        </h4>
                        <ul className="space-y-2.5">
                          {pos.responsibilities.map((resp, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Requirements */}
                      <div className="space-y-3">
                        <h4 className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-300">
                          <Code2 className="h-4 w-4" />
                          Requirements &amp; Craft
                        </h4>
                        <ul className="space-y-2.5">
                          {pos.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                      <div className="text-xs text-gray-400 font-light">
                        Prefer direct email? Send your CV &amp; work to{" "}
                        <a
                          href={`mailto:${COMPANY_EMAIL}?subject=Application: ${pos.title}`}
                          className="text-indigo-300 underline underline-offset-4 hover:text-white"
                        >
                          {COMPANY_EMAIL}
                        </a>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleApplyClick(pos.title)}
                        className="inline-flex items-center gap-2 rounded-full border border-indigo-400/40 bg-indigo-500/20 px-6 py-2.5 text-xs sm:text-sm font-medium text-white hover:bg-indigo-500/30 transition"
                      >
                        <span>Submit Application</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Perks & Benefits Grid */}
      <section>
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-mono uppercase tracking-wider text-indigo-300 mb-3">
            <Zap className="h-3.5 w-3.5" />
            <span>Perks &amp; Culture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-white tracking-tight font-sans">
            Why Engineers Thrive at Whizzly Lab
          </h2>
          <p className="mt-2 max-w-2xl text-sm sm:text-base text-gray-400 font-light leading-relaxed">
            We operate with deep respect for developer ergonomics, autonomy, and continuous learning.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STUDIO_PERKS.map((perk) => (
            <div
              key={perk.title}
              className="relative rounded-[28px] p-6 sm:p-8 bg-[#090b12] border border-white/[0.08] hover:border-indigo-400/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider text-gray-400">
                  {perk.category}
                </span>
                <span className="h-2 w-2 rounded-full bg-indigo-400" />
              </div>
              <h3 className="text-lg font-medium text-white font-sans">{perk.title}</h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                {perk.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Direct Application Form */}
      <section id="apply-form" className="max-w-4xl mx-auto scroll-mt-24">
        <div className="relative rounded-[32px] p-8 sm:p-12 bg-[#090b12] border border-white/[0.08] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/30 bg-indigo-500/10 text-xs font-mono uppercase tracking-wider text-indigo-300 mb-3">
              <Send className="h-3.5 w-3.5" />
              <span>Application Portal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal text-white tracking-tight font-sans">
              Join the Engineering Collective
            </h2>
            <p className="mt-2 text-sm text-gray-400 font-light leading-relaxed">
              We review every application with engineering eyes and reply within 48 hours.
            </p>
          </div>

          {status === "sent" ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mb-4">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-white font-sans">Application Received</h3>
              <p className="mt-2 text-sm text-gray-300 font-light">
                Thank you for applying. Our engineering leads will review your portfolio and reach out shortly.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-xs font-medium text-white transition hover:bg-white/10"
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form onSubmit={onApplicationSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Ada Lovelace"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-indigo-400 transition"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="ada@domain.com"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-indigo-400 transition"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="role" className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                    Target Role *
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={applyingRole}
                    onChange={(e) => setApplyingRole(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#090b12] px-4 py-3.5 text-sm text-white outline-none focus:border-indigo-400 transition"
                  >
                    {OPEN_POSITIONS.map((pos) => (
                      <option key={pos.id} value={pos.title}>
                        {pos.title} ({pos.type})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="portfolio" className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                    GitHub / Portfolio / LinkedIn *
                  </label>
                  <input
                    id="portfolio"
                    name="portfolio"
                    type="url"
                    required
                    placeholder="https://github.com/username"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-indigo-400 transition"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="experience" className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                  Years of Relevant Experience
                </label>
                <input
                  id="experience"
                  name="experience"
                  type="text"
                  placeholder="e.g. 4+ years in Python / PyTorch & RAG"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-indigo-400 transition"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                  What have you built that you are proud of? *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Describe a complex architecture, low-latency pipeline, or ML model you engineered..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-indigo-400 transition"
                />
              </div>

              {status === "error" && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-300">
                  {errorMessage || "Submission error. Please try emailing directly."}
                </div>
              )}

              <div className="flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
                <p className="text-xs text-gray-400 font-light">
                  Prefer direct email? Send your CV to{" "}
                  <a
                    href={`mailto:${COMPANY_EMAIL}?subject=Application for ${applyingRole}`}
                    className="text-indigo-300 underline underline-offset-4 hover:text-white"
                  >
                    {COMPANY_EMAIL}
                  </a>
                </p>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 sm:w-auto"
                >
                  <span>
                    {status === "sending" ? "Submitting Application..." : "Send Application"}
                  </span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}

          {/* Corner dot matrix */}
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
      </section>
    </div>
  );
}
