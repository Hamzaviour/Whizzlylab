import type { Metadata } from "next";
import HeroWithServicesTransition from "@/components/HeroWithServicesTransition";
import CurvedHorizonMarquee from "@/components/CurvedHorizonMarquee";
import CaseStudies from "@/components/CaseStudies";
import AntimatterTestimonials from "@/components/AntimatterTestimonials";
import AuroraCTASection from "@/components/AuroraCTASection";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Whizzly Lab: AI Studio, ML and Software Engineering Services",
  },
  description:
    "Whizzly Lab is an elite AI engineering studio and full-stack software development collective. We design, architect, and deploy intelligent AI systems, autonomous multi-agent pipelines, RAG systems, workflow automation, scalable SaaS platforms, full-stack web development, mobile & web apps, digital products, and custom AI integration.",
  alternates: {
    canonical: `${BASE_URL}/`,
  },
  openGraph: {
    title: "Whizzly Lab: AI Studio, ML & Software Engineering Services",
    description:
      "Whizzly Lab is an elite AI engineering studio and full-stack software development collective. We design, architect, and deploy intelligent AI systems, autonomous multi-agent pipelines, RAG systems, workflow automation, scalable SaaS platforms, full-stack web development, mobile & web apps, digital products, and custom AI integration.",
    url: `${BASE_URL}/`,
    siteName: "Whizzly Lab",
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Whizzly Lab: AI Studio & Software Engineering Services",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Whizzly Lab: AI Studio, ML & Software Engineering Services",
    description:
      "Whizzly Lab is an elite AI engineering studio delivering web development, workflow automation, RAG systems, SaaS products, apps, and custom AI integration.",
    images: [`${BASE_URL}/twitter-image`],
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white overflow-x-clip font-sans">
      {/* 1. Hero Section & 3D Globe with Seamless Scroll Transition into Services Section */}
      <HeroWithServicesTransition />

      {/* 2. Trusted by Industry Leaders (Curved Glowing Blue Planet Horizon Marquee) */}
      <CurvedHorizonMarquee />

      {/* 3. Case Studies Section (Interactive Split Accordion & Mockup Showcase) */}
      <CaseStudies />

      {/* 5. What Our Clients Say About Us (2-Column Asymmetric Testimonials) */}
      <AntimatterTestimonials />

      {/* 6. Aurora CTA Section ("We turn bold ideas into powerful digital realities") */}
      <AuroraCTASection />

      {/* 7. Live Real-Time Digital Clock Footer with Purple Atmospheric Glow */}
      <Footer />
    </main>
  );
}