"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { LINKEDIN_URL } from "@/lib/contact";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-black text-white pt-14 sm:pt-24 pb-10 sm:pb-12 relative overflow-hidden">
      {/* 1. Purple Bottom Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 w-full h-[320px] bg-gradient-to-t from-indigo-900/40 via-purple-950/20 to-transparent"
      />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-12">
          {/* LEFT COLUMN: Contact & Live Digital Clock */}
          <div className="flex flex-col justify-between h-full min-h-[300px] sm:min-h-[340px]">
            <div>
              <a
                href="mailto:contact@whizzlylab.com"
                className="text-xl sm:text-2xl lg:text-3xl font-light hover:text-indigo-300 transition-colors tracking-tight font-sans block"
              >
                contact@whizzlylab.com
              </a>
              <a
                href="tel:+14244510714"
                className="text-lg sm:text-xl lg:text-2xl font-light text-gray-300 hover:text-indigo-300 transition-colors tracking-tight font-sans block mt-2"
              >
                +1 (424) 451-0714
              </a>
              <div className="mt-4">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-gray-400 text-sm hover:text-white transition-colors group"
                >
                  <span className="border-b border-transparent group-hover:border-white">
                    Linkedin
                  </span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            <div className="mt-10 sm:mt-14 lg:mt-auto">
              <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 font-light">
                Serving clients globally ·{" "}
                <span className="text-white/80">Production AI &amp; Engineering</span>
              </p>

              {/* Huge Real-Time Digital Clock */}
              <div className="text-3xl xs:text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tight font-mono text-white select-none">
                {time || "12:00:00 AM"}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMNS: Navigation Links */}
          <div className="flex gap-10 sm:gap-16 lg:gap-24 flex-wrap">
            {/* Column 1: Services */}
            <div className="flex flex-col gap-3.5">
              <h4 className="text-gray-500 text-xs sm:text-sm font-mono uppercase tracking-wider mb-2">
                Services
              </h4>
              {[
                { name: "Product Design", href: "/services" },
                { name: "Web & Mobile Development", href: "/services/web-development" },
                { name: "AI Transformation & RAG", href: "/services/ai" },
                { name: "Machine Learning Ops", href: "/services/machine-learning" },
                { name: "Data Pipelines", href: "/services/data-pipelines" },
                { name: "Security & Compliance", href: "/services" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors font-light"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Column 2: Solutions */}
            <div className="flex flex-col gap-3.5">
              <h4 className="text-gray-500 text-xs sm:text-sm font-mono uppercase tracking-wider mb-2">
                Solutions
              </h4>
              {[
                { name: "Autonomous Agents", href: "/services/ai" },
                { name: "Real-Time Data Pipelines", href: "/services/data-pipelines" },
                { name: "Machine Learning Ops", href: "/services/machine-learning" },
                { name: "Full-Stack Products", href: "/services/web-development" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors font-light"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 sm:mt-20 pt-8 border-t border-white/10 text-gray-500 text-xs sm:text-sm flex flex-col sm:flex-row justify-end items-center gap-4">
          <div className="flex gap-6 text-gray-500">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-gray-300 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
