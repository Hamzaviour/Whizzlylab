import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageNavbar from "@/components/PageNavbar";
import AuroraCTASection from "@/components/AuroraCTASection";
import Footer from "@/components/Footer";
import CareersView from "@/components/CareersView";
import { BASE_URL, ogImage } from "@/lib/seo";
import { OPEN_POSITIONS } from "@/lib/careers";

export const metadata: Metadata = {
  title: "Careers & Engineering Roles",
  description:
    "Join Whizzly Lab's high-density engineering studio. We're hiring remote AI/LLM engineers, full-stack developers, and distributed systems architects building high-impact production systems.",
  alternates: {
    canonical: `${BASE_URL}/careers`,
  },
  openGraph: {
    title: "Careers & Engineering Roles | Whizzly Lab",
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
    title: "Careers & Engineering Roles | Whizzly Lab",
    description:
      "We're hiring senior AI engineers, full-stack builders, and systems architects. 100% remote, production-first engineering.",
    images: [ogImage("/og-image.png")],
  },
};

export default function CareersPage() {
  const jobPostingSchemas = OPEN_POSITIONS.filter((p) => p.department !== "General").map((job) => ({
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
    <main className="relative min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white font-sans overflow-x-hidden">
      {/* Search Engine Structured Data */}
      {jobPostingSchemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <PageNavbar />

      {/* Volumetric Top Spotlight Beam */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-28 w-[600px] sm:w-[750px] h-[900px] origin-top-left -rotate-[35deg] z-0 overflow-hidden"
      >
        <div
          className="w-full h-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(165,180,252,0.35) 0%, rgba(99,102,241,0.18) 28%, rgba(79,70,229,0.04) 60%, transparent 100%)",
            filter: "blur(45px)",
            clipPath: "polygon(18% 0%, 58% 0%, 100% 100%, 0% 100%)",
          }}
        />
      </div>

      {/* Giant Watermark Background Text: "CAREERS" */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-36 left-1/2 -translate-x-1/2 w-screen flex justify-center items-center select-none z-0"
      >
        <span className="text-[14vw] font-bold uppercase tracking-[0.24em] text-white/[0.035] leading-none font-sans whitespace-nowrap">
          CAREERS
        </span>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 sm:pt-28 pb-16 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-xs font-medium text-indigo-300 mb-8 backdrop-blur-md">
            <span>Engineering Studio</span>
            <span className="text-white/40">·</span>
            <span>Talent Network</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.12]">
            Engineering Freedom. <br />
            <span className="italic font-light text-white">High-Density</span> Collective.
          </h1>

          <p className="mt-8 text-base sm:text-lg lg:text-xl text-gray-300/85 font-light leading-relaxed max-w-2xl">
            We are an autonomous, remote-first studio of passionate builders, AI researchers, and distributed systems architects. No corporate bureaucracy, no busywork, just high-caliber engineering solving tough real-world problems.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#open-roles"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-sm font-medium text-white hover:border-white transition-all duration-300"
            >
              <span>Explore Open Roles</span>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:scale-110">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </a>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors px-4 py-2"
            >
              Studio Philosophy →
            </Link>
          </div>
        </div>

        {/* Main Careers Interactive Content */}
        <div className="mt-20">
          <CareersView />
        </div>
      </section>

      {/* Unified Antimatter Aurora CTA & Live Clock Footer */}
      <AuroraCTASection />
      <Footer />
    </main>
  );
}
