"use client";

import { CheckCircle2 } from "lucide-react";

interface TakeawaysBoxProps {
  title?: string;
  takeaways: string[];
  className?: string;
}

export default function TakeawaysBox({
  title = "Key Engineering Takeaways",
  takeaways,
  className = "",
}: TakeawaysBoxProps) {
  return (
    <div
      className={`rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/[0.06] via-indigo-500/[0.03] to-purple-500/[0.06] p-6 backdrop-blur-md ${className}`}
    >
      <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-300 mb-3">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
        {title}
      </div>
      <ul className="grid gap-2.5 sm:grid-cols-2">
        {takeaways.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
            <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
            <span className="leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
