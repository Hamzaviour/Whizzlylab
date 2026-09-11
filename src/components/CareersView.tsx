"use client";

import { useState, useTransition, FormEvent } from "react";
import {
  Briefcase,
  Code2,
  Cpu,
  Database,
  Globe,
  Clock,
  Rocket,
  CheckCircle2,
  ArrowUpRight,
  Send,
  Zap,
  ChevronDown,
  ChevronUp,
  Building2,
  Sparkles,
  ShieldCheck,
  Check,
} from "lucide-react";
import {
  OPEN_POSITIONS,
  STUDIO_PERKS,
  STUDIO_VALUES,
  CAREER_STATS,
  JobPosition,
} from "@/lib/careers";
import { COMPANY_EMAIL, submitWeb3Form } from "@/lib/contact";

const DEPARTMENTS = ["All", "AI & ML", "Full-Stack", "Data & Cloud", "Leadership"] as const;

export default function CareersView() {
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [expandedRole, setExpandedRole] = useState<string | null>(OPEN_POSITIONS[0]?.id || null);
  const [applyingRole, setApplyingRole] = useState<string>(OPEN_POSITIONS[0]?.title || "Senior AI & LLM Systems Engineer");
  
  // Application Form State
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [, startTransition] = useTransition();

  const filteredPositions = selectedDept === "All"
    ? OPEN_POSITIONS
    : OPEN_POSITIONS.filter((pos) => pos.department === selectedDept || pos.department === "General");

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
        subject: `Job Application: ${role} — ${name}`,
        candidate_name: name,
        candidate_email: email,
        target_role: role,
        portfolio_url: portfolio || "Not provided",
        years_experience: experience || "Not specified",
        application_note: message,
      });

      startTransition(() => {
        setStatus("sent");
        form.reset();
      });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Failed to submit application. Please reach out to us directly at " + COMPANY_EMAIL
      );
    }
  };

  return (
    <div className="space-y-24">
      {/* 1. Career Stats Strip */}
      <section className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {CAREER_STATS.map((item) => (
            <div
              key={item.label}
              className="liquid-glass group rounded-2xl border border-white/10 p-6 transition-all hover:border-cyan-500/30 hover:bg-white/[0.04]"
            >
              <div className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                <span className="bg-gradient-to-r from-cyan-400 to-indigo-300 bg-clip-text text-transparent">
                  {item.value}
                </span>
              </div>
              <div className="mt-1 text-sm font-semibold text-white/90">{item.label}</div>
              <p className="mt-2 text-xs leading-relaxed text-hero-sub/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Studio Values Section */}
      <section className="mx-auto max-w-6xl">
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>HOW WE OPERATE</span>
          </div>
          <h2
            className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-4xl"
            style={{ fontFamily: "'Syne', 'General Sans', sans-serif" }}
          >
            Built for Engineers Who Take Pride in Their Craft
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-hero-sub/80 sm:text-base">
            We are not a bloated IT consultancy. Whizzly Lab is a lean, highly technical studio of
            system designers, ML practitioners, and full-stack builders.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {STUDIO_VALUES.map((val) => (
            <div
              key={val.title}
              className="liquid-glass relative overflow-hidden rounded-3xl border border-white/10 p-7 transition hover:border-white/20"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-cyan-300">
                  {val.badge}
                </span>
                <CheckCircle2 className="h-4 w-4 text-cyan-400/50" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">{val.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-hero-sub/80">{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Open Roles Section */}
      <section id="open-roles" className="mx-auto max-w-6xl scroll-mt-24">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
              <Briefcase className="h-3.5 w-3.5" />
              <span>ACTIVE OPENINGS</span>
            </div>
            <h2
              className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl"
              style={{ fontFamily: "'Syne', 'General Sans', sans-serif" }}
            >
              Open Positions
            </h2>
            <p className="mt-1 text-xs text-hero-sub/70 sm:text-sm">
              Explore open roles across our distributed engineering collective.
            </p>
          </div>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-md">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
                  selectedDept === dept
                    ? "bg-white text-black shadow-sm"
                    : "text-hero-sub/80 hover:bg-white/5 hover:text-white"
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
                className={`liquid-glass rounded-3xl border transition-all duration-300 ${
                  isExpanded
                    ? "border-cyan-500/40 bg-white/[0.04] shadow-[0_10px_35px_rgba(0,0,0,0.5)]"
                    : "border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
                }`}
              >
                {/* Header Strip */}
                <div
                  className="cursor-pointer p-6 sm:p-7"
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
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 font-semibold text-cyan-300">
                          {pos.department}
                        </span>
                        <span className="flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 text-hero-sub/90">
                          <Globe className="h-3 w-3 text-cyan-400" />
                          {pos.location}
                        </span>
                        <span className="flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 text-hero-sub/90">
                          <Clock className="h-3 w-3 text-indigo-400" />
                          {pos.type}
                        </span>
                        <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 text-hero-sub/80">
                          {pos.experience}
                        </span>
                        {pos.isFeatured && (
                          <span className="rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                            Featured
                          </span>
                        )}
                      </div>

                      <h3 className="mt-3 text-xl font-bold tracking-tight text-white group-hover:text-cyan-300 sm:text-2xl">
                        {pos.title}
                      </h3>
                      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-hero-sub/80">
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
                        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-black transition hover:bg-cyan-300 sm:text-sm"
                      >
                        Apply Now
                        <ArrowUpRight className="h-4 w-4" />
                      </button>

                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition">
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Skills Pills */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {pos.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-white/5 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/70"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-white/10 bg-black/20 p-6 sm:p-8">
                    <div className="grid gap-8 lg:grid-cols-2">
                      {/* Responsibilities */}
                      <div className="space-y-3">
                        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
                          <Rocket className="h-4 w-4" />
                          What You&apos;ll Build &amp; Own
                        </h4>
                        <ul className="space-y-2.5">
                          {pos.responsibilities.map((resp, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs leading-relaxed text-hero-sub/90 sm:text-sm">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Requirements */}
                      <div className="space-y-3">
                        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-300">
                          <Code2 className="h-4 w-4" />
                          Requirements &amp; Craft
                        </h4>
                        <ul className="space-y-2.5">
                          {pos.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs leading-relaxed text-hero-sub/90 sm:text-sm">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                      <div className="text-xs text-hero-sub/70">
                        Prefer direct email? Send your CV &amp; work to{" "}
                        <a href={`mailto:${COMPANY_EMAIL}?subject=Application: ${pos.title}`} className="text-cyan-300 underline underline-offset-2">
                          {COMPANY_EMAIL}
                        </a>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleApplyClick(pos.title)}
                        className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/15 px-6 py-2.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400/25 sm:text-sm"
                      >
                        Submit Application
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
      <section className="mx-auto max-w-6xl">
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300">
            <Zap className="h-3.5 w-3.5" />
            <span>PERKS &amp; CULTURE</span>
          </div>
          <h2
            className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-4xl"
            style={{ fontFamily: "'Syne', 'General Sans', sans-serif" }}
          >
            Why Engineers Thrive at Whizzly Lab
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-hero-sub/80 sm:text-base">
            We operate with deep respect for developer ergonomics, autonomy, and continuous learning.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STUDIO_PERKS.map((perk) => (
            <div
              key={perk.title}
              className="liquid-glass rounded-3xl border border-white/10 p-6 transition-all hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold text-hero-sub/80 uppercase tracking-wider">
                  {perk.category}
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-cyan-300">
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>
              <h3 className="mt-4 text-base font-bold text-white">{perk.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-hero-sub/80 sm:text-sm">
                {perk.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Direct Application Form */}
      <section id="apply-form" className="mx-auto max-w-4xl scroll-mt-24">
        <div className="liquid-glass relative overflow-hidden rounded-3xl border border-white/15 p-6 sm:p-12">
          {/* Subtle ambient light */}
          <div className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative z-10 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
              <Send className="h-3.5 w-3.5" />
              <span>QUICK APPLICATION</span>
            </div>
            <h2
              className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-4xl"
              style={{ fontFamily: "'Syne', 'General Sans', sans-serif" }}
            >
              Join the Engineering Collective
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-hero-sub/80 sm:text-base">
              Fill out the form below. We review every single application with engineering eyes and
              reply within 48 hours.
            </p>
          </div>

          {status === "sent" ? (
            <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-white">Application Received!</h3>
              <p className="mt-2 text-sm text-hero-sub/90">
                Thank you for applying. Our engineering leads will review your portfolio and reach out
                shortly.
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
            <form onSubmit={onApplicationSubmit} className="relative z-10 mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-hero-sub/80">
                    Full Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Ada Lovelace"
                    className="mt-1.5 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-foreground/30 focus:border-cyan-400/50"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-hero-sub/80">
                    Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="ada@domain.com"
                    className="mt-1.5 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-foreground/30 focus:border-cyan-400/50"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="role" className="block text-xs font-medium text-hero-sub/80">
                    Target Role <span className="text-cyan-400">*</span>
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={applyingRole}
                    onChange={(e) => setApplyingRole(e.target.value)}
                    className="mt-1.5 w-full rounded-2xl border border-white/10 bg-[#0d0520] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50"
                  >
                    {OPEN_POSITIONS.map((pos) => (
                      <option key={pos.id} value={pos.title}>
                        {pos.title} ({pos.type})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="portfolio" className="block text-xs font-medium text-hero-sub/80">
                    GitHub / Portfolio / LinkedIn <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="portfolio"
                    name="portfolio"
                    type="url"
                    required
                    placeholder="https://github.com/username"
                    className="mt-1.5 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-foreground/30 focus:border-cyan-400/50"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="experience" className="block text-xs font-medium text-hero-sub/80">
                  Years of Relevant Experience
                </label>
                <input
                  id="experience"
                  name="experience"
                  type="text"
                  placeholder="e.g. 4+ years in Python / FastAPI & RAG"
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-foreground/30 focus:border-cyan-400/50"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-hero-sub/80">
                  Tell Us About What You&apos;ve Built &amp; Why Whizzly Lab
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Briefly describe a complex system, model, or UI you engineered that you are proud of..."
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-foreground/30 focus:border-cyan-400/50"
                />
              </div>

              {status === "error" && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-300">
                  {errorMessage || "Submission error. Please try emailing directly."}
                </div>
              )}

              <div className="flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
                <p className="text-xs text-hero-sub/60">
                  Prefer direct email? Send your CV to{" "}
                  <a
                    href={`mailto:${COMPANY_EMAIL}?subject=Application for ${applyingRole}`}
                    className="text-cyan-300 underline"
                  >
                    {COMPANY_EMAIL}
                  </a>
                </p>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black transition hover:bg-cyan-300 disabled:opacity-50 sm:w-auto"
                >
                  {status === "sending" ? "Submitting Application..." : "Send Application"}
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
