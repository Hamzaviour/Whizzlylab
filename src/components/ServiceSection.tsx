"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { animate } from "animejs";
import {
  Code2,
  Brain,
  Sparkles,
  Workflow,
  LineChart,
  Briefcase,
  Eye,
  type LucideIcon,
} from "lucide-react";
import { TextRevealWords } from "./TextRevealOnScroll";

const services: {
  title: string;
  description: string;
  Icon: LucideIcon;
}[] = [
  {
    title: "Web Development",
    description:
      "High-performance React and Next.js products with Flask APIs, Docker, and cloud delivery.",
    Icon: Code2,
  },
  {
    title: "Machine Learning",
    description:
      "Supervised learning, deep models, evaluation loops, and Hugging Face pipelines.",
    Icon: Brain,
  },
  {
    title: "AI",
    description:
      "RAG systems, agentic workflows, LangChain, ChromaDB, and production LLM deployments.",
    Icon: Sparkles,
  },
  {
    title: "Automation",
    description:
      "n8n workflows, AWS orchestration, and voice AI with Whisper, Deepgram, and ElevenLabs.",
    Icon: Workflow,
  },
  {
    title: "Data Analytics",
    description:
      "Power BI, Tableau, and Looker Studio storytelling for executive decision-making.",
    Icon: LineChart,
  },
  {
    title: "Business Solutions",
    description:
      "Healthcare, compliance, and e-commerce platforms engineered end-to-end.",
    Icon: Briefcase,
  },
  {
    title: "Computer Vision",
    description:
      "Classification and detection models for satellite, industrial, and operational vision tasks.",
    Icon: Eye,
  },
];

export default function ServiceSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll(".service-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animate(entry.target, {
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 700,
            ease: "out(3)",
            delay: Number((entry.target as HTMLElement).dataset.i || 0) * 80,
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="relative z-10 px-4 py-28 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <p className="text-xs font-medium tracking-[0.2em] text-foreground/40 uppercase">
            Services
          </p>
          <TextRevealWords
            text="What Whizzly Lab ships"
            className="font-general mt-3 text-4xl font-medium tracking-tight text-foreground sm:text-5xl"
          />
          <p className="mt-4 text-base leading-relaxed text-hero-sub/80 sm:text-lg">
            End-to-end AI engineering and product delivery for startups and
            enterprises, from models to interfaces.
          </p>
        </div>

        <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.Icon;
            return (
              <motion.article
                key={service.title}
                data-i={i}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="service-card liquid-glass rounded-2xl p-6 opacity-0 sm:p-7"
              >
                <div className="mb-5 inline-flex rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-foreground">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-general text-xl font-medium tracking-tight text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-hero-sub/75">
                  {service.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
