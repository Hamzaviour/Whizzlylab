"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import {
  COMPANY_EMAIL,
  WHATSAPP_URL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  submitWeb3Form,
} from "@/lib/contact";

export default function ContactSection() {
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
        subject: `Whizzly Lab Consult — ${String(data.get("name") || "")}`,
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        message: String(data.get("message") || ""),
      });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative z-10 px-4 py-28 sm:px-8">
      <div className="liquid-glass mx-auto max-w-6xl rounded-[2rem] p-8 sm:p-12 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-foreground/40 uppercase">
              Contact
            </p>
            <h2 className="font-general mt-3 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
              Schedule a consult
            </h2>
            <p className="mt-4 max-w-md text-hero-sub/80">
              Tell us about your AI, automation, or product goals. We&apos;ll reply with a
              clear path to production.
            </p>
            <div className="mt-8 space-y-2 text-sm text-foreground/50">
              <p>
                Email:{" "}
                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="text-foreground/80 hover:underline"
                >
                  {COMPANY_EMAIL}
                </a>
              </p>
              <p>
                WhatsApp:{" "}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground/80 hover:underline"
                >
                  Chat with us on WhatsApp
                </a>
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition underline underline-offset-4"
                >
                  LinkedIn
                </a>
                <span>·</span>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition underline underline-offset-4"
                >
                  Instagram
                </a>
                <span>·</span>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition underline underline-offset-4"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <input
              name="name"
              required
              placeholder="Your name"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-foreground outline-none placeholder:text-foreground/30 focus:border-white/25"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Work email"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-foreground outline-none placeholder:text-foreground/30 focus:border-white/25"
            />
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Project brief"
              className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-foreground outline-none placeholder:text-foreground/30 focus:border-white/25"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-hero-secondary inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {status === "sending"
                ? "Sending…"
                : status === "sent"
                  ? "Sent — we'll reply soon"
                  : status === "error"
                    ? "Failed — try again"
                    : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
