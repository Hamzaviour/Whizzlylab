import Link from "next/link";
import { ArrowRight, Home, Search, Calendar } from "lucide-react";
import PageNavbar from "@/components/PageNavbar";
import CtaFooter from "@/components/CtaFooter";

export default function NotFound() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-transparent text-foreground flex flex-col justify-between">
      <PageNavbar />

      <section className="relative flex flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:py-28">
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.25)_0%,rgba(0,240,255,0.15)_40%,transparent_70%)] blur-3xl" />

        <div className="liquid-glass relative z-10 mx-auto max-w-2xl rounded-3xl border border-white/10 p-8 sm:p-14 shadow-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300">
            <Search className="h-3.5 w-3.5" />
            404 Error · Page Not Found
          </div>

          <h1
            className="mt-6 text-7xl font-extrabold tracking-tighter text-white sm:text-8xl"
            style={{ fontFamily: "'Space Grotesk', 'Syne', sans-serif" }}
          >
            <span className="bg-gradient-to-r from-[#00F0FF] via-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
              404
            </span>
          </h1>

          <h2
            className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Lost in the Latent Space
          </h2>

          <p className="mt-4 text-base leading-relaxed text-hero-sub/80">
            The page you are looking for has been moved, renamed, or does not exist. Let&apos;s get you back to engineering reality.
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              <Home className="h-4 w-4" />
              Back to Homepage
            </Link>
            <Link
              href="/schedule"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#00f0ff] px-7 py-3.5 text-sm font-semibold text-black transition hover:opacity-90"
            >
              <Calendar className="h-4 w-4" />
              Schedule a Consult
            </Link>
          </div>

          {/* Quick links */}
          <div className="mt-10 border-t border-white/10 pt-6">
            <p className="mb-3 text-xs font-semibold tracking-widest text-hero-sub/50 uppercase">
              Explore Whizzly Lab
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { href: "/services", label: "Capabilities" },
                { href: "/pricing", label: "Pricing & Estimator" },
                { href: "/about", label: "About Studio" },
                { href: "/contact", label: "Direct Channels" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-hero-sub/80 transition hover:border-white/25 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}
