"use client";

import {
  useEffect,
  useState,
  useRef,
} from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Cpu } from "lucide-react";
import { SERVICES as SERVICE_PAGES } from "@/lib/services";

export interface CarouselCard {
  slug?: string;
  title: string;
  description: string;
  tag?: string;
  ctaText?: string;
  ctaUrl?: string;
  accentColor: string;
  image?: string;
}

export const DEFAULT_WHIZZLY_CARDS: CarouselCard[] = SERVICE_PAGES.map((s) => ({
  slug: s.slug,
  title: s.title,
  description: s.short,
  tag: s.tag,
  ctaText: "Learn More →",
  ctaUrl: `/services/${s.slug}`,
  accentColor: s.accentColor,
  image: s.image,
}));

export interface ServiceCarousel3DHandle {
  goNext: () => void;
  goPrev: () => void;
  goTo: (index: number) => void;
  activeIndex: number;
}

export interface ServiceCarousel3DProps {
  cards?: CarouselCard[];
  backgroundColor?: string;
  cardBackground?: string;
  cardDepth?: number;
  perspective?: number;
  autoPlaySpeed?: number;
  embedMode?: boolean;
  showHeader?: boolean;
  headerBadge?: string;
  headerTitle?: string;
  headerDescription?: string;
  className?: string;
  onActiveIndexChange?: (index: number) => void;
}

// ── Font Loader (Syne & DM Sans from Google Fonts) ───────────────────
function loadFonts() {
  if (typeof document === "undefined") return;
  if (document.getElementById("sc3d-fonts")) return;
  const link = document.createElement("link");
  link.id = "sc3d-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap";
  document.head.appendChild(link);
}

