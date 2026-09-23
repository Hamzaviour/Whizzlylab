"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { Send } from "lucide-react";
import { GitHubIcon, LinkedInIcon, InstagramIcon, FacebookIcon } from "./icons";
import {
  COMPANY_EMAIL,
  COMPANY_PHONE,
  PHONE_URL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  GITHUB_URL,
  submitWeb3Form,
} from "@/lib/contact";

export default function ContactCTA() {
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
        subject: `Whizzly Lab Project: ${String(data.get("name") || "")}`,
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
    <section id="contact" className="relative z-10 px-4 py-24 sm:py-32">
      <div className="glow-orb left-1/2 top-0 h-80 w-80 -translate-x-1/2 bg-[var(--purple)]/25" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-6 sm:p-10 lg:p-14"
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-[var(--text-muted)] uppercase">
                Get in touch
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-grotesk)] text-3xl font-medium tracking-tight text-white sm:text-5xl">
                Ready to ship the future?
              </h2>
              <p className="mt-4 text-[var(--text-secondary)]">
                Tell us about your AI, data, or product challenge. We&apos;ll respond with
                a clear path from idea to production.
              </p>

              <div className="mt-8 flex flex-wrap gap-2.5">
                <motion.a
                  whileHover={{ y: -3, scale: 1.03 }}
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm text-white transition hover:border-[var(--cyan)]/40 hover:text-[var(--cyan)]"
                >
                  <LinkedInIcon className="h-4 w-4" />
                  LinkedIn
                </motion.a>
                <motion.a
                  whileHover={{ y: -3, scale: 1.03 }}
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm text-white transition hover:border-[var(--cyan)]/40 hover:text-[var(--cyan)]"
                >
                  <InstagramIcon className="h-4 w-4" />
                  Instagram
                </motion.a>
                <motion.a
                  whileHover={{ y: -3, scale: 1.03 }}
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm text-white transition hover:border-[var(--cyan)]/40 hover:text-[var(--cyan)]"
                >
                  <FacebookIcon className="h-4 w-4" />
                  Facebook
                </motion.a>
                <motion.a
                  whileHover={{ y: -3, scale: 1.03 }}
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm text-white transition hover:border-[var(--cyan)]/40 hover:text-[var(--cyan)]"
                >
                  <GitHubIcon className="h-4 w-4" />
                  GitHub
                </motion.a>
              </div>

              <div className="mt-10 space-y-2 text-sm text-[var(--text-muted)]">
                <p>
                  Email:{" "}
                  <a
                    href={`mailto:${COMPANY_EMAIL}`}
                    className="text-[var(--cyan)] hover:underline"
                  >
                    {COMPANY_EMAIL}
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a
                    href={PHONE_URL}
                    className="text-[var(--cyan)] hover:underline"
                  >
                    {COMPANY_PHONE}
                  </a>
                </p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="input-float relative">
                <input
                  id="name"
                  name="name"
                  required
                  placeholder=" "
                  className="peer w-full rounded-2xl border border-white/10 bg-black/30 px-4 pt-6 pb-3 text-white outline-none transition focus:border-[var(--cyan)]/50"
                />
                <label
                  htmlFor="name"
                  className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-sm text-[var(--text-muted)] transition-all"
                >
                  Your name
                </label>
              </div>

              <div className="input-float relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder=" "
                  className="peer w-full rounded-2xl border border-white/10 bg-black/30 px-4 pt-6 pb-3 text-white outline-none transition focus:border-[var(--cyan)]/50"
                />
                <label
                  htmlFor="email"
                  className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-sm text-[var(--text-muted)] transition-all"
                >
                  Work email
                </label>
              </div>

              <div className="input-float relative">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder=" "
                  className="peer w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 pt-7 pb-3 text-white outline-none transition focus:border-[var(--cyan)]/50"
                />
                <label
                  htmlFor="message"
                  className="pointer-events-none absolute top-5 left-4 text-sm text-[var(--text-muted)] transition-all"
                >
                  Project brief
                </label>
              </div>

              <MagneticButton type="submit" className="w-full sm:w-auto">
                <span className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#0a0a0f] transition hover:bg-white/90 sm:w-auto">
                  <Send className="h-4 w-4" />
                  {status === "sending"
                    ? "Sending…"
                    : status === "sent"
                      ? "Sent. We'll reply soon"
                      : status === "error"
                        ? "Failed. Please try again"
                        : "Send Message"}
                </span>
              </MagneticButton>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
