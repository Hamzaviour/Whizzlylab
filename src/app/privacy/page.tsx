import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import AuroraCTASection from "@/components/AuroraCTASection";
import Footer from "@/components/Footer";
import { COMPANY_EMAIL } from "@/lib/contact";
import { BASE_URL, ogImage } from "@/lib/seo";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Whizzly Lab privacy policy. Learn how we collect, safeguard, and respect your personal and technical project data.",
  alternates: {
    canonical: `${BASE_URL}/privacy`,
  },
  openGraph: {
    title: "Privacy Policy | Whizzly Lab",
    description: "Learn how Whizzly Lab protects and respects your privacy.",
    url: `${BASE_URL}/privacy`,
    images: [
      {
        url: ogImage("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Privacy Policy: Whizzly Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Whizzly Lab",
    description: "Whizzly Lab privacy and data protection standards.",
    images: [ogImage("/og-image.png")],
  },
};

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white font-sans overflow-x-hidden">
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

      {/* Giant Watermark Background Text: "PRIVACY" */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-36 left-1/2 -translate-x-1/2 w-screen flex justify-center items-center select-none z-0"
      >
        <span className="text-[14vw] font-bold uppercase tracking-[0.24em] text-white/[0.035] leading-none font-sans whitespace-nowrap">
          PRIVACY
        </span>
      </div>

      {/* Content Section */}
      <section className="relative z-10 pt-20 sm:pt-28 pb-20 px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-xs font-medium text-indigo-300 mb-8 backdrop-blur-md">
            <span>Legal &amp; Governance</span>
            <span className="text-white/40">·</span>
            <span>Data Protection</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-white leading-[1.12]">
            Privacy Policy &amp; <br />
            <span className="italic font-light text-white">Data Governance</span>.
          </h1>

          <p className="mt-4 text-xs font-mono text-gray-500 uppercase tracking-wider">
            Effective Date: March 2026 · whizzlylab.com
          </p>
        </div>

        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-gray-300 font-light">
          <div className="relative rounded-[28px] p-8 sm:p-10 bg-[#090b12] border border-white/[0.08] overflow-hidden">
            <h2 className="text-xl font-medium text-white font-sans mb-3">
              1. Overview &amp; Commitment
            </h2>
            <p className="text-gray-400">
              Whizzly Lab operates <strong className="text-white">https://whizzlylab.com</strong>. We provide production-grade AI engineering, machine learning development, data pipeline streaming, and full-stack software consulting. We respect your privacy and are committed to safeguarding the personal data and proprietary project details entrusted to us.
            </p>
          </div>

          <div className="relative rounded-[28px] p-8 sm:p-10 bg-[#090b12] border border-white/[0.08] overflow-hidden">
            <h2 className="text-xl font-medium text-white font-sans mb-3">
              2. Information We Collect
            </h2>
            <p className="text-gray-400 mb-4">
              We only collect data necessary to provide discovery consultations, technical architectural reviews, and service delivery:
            </p>
            <ul className="space-y-3 pl-4 border-l border-white/10 text-sm text-gray-400">
              <li>
                <strong className="text-white font-medium">Directly Provided Information:</strong> Name, work email, phone number, company name, service interest, project specifications, and budget range submitted via our intake forms.
              </li>
              <li>
                <strong className="text-white font-medium">Technical &amp; Telemetry Data:</strong> Browser type, operating system, IP address, referral URLs, time spent on pages, and anonymous interaction metrics.
              </li>
            </ul>
          </div>

          <div className="relative rounded-[28px] p-8 sm:p-10 bg-[#090b12] border border-white/[0.08] overflow-hidden">
            <h2 className="text-xl font-medium text-white font-sans mb-3">
              3. Confidentiality, Client IP &amp; NDAs
            </h2>
            <p className="text-gray-400 mb-4">
              We treat all architectural blueprints, code repositories, datasets, and proprietary business logic with strict confidentiality.
            </p>
            <ul className="space-y-3 pl-4 border-l border-white/10 text-sm text-gray-400">
              <li>
                <strong className="text-white font-medium">Mutual NDAs:</strong> We execute mutual Non-Disclosure Agreements prior to in-depth technical discussions upon client request.
              </li>
              <li>
                <strong className="text-white font-medium">Zero Third-Party Selling:</strong> We never sell, rent, or trade client information or project data to third parties or advertising brokers.
              </li>
            </ul>
          </div>

          <div className="relative rounded-[28px] p-8 sm:p-10 bg-[#090b12] border border-white/[0.08] overflow-hidden">
            <h2 className="text-xl font-medium text-white font-sans mb-3">
              4. Cookies &amp; Tracking Technologies
            </h2>
            <p className="text-gray-400">
              Our website utilizes essential and performance cookies to provide core functionality, remember user preferences, and gather aggregate telemetry. You can manage your preferences at any time through your browser settings.
            </p>
          </div>

          <div className="relative rounded-[28px] p-8 sm:p-10 bg-[#090b12] border border-white/[0.08] overflow-hidden">
            <h2 className="text-xl font-medium text-white font-sans mb-3">
              5. Global Privacy Rights (GDPR &amp; CCPA)
            </h2>
            <p className="text-gray-400 mb-4">
              Depending on your location, you hold statutory rights regarding your personal data, including the right to:
            </p>
            <ul className="space-y-2 pl-4 border-l border-white/10 text-sm text-gray-400">
              <li>Request access to the personal data we hold about you.</li>
              <li>Request rectification of inaccurate or outdated information.</li>
              <li>Request permanent deletion of your data.</li>
              <li>Withdraw consent for non-essential telemetry processing.</li>
            </ul>
          </div>

          <div className="relative rounded-[28px] p-8 sm:p-10 bg-[#090b12] border border-white/[0.08] overflow-hidden">
            <h2 className="text-xl font-medium text-white font-sans mb-3">
              6. Security &amp; Data Retention
            </h2>
            <p className="text-gray-400">
              We apply modern TLS/SSL encryption, strict access controls, and industry best practices to prevent unauthorized access, disclosure, or alteration of data. Data is retained only as long as necessary to fulfill project requirements or comply with legal obligations.
            </p>
          </div>

          <div className="relative rounded-[28px] p-8 sm:p-10 bg-[#090b12] border border-white/[0.08] overflow-hidden">
            <h2 className="text-xl font-medium text-white font-sans mb-3">
              7. Contact Us
            </h2>
            <p className="text-gray-400">
              For questions regarding this policy or to exercise your data rights, reach our engineering team directly:
            </p>
            <p className="mt-3 text-sm">
              Email:{" "}
              <a
                href={`mailto:${COMPANY_EMAIL}`}
                className="text-indigo-300 underline underline-offset-4 hover:text-white"
              >
                {COMPANY_EMAIL}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 flex items-center justify-between">
          <Link
            href="/"
            className="text-xs font-mono uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Homepage
          </Link>
          <Link
            href="/schedule"
            className="text-xs font-mono uppercase tracking-wider text-indigo-300 hover:text-white transition-colors"
          >
            Schedule a Consult →
          </Link>
        </div>
      </section>

      {/* Unified Antimatter Aurora CTA & Live Clock Footer */}
      <AuroraCTASection />
      <Footer />
    </main>
  );
}
