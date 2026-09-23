"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote, CheckCircle, Building2 } from "lucide-react";

const reviews = [
  {
    name: "Sarah Chen",
    role: "CTO, FinTech Startup",
    location: "San Francisco, CA",
    avatar: "/images/avatars/sarah-chen.webp",
    rating: 5,
    project: "Kafka & ML Pipeline",
    text: "Whizzly Lab built our real-time fraud detection pipeline in under 6 weeks. The Kafka + ML setup handles 10x our traffic now. Exactly what we needed: production-grade, not a prototype.",
  },
  {
    name: "Marcus Webb",
    role: "Head of Engineering, HealthTech",
    location: "London, UK",
    avatar: "/images/avatars/marcus-webb.webp",
    rating: 5,
    project: "RAG & HIPAA Medical AI",
    text: "Their RAG implementation for our medical documentation system cut retrieval time by 70%. The team understood HIPAA requirements from day one. Rare to find that depth in an engineering team.",
  },
  {
    name: "Ayesha Rahman",
    role: "Founder, E-Commerce Platform",
    location: "Dubai, UAE",
    avatar: "/images/avatars/ayesha-rahman.webp",
    rating: 5,
    project: "Custom E-Commerce Engine",
    text: "OXO Packaging was built end-to-end by Whizzly Lab, from product catalog to wholesale ordering. They shipped on time, on budget, and the site handles 500+ daily orders without a hiccup.",
  },
  {
    name: "David Park",
    role: "VP Product, Cybersecurity",
    location: "Singapore",
    avatar: "/images/avatars/david-park.webp",
    rating: 5,
    project: "COMPLYSECOPS Platform",
    text: "COMPLYSECOPS replaced three separate tools with one unified platform. The AI assistant they built for compliance documentation saves our team 15+ hours per week. Worth every dollar.",
  },
  {
    name: "Jennifer Liu",
    role: "Director of Data, NGO",
    location: "Toronto, Canada",
    avatar: "/images/avatars/jennifer-liu.webp",
    rating: 5,
    project: "EchoSense Crisis NLP",
    text: "EchoSense changed how we handle crisis alerts. The real-time NLP pipeline catches high-priority signals that our old system missed. Whizzly Lab ships fast and ships right.",
  },
  {
    name: "Alexandre Moreau",
    role: "Co-Founder, Logistics SaaS",
    location: "Paris, France",
    avatar: "/images/avatars/alexandre-moreau.webp",
    rating: 5,
    project: "Route Optimization AI",
    text: "The delivery dispatch algorithm engineered by Whizzly Lab reduced fleet fuel costs by 18% in the first quarter. Communication was flawless across time zones with weekly demo builds.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-[#fcd34d] text-[#fcd34d]"
        />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="relative px-4 py-20 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] text-cyan-400/80 uppercase">
            Client Testimonials
          </p>
          <h2
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl font-heading"
          >
            Trusted by engineering teams globally
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-hero-sub/75 text-base">
            Delivering mission-critical intelligence and full-stack software across 4 continents.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="liquid-glass relative flex flex-col justify-between rounded-3xl border border-white/10 p-7 transition-all duration-300 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <StarRating count={review.rating} />
                  <Quote className="h-5 w-5 text-white/20" />
                </div>
                
                <span className="mt-4 inline-block text-[11px] font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                  {review.project}
                </span>

                <p className="mt-4 text-sm leading-relaxed text-hero-sub/80">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3.5 border-t border-white/10 pt-4">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-cyan-400/30 bg-white/5 shadow-md shadow-black/40 ring-1 ring-white/10">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    width={44}
                    height={44}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-sm font-semibold text-white">{review.name}</p>
                    <CheckCircle className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                  </div>
                  <p className="truncate text-xs text-hero-sub/70">
                    {review.role}
                  </p>
                  <p className="text-[11px] text-hero-sub/40">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
