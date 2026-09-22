import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, GitBranch, Sparkles, ArrowUpRight } from "lucide-react";
import PageNavbar from "@/components/PageNavbar";
import CtaFooter from "@/components/CtaFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BASE_URL, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Case Studies & Shipped Projects",
  description:
    "Explore Whizzly Lab's portfolio of production-grade case studies — AI systems, real-time pipelines, healthcare automation, cybersecurity platforms, e-commerce, and more.",
  alternates: {
    canonical: `${BASE_URL}/work`,
  },
  openGraph: {
    title: "Case Studies & Shipped Projects | Whizzly Lab",
    description:
      "Explore Whizzly Lab's portfolio of production-grade case studies — AI, ML, cybersecurity, e-commerce, EdTech, and enterprise software.",
    url: `${BASE_URL}/work`,
    images: [
      {
        url: ogImage("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Whizzly Lab Case Studies & Work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies & Shipped Projects | Whizzly Lab",
    description:
      "Production-grade shipped systems by Whizzly Lab: AI, cybersecurity, healthcare, e-commerce, and more.",
    images: [ogImage("/og-image.png")],
  },
};

const cases = [
  {
    title: "EchoSense",
    tag: "AI · Real-Time Crisis NLP",
    category: "AI & ML",
    outcome: "70% Faster Signal Detection",
    description:
      "Real-time crisis intervention pipeline using Kafka and Spark NLP to detect and flag high-priority indicators — with RAG and live Hugging Face deployment. Sub-100ms detection latency at scale.",
    stack: ["Kafka", "Spark NLP", "RAG", "Hugging Face", "Python"],
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80",
    live: "https://hamzavelous-echosense-ai.hf.space/login",
    github: null,
    accentColor: "from-cyan-500/20 to-blue-500/10",
    badgeColor: "border-cyan-500/30 text-cyan-300 bg-cyan-500/10",
  },
  {
    title: "CureCMS Solution",
    tag: "Healthcare · AI Agents",
    category: "AI & ML",
    outcome: "HIPAA Compliant Automation",
    description:
      "AI-powered medical billing and revenue cycle management for healthcare providers — HIPAA-conscious with intelligent RCM agents. Eliminates manual billing workflows and reduces claim rejection rates.",
    stack: ["AI Agents", "Healthcare RCM", "HIPAA", "FastAPI", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    live: "https://curercmsolution.com/",
    github: null,
    accentColor: "from-emerald-500/20 to-teal-500/10",
    badgeColor: "border-emerald-500/30 text-emerald-300 bg-emerald-500/10",
  },
  {
    title: "XecureAI",
    tag: "Cybersecurity · AI Governance",
    category: "Cybersecurity",
    outcome: "Enterprise GRC & AI Safety",
    description:
      "XecureAI helps organizations manage cyber risk, achieve compliance, strengthen security controls, and adopt AI responsibly — a full-suite cybersecurity and AI governance platform.",
    stack: ["Next.js", "AI Governance", "GRC", "Cybersecurity", "TypeScript"],
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    live: "https://xecureai.com/",
    github: "https://github.com/Hamzaviour/XecureAi",
    accentColor: "from-red-500/20 to-orange-500/10",
    badgeColor: "border-red-500/30 text-red-300 bg-red-500/10",
  },
  {
    title: "Al-Deewan Collection",
    tag: "E-Commerce · Fashion Retail",
    category: "E-Commerce",
    outcome: "100% Original Pakistani Lawn",
    description:
      "Full-stack e-commerce platform for authentic Pakistani designer fashion — featuring Khaadi, Sapphire, Asim Jofa & Nishat collections with seamless browsing, cart, and order management.",
    stack: ["Next.js", "E-Commerce", "Stripe", "Full-Stack", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
    live: "https://aldeewancollection.com/",
    github: "https://github.com/Hamzaviour/Al-Deewan-Website",
    accentColor: "from-pink-500/20 to-rose-500/10",
    badgeColor: "border-pink-500/30 text-pink-300 bg-pink-500/10",
  },
  {
    title: "Marginalia",
    tag: "Productivity · Annotation",
    category: "Full-Stack",
    outcome: "Smart Annotation Engine",
    description:
      "A modern, intelligent annotation and note-taking platform designed for readers and researchers — enabling smart marginalia, highlights, and contextual knowledge management across documents.",
    stack: ["React", "TypeScript", "Vercel", "Full-Stack", "Node.js"],
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80",
    live: "https://marginalia-ochre-nu.vercel.app/",
    github: "https://github.com/Hamzaviour/Marginalia",
    accentColor: "from-violet-500/20 to-purple-500/10",
    badgeColor: "border-violet-500/30 text-violet-300 bg-violet-500/10",
  },
  {
    title: "Deewan POS System",
    tag: "Retail · Point of Sale",
    category: "Full-Stack",
    outcome: "Streamlined Retail Operations",
    description:
      "A robust Point-of-Sale system built for the Al-Deewan retail brand — featuring inventory management, sales tracking, customer records, receipt printing, and real-time reporting dashboards.",
    stack: ["React", "Node.js", "PostgreSQL", "REST API", "TypeScript"],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    live: null,
    github: "https://github.com/Hamzaviour/Deewan-POS-System",
    accentColor: "from-amber-500/20 to-yellow-500/10",
    badgeColor: "border-amber-500/30 text-amber-300 bg-amber-500/10",
  },
  {
    title: "Knowly",
    tag: "EdTech · Knowledge Platform",
    category: "AI & ML",
    outcome: "Intelligent Learning Engine",
    description:
      "A next-generation knowledge and learning platform — enabling structured, AI-assisted knowledge discovery, course creation, and intelligent content recommendations for modern learners.",
    stack: ["Next.js", "AI", "TypeScript", "Full-Stack", "Vercel"],
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    live: "https://knowly-blue.vercel.app/",
    github: "https://github.com/Hamzaviour/Knowly",
    accentColor: "from-blue-500/20 to-indigo-500/10",
    badgeColor: "border-blue-500/30 text-blue-300 bg-blue-500/10",
  },
];

const STATS = [
  { value: "7+", label: "Production Builds" },
  { value: "5+", label: "Industries Served" },
  { value: "100%", label: "Live & Deployed" },
  { value: "<24h", label: "Avg. Response SLA" },
];

export default function WorkPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE_URL}/work#webpage`,
    url: `${BASE_URL}/work`,
    name: "Case Studies & Work — Whizzly Lab",
    description:
      "Whizzly Lab portfolio of production-grade shipped systems spanning AI, cybersecurity, healthcare, e-commerce, and enterprise software.",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: cases.map((c, idx) => ({
        "@type": "CreativeWork",
        position: idx + 1,
        name: c.title,
        description: c.description,
        url: c.live || `${BASE_URL}/work`,
      })),
    },
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-transparent text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PageNavbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-12 pb-20 sm:px-8 sm:pt-20 sm:pb-28">
        <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-[#00F0FF]/10 blur-3xl" />
        <div className="pointer-events-none absolute top-60 -left-40 h-[500px] w-[500px] rounded-full bg-[#a855f7]/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Work" },
            ]}
          />

          <div className="mt-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              Case Studies · Production Builds
            </div>

            <h1
              className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl leading-[1.05]"
              style={{ fontFamily: "'Syne', 'General Sans', sans-serif" }}
            >
              Systems shipped.{" "}
              <span className="bg-gradient-to-r from-[#00F0FF] via-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
                Impact measured.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg sm:text-xl leading-relaxed text-hero-sub/80">
              Every project listed here is deployed, in production, and delivering measurable results. No prototypes, no vaporware — just real systems engineered to scale.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/schedule"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#00f0ff] px-8 py-3.5 text-sm font-semibold text-black shadow-[0_0_25px_rgba(0,240,255,0.25)] transition-all hover:opacity-95"
              >
                Start Your Project
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/10"
              >
                View Services
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="liquid-glass rounded-2xl border border-white/10 p-5 text-center"
              >
                <p
                  className="text-3xl font-bold text-white"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {s.value}
                </p>
                <p className="mt-1 text-xs font-medium text-hero-sub/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="relative px-4 pb-32 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="mb-10 text-xs font-semibold tracking-[0.2em] text-hero-sub/50 uppercase">
            {cases.length} Projects · All In Production
          </p>

          <div className="grid gap-8 sm:grid-cols-2">
            {cases.map((item) => (
              <article
                key={item.title}
                className="liquid-glass group flex flex-col overflow-hidden rounded-3xl border border-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-[0_16px_48px_rgba(0,0,0,0.65)]"
              >
                {/* Thumbnail */}
                <div className="relative h-56 overflow-hidden sm:h-64">
                  <Image
                    src={item.image}
                    alt={`${item.title} — ${item.tag} case study by Whizzly Lab`}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05010f] via-[#05010f]/40 to-transparent" />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.accentColor} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  />

                  {/* Outcome badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md shadow-lg ${item.badgeColor}`}
                    >
                      {item.outcome}
                    </span>
                  </div>

                  {/* Category chip */}
                  <div className="absolute top-4 right-4">
                    <span className="rounded-full border border-white/15 bg-[#05010f]/70 px-3 py-1 text-[10px] font-medium text-white/70 backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                  <div>
                    <p className="text-xs font-medium tracking-widest text-hero-sub/50 uppercase">
                      {item.tag}
                    </p>
                    <h2
                      className="mt-2 text-2xl font-semibold text-white"
                      style={{ fontFamily: "'Syne', 'General Sans', sans-serif" }}
                    >
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-hero-sub/75">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                      {item.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] font-medium text-hero-sub/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {item.github && (
                        <a
                          href={item.github}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${item.title} GitHub repository`}
                          className="inline-flex items-center rounded-full border border-white/15 bg-white/5 p-2 text-white transition hover:border-white/30 hover:bg-white/10"
                        >
                          <GitBranch className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {item.live ? (
                        <a
                          href={item.live}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white transition hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300"
                        >
                          Live App <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-hero-sub/40">
                          Internal Tool
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom CTA block */}
          <div className="mt-20 liquid-glass rounded-3xl border border-white/10 p-8 sm:p-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300">
              <Sparkles className="h-3.5 w-3.5" />
              Ready to be next?
            </div>
            <h2
              className="mt-4 text-3xl font-bold text-white sm:text-4xl"
              style={{ fontFamily: "'Syne', 'General Sans', sans-serif" }}
            >
              Let&apos;s engineer your next system.
            </h2>
            <p className="mt-3 text-base text-hero-sub/75 max-w-xl mx-auto">
              From AI agents and data pipelines to full-stack platforms — we build production-grade systems that deliver real outcomes.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/schedule"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#00f0ff] px-8 py-3.5 text-sm font-semibold text-black shadow-[0_0_25px_rgba(0,240,255,0.3)] transition-all hover:opacity-95"
              >
                Schedule Strategy Consult
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}
