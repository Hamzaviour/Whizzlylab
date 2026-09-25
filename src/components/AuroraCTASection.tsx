"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AuroraCTAProps {
  headingPrefix?: string;
  words?: string[];
  buttonText?: string;
  buttonHref?: string;
}

interface RouteCopy {
  prefix: string;
  words: string[];
  buttonText: string;
  buttonHref: string;
}

const DEFAULT_HOME_COPY: RouteCopy = {
  prefix: "We turn bold ideas into",
  words: ["powerful", "digital", "realities."],
  buttonText: "Let's work together",
  buttonHref: "/schedule",
};

const ROUTE_COPIES: { pattern: RegExp | string; copy: RouteCopy }[] = [
  {
    pattern: "/about",
    copy: {
      prefix: "Architecting the future of",
      words: ["intelligent", "autonomous", "systems."],
      buttonText: "Build With Our Studio",
      buttonHref: "/schedule",
    },
  },
  {
    pattern: "/services",
    copy: {
      prefix: "Ready to deploy production-grade",
      words: ["scalable", "AI", "platforms?"],
      buttonText: "Book an Architecture Call",
      buttonHref: "/schedule",
    },
  },
  {
    pattern: "/work",
    copy: {
      prefix: "Ship your next breakthrough with",
      words: ["measurable", "engineering", "impact."],
      buttonText: "Start Your Project",
      buttonHref: "/schedule",
    },
  },
  {
    pattern: "/blog",
    copy: {
      prefix: "Transform deep technical insights into",
      words: ["production", "ready", "software."],
      buttonText: "Partner With Us",
      buttonHref: "/schedule",
    },
  },
  {
    pattern: "/pricing",
    copy: {
      prefix: "Engineering excellence backed by",
      words: ["transparent", "predictable", "delivery."],
      buttonText: "Discuss Your Scope",
      buttonHref: "/schedule",
    },
  },
  {
    pattern: "/careers",
    copy: {
      prefix: "Join an elite studio solving",
      words: ["complex", "real-world", "challenges."],
      buttonText: "Explore Open Roles",
      buttonHref: "/careers",
    },
  },
  {
    pattern: "/contact",
    copy: {
      prefix: "Let's start architecting your",
      words: ["next", "production", "system."],
      buttonText: "Book a Strategy Call",
      buttonHref: "/schedule",
    },
  },
  {
    pattern: "/schedule",
    copy: {
      prefix: "Reserve your direct technical",
      words: ["architecture", "strategy", "session."],
      buttonText: "Schedule Consultation",
      buttonHref: "/schedule",
    },
  },
  {
    pattern: "/privacy",
    copy: {
      prefix: "Engineered with strict security &",
      words: ["uncompromising", "client", "ownership."],
      buttonText: "Work With Us",
      buttonHref: "/schedule",
    },
  },
];

export default function AuroraCTASection({
  headingPrefix,
  words: customWords,
  buttonText: customButtonText,
  buttonHref: customButtonHref,
}: AuroraCTAProps) {
  const pathname = usePathname() || "/";

  // Match current route copy
  const matchedRoute = ROUTE_COPIES.find((item) => {
    if (typeof item.pattern === "string") {
      return pathname === item.pattern || pathname.startsWith(item.pattern + "/");
    }
    return item.pattern.test(pathname);
  });

  const activeCopy = matchedRoute ? matchedRoute.copy : DEFAULT_HOME_COPY;

  const resolvedPrefix = headingPrefix ?? (pathname === "/" ? DEFAULT_HOME_COPY.prefix : activeCopy.prefix);
  const resolvedWords = customWords ?? (pathname === "/" ? DEFAULT_HOME_COPY.words : activeCopy.words);
  const resolvedButtonText = customButtonText ?? (pathname === "/" ? DEFAULT_HOME_COPY.buttonText : activeCopy.buttonText);
  const resolvedButtonHref = customButtonHref ?? (pathname === "/" ? DEFAULT_HOME_COPY.buttonHref : activeCopy.buttonHref);

  const wordVariant: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.25,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section className="bg-black py-20 sm:py-32 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      {/* 1. Main Container */}
      <div className="relative w-full max-w-6xl rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden bg-[#05050a] border border-white/10 flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-16 sm:py-24 shadow-2xl">
        {/* 2. Aurora Background Waves */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-[40%] -left-[20%] w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full bg-purple-900/40 blur-[130px] mix-blend-screen"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-[40%] right-[5%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-indigo-800/35 blur-[120px] mix-blend-screen"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-[25%] right-[25%] w-[350px] h-[120px] rounded-full bg-fuchsia-900/40 blur-[70px] rotate-12 mix-blend-screen"
        />

        {/* 3. Content */}
        <div className="relative z-10 max-w-3xl">
          <h2 suppressHydrationWarning className="text-3xl sm:text-5xl lg:text-6xl font-medium text-white leading-tight tracking-tight mb-10 font-sans">
            {resolvedPrefix} <br />
            {/* Animated Words */}
            <span className="inline-flex gap-x-2.5 sm:gap-x-4 flex-wrap mt-1">
              {resolvedWords.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={wordVariant}
                  className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/70 font-semibold"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h2>

          {/* 4. Action Button */}
          <Link
            href={resolvedButtonHref}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white overflow-hidden transition-all duration-300 hover:bg-white/20 hover:scale-105 shadow-[0_0_30px_rgba(168,85,247,0.25)]"
          >
            <span className="relative z-10 text-sm sm:text-base font-medium">
              {resolvedButtonText}
            </span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform" />

            {/* Glowing Ring */}
            <div className="absolute inset-0 rounded-full ring-2 ring-white/15 group-hover:ring-white/35 transition-all" />
          </Link>
        </div>
      </div>
    </section>
  );
}

