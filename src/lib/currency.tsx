"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Currency = "PKR" | "USD";

/** Fallback live rate used if the exchange-rate API is unreachable (≈ 278 PKR per USD). */
const FALLBACK_USD_PER_PKR = 1 / 278;

const RATE_API = "https://open.er-api.com/v6/latest/PKR";

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  /** USD value of 1 PKR (e.g. ≈0.0036). Updated from a live API. */
  usdPerPkr: number;
  /** true until the live rate has been resolved (API success or fallback). */
  rateLoading: boolean;
  /** Format a PKR amount in the active currency, e.g. "PKR 15,000" or "$54". */
  format: (pkr: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [usdPerPkr, setUsdPerPkr] = useState<number>(FALLBACK_USD_PER_PKR);
  const [rateLoading, setRateLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(RATE_API)
      .then((res) => res.json())
      .then((data: { result?: string; rates?: { USD?: number } }) => {
        if (cancelled) return;
        const usd = data?.rates?.USD;
        if (data?.result === "success" && typeof usd === "number" && usd > 0) {
          setUsdPerPkr(usd);
        }
      })
      .catch(() => {
        /* keep fallback rate */
      })
      .finally(() => {
        if (!cancelled) setRateLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const format = useCallback(
    (pkr: number) => {
      if (currency === "USD") {
        const usd = Math.round(pkr * usdPerPkr);
        return `$${usd.toLocaleString("en-US")}`;
      }
      return `PKR ${Math.round(pkr).toLocaleString("en-PK")}`;
    },
    [currency, usdPerPkr],
  );

  const value = useMemo(
    () => ({ currency, setCurrency, usdPerPkr, rateLoading, format }),
    [currency, usdPerPkr, rateLoading, format],
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within a <CurrencyProvider>");
  }
  return ctx;
}

/**
 * Compact PKR / USD segmented toggle. Drop it in any navbar or header.
 */
export function CurrencyToggle({
  className = "",
}: {
  className?: string;
}) {
  const { currency, setCurrency, usdPerPkr } = useCurrency();
  return (
    <div
      role="group"
      aria-label="Currency"
      className={`flex shrink-0 items-center rounded-full border border-white/15 bg-black p-0.5 text-xs font-medium ${className}`}
    >
      {(["PKR", "USD"] as Currency[]).map((c) => (
        <button
          key={c}
          type="button"
          aria-pressed={currency === c}
          onClick={() => setCurrency(c)}
          title={c === "USD" ? `1 USD ≈ PKR ${Math.round(1 / usdPerPkr)}` : undefined}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            currency === c
              ? "bg-white text-black"
              : "text-foreground/55 hover:text-foreground"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
