"use client";

import { useState } from "react";
import Link from "next/link";
import ServiceSelector from "./ServiceSelector";
import PricingCalculator from "./PricingCalculator";
import Breadcrumbs from "./Breadcrumbs";
import TrustBadges from "./TrustBadges";
import { getServicePricing, INFRASTRUCTURE_FEES, type ServiceKey } from "@/lib/pricing";
import { useCurrency, CurrencyToggle } from "@/lib/currency";

export default function PricingContent() {
  const { format, currency } = useCurrency();
  const [serviceKey, setServiceKey] = useState<ServiceKey>("web");
  const service = getServicePricing(serviceKey);

  return (
    <section className="px-4 py-12 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-7xl min-w-0">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Pricing" },
          ]}
        />
        <h1
          className="mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white font-heading"
        >
          Transparent AI &amp; Engineering Pricing
        </h1>
        <p className="mt-2 text-lg sm:text-xl font-medium text-electric-cyan">
          {service.label} Estimates in {currency}
        </p>
        <p className="mt-3 max-w-2xl text-sm text-hero-sub/80 sm:text-base md:text-lg">
          {service.blurb} Ranges below are industry benchmark averages and can
          vary with functionality, complexity, and service tier.
        </p>

        <div className="mt-8">
          <ServiceSelector value={serviceKey} onChange={setServiceKey} />
        </div>
        <div className="mt-5 flex justify-center">
          <CurrencyToggle />
        </div>

        {/* Mobile: stacked cards instead of wide table */}
        <div className="mt-10 space-y-3 md:hidden">
          {service.tiers.map((row) => (
            <div
              key={row.name}
              className={`rounded-2xl border border-white/10 bg-black/30 p-4 ${
                row.featured ? "ring-1 ring-[#FF5656]/50" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-sm font-semibold leading-snug text-foreground">
                  {row.name}
                </h2>
                <p className="shrink-0 text-xs text-foreground/40">
                  {row.delivery}
                </p>
              </div>
              <p className="mt-2 text-base font-bold text-[#FF5656]">
                {format(row.min)} – {format(row.max)}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-hero-sub/70">
                {row.features}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <div className="mt-14 hidden overflow-x-auto rounded-2xl border border-white/10 md:block">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-white/[0.04] text-xs tracking-wider text-foreground/45 uppercase">
              <tr>
                <th className="px-5 py-4 font-medium">Package</th>
                <th className="px-5 py-4 font-medium">
                  Estimated cost ({currency})
                </th>
                <th className="px-5 py-4 font-medium">Key features</th>
                <th className="px-5 py-4 font-medium">Delivery</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {service.tiers.map((row) => (
                <tr key={row.name} className="bg-black/20">
                  <td className="px-5 py-4 font-medium text-foreground">
                    {row.name}
                  </td>
                  <td className="px-5 py-4 font-semibold text-[#FF5656]">
                    {format(row.min)} – {format(row.max)}
                  </td>
                  <td className="px-5 py-4 text-hero-sub/75">
                    {row.features}
                  </td>
                  <td className="px-5 py-4 text-hero-sub/75">
                    {row.delivery}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {serviceKey === "web" && (
          <div className="mt-14 sm:mt-16">
            <h2
              className="mb-2 text-xl font-semibold sm:text-2xl md:text-3xl text-white font-heading"
            >
              Mandatory infrastructure fees (annual)
            </h2>
            <p className="mb-6 max-w-2xl text-sm text-hero-sub/70">
              Beyond development, budget for domain, hosting, and security billed yearly (or on a multi-year cycle depending on TLD and cloud tier).
            </p>

            <div className="space-y-3 md:hidden">
              {INFRASTRUCTURE_FEES.map((row) => (
                <div
                  key={row.name}
                  className="rounded-2xl border border-white/10 bg-black/30 p-4"
                >
                  <p className="text-sm font-medium text-foreground">
                    {row.name}
                  </p>
                  <p className="mt-1 text-sm font-bold text-[#FF5656]">
                    {format(row.min)} – {format(row.max)} / year
                  </p>
                  <p className="mt-2 text-xs text-hero-sub/70">{row.note}</p>
                </div>
              ))}
            </div>

            <div className="hidden overflow-x-auto rounded-2xl border border-white/10 md:block">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-white/[0.04] text-xs tracking-wider text-foreground/45 uppercase">
                  <tr>
                    <th className="px-5 py-4 font-medium">Item</th>
                    <th className="px-5 py-4 font-medium">Typical cost</th>
                    <th className="px-5 py-4 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {INFRASTRUCTURE_FEES.map((row) => (
                    <tr key={row.name} className="bg-black/20">
                      <td className="px-5 py-4 font-medium text-foreground">
                        {row.name}
                      </td>
                      <td className="px-5 py-4 font-semibold text-[#FF5656]">
                        {format(row.min)} – {format(row.max)} / year
                      </td>
                      <td className="px-5 py-4 text-hero-sub/75">
                        {row.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-16 sm:mt-20">
          <h2
            className="mb-3 text-center text-2xl font-semibold sm:text-3xl md:text-4xl text-white font-heading"
          >
            {service.label} Project Estimation Calculator
          </h2>
          <p className="mx-auto mb-6 max-w-xl px-1 text-center text-sm text-hero-sub/70 sm:mb-8">
            Estimates shown in {currency}. Final quotes confirmed after a short
            consult.
          </p>
          <PricingCalculator service={service} />
          <p className="mt-8 text-center text-sm text-foreground/45">
            Ready to start?{" "}
            <Link href="/schedule" className="text-[#00F0FF] hover:underline">
              Schedule a consult
            </Link>
          </p>
        </div>

        <TrustBadges className="mt-14" />
      </div>
    </section>
  );
}
