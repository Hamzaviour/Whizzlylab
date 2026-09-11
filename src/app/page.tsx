import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import { BASE_URL, ogImage } from "@/lib/seo";
import FeatureCardsSection from "@/components/FeatureCardsSection";
import ServiceCarousel3D from "@/components/ServiceCarousel3D";
import BenefitsSection from "@/components/BenefitsSection";
import CtaFooter from "@/components/CtaFooter";
import ThreeNeuralField from "@/components/ThreeNeuralField";
import CursorParticles from "@/components/CursorParticles";
import { TextRevealWords } from "@/components/TextRevealOnScroll";
import ReviewsSection from "@/components/ReviewsSection";
import { Sparkles, Cpu, Brain, Database, Layers, CheckCircle2, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Whizzly Lab — AI Studio, ML & Software Engineering Services",
  description:
    "Whizzly Lab is an elite AI studio delivering AI services, machine learning solutions, real-time Kafka data pipelines, and full-stack software engineering services globally.",
  alternates: {
    canonical: `${BASE_URL}/`,
  },
  openGraph: {
    title: "Whizzly Lab — AI Studio, ML & Software Engineering Services",
    description:
      "Whizzly Lab is an elite AI studio delivering AI services, machine learning solutions, real-time Kafka data pipelines, and full-stack software engineering services globally.",
    url: `${BASE_URL}/`,
    siteName: "Whizzly Lab",
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Whizzly Lab — AI Studio & Software Engineering Services",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Whizzly Lab — AI Studio, ML & Software Engineering Services",
    description:
      "Whizzly Lab is an elite AI studio delivering AI services, machine learning solutions, real-time Kafka data pipelines, and full-stack software engineering services.",
    images: [`${BASE_URL}/twitter-image`],
  },
};

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Whizzly Lab (also known as Whizzly or WhizzlyLab)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Whizzly Lab (also known as Whizzly or WhizzlyLab) is an AI studio and software engineering studio specializing in intelligent AI systems, custom machine learning models, real-time Kafka data pipelines, and production-grade full-stack software for startups and enterprises worldwide."
        }
      },
      {
        "@type": "Question",
        "name": "What AI studio and software engineering services does Whizzly Lab provide?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Whizzly Lab provides comprehensive AI services and software engineering services including: (1) Custom AI and RAG agents, (2) Machine Learning and MLOps deployment, (3) Real-time Apache Kafka and Spark streaming data pipelines, (4) Production-grade Next.js and full-stack web platforms, (5) Workflow automation, microservices, and API architecture."
        }
      },
      {
        "@type": "Question",
        "name": "Is Whizzly Lab the same as Whizzy Lab or Whizlabs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Whizzly Lab (https://whizzlylab.com) is an independent AI studio and software engineering consultancy. Whizzly Lab is not affiliated with Whizzy Lab or Whizlabs, and is not an online certification training or practice exam platform."
        }
      },
      {
        "@type": "Question",
        "name": "How can businesses hire Whizzly Lab for AI and software engineering projects?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Businesses can book a 20-30 minute strategy consultation directly via the Schedule page (https://whizzlylab.com/schedule) or connect directly on WhatsApp at https://wa.me/923097404009."
        }
      }
    ]
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[hsl(260_87%_3%)] text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HeroSection />

      {/* Primary Studio Identity & Entity Definition (Optimized for Google Understanding & Disambiguation) */}
      <section className="relative z-10 px-4 pt-12 pb-6 sm:px-8 sm:pt-16">
        <div className="liquid-glass relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/15 bg-white/[0.02] p-8 sm:p-12 shadow-2xl">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300">
              <Sparkles className="h-3.5 w-3.5" />
              Whizzly Lab · Bespoke AI &amp; Software Engineering Studio
            </div>

            <h2
              className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
              style={{ fontFamily: "'Syne', 'General Sans', sans-serif" }}
            >
              Whizzly Lab is an AI, machine learning, and full-stack engineering studio.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-hero-sub/90 sm:text-lg">
              We build intelligent AI systems, RAG applications, real-time Kafka data pipelines, machine learning solutions, and production-grade software products for startups and enterprises worldwide.
            </p>

            {/* 5 Core Facets of Whizzly Lab */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">Engineering Studio</h3>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-hero-sub/75">
                  Whizzly Lab is an engineering studio delivering custom software architectures, distributed microservices, and dedicated engineering sprints.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                    <Brain className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">AI &amp; Machine Learning</h3>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-hero-sub/75">
                  Whizzly Lab works in AI and machine learning, training custom neural networks, fine-tuning LLMs, and building autonomous agent workflows.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">RAG &amp; AI Applications</h3>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-hero-sub/75">
                  Whizzly Lab builds multi-stage RAG agents and AI applications connected to vector databases with strict hallucination controls.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <Database className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">Real-Time Data Pipelines</h3>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-hero-sub/75">
                  Whizzly Lab works with real-time data pipelines using Apache Kafka, Apache Spark, and PySpark for sub-second event processing.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400">
                    <Layers className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">Full-Stack Products</h3>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-hero-sub/75">
                  Whizzly Lab builds production-grade full-stack products, responsive Next.js web applications, and enterprise API systems.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">Independent Studio Identity</h3>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-hero-sub/75">
                  Whizzly Lab is an independent software engineering studio. Whizzly Lab is NOT Whizzy Lab and is NOT Whizlabs (it is not an online certification training platform).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cursor-reactive particles behind all content below the hero */}
      <div className="relative">
          {/* Sticky full-viewport particle field while scrolling section content */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
              <CursorParticles />
            </div>
          </div>

        <div className="relative z-10">
          <FeatureCardsSection />

          <ServiceCarousel3D />

          <BenefitsSection />

          <ReviewsSection />

          <section id="learning" className="relative px-4 py-20 sm:px-8 sm:py-32">
            <div className="liquid-glass relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 p-8 sm:p-14 shadow-[0_12px_48px_rgba(0,0,0,0.6)]">
              <ThreeNeuralField className="opacity-35" />
              <div className="relative z-10 max-w-3xl">
                <span className="text-xs font-semibold tracking-[0.2em] text-cyan-400/90 uppercase">
                  Technical Enablement
                </span>
                <TextRevealWords
                  text="Custom Workshops & Engineering Mentorship"
                  className="font-general mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl"
                />
                <p className="mt-4 text-base leading-relaxed text-hero-sub/80 sm:text-lg">
                  Hands-on engineering workshops on production RAG systems, autonomous agent workflows, distributed Kafka/Spark streams, Hugging Face deployments, and MLOps best practices — delivered by Whizzly Lab's lead AI engineers (shipping globally).
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-hero-sub/80">
                    ✦ Production RAG &amp; Vector Databases
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-hero-sub/80">
                    ✦ Autonomous Multi-Agent Workflows
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-hero-sub/80">
                    ✦ High-Throughput Kafka/Spark Pipelines
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-hero-sub/80">
                    ✦ Hugging Face &amp; MLOps Delivery
                  </span>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="/schedule"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                  >
                    Request Team Workshop →
                  </a>
                </div>
              </div>
            </div>
          </section>

          <CtaFooter />
        </div>
      </div>
    </main>
  );
}