"use client";

import { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className?: string;
  background?: ReactNode;
  Icon?: React.ElementType;
  description: string;
  href?: string;
  cta?: string;
}) => {
  return (
    <div
      key={name}
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-[28px]",
        // Dark glass container
        "bg-[#090b12] border border-white/[0.08] p-6 sm:p-8 hover:border-indigo-400/40 hover:bg-[#0c0f1c] transition-all duration-500",
        // Shadow & transform
        "hover:shadow-[0_20px_50px_rgba(99,102,241,0.15)] select-none",
        className
      )}
    >
      <div>{background}</div>
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-2 transition-all duration-300 group-hover:-translate-y-1">
        {Icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-indigo-400 mb-2">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <h3 className="text-xl font-medium tracking-tight text-white font-sans">
          {name}
        </h3>
        <p className="max-w-lg text-sm text-gray-400 font-light leading-relaxed">
          {description}
        </p>
      </div>

      {href && cta && (
        <div className="pointer-events-auto z-10 flex items-center justify-between border-t border-white/10 pt-4 mt-6">
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-300 group-hover:text-white transition-colors"
          >
            <span>{cta}</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      )}

      {/* Signature Corner Dot Matrix */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-4 right-4 w-20 h-20 opacity-15 group-hover:opacity-30 transition-opacity"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255, 255, 255, 0.75) 1.2px, transparent 1.2px)",
          backgroundSize: "6px 6px",
          maskImage: "linear-gradient(to top left, black 25%, transparent 75%)",
          WebkitMaskImage: "linear-gradient(to top left, black 25%, transparent 75%)",
        }}
      />
    </div>
  );
};
