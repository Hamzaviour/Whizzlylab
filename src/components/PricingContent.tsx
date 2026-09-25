"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import ServiceSelector from "./ServiceSelector";
import PricingCalculator from "./PricingCalculator";
import { getServicePricing, INFRASTRUCTURE_FEES, type ServiceKey } from "@/lib/pricing";
import { useCurrency } from "@/lib/currency";

export default function PricingContent() {
  const { format } = useCurrency();
  const [serviceKey, setServiceKey] = useState<ServiceKey>("web");
  const service = getServicePricing(serviceKey);

  return (
    <div className="space-y-24">
      {/* Domain Selector */}
      <div className="space-y-6">
        <ServiceSelector value={serviceKey} onChange={setServiceKey} />
      </div>

      {/* Package Tier Cards Grid */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-normal text-white tracking-tight font-sans">
            {service.label} Packages
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-gray-400 font-light leading-relaxed">
            {service.blurb}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {service.tiers.map((tier, idx) => {
            const isFeatured = tier.featured || idx === 1;

            return (
              <div
                key={tier.name}
                className={`relative rounded-[32px] p-8 sm:p-10 flex flex-col justify-between transition-all duration-500 overflow-hidden select-none ${
                  isFeatured
                    ? "bg-[#434a8c] text-white shadow-[0_20px_60px_rgba(67,74,140,0.35)] md:-translate-y-2"
                    : "bg-[#090b12] border border-white/[0.08] hover:border-indigo-400/30 text-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full ${
                        isFeatured
                          ? "bg-white/20 text-white"
                          : "bg-white/5 border border-white/10 text-indigo-300"
                      }`}
                    >
                      {tier.name}
                    </span>
                    <span
                      className={`text-xs font-mono ${
                        isFeatured ? "text-indigo-200" : "text-gray-400"
                      }`}
                    >
                      {tier.delivery}
                    </span>
                  </div>

                  <div className="my-6">
                    <div className="text-3xl sm:text-4xl font-medium tracking-tight font-sans">
                      {format(tier.min)} – {format(tier.max)}
                    </div>
                    <div
                      className={`text-xs font-mono mt-1.5 ${
                        isFeatured ? "text-indigo-200" : "text-gray-400"
                      }`}
                    >
                      Production sprint in USD
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-white/10">
                    <span
                      className={`text-[11px] font-mono uppercase tracking-wider block ${
                        isFeatured ? "text-indigo-200" : "text-gray-400"
                      }`}
                    >
                      Included Deliverables
                    </span>
                    <p
                      className={`text-xs sm:text-sm font-light leading-relaxed ${
                        isFeatured ? "text-white/90" : "text-gray-300"
                      }`}
                    >
                      {tier.features}
                    </p>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-white/10">
                  <Link
                    href="/schedule"
                    className={`group flex items-center justify-between w-full px-5 py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                      isFeatured
                        ? "bg-white text-black hover:bg-gray-100"
                        : "border border-white/20 bg-white/5 text-white hover:bg-white hover:text-black"
                    }`}
                  >
                    <span>Start This Package</span>
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${
                        isFeatured ? "bg-black text-white" : "bg-white text-black"
                      }`}
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </Link>
                </div>

                {/* Signature Antimatter Diagonal Dot Matrix in bottom corner */}
                <div
                  aria-hidden
                  className={`pointer-events-none absolute bottom-3 right-3 w-20 h-20 ${
                    isFeatured ? "opacity-25" : "opacity-15"
                  }`}
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(255, 255, 255, 0.75) 1.2px, transparent 1.2px)",
                    backgroundSize: "6px 6px",
                    maskImage: "linear-gradient(to top left, black 25%, transparent 75%)",
                    WebkitMaskImage: "linear-gradient(to top left, black 25%, transparent 75%)",
                  }}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Mandatory Infrastructure Fees */}
      {serviceKey === "web" && (
        <section>
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono uppercase tracking-wider text-indigo-300 mb-3">
              Cloud &amp; Domains
            </div>
            <h3 className="text-2xl sm:text-3xl font-normal text-white tracking-tight font-sans">
              Annual Infrastructure Benchmarks
            </h3>
            <p className="mt-2 text-sm text-gray-400 font-light">
              Beyond engineering, budget for domains, edge hosting, and security SLAs billed directly to your cloud provider.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INFRASTRUCTURE_FEES.map((row) => (
              <div
                key={row.name}
                className="relative rounded-[24px] p-6 bg-[#090b12] border border-white/[0.08] overflow-hidden"
              >
                <div className="text-sm font-medium text-white font-sans">{row.name}</div>
                <div className="text-xl sm:text-2xl font-medium text-indigo-300 font-mono mt-2">
                  {format(row.min)} – {format(row.max)} <span className="text-xs text-gray-400">/ yr</span>
                </div>
                <p className="mt-3 text-xs text-gray-400 font-light leading-relaxed">
                  {row.note}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interactive Project Estimator */}
      <section>
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/30 bg-indigo-500/10 text-xs font-mono uppercase tracking-wider text-indigo-300 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-white tracking-tight font-sans">
            {service.label} Cost Estimator
          </h2>
          <p className="mt-2 max-w-xl mx-auto text-sm text-gray-400 font-light">
            Toggle scopes and add-ons to simulate realistic sprint investments in USD.
          </p>
        </div>

        <PricingCalculator service={service} />
      </section>
    </div>
  );
}
