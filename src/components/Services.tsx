"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Database,
  LayoutDashboard,
  LineChart,
  type LucideIcon,
} from "lucide-react";

const services: {
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
}[] = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description:
      "Custom model training, predictive analytics, and production deployments with Hugging Face and PyTorch pipelines.",
    points: ["Supervised & deep learning", "RAG & agentic systems", "Model eval & MLOps"],
  },
  {
    icon: Database,
    title: "Big Data & Automation",
    description:
      "Distributed processing and automation pipelines that turn raw streams into reliable intelligence.",
    points: ["Kafka & Spark pipelines", "n8n workflow automation", "AWS orchestration"],
  },
  {
    icon: LayoutDashboard,
    title: "Full-Stack Development",
    description:
      "Interactive, scalable applications and dashboards built with React, Next.js, and Flask.",
    points: ["React & Next.js", "Flask APIs & Docker", "HIPAA-ready platforms"],
  },
  {
    icon: LineChart,
    title: "Business Intelligence",
    description:
      "Turning raw data into clear visual stories with Power BI, Tableau, and Looker Studio.",
    points: ["Executive dashboards", "Self-serve analytics", "KPI storytelling"],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative z-10 px-4 py-28 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-xs font-medium tracking-[0.2em] text-[var(--text-muted)] uppercase">
            Capabilities
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-grotesk)] text-3xl font-medium tracking-tight text-white sm:text-5xl">
            End-to-end delivery
          </h2>
          <p className="mt-4 text-[var(--text-secondary)]">
            From model training to distributed backends and polished product UI:
            one lab, full stack of intelligence.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 transition duration-300 hover:border-white/15 hover:bg-white/[0.05] sm:p-8"
              >
                <div className="mb-5 inline-flex rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-white/80">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-[family-name:var(--font-grotesk)] text-xl font-medium tracking-tight text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {service.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2.5 text-sm text-[var(--text-muted)]"
                    >
                      <span className="h-1 w-1 rounded-full bg-white/40" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
