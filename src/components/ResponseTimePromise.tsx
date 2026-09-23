import { PHONE_URL, COMPANY_PHONE } from "@/lib/contact";
import { Phone } from "lucide-react";

export default function ResponseTimePromise() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="liquid-glass rounded-2xl border border-emerald-500/20 p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-semibold text-white">
                24 Hour Response Promise
              </p>
              <p className="text-sm text-hero-sub/70">
                Every inquiry receives a direct technical reply within one business day from our engineering leads.
              </p>
            </div>
          </div>
          <a
            href={PHONE_URL}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-5 py-2.5 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/25"
          >
            <Phone className="h-4 w-4" />
            Call {COMPANY_PHONE}
          </a>
        </div>
      </div>
    </div>
  );
}
