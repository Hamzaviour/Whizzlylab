import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "periwinkle" | "cyan" | "emerald";
}

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variants = {
    default:
      "border-transparent bg-white text-black hover:bg-white/80",
    secondary:
      "border-transparent bg-white/10 text-white hover:bg-white/20",
    outline: "text-gray-300 border-white/15",
    periwinkle:
      "border-indigo-400/30 bg-indigo-500/15 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.25)]",
    cyan:
      "border-cyan-400/30 bg-cyan-500/15 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.2)]",
    emerald:
      "border-emerald-400/30 bg-emerald-500/15 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-mono uppercase tracking-wider transition-colors focus:outline-none select-none",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
