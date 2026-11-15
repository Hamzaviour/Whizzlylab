"use client";

import { useEffect } from "react";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import Footer from "@/components/Footer";
import { COMPANY_EMAIL } from "@/lib/contact";

/** Route-level error boundary: shown when a page throws while rendering. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white font-sans overflow-x-hidden flex flex-col justify-between">
      <PageNavbar />

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-24 sm:py-32 text-center max-w-2xl mx-auto my-auto">
        <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-white leading-[1.15]">
          This page failed to load.
        </h1>

        <p className="mt-6 text-base sm:text-lg text-gray-400 font-light leading-relaxed max-w-lg">
          Something broke on our side, not yours. Try again. If it keeps happening, email{" "}
          <a href={`mailto:${COMPANY_EMAIL}`} className="text-white underline underline-offset-4">
            {COMPANY_EMAIL}
          </a>{" "}
          and we will sort it out.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="px-7 py-3 rounded-full border border-white/20 bg-white text-black font-medium text-sm hover:bg-gray-200 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-gray-300 hover:text-white hover:border-white/20 transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
