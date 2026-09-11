import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Users, Laptop } from "lucide-react";
import PageNavbar from "@/components/PageNavbar";
import CtaFooter from "@/components/CtaFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import CareersView from "@/components/CareersView";
import { BASE_URL, ogImage } from "@/lib/seo";
import { OPEN_POSITIONS } from "@/lib/careers";

export const metadata: Metadata = {
  title: "Careers — Whizzly Lab | Join Our Engineering & AI Studio",
  description:
    "Join Whizzly Lab's high-density engineering studio. We're hiring remote AI/LLM engineers, full-stack developers, and distributed systems architects building high-impact production systems.",
  alternates: {
    canonical: `${BASE_URL}/careers`,
  },
  openGraph: {
    title: "Careers — Whizzly Lab | Join Our Engineering & AI Studio",
    description:
      "Join Whizzly Lab's high-density engineering studio. Remote-first, cutting-edge AI stack, autonomous ownership, and competitive compensation.",
    url: `${BASE_URL}/careers`,
    images: [
      {
        url: ogImage("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Whizzly Lab Careers & Open Roles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Whizzly Lab — AI & Full-Stack Engineering",
    description:
      "We're hiring senior AI engineers, full-stack builders, and systems architects. 100% remote, production-first engineering.",
    images: [ogImage("/og-image.png")],
  },
};

export default function CareersPage() {
  // Schema.org JobPosting LD+JSON for search indexing
  const jobPostingSchemas = OPEN_POSITIONS.filter(p => p.department !== "General").map((job) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: `${job.summary} Key Responsibilities: ${job.responsibilities.join(
      "; "
    )}. Requirements: ${job.requirements.join("; ")}`,
    datePosted: "2026-03-01",
    employmentType: job.type === "Full-Time" ? "FULL_TIME" : "CONTRACTOR",
    hiringOrganization: {
      "@type": "Organization",
      name: "Whizzly Lab",
      sameAs: BASE_URL,
      logo: `${BASE_URL}/icon.png`,
    },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Worldwide",
    },
    skills: job.skills.join(", "),
  }));

  return (
    <main className="min-h-screen overflow-x-hidden bg-transparent text-foreground">
      {/* Search Engine Structured Data */}
      {jobPostingSchemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <PageNavbar />

      <section className="relative px-4 pt-12 pb-24 sm:px-8 sm:pt-20 sm:pb-32">
        {/* Background glow orbs */}
        <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-full max-w-7xl -translate-x-1/2 opacity-30 blur-[130px] [background:radial-gradient(ellipse_at_top,rgba(0,240,255,0.25)_0%,rgba(168,85,247,0.2)_40%,transparent_70%)]" />

        <div className="relative mx-auto max-w-6xl">
          {/* Breadcrumbs */}
          <div className="mb-6 flex items-center justify-center sm:justify-start">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Careers" },
              ]}
            />
          </div>

          {/* Hero Header */}
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold text-cyan-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>CAREERS AT WHIZZLY LAB</span>
            </div>

            <h1
              className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl"
              style={{ fontFamily: "'Syne', 'General Sans', sans-serif" }}
            >
              Build High-Impact{" "}
              <span className="bg-gradient-to-r from-[#00F0FF] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
                AI &amp; Production Systems
              </span>{" "}
              With Us
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-hero-sub/90 sm:text-lg">
              We are a high-density, remote-first studio of passionate builders, AI researchers, and
              full-stack architects. No corporate bureaucracy, no busywork — just high-caliber
              engineering solving tough real-world problems.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#open-roles"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black transition hover:bg-cyan-300 shadow-[0_0_25px_rgba(0,240,255,0.25)]"
              >
                View Open Positions
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 hover:border-white/30"
              >
                About Our Studio
              </Link>
            </div>
          </div>

          {/* Main Interactive Careers Content */}
          <div className="mt-20">
            <CareersView />
          </div>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}
