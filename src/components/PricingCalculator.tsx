"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { ServiceAddon, ServicePricing } from "@/lib/pricing";
import { useCurrency } from "@/lib/currency";

export default function PricingCalculator({
  service,
}: {
  service: ServicePricing;
}) {
  const { format, currency } = useCurrency();
  const [tierIndex, setTierIndex] = useState(0);
  const tier = service.tiers[Math.min(tierIndex, service.tiers.length - 1)];
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const addons: ServiceAddon[] =
    service.addons ?? [
      { label: "Content writing & prompt engineering support", uplift: 0.06 },
      { label: "Technical SEO & Edge caching package", uplift: 0.05 },
      { label: "Priority / accelerated sprint delivery", uplift: 0.15 },
    ];

  const toggleAddon = (label: string) =>
    setChecked((prev) => ({ ...prev, [label]: !prev[label] }));

  const estimate = useMemo(() => {
    const low = tier.min;
    const totalUplift = addons
      .filter((a) => checked[a.label])
      .reduce((sum, a) => sum + a.uplift, 0);
    const high = Math.round(tier.max * (1 + totalUplift));
    const typical = Math.round((low + high) / 2);

    const agency = Math.round(typical * 2.4);
    const freelancer = Math.round(typical * 1.55);

    return { low, high, typical, agency, freelancer, delivery: tier.delivery };
  }, [tier, addons, checked]);

  return (
    <div
      id="calculator-section"
      className="grid w-full min-w-0 overflow-hidden rounded-[32px] border border-white/[0.08] lg:grid-cols-2 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
    >
      {/* Left Column: Tiers and Addons */}
      <div className="divide-y divide-white/[0.08] bg-[#090b12] p-6 sm:p-8 lg:p-10">
        <div className="pb-6">
          <h3 className="mb-4 text-xs font-mono uppercase tracking-wider text-indigo-300">
            1. Select Package Tier
          </h3>
          <div className="space-y-3">
            {service.tiers.map((t, i) => {
              const active = tierIndex === i;
              return (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setTierIndex(i)}
                  className={`flex w-full items-start gap-4 p-4 rounded-2xl border text-left transition-all duration-200 ${
                    active
                      ? "border-indigo-400/50 bg-[#0d101c]"
                      : "border-white/[0.05] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                  }`}
                >
                  <span
                    className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                      active ? "border-indigo-400 bg-indigo-500" : "border-white/30"
                    }`}
                  >
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{t.name}</span>
                      <span className="text-xs font-mono text-indigo-300">{t.delivery}</span>
                    </span>
                    <span className="mt-1 block text-xs text-gray-400 font-light">
                      {format(t.min)} – {format(t.max)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-6">
          <h3 className="mb-4 text-xs font-mono uppercase tracking-wider text-indigo-300">
            2. Scope Add-ons
          </h3>
          <div className="space-y-2.5">
            {addons.map((addon) => {
              const active = !!checked[addon.label];
              return (
                <button
                  key={addon.label}
                  type="button"
                  onClick={() => toggleAddon(addon.label)}
                  className={`flex w-full items-center gap-3.5 p-3.5 rounded-xl border text-left text-sm transition-all duration-200 ${
                    active
                      ? "border-indigo-400/40 bg-indigo-500/10 text-white"
                      : "border-white/[0.05] bg-white/[0.02] text-gray-400 hover:border-white/10 hover:text-white"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                      active
                        ? "border-indigo-400 bg-indigo-500 text-white"
                        : "border-white/30"
                    }`}
                  >
                    {active && <Check className="h-3 w-3" />}
                  </span>
                  <span className="min-w-0 flex-1 text-xs sm:text-sm font-light">
                    {addon.label}
                  </span>
                  <span className="text-xs font-mono text-indigo-300 shrink-0">
                    +{Math.round(addon.uplift * 100)}%
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Comparative Benchmark */}
      <div className="min-w-0 space-y-5 bg-[#06070a] p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400">
              Estimated Investment
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/10 text-indigo-300">
              USD
            </span>
          </div>

          <div className="space-y-3">
            {/* Traditional Agency */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/[0.05] p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Traditional Agency</span>
                <span className="text-sm font-mono text-gray-400">
                  {format(estimate.agency)}+
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-light mt-1">
                High overhead, 3-6 month timeline
              </p>
            </div>

            {/* Freelancer */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/[0.05] p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Freelancer Marketplace</span>
                <span className="text-sm font-mono text-gray-400">
                  {format(estimate.freelancer)}+
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-light mt-1">
                Variable SLA, no architecture guarantee
              </p>
            </div>

            {/* Whizzly Lab Active Feature Card */}
            <div className="rounded-2xl bg-[#434a8c] p-6 text-white shadow-[0_12px_40px_rgba(67,74,140,0.4)] relative overflow-hidden">
              <div className="text-xs font-mono uppercase tracking-wider text-indigo-200 mb-1">
                Whizzly Lab Studio Sprint
              </div>
              <div className="text-3xl sm:text-4xl font-medium tracking-tight font-sans mt-2">
                {format(estimate.low)} – {format(estimate.high)}
              </div>
              <div className="text-xs text-indigo-200 font-light mt-2">
                Median estimate ~ {format(estimate.typical)} · Delivery: {tier.delivery}
              </div>

              <div className="mt-6 pt-4 border-t border-white/20">
                <Link
                  href="/schedule"
                  className="group flex items-center justify-between w-full px-5 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-100 transition-all duration-300"
                >
                  <span>Book Scoped Discovery</span>
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:scale-110">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </div>

              {/* Corner dot matrix */}
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-2 right-2 w-20 h-20 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255, 255, 255, 0.75) 1.2px, transparent 1.2px)",
                  backgroundSize: "6px 6px",
                  maskImage: "linear-gradient(to top left, black 25%, transparent 75%)",
                  WebkitMaskImage: "linear-gradient(to top left, black 25%, transparent 75%)",
                }}
              />
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 font-light text-center">
          Transparent rates. No surprise hidden charges. 100% IP ownership transfers upon completion.
        </p>
      </div>
    </div>
  );
}
