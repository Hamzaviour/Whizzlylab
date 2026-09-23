"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What services does Whizzly Lab offer?",
    a: "We offer AI engineering, machine learning, RAG multi-agent pipelines, real-time data pipelines (Kafka/Spark), full-stack web platforms, automation, computer vision, and custom software systems, all production-grade and shipped to global clients.",
  },
  {
    q: "How long does a typical project take?",
    a: "Project timelines vary by scope. A targeted feature or pipeline takes 2 to 4 weeks, an end-to-end AI system 4 to 8 weeks, and a full enterprise SaaS platform 2 to 4 months. We provide a detailed architectural roadmap after the discovery call.",
  },
  {
    q: "Do you sign NDAs before discussing projects?",
    a: "Absolutely. We sign mutual NDAs before any sensitive project discussions. Your intellectual property, proprietary algorithms, and datasets remain 100% confidential and secure.",
  },
  {
    q: "What is your response time and communication model?",
    a: "We commit to a sub-24-hour response SLA across all global time zones. For active sprint delivery, we integrate directly into your preferred tools (Slack, Discord, GitHub, Jira) with weekly live demos.",
  },
  {
    q: "Can you augment or collaborate with our existing in-house team?",
    a: "Yes. We operate both as a standalone delivery partner and as specialized engineering augmentation. We embed seamlessly into your CI/CD pipelines, code reviews, and sprint planning.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-medium tracking-wide text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            Clarity &amp; Transparency
          </div>
          <h2
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl font-heading"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-hero-sub/75 text-base">
            Everything you need to know about working with Whizzly Lab.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.q}
                className={`liquid-glass rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen ? "border-cyan-500/40 shadow-[0_0_30px_rgba(0,240,255,0.1)]" : "border-white/10 hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between p-6 sm:p-7 text-left transition"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-semibold text-white pr-4">
                    {faq.q}
                  </span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "border-cyan-400 bg-cyan-500/20 text-cyan-300 rotate-180"
                        : "border-white/15 bg-white/5 text-hero-sub"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm sm:text-base leading-relaxed text-hero-sub/80 border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
