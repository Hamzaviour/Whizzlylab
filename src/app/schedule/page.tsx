"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import CtaFooter from "@/components/CtaFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import BudgetSelect from "@/components/BudgetSelect";
import { useCurrency } from "@/lib/currency";
import {
  COMPANY_EMAIL,
  WHATSAPP_URL,
  submitWeb3Form,
} from "@/lib/contact";

const serviceOptions = [
  "Web Development",
  "AI / RAG",
  "Machine Learning",
  "Data Pipelines",
  "Automation",
  "Data Analytics",
  "Computer Vision",
  "Business Solutions",
  "Other",
];

export default function SchedulePage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const { format, currency } = useCurrency();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      await submitWeb3Form({
        subject: `Whizzly Lab Schedule — ${String(data.get("service") || "Consult")}`,
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
    <main className="min-h-screen overflow-x-hidden bg-transparent text-foreground">
      <PageNavbar />

      <section className="px-4 py-12 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Schedule" },
            ]}
          />
        </div>

        <div className="mx-auto mt-6 grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300 backdrop-blur-md">
              ✦ Discovery &amp; Strategy
            </span>
            <h1
              className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
              style={{ fontFamily: "'Syne', 'General Sans', sans-serif" }}
            >
              Book a Strategy Consult
            </h1>
            <p className="mt-4 text-base leading-relaxed text-hero-sub/80">
              Tell us about your project — AI/RAG system, real-time data pipelines, or full-stack web platform. We reply within 24 hours with technical feasibility and clear next steps.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-hero-sub/75">
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">✦</span> 20–30 minute technical discovery call
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">✦</span> Scope, timeline, and architectural clarity in {currency}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">✦</span> Direct discussion with engineering leads
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">✦</span> Mutual NDA signed prior to discussion upon request
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-5 py-2.5 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/20"
              >
                Chat on WhatsApp
              </a>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Explore Pricing Estimator →
              </Link>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="liquid-glass space-y-4 rounded-3xl p-6 sm:p-8"
          >
            <input
              name="name"
              required
              placeholder="Your name"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 outline-none placeholder:text-foreground/30 focus:border-white/25"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Work email"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 outline-none placeholder:text-foreground/30 focus:border-white/25"
            />
            <input
              name="phone"
              placeholder="WhatsApp / phone"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 outline-none placeholder:text-foreground/30 focus:border-white/25"
            />
            <select
              name="service"
              required
              defaultValue=""
              className="w-full rounded-2xl border border-white/10 bg-[#0c0c10] px-4 py-3.5 outline-none focus:border-white/25"
            >
              <option value="" disabled>
                Service interest
              </option>
              {serviceOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <BudgetSelect />
            <input
              name="when"
              placeholder="Preferred day / time (optional)"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 outline-none placeholder:text-foreground/30 focus:border-white/25"
            />
            <textarea
              name="message"
              rows={4}
              placeholder="Project notes"
              className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 outline-none placeholder:text-foreground/30 focus:border-white/25"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#00f0ff] px-6 py-3.5 text-sm font-semibold text-black transition hover:opacity-90 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Request schedule"}
            </button>
            {status === "sent" && (
              <p className="text-center text-sm text-emerald-400/90">
                Sent — we&apos;ll reply at {COMPANY_EMAIL} shortly.
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-sm text-red-400/90">
                Something went wrong. Email us at {COMPANY_EMAIL} or try
                WhatsApp.
              </p>
            )}
          </form>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}
