"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
} & Omit<HTMLMotionProps<"div">, "children">;

/** Scroll-in reveal used across sections. */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  ...rest
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: EASE_OUT, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
