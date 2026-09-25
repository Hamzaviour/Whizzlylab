"use client";

import React from "react";
import { Quote } from "lucide-react";

export default function AntimatterTestimonials() {
  return (
    <section className="bg-black text-white pt-8 sm:pt-14 pb-16 sm:pb-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <h2 className="text-3xl sm:text-6xl font-medium mb-10 sm:mb-16 leading-tight tracking-tight text-white font-sans">
          What our clients <br />
          say about us
        </h2>

        {/* 2-Column Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* LEFT COLUMN: Large Featured Testimonial */}
          <div className="group bg-[#0a0a0f] border border-white/10 rounded-3xl p-6 sm:p-12 flex flex-col justify-between h-full min-h-[360px] sm:min-h-[500px] transition-all duration-300 hover:border-white/20 hover:bg-[#0f0f17]">
            <div>
              {/* Large Quote Icon */}
              <Quote className="text-white/10 w-10 h-10 sm:w-16 sm:h-16 mb-5 sm:mb-8 fill-current group-hover:text-indigo-500/20 transition-colors" />

              <p className="text-xl sm:text-3xl lg:text-4xl leading-snug sm:leading-snug text-gray-200 italic font-light font-serif">
                &ldquo;The Whizzly Lab team worked with us to architect and deploy our production AI pipeline. Within 90 days of launch, our system scaled seamlessly with zero downtime.&rdquo;
              </p>
            </div>

            <div className="mt-8 sm:mt-16">
              <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">Jay W.</h4>
              <p className="text-gray-400 text-xs sm:text-sm mt-1 font-light">Rakanda Gold Coffee &amp; Commerce</p>
            </div>
          </div>

          {/* RIGHT COLUMN: Stacked Smaller Testimonials */}
          <div className="flex flex-col gap-6 sm:gap-8">
            {/* Top Right Card */}
            <div className="bg-[#0a0a0f] border border-white/10 rounded-3xl p-6 sm:p-10 flex flex-col justify-between flex-1 transition-all duration-300 hover:border-white/20 hover:bg-[#0f0f17]">
              <p className="text-base sm:text-xl text-gray-300 leading-relaxed italic font-light font-serif">
                &ldquo;We partnered with Whizzly Lab to redesign our marketing site and full-stack SaaS platform, drastically accelerating customer acquisition and user retention.&rdquo;
              </p>
              <div className="mt-6 sm:mt-8">
                <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">Jon H.</h4>
                <p className="text-gray-400 text-xs sm:text-sm mt-1 font-light">Keyspace Studio</p>
              </div>
            </div>

            {/* Bottom Right Card */}
            <div className="bg-[#0a0a0f] border border-white/10 rounded-3xl p-6 sm:p-10 flex flex-col justify-between flex-1 transition-all duration-300 hover:border-white/20 hover:bg-[#0f0f17]">
              <p className="text-base sm:text-xl text-gray-300 leading-relaxed italic font-light font-serif">
                &ldquo;We needed to build an autonomous healthcare compliance and staffing engine; with Whizzly Lab we designed and launched a rock-solid MVP in under 4 weeks.&rdquo;
              </p>
              <div className="mt-6 sm:mt-8">
                <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">Mike R.</h4>
                <p className="text-gray-400 text-xs sm:text-sm mt-1 font-light">RT Direct &amp; HealthTech</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
