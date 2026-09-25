"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  startTransition,
} from "react";
import { useAnimationFrame } from "framer-motion";

export interface WavyTickerProps {
  items?: React.ReactNode[];
  interactionType?: "auto" | "scroll";
  speed?: number;
  scrollSpeed?: number;
  direction?: "left" | "right" | "up" | "down";
  slowdownOnHover?: number;
  waveStyle?: "straight" | "wavy";
  waveAmplitude?: number;
  waveFrequency?: number;
  itemSize?: number;
  gap?: number;
  padding?: number;
  verticalAlign?: "top" | "center" | "bottom";
  fadeEdges?: boolean;
  fadeDistance?: number;
  className?: string;
}

/**
 * WavyTicker — Framer Component Port
 * Reference: https://framer.com/m/WavyTicker-i8EHRr.js@FRxisUxT7HGfoq8TpJoq
 *
 * Smooth horizontal/vertical ticker with dynamic sine-wave motion displacement.
 */
export default function WavyTicker({
  items = [],
  interactionType = "auto",
  speed = 45,
  scrollSpeed = 1,
  direction = "left",
  slowdownOnHover = 0.3,
  waveStyle = "wavy",
  waveAmplitude = 18,
  waveFrequency = 0.005,
  itemSize = 56,
  gap = 20,
  padding = 28,
  verticalAlign = "center",
  fadeEdges = true,
  fadeDistance = 12,
  className = "",
}: WavyTickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const targetScrollOffset = useRef(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [itemWidths, setItemWidths] = useState<number[]>([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const isVertical = direction === "up" || direction === "down";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Track container dimensions
  useEffect(() => {
    if (!containerRef.current) return;
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Measure item widths after render
  useEffect(() => {
    if (itemRefs.current.length > 0 && items.length > 0) {
      const widths = itemRefs.current
        .slice(0, items.length)
        .map((ref) => (ref ? ref.offsetWidth || itemSize : itemSize));
      setItemWidths(widths);
    }
  }, [items, itemSize]);

  // Calculate dynamic height based on wave effect
  const calculatedHeight = useMemo(() => {
    const waveHeight = waveStyle === "wavy" ? waveAmplitude * 2 : 0;
    const baseHeight = itemSize + waveHeight + padding * 2;
    return Math.max(5, baseHeight);
  }, [itemSize, waveAmplitude, padding, waveStyle]);

  // Track scroll position if scroll interaction requested
  useEffect(() => {
    if (interactionType !== "scroll") return;
    const handleScroll = () => {
      targetScrollOffset.current = window.scrollY * scrollSpeed;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [interactionType, scrollSpeed]);

  // High-performance 60-120fps animation loop
  useAnimationFrame((time, delta) => {
    if (interactionType === "auto") {
      const effectiveSpeed = isHovered ? speed * slowdownOnHover : speed;
      startTransition(() => {
        setOffset((prev) => prev + (effectiveSpeed * delta) / 1000);
      });
    } else {
      startTransition(() => {
        setScrollOffset((prev) => {
          const diff = targetScrollOffset.current - prev;
          return prev + diff * 0.1;
        });
      });
    }
  });

  // Mouse event handlers
  const handleMouseEnter = useCallback(() => {
    if (interactionType === "auto") {
      startTransition(() => setIsHovered(true));
    }
  }, [interactionType]);

  const handleMouseLeave = useCallback(() => {
    if (interactionType === "auto") {
      startTransition(() => setIsHovered(false));
    }
  }, [interactionType]);

  // Guard against empty items
  if (!items || items.length === 0) {
    return (
      <div
        style={{
          width: "100%",
          height: Math.max(5, calculatedHeight),
          minHeight: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: `${padding}px 0`,
        }}
      >
        <p style={{ color: "#999", fontSize: 14 }}>Add items to display</p>
      </div>
    );
  }

  // Pre-mount SSR placeholder to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div
        className={`relative w-full overflow-hidden select-none ${className}`}
        style={{
          height: isVertical ? "100%" : Math.max(5, calculatedHeight),
          minHeight: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", gap: `${gap}px`, opacity: 0 }}>
          {items.slice(0, 8).map((item, index) => (
            <div key={`ssr-${index}`} style={{ height: itemSize }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Calculate dimensions
  const widthsToUse =
    itemWidths.length === items.length
      ? itemWidths
      : items.map(() => itemSize);

  const totalWidth = widthsToUse.reduce((sum, width) => sum + width + gap, 0);
  const totalHeight = items.length * (itemSize + gap);
  const viewportWidth =
    containerWidth ||
    (typeof window !== "undefined" ? window.innerWidth : 1200);
  const viewportHeight =
    containerHeight ||
    (typeof window !== "undefined" ? window.innerHeight : 800);

  // Calculate repeats needed for seamless loop
  const repeats = isVertical
    ? Math.max(3, Math.ceil(viewportHeight / (totalHeight || 1)) + 2)
    : Math.max(3, Math.ceil(viewportWidth / (totalWidth || 1)) + 2);

  // Create repeated items array
  const allItems = Array.from({ length: repeats }, () => items).flat();
  const allWidths = Array.from({ length: repeats }, () => widthsToUse).flat();

  // Calculate offset with proper wrapping
  const currentOffset = interactionType === "scroll" ? scrollOffset : offset;
  const loopLength = isVertical ? totalHeight : totalWidth;

  let finalOffset = 0;
  if (loopLength > 0) {
    if (direction === "left") {
      const wrappedOffset =
        ((currentOffset % loopLength) + loopLength) % loopLength;
      finalOffset = -wrappedOffset;
    } else if (direction === "right") {
      const wrappedOffset =
        ((currentOffset % loopLength) + loopLength) % loopLength;
      finalOffset = wrappedOffset - loopLength;
    } else if (direction === "up") {
      const wrappedOffset =
        ((currentOffset % loopLength) + loopLength) % loopLength;
      finalOffset = -wrappedOffset;
    } else {
      const wrappedOffset =
        ((currentOffset % loopLength) + loopLength) % loopLength;
      finalOffset = wrappedOffset - loopLength;
    }
  }

  // Vertical alignment styles
  const verticalStyles: React.CSSProperties =
    verticalAlign === "top"
      ? { top: padding, bottom: "auto", transform: "" }
      : verticalAlign === "bottom"
      ? { top: "auto", bottom: padding, transform: "" }
      : { top: "50%", bottom: "auto", transform: "translateY(-50%)" };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full overflow-hidden select-none ${className}`}
      style={{
        height: isVertical ? "100%" : Math.max(5, calculatedHeight),
        minHeight: 5,
        display: "flex",
        alignItems:
          verticalAlign === "top"
            ? "flex-start"
            : verticalAlign === "bottom"
            ? "flex-end"
            : "center",
        ...(fadeEdges &&
          !isVertical && {
            maskImage: `linear-gradient(to right, transparent 0%, black ${fadeDistance}%, black ${
              100 - fadeDistance
            }%, transparent 100%)`,
            WebkitMaskImage: `linear-gradient(to right, transparent 0%, black ${fadeDistance}%, black ${
              100 - fadeDistance
            }%, transparent 100%)`,
          }),
        ...(fadeEdges &&
          isVertical && {
            maskImage: `linear-gradient(to bottom, transparent 0%, black ${fadeDistance}%, black ${
              100 - fadeDistance
            }%, transparent 100%)`,
            WebkitMaskImage: `linear-gradient(to bottom, transparent 0%, black ${fadeDistance}%, black ${
              100 - fadeDistance
            }%, transparent 100%)`,
          }),
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isVertical ? "column" : "row",
          gap: `${gap}px`,
          position: "absolute",
          left: isVertical ? 0 : undefined,
          top: isVertical ? 0 : undefined,
          width: isVertical ? "100%" : undefined,
          ...(!isVertical && verticalStyles),
          transform: isVertical
            ? `translateY(${finalOffset}px)`
            : `translateX(${finalOffset}px) ${verticalStyles.transform || ""}`,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {allItems.map((item, index) => {
          let position = 0;
          for (let i = 0; i < index; i++) {
            position += (isVertical ? itemSize : allWidths[i]) + gap;
          }
          const itemWidth = allWidths[index] || itemSize;
          const waveOffset =
            waveStyle === "wavy"
              ? Math.sin((position + currentOffset) * waveFrequency) *
                waveAmplitude
              : 0;
          const isOriginalItem = index < items.length;

          return (
            <div
              key={`item-${index}`}
              ref={
                isOriginalItem
                  ? (el) => {
                      itemRefs.current[index] = el;
                    }
                  : undefined
              }
              style={{
                minWidth: isVertical ? "100%" : itemWidth,
                width: isVertical ? "100%" : undefined,
                height: itemSize,
                flexShrink: 0,
                transform: isVertical
                  ? `translateX(${waveOffset}px)`
                  : `translateY(${waveOffset}px)`,
                willChange: "transform",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
