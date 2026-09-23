"use client";

import { motion } from "framer-motion";
import { Brain, Database, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import TextRevealOnScroll, { TextRevealWords } from "./TextRevealOnScroll";
import type { ComponentType, SVGProps } from "react";

// Connected nodes icon matching the 3rd card in the screenshot
function ConnectedNodesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="7" height="7" rx="2.5" />
      <rect x="14" y="14" width="7" height="7" rx="2.5" />
      <path d="M6.5 10v3a2 2 0 0 0 2 2h3.5" />
    </svg>
  );
}

interface CapabilityCard {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  borderGradient: string;
  glowGradient: string;
  link: string;
  duration: number;
  delay: number;
}

const capabilities: CapabilityCard[] = [
  {
    title: "AI & ML Systems",
    description:
      "Custom models, RAG agents, and Hugging Face deployments built for production, not demos.",
    icon: Brain,
    borderGradient: "linear-gradient(135deg, #FF2D78 0%, #FF6584 45%, #FFA048 100%)",
    glowGradient:
      "radial-gradient(circle at 50% 50%, rgba(255, 45, 120, 0.45) 0%, rgba(255, 160, 72, 0.25) 70%, transparent 100%)",
    link: "/services/ai",
    duration: 5.5,
    delay: 0.1,
  },
  {
    title: "Data Pipelines",
    description:
      "Kafka, Spark, and PySpark streams that turn raw events into real-time intelligence.",
    icon: Database,
    borderGradient: "linear-gradient(135deg, #38BDF8 0%, #00F0FF 45%, #0284C7 100%)",
    glowGradient:
      "radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.45) 0%, rgba(56, 189, 248, 0.25) 70%, transparent 100%)",
    link: "/services/data-pipelines",
    duration: 7,
    delay: 0.2,
  },
  {
    title: "Full-Stack Products",
    description:
      "React, Next.js, and Flask platforms with automation, dashboards, and cloud delivery.",
    icon: ConnectedNodesIcon,
    borderGradient: "linear-gradient(135deg, #818CF8 0%, #A855F7 50%, #EC4899 100%)",
    glowGradient:
      "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.45) 0%, rgba(236, 72, 153, 0.25) 70%, transparent 100%)",
    link: "/services/web-development",
    duration: 6,
    delay: 0.3,
  },
];

export default function FeatureCardsSection() {
  return (
    <section
      id="features"
      className="relative flex flex-col items-center justify-center px-4 py-20 font-sans sm:px-8 sm:py-32"
    >
      {/* Header Section */}
      <div className="mb-16 max-w-3xl text-center">
        <TextRevealOnScroll
          as="p"
          className="text-xs tracking-[0.2em] text-cyan-400/80 uppercase font-semibold"
        >
          Core Capabilities
        </TextRevealOnScroll>
        <TextRevealWords
          text="Engineering precision for every layer of your stack"
          className="font-general mt-3 text-3xl font-medium tracking-tight text-white sm:text-5xl"
        />
        <p className="mt-4 text-base text-hero-sub/80 max-w-2xl mx-auto">
          We combine deep algorithmic AI expertise with production-grade full-stack architecture to turn complex concepts into reliable software.
        </p>
      </div>

      {/* 3 Glowing Gradient Border Cards matching Screenshot */}
      <div className="grid w-full max-w-6xl grid-cols-1 gap-7 sm:gap-8 md:grid-cols-3">
        {capabilities.map((card) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: card.delay }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="group relative flex h-full min-h-[380px] sm:min-h-[410px] w-full flex-col"
            >
              <Link href={card.link} className="flex h-full w-full flex-col">
                {/* 1. Ambient Outer Glow Halo */}
                <div
                  className="pointer-events-none absolute -inset-1 rounded-[38px] opacity-35 blur-xl transition-all duration-500 group-hover:opacity-85 group-hover:blur-2xl"
                  style={{ background: card.glowGradient }}
                />

                {/* 2. Glowing Animated Gradient Border Container */}
                <div
                  className="relative flex h-full w-full flex-col overflow-hidden rounded-[34px] sm:rounded-[36px] p-[3px] transition-all duration-300 group-hover:shadow-[0_0_35px_rgba(255,255,255,0.15)]"
                  style={{
                    background: card.borderGradient,
                    backgroundSize: "220% 220%",
                    animation: `borderGlowFlow ${card.duration}s ease-in-out infinite`,
                  }}
                >
                  {/* 3. Deep Dark Card Body (matching screenshot interior) */}
                  <div className="relative flex h-full w-full flex-col justify-between rounded-[31px] sm:rounded-[33px] bg-[#0c051a] p-8 sm:p-9 transition-colors duration-300 group-hover:bg-[#0f0722]">
                    {/* Top: Icon */}
                    <div className="flex items-center justify-between">
                      <Icon className="h-9 w-9 text-white transition-transform duration-300 group-hover:scale-105" />
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <ArrowUpRight className="h-4 w-4 text-white" />
                      </div>
                    </div>

                    {/* Bottom: Title & Description */}
                    <div className="mt-16 sm:mt-20">
                      <h3 className="text-2xl font-bold tracking-tight text-white sm:text-[26px]">
                        {card.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-hero-sub/80 sm:text-[15px]">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