// ── 3D Card Component ────────────────────────────────────────────────
function ServiceCard({
  card,
  bg,
}: {
  card: CarouselCard;
  bg: string;
}) {
  const [hovered, setHovered] = useState(false);
  const hasImage = Boolean(card.image);
  const href = card.ctaUrl || (card.slug ? `/services/${card.slug}` : "#");

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: 18,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
        background: bg,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: hovered
          ? `0 12px 45px rgba(0,0,0,0.65), 0 0 24px 2px ${card.accentColor}80, 0 0 55px 6px ${card.accentColor}45`
          : "0 8px 32px rgba(0,0,0,0.45)",
        border: hovered
          ? `2px solid ${card.accentColor}`
          : "1px solid rgba(255,255,255,0.08)",
        transform: hovered
          ? "translateY(-10px) scale(1.025)"
          : "translateY(0) scale(1)",
        transition:
          "transform 0.45s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease, border 0.4s ease",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Top Image / Graphic Zone */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 180,
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.image}
            alt={card.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: hovered ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(135deg, ${card.accentColor}40 0%, ${card.accentColor}15 50%, transparent 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: `${card.accentColor}25`,
                border: `1px solid ${card.accentColor}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: card.accentColor,
              }}
            >
              <Cpu className="h-6 w-6" />
            </div>
          </div>
        )}

        {/* Ambient bottom gradient blend into card body */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 50,
            background: `linear-gradient(transparent, ${
              bg.includes("rgba") ? "rgba(10,10,20,0.92)" : bg
            })`,
            pointerEvents: "none",
          }}
        />

        {/* Optional Tag badge */}
        {card.tag && (
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "4px 10px",
              borderRadius: 6,
              background: `${card.accentColor}dd`,
              color: "#fff",
              boxShadow: `0 2px 10px ${card.accentColor}50`,
            }}
          >
            {card.tag}
          </div>
        )}
      </div>

      {/* Bottom Content Zone */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          padding: "16px 20px 20px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 19,
              color: "#fff",
              margin: "0 0 6px",
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
            }}
          >
            {card.title}
          </h3>

          <p
            style={{
              fontSize: 13,
              lineHeight: 1.55,
              margin: 0,
              color: hovered
                ? "rgba(255,255,255,0.78)"
                : "rgba(255,255,255,0.52)",
              transition: "color 0.4s ease",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {card.description}
          </p>
        </div>

        <span
          style={{
            marginTop: 14,
            display: "inline-flex",
            alignItems: "center",
            fontSize: 13,
            fontWeight: 600,
            color: card.accentColor,
            opacity: hovered ? 1 : 0.75,
            transform: hovered ? "translateX(4px)" : "translateX(0)",
            transition: "all 0.35s ease 0.1s",
          }}
        >
          {card.ctaText || "Learn More →"}
        </span>
      </div>
    </Link>
  );
}

// ── Mobile Card (Fallback for < 768px Viewports) ─────────────────────
function MobileCard({
  card,
  bg,
}: {
  card: CarouselCard;
  bg: string;
}) {
  const hasImage = Boolean(card.image);
  const href = card.ctaUrl || (card.slug ? `/services/${card.slug}` : "#");

  return (
    <Link
      href={href}
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        borderRadius: 18,
        overflow: "hidden",
        background: bg,
        backdropFilter: "blur(24px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        border: "1px solid rgba(255,255,255,0.07)",
        fontFamily: "'DM Sans', sans-serif",
        cursor: "pointer",
      }}
    >
      <div style={{ width: "100%", height: 160, overflow: "hidden" }}>
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.image}
            alt={card.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(135deg, ${card.accentColor}40, ${card.accentColor}10)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Cpu className="h-7 w-7" style={{ color: card.accentColor }} />
          </div>
        )}
      </div>

      <div style={{ padding: "16px 20px 20px" }}>
        {card.tag && (
          <span
            style={{
              display: "inline-block",
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "3px 8px",
              borderRadius: 5,
              marginBottom: 10,
              background: `${card.accentColor}22`,
              color: card.accentColor,
            }}
          >
            {card.tag}
          </span>
        )}

        <h3
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 18,
            color: "#fff",
            margin: "0 0 6px",
          }}
        >
          {card.title}
        </h3>

        <p
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {card.description}
        </p>

        <span
          style={{
            display: "inline-block",
            marginTop: 14,
            fontSize: 13,
            fontWeight: 600,
            color: card.accentColor,
          }}
        >
          {card.ctaText || "Learn More →"}
        </span>
      </div>
    </Link>
  );
}

// ── Frosted Nav Arrow ────────────────────────────────────────────────
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
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={direction === "left" ? "Previous slide" : "Next slide"}
      style={{
        position: "absolute",
        top: "50%",
        zIndex: 40,
        [direction === "left" ? "left" : "right"]: 12,
        transform: "translateY(-50%)",
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: hovered
          ? "rgba(255,255,255,0.2)"
          : "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.18)",
        color: "#fff",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: "0 4px 18px rgba(0,0,0,0.4)",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d={direction === "left" ? "M11 4L6 9L11 14" : "M7 4L12 9L7 14"}
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/**
 * ServiceCarousel3D — Whizzly Lab Production 3D Carousel
 * Reference: https://framer.com/m/Service-section-a2j24v.js@aAfooHiaMhCLAPzZAS79
 *
 * Architecture:
 * - 8-card octagonal 3D cylinder rotated at 45° intervals (0°, 45°, 90°, ... 315°)
 * - Sized proportionally with generous vertical clearance so cards never clip on top/bottom
 * - Perspective: 1350px, cardDepth: 365px, backfaceVisibility: hidden
 * - Framer-motion spring physics (stiffness: 45, damping: 16, mass: 1.2)
 * - Auto-rotates every 4s, pauses on user hover
 * - Frosted circular arrow controls + pill pagination dots placed safely below cards
 * - Clean mobile responsive stack on viewports < 768px
 */
export default function ServiceCarousel3D({
  cards = DEFAULT_WHIZZLY_CARDS,
  backgroundColor = "transparent",
  cardBackground = "rgba(10, 10, 20, 0.85)",
  cardDepth = 365,
  perspective = 1350,
  autoPlaySpeed = 4000,
  embedMode = false,
  showHeader = true,
  headerBadge = "Services",
  headerTitle = "What Whizzly Lab ships",
  headerDescription = "Explore each capability. Open a service page for deliverables, stack, and how we ship it.",
  className = "",
  onActiveIndexChange,
}: ServiceCarousel3DProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cumulativeRotation, setCumulativeRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalCards = Math.min(cards.length, 8);
  const anglePerCard = 360 / totalCards;

  // Load Google Fonts (Syne + DM Sans)
  useEffect(() => {
    loadFonts();
  }, []);

  // Screen width observer
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Sync active index change to parent if callback provided
  useEffect(() => {
    onActiveIndexChange?.(activeIndex);
  }, [activeIndex, onActiveIndexChange]);

  // Rotation Navigation Handlers
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


  // Auto-play timer (pauses when user hovers container)
  useEffect(() => {
    if (isPaused || autoPlaySpeed <= 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        setCumulativeRotation((r) => r - anglePerCard);
        return (prev + 1) % totalCards;
      });
    }, autoPlaySpeed);
    return () => clearInterval(timer);
  }, [isPaused, autoPlaySpeed, totalCards, anglePerCard]);

  // Cylinder face angles
  const faceAngles = Array.from(
    { length: totalCards },
    (_, i) => i * anglePerCard
  );

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`relative flex w-full flex-col items-center justify-center overflow-visible ${
        embedMode ? "p-0" : "px-5 py-16 sm:py-24"
      } ${className}`}
      style={{
        background: backgroundColor,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Background Subtle SVG Noise & Dot Grids (standalone mode) */}
      {!embedMode && (
        <>
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
        </>
      )}

      {/* Standalone Header Section (shown only when not embedded) */}
      {!embedMode && showHeader && (
        <div className="relative z-30 mb-12 w-full max-w-2xl shrink-0 px-2 text-center sm:mb-20 sm:px-4">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-indigo-300/80">
            {headerBadge}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl font-sans">
            {headerTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-white/50 sm:text-base font-light">
            {headerDescription}
          </p>
        </div>
      )}

      {/* Main Viewport: Mobile Stack or Desktop 3D Cylinder */}
      {isMobile ? (
        <div className="relative z-10 flex w-full max-w-[420px] flex-col gap-4 px-2">
          {cards.slice(0, totalCards).map((card, i) => (
            <MobileCard
              key={card.slug || i}
              card={card}
              bg={cardBackground}
            />
          ))}
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-[1100px] overflow-visible">
          {/* 3D Perspective Stage: 640px height gives ample room above & below cards */}
          <div
            className="relative h-[620px] sm:h-[640px] w-full overflow-visible"
            style={{ perspective, perspectiveOrigin: "50% 50%" }}
          >
            <motion.div
              animate={{ rotateY: cumulativeRotation }}
              transition={{
                type: "spring",
                stiffness: 45,
                damping: 16,
                mass: 1.2,
              }}
              style={{
                position: "absolute",
                width: 290,
                height: 410,
                left: "50%",
                top: "50%",
                marginLeft: -145,
                marginTop: -205,
                transformStyle: "preserve-3d",
              }}
            >
              {cards.slice(0, totalCards).map((card, i) => (
                <div
                  key={card.slug || i}
                  style={{
                    position: "absolute",
                    width: 290,
                    height: 410,
                    top: 0,
                    left: 0,
                    transform: `rotateY(${faceAngles[i]}deg) translateZ(${cardDepth}px)`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  <ServiceCard card={card} bg={cardBackground} />
                </div>
              ))}
            </motion.div>

            {/* Left and Right Nav Arrows */}
            <NavArrow direction="left" onClick={goPrev} />
            <NavArrow direction="right" onClick={goNext} />
          </div>

          {/* Bottom Pagination Dots — positioned cleanly below the 3D stage with zero overlap */}
          <div className="relative z-20 mt-4 sm:mt-6 flex justify-center gap-2">
            {Array.from({ length: totalCards }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                style={{
                  width: i === activeIndex ? 26 : 8,
                  height: 8,
                  borderRadius: 4,
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  background:
                    i === activeIndex
                      ? cards[i]?.accentColor || "#fff"
                      : "rgba(255,255,255,0.18)",
                  transition: "all 0.35s ease",
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
