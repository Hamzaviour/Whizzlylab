import type { Metadata } from "next";
import { BASE_URL, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Book a Technical Consultation",
  description:
    "Book a 20–30 minute discovery call with Whizzly Lab. Discuss your AI, ML, or full-stack project and get scope + budget clarity with our lead engineers.",
  alternates: {
    canonical: `${BASE_URL}/schedule`,
  },
  openGraph: {
    title: "Book a Technical Consultation | Whizzly Lab",
    description: "Book an architecture and strategy call for your AI or full-stack project with Whizzly Lab.",
    url: `${BASE_URL}/schedule`,
    images: [
      {
        url: ogImage("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Schedule a Consultation: Whizzly Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Technical Consultation | Whizzly Lab",
    description: "Book a technical discovery call with Whizzly Lab lead AI engineers.",
    images: [ogImage("/og-image.png")],
  },
};

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
