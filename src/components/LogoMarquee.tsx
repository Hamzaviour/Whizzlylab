"use client";

const brands = [
  "EchoSense",
  "CureCMS",
  "COMPLYSECOPS",
  "Kafka",
  "Spark",
  "LangChain",
  "Hugging Face",
  "Next.js",
  "RAG",
];

function BrandChip({ name }: { name: string }) {
  return (
    <div className="flex shrink-0 items-center gap-3 transition-transform duration-300 hover:-translate-y-1 hover:scale-105">
      <div className="liquid-glass flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold text-foreground">
        {name[0]}
      </div>
      <span className="text-base font-semibold text-foreground">{name}</span>
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <footer className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-4 pb-8 text-center sm:px-6 md:flex-row md:items-center md:gap-12 md:text-left">
      <div className="shrink-0 text-xs sm:text-sm font-medium tracking-wide text-foreground/50">
        Trusted across AI builds &amp; production platforms
      </div>

      <div className="relative w-full min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
        <div className="animate-marquee flex w-max gap-12 sm:gap-16 hover:[animation-play-state:paused]">
          <div className="flex shrink-0 gap-12 sm:gap-16">
            {brands.map((logo, idx) => (
              <BrandChip key={`logo-1-${idx}`} name={logo} />
            ))}
          </div>
          <div className="flex shrink-0 gap-12 sm:gap-16" aria-hidden>
            {brands.map((logo, idx) => (
              <BrandChip key={`logo-2-${idx}`} name={logo} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
