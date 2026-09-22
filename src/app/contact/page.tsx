"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import CtaFooter from "@/components/CtaFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import ResponseTimePromise from "@/components/ResponseTimePromise";
import {
  COMPANY_EMAIL,
  WHATSAPP_URL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  submitWeb3Form,
} from "@/lib/contact";
import { LinkedInIcon, InstagramIcon, FacebookIcon } from "@/components/icons";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      await submitWeb3Form({
        subject: `Whizzly Lab Contact — ${String(data.get("name") || "")}`,
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        message: String(data.get("message") || ""),
      });
      setStatus("sent");
      form.reset();
      window.location.href = "/thank-you";
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-transparent text-foreground">
      <PageNavbar />

      <section className="px-4 py-12 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs tracking-[0.2em] text-foreground/40 uppercase">
            Contact
          </p>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Contact" },
            ]}
          />
          <h1
            className="mx-auto mt-3 max-w-3xl text-3xl font-bold tracking-tight italic sm:text-5xl md:text-6xl"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Let&apos;s build your next product.
          </h1>
          <p className="mx-auto mt-4 max-w-xl break-words text-sm text-hero-sub/80 sm:text-base">
            Reach Whizzly Lab at{" "}
            <a
              href={`mailto:${COMPANY_EMAIL}`}
              className="text-foreground underline-offset-4 hover:underline"
            >
              {COMPANY_EMAIL}
            </a>
            .
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              href="/schedule"
              className="liquid-glass-strong font-body inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Schedule a Consult
              <ArrowUpRight className="h-5 w-5" />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="font-body inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-6 py-3 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/25"
            >
              WhatsApp
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link
              href="/pricing"
              className="font-body inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
            >
              View Pricing
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <ResponseTimePromise />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <form
            onSubmit={onSubmit}
            className="liquid-glass mx-auto w-full max-w-xl space-y-4 rounded-3xl p-5 sm:p-8"
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
          <textarea
            name="message"
            required
            rows={5}
            placeholder="How can we help?"
            className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 outline-none placeholder:text-foreground/30 focus:border-white/25"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-full border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-medium transition hover:bg-white/15 disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
          {status === "sent" && (
            <p className="text-center text-sm text-emerald-400/90">
              Message sent to Whizzly Lab — we&apos;ll reply soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-sm text-red-400/90">
              Couldn&apos;t send. Try {COMPANY_EMAIL} or WhatsApp.
            </p>
          )}
          </form>

          {/* Direct channels card */}
          <div className="liquid-glass mx-auto flex w-full max-w-xl flex-col justify-between rounded-3xl p-6 sm:p-8">
            <div className="space-y-6">
              <div>
                <p className="text-xs tracking-widest text-foreground/40 uppercase">Direct Channels</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white" style={{ fontFamily: "'Syne', 'General Sans', sans-serif" }}>
                  Fastest ways to connect
                </h2>
                <p className="mt-2 text-sm text-hero-sub/75">
                  Have an urgent requirement or prefer a direct conversation? Choose your preferred channel below.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.06]">
                  <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider">Email</p>
                  <a
                    href={`mailto:${COMPANY_EMAIL}`}
                    className="mt-1 block text-base font-medium text-white underline underline-offset-4 hover:text-[#00F0FF]"
                  >
                    {COMPANY_EMAIL}
                  </a>
                  <p className="mt-1 text-xs text-hero-sub/60">For RFPs, detailed briefs & NDAs</p>
                </div>

                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 transition hover:bg-emerald-500/10">
                  <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">WhatsApp Direct</p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/25"
                  >
                    Chat on WhatsApp
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <p className="mt-2 text-xs text-hero-sub/60">Instant messaging for quick questions & scoping</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.06]">
                  <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider">Discovery Call</p>
                  <Link
                    href="/schedule"
                    className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
                  >
                    Book a 20–30 min consultation
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <p className="mt-2 text-xs text-hero-sub/60">Technical architecture and budget clarity</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.06]">
                  <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider">Social Channels</p>
                  <div className="mt-2.5 flex flex-wrap items-center gap-2">
                    <a
                      href={LINKEDIN_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition hover:border-cyan-400/40 hover:text-cyan-300"
                    >
                      <LinkedInIcon className="h-3.5 w-3.5" />
                      LinkedIn
                    </a>
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition hover:border-cyan-400/40 hover:text-cyan-300"
                    >
                      <InstagramIcon className="h-3.5 w-3.5" />
                      Instagram
                    </a>
                    <a
                      href={FACEBOOK_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition hover:border-cyan-400/40 hover:text-cyan-300"
                    >
                      <FacebookIcon className="h-3.5 w-3.5" />
                      Facebook
                    </a>
                  </div>
                  <p className="mt-2 text-xs text-hero-sub/60">Follow our engineering updates, articles &amp; client case studies</p>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4 text-xs text-hero-sub/60">
              <p>Operating across global time zones · NDA signed prior to discussion upon request</p>
            </div>
          </div>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}
