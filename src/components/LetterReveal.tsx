"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
};

/** Antigravity-style per-letter lift / blur reveal */
export default function LetterReveal({ text, className = "", delay = 0 }: Props) {
  const chars = Array.from(text);

  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block will-change-transform"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
          initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.55,
            delay: delay + i * 0.028,
            ease: EASE_OUT,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
