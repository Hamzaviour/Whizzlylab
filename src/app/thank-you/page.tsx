import Link from "next/link";
import { CheckCircle2, ArrowRight, Home } from "lucide-react";

export const metadata = {
  title: "Thank You | Whizzly Lab",
  description:
    "Thank you for reaching out to Whizzly Lab. We&apos;ll get back to you within 24 hours.",
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[hsl(260_87%_3%)] text-foreground">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center">
        {/* Check */}
        <div className="relative">
          <div
            aria-hidden
            className="absolute inset-0 rounded-full bg-emerald-500/20 blur-3xl"
          />
          <CheckCircle2 className="relative z-10 h-16 w-16 text-emerald-400 sm:h-20 sm:w-20" />
        </div>

        <h1
          className="mt-6 text-[clamp(1.8rem,5vw,3.5rem)] font-extrabold tracking-tight text-white font-heading"
        >
          Thank you
        </h1>

        <p className="mt-4 max-w-lg text-lg text-hero-sub/75">
          Your message has been received. A member of the Whizzly Lab team will
          get back to you within{" "}
          <span className="font-semibold text-white">24 hours</span>.
        </p>

        {/* Response promise */}
        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4"
        >
          {[
            { icon: "⚡", label: "24-hour response" },
            { icon: "🔒", label: "NDA available" },
            { icon: "💬", label: "Free consultation" },
          ].map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-2 text-sm text-foreground/80"
            >
              <span>{item.icon}</span>
              {item.label}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            <Home className="h-4 w-4" />
            Back to homepage
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Explore services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Internal links */}
        <nav aria-label="Related pages" className="mt-16">
          <p className="mb-4 text-xs tracking-[0.2em] text-foreground/30 uppercase">
            You might also like
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: "/services", label: "Services" },
              { href: "/pricing", label: "Pricing" },
              { href: "/about", label: "About Us" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-foreground/70 transition hover:border-white/20 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </main>
  );
}
