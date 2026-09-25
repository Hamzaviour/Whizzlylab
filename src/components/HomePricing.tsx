"use client";

import { useState } from "react";
import Link from "next/link";
import ServiceSelector from "./ServiceSelector";
import PricingCalculator from "./PricingCalculator";
import { getServicePricing, type ServiceKey } from "@/lib/pricing";
import { useCurrency } from "@/lib/currency";

export default function HomePricing() {
  const { format } = useCurrency();
  const [serviceKey, setServiceKey] = useState<ServiceKey>("web");
  const service = getServicePricing(serviceKey);
  const from = Math.min(...service.tiers.map((t) => t.min));

  return (
    <section
      id="pricing"
      className="bg-transparent px-4 py-20 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-cyan-400/80 uppercase">
            Transparent Pricing Calculator
          </p>
          <h2
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl font-heading"
          >
            {service.label} from {format(from)}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-hero-sub/75">
            {service.blurb} Fine-tune scope with the interactive estimator below, or{" "}
            <Link href="/pricing" className="text-[#00F0FF] underline underline-offset-4 hover:text-white">
              explore full package breakdown
            </Link>
            .
          </p>
          <div className="mt-8 flex justify-center">
            <ServiceSelector value={serviceKey} onChange={setServiceKey} />
          </div>
        </div>
        <PricingCalculator service={service} />
        <p className="mt-6 text-center text-xs text-foreground/40">
          Estimated project investment shown in USD.
        </p>
      </div>
    </section>
  );
}
