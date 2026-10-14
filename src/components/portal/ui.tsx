import type { ReactNode } from "react";

export const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#066bf5] focus:outline-none focus:ring-2 focus:ring-[#066bf5]/20";
export const labelCls = "mb-1 block text-xs font-medium text-slate-600";
export const btnPrimary =
  "inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#066bf5] to-[#3b8bff] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:shadow-md hover:brightness-105 cursor-pointer";
export const btnGhost =
  "inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 cursor-pointer";
export const btnDanger =
  "inline-flex items-center justify-center rounded-full border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50 cursor-pointer";

export function fmtDate(v: string | Date | null | undefined): string {
  if (!v) return "";
  const d = typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) ? new Date(`${v}T00:00:00`) : new Date(v);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function fmtDateTime(v: string | Date): string {
  const d = new Date(v);
  return d.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export const label = (s: string) => s.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());

const TONES: Record<string, string> = {
  lead: "bg-amber-50 text-amber-700 ring-amber-200",
  active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  paused: "bg-slate-100 text-slate-600 ring-slate-200",
  closed: "bg-slate-100 text-slate-500 ring-slate-200",
  planning: "bg-violet-50 text-violet-700 ring-violet-200",
  in_progress: "bg-blue-50 text-blue-700 ring-blue-200",
  review: "bg-amber-50 text-amber-700 ring-amber-200",
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  on_hold: "bg-slate-100 text-slate-600 ring-slate-200",
  todo: "bg-slate-100 text-slate-600 ring-slate-200",
  done: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  high: "bg-red-50 text-red-700 ring-red-200",
  medium: "bg-amber-50 text-amber-700 ring-amber-200",
  low: "bg-slate-100 text-slate-600 ring-slate-200",
  update: "bg-blue-50 text-blue-700 ring-blue-200",
  milestone: "bg-violet-50 text-violet-700 ring-violet-200",
  delivery: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

export function Badge({ value }: { value: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${
        TONES[value] ?? "bg-slate-100 text-slate-600 ring-slate-200"
      }`}
    >
      {label(value)}
    </span>
  );
}

export function ProgressBar({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-gradient-to-r from-[#066bf5] to-[#00d4f8]" style={{ width: `${v}%` }} />
      </div>
      <span className="w-9 text-right text-xs font-medium text-slate-600">{v}%</span>
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>{children}</div>;
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {actions}
    </div>
  );
}

export function Flash({ error, ok }: { error?: string; ok?: string }) {
  if (!error && !ok) return null;
  return (
    <div
      role="status"
      className={`mb-4 rounded-lg border px-3 py-2 text-sm ${
        error ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"
      }`}
    >
      {error || ok}
    </div>
  );
}

export function Field({ name, label: text, children }: { name: string; label: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className={labelCls}>
        {text}
      </label>
      {children}
    </div>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white/60 px-4 py-8 text-center text-sm text-slate-500">
      {children}
    </div>
  );
}
