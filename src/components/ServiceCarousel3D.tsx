"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Cpu } from "lucide-react";
import { SERVICES as SERVICE_PAGES } from "@/lib/services";

type Card = {
  slug: string;
  title: string;
  description: string;
  tag: string;
  ctaText: string;
  accentColor: string;
  image?: string;
};

const CARDS: Card[] = SERVICE_PAGES.map((s) => ({
  slug: s.slug,
  title: s.title,
  description: s.short,
  tag: s.tag,
  ctaText: "Learn More →",
  accentColor: s.accentColor,
  image: s.image,
}));

const CARD_BG = "rgba(10, 10, 20, 0.85)";
const CARD_DEPTH = 400;
const AUTO_PLAY_MS = 4000;

function ServiceCard({ card }: { card: Card }) {
  const [hovered, setHovered] = useState(false);
  const hasImage = !!card.image;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-[18px]"
      style={{
        background: CARD_BG,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        fontFamily: "'DM Sans', sans-serif",
        border: hovered
          ? `2px solid ${card.accentColor}`
          : "1px solid rgba(255,255,255,0.07)",
        boxShadow: hovered
          ? `0 10px 40px rgba(0,0,0,0.6), 0 0 20px 2px ${card.accentColor}80, 0 0 50px 5px ${card.accentColor}50`
          : "0 8px 32px rgba(0,0,0,0.4)",
        transform: hovered
          ? "translateY(-12px) scale(1.03)"
          : "translateY(0) scale(1)",
        transition:
          "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease, border 0.4s ease",
      }}
    >
      <div className="relative min-h-[180px] w-full flex-1 overflow-hidden">
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.image}
            alt={`${card.title}: Whizzly Lab`}
            className="block h-full w-full object-cover"
            style={{
              transform: hovered ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${card.accentColor}40 0%, ${card.accentColor}15 50%, transparent 100%)`,
            }}
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-[14px] text-2xl"
              style={{
                background: `${card.accentColor}25`,
                border: `1px solid ${card.accentColor}30`,
                color: card.accentColor,
              }}
            >
              <Cpu className="h-7 w-7" />
            </div>
          </div>
        )}
        <div
          className="pointer-events-none absolute right-0 bottom-0 left-0 h-[50px]"
          style={{
            background: "linear-gradient(transparent, rgba(10,10,20,0.85))",
          }}
        />
        {card.tag ? (
          <div
            className="absolute top-3 left-3 rounded-md px-2.5 py-1 text-[10px] font-bold tracking-[0.1em] text-white uppercase"
            style={{ background: `${card.accentColor}dd` }}
          >
            {card.tag}
          </div>
        ) : null}
      </div>

      <div className="relative z-[3] flex shrink-0 flex-col p-5">
        <h3
          className="m-0 mb-1.5 text-[19px] leading-[1.2] font-bold text-white font-heading tracking-tight"
        >
          {card.title}
        </h3>
        <p
          className="m-0 text-[13px] leading-[1.6]"
          style={{
            color: hovered
              ? "rgba(255,255,255,0.72)"
              : "rgba(255,255,255,0.45)",
            transition: "color 0.4s ease",
          }}
        >
          {card.description}
        </p>
        <Link
          href={`/services/${card.slug}`}
          className="mt-3.5 inline-flex items-center text-[13px] font-semibold no-underline"
          style={{
            color: card.accentColor,
            opacity: hovered ? 1 : 0.6,
            transform: hovered ? "translateX(4px)" : "translateX(0)",
            transition: "all 0.35s ease 0.1s",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {card.ctaText}
        </Link>
      </div>
    </div>
  );
}

function MobileCard({ card }: { card: Card }) {
  const hasImage = !!card.image;
  return (
    <div
      className="overflow-hidden rounded-[18px]"
      style={{
        background: CARD_BG,
        backdropFilter: "blur(24px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        border: "1px solid rgba(255,255,255,0.07)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div className="h-40 w-full overflow-hidden">
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.image}
            alt={`${card.title}: Whizzly Lab`}
            className="block h-full w-full object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-[28px]"
            style={{
              background: `linear-gradient(135deg, ${card.accentColor}40, ${card.accentColor}10)`,
              color: card.accentColor,
            }}
          >
            <Cpu className="h-6 w-6" />
          </div>
        )}
      </div>
      <div className="px-[18px] pt-3.5 pb-[18px]">
        {card.tag ? (
          <span
            className="mb-2.5 inline-block rounded-[5px] px-2 py-[3px] text-[10px] font-bold tracking-[0.1em] uppercase"
            style={{
              background: `${card.accentColor}22`,
              color: card.accentColor,
            }}
          >
            {card.tag}
          </span>
        ) : null}
        <h3
          className="m-0 mb-1.5 text-[17px] font-bold text-white font-heading"
        >
          {card.title}
        </h3>
        <p className="m-0 text-[13px] leading-[1.6] text-white/55">
          {card.description}
        </p>
        <Link
          href={`/services/${card.slug}`}
          className="mt-3 inline-block text-[13px] font-semibold no-underline"
          style={{ color: card.accentColor }}
        >
          {card.ctaText}
        </Link>
      </div>
    </div>
  );
}

function NavArrow({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      aria-label={direction === "left" ? "Previous" : "Next"}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="absolute top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 text-white"
      style={{
        [direction === "left" ? "left" : "right"]: 12,
        background: hovered
          ? "rgba(255,255,255,0.15)"
          : "rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        transition: "background 0.3s",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
        <path
          d={direction === "left" ? "M11 4L6 9L11 14" : "M7 4L12 9L7 14"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/**
 * 3D Service Carousel — Framer octagonal cylinder
 * https://framer.com/m/Service-section-a2j24v.js@aAfooHiaMhCLAPzZAS79
 */
export default function ServiceCarousel3D() {
  const totalCards = Math.min(CARDS.length, 8);
  const anglePerCard = 360 / totalCards;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [cumulativeRotation, setCumulativeRotation] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isPaused || !isInView || AUTO_PLAY_MS <= 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        setCumulativeRotation((r) => r - anglePerCard);
        return (prev + 1) % totalCards;
      });
    }, AUTO_PLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused, isInView, totalCards, anglePerCard]);

  const goTo = (targetIndex: number) => {
    setActiveIndex((prev) => {
      let diff = targetIndex - prev;
      if (diff > totalCards / 2) diff -= totalCards;
      if (diff < -totalCards / 2) diff += totalCards;
      setCumulativeRotation((r) => r - diff * anglePerCard);
      return targetIndex;
    });
  };

  const goPrev = () => {
    setActiveIndex((prev) => {
      setCumulativeRotation((r) => r + anglePerCard);
      return (prev - 1 + totalCards) % totalCards;
    });
  };

  const goNext = () => {
    setActiveIndex((prev) => {
      setCumulativeRotation((r) => r - anglePerCard);
      return (prev + 1) % totalCards;
    });
  };

  const faceAngles = Array.from(
    { length: totalCards },
    (_, i) => i * anglePerCard,
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative flex w-full flex-col items-center overflow-x-hidden bg-[#06060f]/75 px-5 pt-24 pb-16 backdrop-blur-[1px] sm:pt-28 sm:pb-20"
      style={{
        background: "rgba(6, 6, 15, 0.72)",
        fontFamily: "'DM Sans', sans-serif",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Heading sits ABOVE the 3D stage — clear vertical gap so cards never underlap copy */}
      <div className="relative z-30 mb-12 w-full max-w-2xl shrink-0 px-2 text-center sm:mb-24 sm:px-4">
        <p className="text-xs tracking-[0.2em] text-white/40 uppercase">
          Services
        </p>
        <h2
          className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl font-heading"
        >
          What Whizzly Lab ships
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm text-white/50 sm:text-base">
          Explore each capability. Open a service page for deliverables, stack,
          and how we ship it.
        </p>
      </div>

      {isMobile ? (
        <div className="relative z-10 flex w-full max-w-[440px] flex-col gap-4 px-0 sm:max-w-[420px]">
          {CARDS.slice(0, totalCards).map((card) => (
            <MobileCard key={card.slug} card={card} />
          ))}
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-[1100px]">
          {/* Visible overflow so card tops / hover lift are not cropped */}
          <div
            className="relative h-[560px] w-full overflow-visible"
            style={{ perspective: 1200, perspectiveOrigin: "50% 50%" }}
          >
            <motion.div
              animate={{ rotateY: cumulativeRotation }}
              transition={{
                type: "spring",
                stiffness: 45,
                damping: 16,
                mass: 1.2,
              }}
              className="absolute top-1/2 left-1/2 h-[440px] w-[300px]"
              style={{
                marginLeft: -150,
                marginTop: -220,
                transformStyle: "preserve-3d",
              }}
            >
              {CARDS.slice(0, totalCards).map((card, i) => (
                <div
                  key={card.slug}
                  className="absolute top-0 left-0 h-[440px] w-[300px]"
                  style={{
                    transform: `rotateY(${faceAngles[i]}deg) translateZ(${CARD_DEPTH}px)`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  <ServiceCard card={card} />
                </div>
              ))}
            </motion.div>
            <NavArrow direction="left" onClick={goPrev} />
            <NavArrow direction="right" onClick={goNext} />
          </div>

          <div className="relative z-10 mt-5 flex justify-center gap-2">
            {Array.from({ length: totalCards }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to ${CARDS[i]?.title}`}
                onClick={() => goTo(i)}
                className="h-2 cursor-pointer rounded border-0 p-0 transition-all duration-[350ms]"
                style={{
                  width: i === activeIndex ? 24 : 8,
                  background:
                    i === activeIndex
                      ? CARDS[i]?.accentColor || "#fff"
                      : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
