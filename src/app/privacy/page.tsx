import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaFooter from "@/components/CtaFooter";
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
    <main className="min-h-screen overflow-x-hidden bg-transparent text-foreground">
      <PageNavbar />

      <section className="px-4 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Privacy Policy" },
            ]}
          />

          <div className="mt-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              Legal &amp; Data Protection
            </span>
            <h1
              className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl font-heading"
            >
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-hero-sub/60">
              Effective Date: August 2026 · Domain: <strong className="text-white">whizzlylab.com</strong>
            </p>
          </div>

          <div className="mt-12 space-y-10 text-base leading-relaxed text-hero-sub/85">
            <div className="liquid-glass rounded-3xl border border-white/10 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white font-heading">
                1. Overview &amp; Commitment
              </h2>
              <p className="mt-3">
                Whizzly Lab (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates <strong className="text-white">https://whizzlylab.com</strong>. We provide production-grade AI engineering, machine learning development, data pipeline streaming, and full-stack software consulting. We respect your privacy and are committed to safeguarding the personal data and proprietary project details entrusted to us.
              </p>
            </div>

            <div className="liquid-glass rounded-3xl border border-white/10 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white font-heading">
                2. Information We Collect
              </h2>
              <p className="mt-3">
                We only collect data necessary to provide discovery consultations, technical architectural reviews, and service delivery:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
                <li><strong className="text-white">Directly Provided Information:</strong> Name, work email, telephone number, company name, service interest, project specifications, and budget range submitted via our contact, schedule, or pricing forms.</li>
                <li><strong className="text-white">Technical &amp; Telemetry Data:</strong> Browser type, operating system, IP address, referral URLs, time spent on pages, and anonymous interaction metrics collected through cookies.</li>
              </ul>
            </div>

            <div className="liquid-glass rounded-3xl border border-white/10 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white font-heading">
                3. Confidentiality, Client IP &amp; NDAs
              </h2>
              <p className="mt-3">
                We treat all architectural blueprints, code repositories, datasets, and proprietary business logic with strict confidentiality.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
                <li><strong className="text-white">Mutual NDAs:</strong> We execute mutual Non-Disclosure Agreements prior to in-depth technical discussions upon client request.</li>
                <li><strong className="text-white">Zero Third-Party Selling:</strong> We never sell, rent, or trade client information or project data to third parties or advertising brokers.</li>
              </ul>
            </div>

            <div className="liquid-glass rounded-3xl border border-white/10 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white font-heading">
                4. Cookies &amp; Tracking Technologies
              </h2>
              <p className="mt-3">
                Our website utilizes essential and performance cookies to provide core functionality, remember currency preferences (PKR/USD), and gather aggregate telemetry. You can manage your preferences at any time using our on-site Cookie Consent banner or through your browser settings.
              </p>
            </div>

            <div className="liquid-glass rounded-3xl border border-white/10 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white font-heading">
                5. Global Privacy Rights (GDPR &amp; CCPA)
              </h2>
              <p className="mt-3">
                Depending on your location, you hold statutory rights regarding your personal data, including the right to:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
                <li>Request access to the personal data we hold about you.</li>
                <li>Request rectification of inaccurate or outdated information.</li>
                <li>Request permanent deletion (&ldquo;Right to be Forgotten&rdquo;) of your data.</li>
                <li>Withdraw consent for non-essential telemetry processing.</li>
              </ul>
            </div>

            <div className="liquid-glass rounded-3xl border border-white/10 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white font-heading">
                6. Security &amp; Data Retention
              </h2>
              <p className="mt-3">
                We apply modern TLS/SSL encryption, strict access controls, and industry best practices to prevent unauthorized access, disclosure, or alteration of data. Data is retained only as long as necessary to fulfill project requirements or comply with legal obligations.
              </p>
            </div>

            <div className="liquid-glass rounded-3xl border border-white/10 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white font-heading">
                7. Contact Us
              </h2>
              <p className="mt-3">
                For questions regarding this policy or to exercise your data rights, reach our engineering team directly:
              </p>
              <p className="mt-3 text-sm">
                Email:{" "}
                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="font-semibold text-white underline underline-offset-4 hover:text-[#00F0FF]"
                >
                  {COMPANY_EMAIL}
                </a>
              </p>
              <p className="mt-1 text-sm text-hero-sub/70">
                Operating globally across North America, Europe, Middle East, and Asia.
              </p>
            </div>
          </div>

          <div className="mt-14 border-t border-white/10 pt-8 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-hero-sub/80 transition hover:text-white"
            >
              ← Back to Homepage
            </Link>
            <Link
              href="/schedule"
              className="inline-flex items-center gap-2 text-sm text-cyan-300 transition hover:underline"
            >
              Schedule a Consult →
            </Link>
          </div>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}
