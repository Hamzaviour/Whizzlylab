import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/services";
import PageNavbar from "@/components/PageNavbar";
import CtaFooter from "@/components/CtaFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
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
        alt: "Services — Whizzly Lab",
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
            className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            style={{ fontFamily: "'Syne', 'General Sans', sans-serif" }}
          >
            What Whizzly Lab ships
          </h1>
          <p className="mt-4 max-w-2xl text-base text-hero-sub/80 sm:text-lg">
            End-to-end AI engineering and product delivery for startups and
            enterprises — from algorithmic models to resilient, deployed interfaces.
          </p>

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
                    alt={`${s.title} — Whizzly Lab service`}
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
                    <h2 className="text-2xl font-semibold text-white tracking-tight" style={{ fontFamily: "'Syne', 'General Sans', sans-serif" }}>
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
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}
