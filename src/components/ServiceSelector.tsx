"use client";

import { SERVICE_PRICING, type ServiceKey } from "@/lib/pricing";

export default function ServiceSelector({
  value,
  onChange,
}: {
  value: ServiceKey;
  onChange: (key: ServiceKey) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Service type"
      className="flex flex-wrap justify-center gap-2 p-1.5 rounded-full border border-white/10 bg-[#090b12] backdrop-blur-md max-w-fit mx-auto"
    >
      {SERVICE_PRICING.map((s) => {
        const active = s.key === value;
        return (
          <button
            key={s.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(s.key)}
            className={`rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 ${
              active
                ? "bg-white text-black font-semibold shadow-md"
                : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            {s.label}
          </button>
        );
      })}
    </div>
  );
}
