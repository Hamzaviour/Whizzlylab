"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4";

/**
 * Adaptive Hero Background:
 * - Mobile / Touch: High-tech GPU-accelerated CSS gradient mesh (0 MB network bandwidth, 0 video decode overhead).
 * - Desktop: Smooth looping ambient video with IntersectionObserver pause-on-scroll and tab visibility optimization.
 */
export default function HeroVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    // Detect mobile / low-power touch devices
    const isTouchOrMobile =
      window.innerWidth < 768 ||
      (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0 && window.innerWidth < 1024);
    setIsMobile(isTouchOrMobile);

    if (isTouchOrMobile) return;

    const video = videoRef.current;
    if (!video) return;

    let isVisible = true;
    let fadeTimer: NodeJS.Timeout | null = null;

    const handleEnded = () => {
      video.style.opacity = "0";
      fadeTimer = setTimeout(() => {
        if (!isVisible) return;
        video.currentTime = 0;
        video
          .play()
          .then(() => {
            video.style.opacity = "1";
          })
          .catch(() => undefined);
      }, 150);
    };

    const handleTimeUpdate = () => {
      // Fade out smoothly in the last 0.6 seconds of playback
      if (video.duration && video.currentTime > video.duration - 0.6) {
        video.style.opacity = "0";
      }
    };

    const handleCanPlay = () => {
      if (isVisible) {
        video
          .play()
          .then(() => {
            video.style.opacity = "1";
          })
          .catch(() => undefined);
      }
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("canplay", handleCanPlay);

    // Pause video when scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(video);

    // Pause when browser tab is inactive
    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else if (isVisible) {
        video.play().catch(() => undefined);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (fadeTimer) clearTimeout(fadeTimer);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("canplay", handleCanPlay);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  if (isMobile) {
    // Ultra-lightweight, zero-bandwidth CSS gradient mesh for mobile devices
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.22),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_20%,rgba(0,240,255,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_20%_40%,rgba(168,85,247,0.14),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,hsl(var(--background))_100%)]" />
      </div>
    );
  }

  return (
    <>
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="metadata"
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out"
        style={{ opacity: 0 }}
      />
      {/* Subtle overlay gradient to ensure high contrast */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,1,15,0.4)_0%,rgba(5,1,15,0.92)_100%)]"
      />
    </>
  );
}

