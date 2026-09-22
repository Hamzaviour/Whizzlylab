import type { Metadata } from "next";
import { BASE_URL, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact & Consultation",
  description:
    "Reach Whizzly Lab for AI, machine learning, and full-stack software engineering projects. Email or WhatsApp — sub-24h response SLA shipping globally.",
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
  openGraph: {
    title: "Contact & Consultation | Whizzly Lab",
    description: "Connect with Whizzly Lab — bespoke AI, ML & full-stack engineering studio.",
    url: `${BASE_URL}/contact`,
    images: [
      {
        url: ogImage("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Contact Whizzly Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact & Consultation | Whizzly Lab",
    description: "Reach Whizzly Lab for AI & full-stack engineering projects.",
    images: [ogImage("/og-image.png")],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
