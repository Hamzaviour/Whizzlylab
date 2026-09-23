import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/services";
import PageNavbar from "@/components/PageNavbar";
import CtaFooter from "@/components/CtaFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import TakeawaysBox from "@/components/TakeawaysBox";
import TrustBadges from "@/components/TrustBadges";
import { BASE_URL, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI, ML & Software Engineering Services",
  description:
    "Comprehensive AI services, machine learning models, real-time Kafka data pipelines, and production Next.js full-stack development delivered worldwide.",
  alternates: {
    canonical: `${BASE_URL}/services`,
  },
  openGraph: {
    title: "AI, ML & Software Engineering Services | Whizzly Lab",
    description: "AI, ML, real-time data pipelines & full-stack engineering services by Whizzly Lab.",
    url: `${BASE_URL}/services`,
    images: [
      {
        url: ogImage("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Services: Whizzly Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI, ML & Software Engineering Services | Whizzly Lab",
    description: "AI, ML & full-stack engineering services by Whizzly Lab.",
    images: [ogImage("/og-image.png")],
  },
};

export default function ServicesIndexPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-transparent text-foreground">
      <PageNavbar />

      <section className="relative px-4 py-12 sm:px-8 sm:py-24">
        {/* Ambient lighting orb */}
        <div className="pointer-events-none absolute top-20 right-0 h-96 w-96 rounded-full bg-[#00F0FF]/15 blur-3xl" />
        <div className="pointer-events-none absolute top-80 -left-20 h-96 w-96 rounded-full bg-[#6366f1]/15 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services" },
            ]}
          />
          <h1
            className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl font-heading"
          >
            What Whizzly Lab ships
          </h1>
          <p className="mt-4 max-w-2xl text-base text-hero-sub/80 sm:text-lg">
            End-to-end AI engineering and product delivery for startups and
            enterprises, from algorithmic models to resilient, deployed interfaces.
          </p>

          {/* Key Engineering Deliverables Takeaways */}
          <div className="mt-10">
            <TakeawaysBox
              title="Engineering Deliverables Standard"
              takeaways={[
                "Sub-100ms multi-stage RAG retrieval benchmarks with zero data leakage",
                "High-throughput Apache Kafka event streaming with 0% silent drops",
                "Automated MLOps evaluation harnesses and drift monitoring",
                "Full-stack Next.js production deployments with 100% client code ownership",
              ]}
            />
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group liquid-glass relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
              >
                <div className="relative h-48 overflow-hidden sm:h-52">
                  <Image
                    src={s.image}
                    alt={`${s.title}: Whizzly Lab service`}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(260_87%_3%)] via-[hsl(260_87%_3%)]/40 to-transparent" />
                  {s.tag ? (
                    <span
                      className="absolute top-4 left-4 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide text-black uppercase shadow-lg"
                      style={{ background: s.accentColor }}
                    >
                      {s.tag}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div>
                    <h2 className="text-2xl font-semibold text-white tracking-tight font-heading">
                      {s.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-hero-sub/75">
                      {s.short}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                    <span
                      className="text-xs font-semibold uppercase tracking-wider transition group-hover:underline"
                      style={{ color: s.accentColor }}
                    >
                      Explore Service
                    </span>
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full border transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45"
                      style={{
                        borderColor: `${s.accentColor}40`,
                        background: `${s.accentColor}15`,
                        color: s.accentColor,
                      }}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Verified Client Testimonial Proof on Services */}
          <div className="mt-16 rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-1 text-amber-400 mb-2 text-sm">
                  {"★★★★★"}
                </div>
                <blockquote className="text-base sm:text-lg italic text-slate-200">
                  &ldquo;Whizzly Lab cut our RAG pipeline query retrieval latency by 70% and resolved our silent Kafka stream dropouts within the first two-week sprint.&rdquo;
                </blockquote>
                <div className="mt-3 text-xs sm:text-sm text-cyan-300 font-semibold font-mono">
                  Marcus Webb, Head of Engineering, HealthTech
                </div>
              </div>
              <Link
                href="/schedule"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-6 py-3 text-xs sm:text-sm font-bold text-black transition hover:opacity-90"
              >
                Book a Consult →
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <TrustBadges className="mt-6" />
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}
