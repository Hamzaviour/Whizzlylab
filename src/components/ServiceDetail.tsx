import Link from "next/link";
import Image from "next/image";
import type { ServicePage } from "@/lib/services";
import { SERVICES } from "@/lib/services";
import PageNavbar from "./PageNavbar";
import CtaFooter from "./CtaFooter";
import Breadcrumbs from "./Breadcrumbs";

export default function ServiceDetail({ service }: { service: ServicePage }) {
  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-transparent text-foreground">
      <PageNavbar />

      <section className="relative overflow-hidden px-5 pt-10 pb-20 sm:px-8 sm:pt-14">
        <div
          className="pointer-events-none absolute top-0 right-0 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
          style={{ background: service.accentColor }}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />

          {service.tag ? (
            <span
              className="mt-6 inline-block rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide text-black uppercase"
              style={{ background: service.accentColor }}
            >
              {service.tag}
            </span>
          ) : null}

          <h1
            className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            style={{ fontFamily: "'Syne', 'General Sans', sans-serif" }}
          >
            {service.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-hero-sub/85">
            {service.headline}
          </p>

          <div className="relative mt-10 aspect-[21/9] overflow-hidden rounded-3xl border border-white/10">
            <Image
              src={service.image}
              alt={`${service.title} — AI & Software Engineering Services by Whizzly Lab`}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(260_87%_3%)] via-transparent to-transparent" />
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5">
              {service.body.map((p) => (
                <p key={p.slice(0, 24)} className="text-base leading-relaxed text-hero-sub/80">
                  {p}
                </p>
              ))}
              <Link
                href="/schedule"
                className="mt-4 inline-flex rounded-full px-6 py-3 text-sm font-medium text-black transition hover:opacity-90"
                style={{ background: service.accentColor }}
              >
                Schedule a Consult
              </Link>
            </div>

            <div className="space-y-6">
              <div className="liquid-glass rounded-2xl p-6">
                <h2 className="text-sm tracking-widest text-foreground/40 uppercase">
                  Deliverables
                </h2>
                <ul className="mt-4 space-y-2">
                  {service.deliverables.map((d) => (
                    <li key={d} className="text-sm text-foreground/80">
                      <span style={{ color: service.accentColor }}>▸ </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="liquid-glass rounded-2xl p-6">
                <h2 className="text-sm tracking-widest text-foreground/40 uppercase">
                  Stack
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-foreground/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-2xl font-semibold">Related services</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {others.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="liquid-glass group rounded-2xl p-5 transition hover:-translate-y-1"
                >
                  <p
                    className="text-xs font-semibold uppercase"
                    style={{ color: s.accentColor }}
                  >
                    {s.tag || "Service"}
                  </p>
                  <h3 className="mt-2 text-lg font-medium">{s.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-hero-sub/70">
                    {s.short}
                  </p>
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
