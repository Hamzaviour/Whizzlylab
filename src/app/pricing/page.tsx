import type { Metadata } from "next";
import PageNavbar from "@/components/PageNavbar";
import CtaFooter from "@/components/CtaFooter";
import PricingContent from "@/components/PricingContent";
import { BASE_URL, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing & Plans (USD & PKR)",
  description:
    "Transparent pricing for AI systems, machine learning, data pipelines, web development, automation, and full-stack products. Prices in PKR and USD.",
  alternates: {
    canonical: `${BASE_URL}/pricing`,
  },
  openGraph: {
    title: "Pricing & Plans (USD & PKR) | Whizzly Lab",
    description: "Transparent pricing for AI, ML & full-stack engineering by Whizzly Lab.",
    url: `${BASE_URL}/pricing`,
    images: [
      {
        url: ogImage("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Pricing: Whizzly Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing & Plans (USD & PKR) | Whizzly Lab",
    description: "Transparent AI & full-stack engineering pricing in PKR and USD.",
    images: [ogImage("/og-image.png")],
  },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-transparent text-foreground">
      <PageNavbar />
      <PricingContent />
      <CtaFooter />
    </main>
  );
}