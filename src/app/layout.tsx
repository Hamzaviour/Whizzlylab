import type { Metadata, Viewport } from "next";
import "./globals.css";
import InteractiveShell from "@/components/InteractiveShell";
import { CurrencyProvider } from "@/lib/currency";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
  "https://whizzlylab.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Whizzly Lab — AI Studio, ML & Software Engineering Services",
    template: "%s | Whizzly Lab",
  },
  description:
    "Whizzly Lab is an elite AI studio delivering AI services, machine learning solutions, real-time Kafka data pipelines, and full-stack software engineering services globally.",
  keywords: [
    "whizzly",
    "whizzlylab",
    "whizzly lab",
    "whizzly labs",
    "ai studio",
    "ai services",
    "software engineering services",
    "ai engineering studio",
    "machine learning services",
    "custom software development",
    "rag agents",
    "kafka data pipelines",
    "full-stack development",
    "software consultancy",
    "Next.js development",
  ],
  authors: [{ name: "Whizzly Lab" }],
  creator: "Whizzly Lab",
  publisher: "Whizzly Lab",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "Whizzly Lab — AI Studio, ML & Software Engineering Services",
    description:
      "Whizzly Lab is an elite AI studio delivering AI services, machine learning solutions, real-time Kafka data pipelines, and full-stack software engineering services globally.",
    siteName: "Whizzly Lab",
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Whizzly Lab — AI Studio & Software Engineering Services",
        type: "image/png",
      },
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Whizzly Lab AI Studio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Whizzly Lab — AI Studio, ML & Software Engineering Services",
    description:
      "Whizzly Lab is an elite AI studio delivering AI services, machine learning solutions, real-time Kafka data pipelines, and full-stack software engineering services.",
    images: [`${BASE_URL}/twitter-image`, `${BASE_URL}/og-image.png`],
    creator: "@whizzlylab",
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "your-google-site-verification-code",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#05010f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["Organization", "ProfessionalService"],
                  "@id": `${BASE_URL}/#organization`,
                  name: "Whizzly Lab",
                  alternateName: [
                    "Whizzly",
                    "WhizzlyLab",
                    "Whizzly Labs",
                    "WhizzlyLab Studio",
                    "Whizzly AI Studio",
                  ],
                  url: BASE_URL,
                  logo: {
                    "@type": "ImageObject",
                    "@id": `${BASE_URL}/#logo`,
                    url: `${BASE_URL}/logo.png`,
                    caption: "Whizzly Lab Logo",
                    width: 512,
                    height: 512,
                  },
                  image: `${BASE_URL}/og-image.png`,
                  description:
                    "Whizzly Lab is an elite AI studio and software engineering studio building intelligent AI systems, real-time Kafka data pipelines, RAG agents, and production-grade full-stack software.",
                  founder: {
                    "@type": "Person",
                    name: "Whizzly Lab Team",
                    jobTitle: "Lead AI Engineers",
                  },
                  sameAs: [
                    "https://www.linkedin.com/company/whizzly-lab",
                    "https://www.instagram.com/whizzlylab",
                    "https://www.facebook.com/profile.php?id=61592686831558",
                    "https://github.com/WhizzlyLab",
                  ],
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer service",
                    email: "whizzlylab@gmail.com",
                    url: "https://wa.me/923097404009",
                    availableLanguage: ["English"],
                  },
                  knowsAbout: [
                    "AI Studio",
                    "AI Services",
                    "Software Engineering Services",
                    "Artificial Intelligence",
                    "Machine Learning",
                    "RAG Systems",
                    "Retrieval-Augmented Generation",
                    "Data Engineering",
                    "Apache Kafka",
                    "Apache Spark",
                    "Next.js",
                    "Full-Stack Development",
                    "Custom Software Development",
                  ],
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "AI Studio & Software Engineering Services",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "AI Studio & Custom AI Solutions",
                          description:
                            "Production-grade AI systems, multi-stage RAG agents, LLM fine-tuning, and autonomous agents.",
                          serviceType: "AI Services",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Software Engineering Services",
                          description:
                            "End-to-end full-stack software development, Next.js web applications, API architecture, and microservices.",
                          serviceType: "Software Engineering Services",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Real-Time Data Pipelines",
                          description:
                            "Distributed real-time streaming architectures using Apache Kafka, Apache Spark, and PySpark.",
                          serviceType: "Data Engineering",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Machine Learning & MLOps",
                          description:
                            "Custom neural network training, dataset preparation, MLflow registry, and automated retraining pipelines.",
                          serviceType: "Machine Learning Services",
                        },
                      },
                    ],
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": `${BASE_URL}/#website`,
                  url: BASE_URL,
                  name: "Whizzly Lab",
                  alternateName: [
                    "Whizzly",
                    "WhizzlyLab",
                    "Whizzly Lab AI Studio",
                  ],
                  description:
                    "Whizzly Lab — AI Studio, ML & Software Engineering Services",
                  publisher: {
                    "@id": `${BASE_URL}/#organization`,
                  },
                  inLanguage: "en-US",
                },
              ],
            }),
          }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Barlow:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://db.onlinewebfonts.com/c/e55e9079ee863276569c8a68d776ef04?family=Futura+Md+BT+Medium"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#05010f" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-full antialiased">
        <CurrencyProvider>
          <InteractiveShell>{children}</InteractiveShell>
        </CurrencyProvider>
      </body>
    </html>
  );
}
