"use client";

import { motion } from "framer-motion";
import { Cloud, Cpu, Network, Zap } from "lucide-react";

const edges = [
  {
    icon: Network,
    title: "Distributed systems first",
    text: "Parallel processing, Kafka streams, and Spark jobs engineered for speed under real production load.",
  },
  {
    icon: Cpu,
    title: "Intelligence baked in",
    text: "RAG, agentic workflows, and Hugging Face deployments — models that think and ship, not just demos.",
  },
  {
    icon: Cloud,
    title: "Cloud-native delivery",
    text: "Modern AWS deployments, Dockerized services, and resilient APIs your product can grow on.",
  },
  {
    icon: Zap,
    title: "Interface + infrastructure",
    text: "We don't just build pretty UIs — we own the heavy backend so every screen feels instantaneous.",
  },
];

export default function OurEdge() {
  return (
    <section className="relative z-10 px-4 py-24 sm:py-32">
      <div className="glow-orb right-[5%] top-1/4 h-72 w-72 bg-[var(--blue)]/20" />
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
        >
          <p className="text-xs font-medium tracking-[0.2em] text-[var(--text-muted)] uppercase">
            Why Whizzly
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-grotesk)] text-3xl font-medium tracking-tight text-white sm:text-5xl">
            Dual expertise.
            <br />
            <span className="text-[var(--text-secondary)]">One laboratory.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            Whizzly Lab bridges polished product experience with heavy-duty backend
            architecture. We engineer intelligent, end-to-end systems — from distributed data pipelines
            to production-grade RAG agents — that people actually rely on.
          </p>
          <p className="mt-4 text-[var(--text-secondary)]">
            Engineered for reliability and shipping globally: predictive models, real-time
            automation, and full-stack platforms for startups and enterprises who need
            more than a prototype.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {edges.map((edge, i) => {
            const Icon = edge.icon;
            return (
              <motion.div
                key={edge.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="glass group rounded-2xl p-5"
              >
                <motion.div
                  whileHover={{ y: -4, rotate: [0, -8, 8, 0] }}
                  transition={{ type: "spring", stiffness: 350, damping: 12 }}
                  className="mb-3 inline-flex rounded-xl bg-white/5 p-2.5 text-[var(--cyan)]"
                >
                  <Icon className="h-5 w-5" />
                </motion.div>
                <h3 className="font-semibold text-[var(--text-primary)]">{edge.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  {edge.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
