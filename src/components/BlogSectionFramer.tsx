"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Calendar, ArrowUpRight } from "lucide-react";
import { BlogPost, BLOG_POSTS } from "@/lib/blogData";

const CATEGORIES = [
  "All",
  "AI Architecture",
  "Distributed Systems",
  "WebGL & 3D",
  "E-Commerce",
  "Healthcare AI",
] as const;

type CategoryFilter = (typeof CATEGORIES)[number];

// Category accent colors matching the Framer orange (#EE5519) and Whizzly tech domains
const getCategoryColor = (category: string) => {
  switch (category) {
    case "AI Architecture":
      return { text: "text-[#00F0FF]", bg: "bg-[#00F0FF]/10", border: "border-[#00F0FF]/30", raw: "#00F0FF" };
    case "Distributed Systems":
      return { text: "text-[#6366F1]", bg: "bg-[#6366F1]/10", border: "border-[#6366F1]/30", raw: "#6366F1" };
    case "WebGL & 3D":
      return { text: "text-[#A855F7]", bg: "bg-[#A855F7]/10", border: "border-[#A855F7]/30", raw: "#A855F7" };
    case "Healthcare AI":
      return { text: "text-[#10B981]", bg: "bg-[#10B981]/10", border: "border-[#10B981]/30", raw: "#10B981" };
    case "E-Commerce":
    default:
      return { text: "text-[#EE5519]", bg: "bg-[#EE5519]/10", border: "border-[#EE5519]/30", raw: "#EE5519" };
  }
};

export default function BlogSectionFramer({
  posts = BLOG_POSTS,
}: {
  posts?: BlogPost[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  const displayedPosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  return (
    <section className="relative w-full py-12 sm:py-16">
      {/* ===================== FRAMER HEADER ROW ===================== */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16 border-b border-white/[0.08] pb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-[#EE5519] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#EE5519]">
              Articles & Resources
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white font-sans">
            Latest Industry News & Systems
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400 font-light max-w-xl">
            Production-grade teardowns, benchmarks, and engineering blueprints authored by lead architects.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-6">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setVisibleCount(6);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? "bg-[#EE5519] text-white font-semibold shadow-[0_4px_16px_rgba(238,85,25,0.4)] scale-105"
                      : "bg-white/[0.04] text-gray-400 border border-white/10 hover:border-white/25 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Framer Signature 3D Tactile Button (Btn component) */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl text-sm font-semibold tracking-wider text-white uppercase font-sans transition-all duration-200 active:translate-y-1 active:shadow-[0_2px_0_0_#d0460f]"
            style={{
              backgroundColor: "#EE5519",
              boxShadow: "0px 6px 0px 0px #d0460f",
            }}
          >
            <span>Request Deep Dive</span>
            {/* Framer Double-Chevron SVG */}
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 18L21 12L15 6"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* ===================== FRAMER BLOG CARDS GRID ===================== */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
      >
        <AnimatePresence mode="popLayout">
          {displayedPosts.map((post) => {
            const catStyle = getCategoryColor(post.category);
            return (
              <motion.article
                layout
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col justify-between rounded-[26px] bg-[#090b12] border border-white/[0.08] hover:border-white/25 hover:bg-[#0c0f1b] transition-all duration-400 overflow-hidden select-none shadow-[0_16px_45px_rgba(0,0,0,0.65)] hover:shadow-[0_24px_70px_rgba(0,0,0,0.85)]"
              >
                <div>
                  {/* Top Image Frame with Framer Hover Zoom Effect */}
                  <div className="relative aspect-[16/10] sm:h-[269px] w-full overflow-hidden rounded-t-[25px] bg-[#05060a]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    {/* Subtle gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090b12] via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

                    {/* Corner badge for reading time */}
                    <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-gray-300 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span>{post.readingTime}</span>
                    </div>
                  </div>

                  {/* Body Content Frame (Frame 1 from Framer oMZ3SB2Og.js) */}
                  <div className="p-6 sm:p-7 flex flex-col gap-3.5">
                    {/* Category Caption in signature Framer style */}
                    <div className="flex items-center justify-between text-xs">
                      <span
                        className="font-mono text-xs font-semibold uppercase tracking-[1.5px] transition-colors"
                        style={{ color: catStyle.raw }}
                      >
                        {post.category}
                      </span>
                      <span className="text-gray-500 font-mono text-[11px]">
                        {post.date}
                      </span>
                    </div>

                    {/* 24px SemiBold Title */}
                    <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                      <h3 className="text-xl sm:text-[22px] font-semibold tracking-tight text-white leading-snug group-hover:text-white/90 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer / Action Link */}
                <div className="px-6 pb-6 pt-2 border-t border-white/[0.06] mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                    <span>By {post.author.name.split(" ")[0]}</span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-white hover:text-[#EE5519] transition-colors font-mono"
                  >
                    <span>Read Article</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>

                {/* Signature Antimatter Diagonal Dot Matrix */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute bottom-3 right-3 w-16 h-16 opacity-15 group-hover:opacity-35 transition-opacity"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(255, 255, 255, 0.75) 1.2px, transparent 1.2px)",
                    backgroundSize: "6px 6px",
                    maskImage: "linear-gradient(to top left, black 25%, transparent 75%)",
                    WebkitMaskImage: "linear-gradient(to top left, black 25%, transparent 75%)",
                  }}
                />
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Load More Button if filtered set exceeds visible count */}
      {hasMore && (
        <div className="mt-14 flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 3)}
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/20 bg-white/[0.04] text-sm font-medium text-white hover:border-[#EE5519] hover:bg-[#EE5519]/10 transition-all duration-300"
          >
            <span>Load More Articles</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      )}
    </section>
  );
}

export { BlogSectionFramer };

