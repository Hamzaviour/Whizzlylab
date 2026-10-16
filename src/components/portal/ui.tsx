import type { ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

// ── Tokens ──────────────────────────────────────────────────────────────────
export const BRAND_GRADIENT = "bg-gradient-to-br from-[#7c3aed] via-[#066bf5] to-[#00d4f8]";

export const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-[0_1px_0_rgba(15,23,42,0.02)] placeholder:text-slate-400 transition focus:border-[#066bf5] focus:outline-none focus:ring-4 focus:ring-[#066bf5]/10";
export const labelCls = "mb-1.5 block text-xs font-semibold text-slate-600";
export const btnPrimary =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5b3df5] to-[#066bf5] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_6px_20px_-6px_rgba(6,107,245,0.55)] transition hover:-translate-y-px hover:shadow-[0_10px_24px_-8px_rgba(6,107,245,0.6)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#066bf5]/25 active:translate-y-0";
export const btnSecondary =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200";
export const btnGhost =
  "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900";
export const btnDanger =
  "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-white px-2.5 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50";

// ── Formatting ──────────────────────────────────────────────────────────────
export function fmtDate(v: string | Date | null | undefined): string {
  if (!v) return "";
  const d = typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) ? new Date(`${v}T00:00:00`) : new Date(v);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function fmtDateTime(v: string | Date): string {
  return new Date(v).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export function timeAgo(v: string | Date): string {
  const s = Math.round((Date.now() - new Date(v).getTime()) / 1000);
  if (s < 60) return "just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  if (d < 7) return `${d}d ago`;
  return fmtDate(v);
}

/** Days until a YYYY-MM-DD date (negative = overdue). */
export function daysUntil(v: string | null): number | null {
  if (!v) return null;
  const due = new Date(`${v}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((due.getTime() - today.getTime()) / 86_400_000);
}

export function fmtBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

export const label = (s: string) => s.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());

// ── Badges ──────────────────────────────────────────────────────────────────
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
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  changes_requested: "bg-red-50 text-red-700 ring-red-200",
  internal: "bg-amber-50 text-amber-800 ring-amber-200",
  client: "bg-cyan-50 text-cyan-700 ring-cyan-200",
  admin: "bg-violet-50 text-violet-700 ring-violet-200",
  team: "bg-blue-50 text-blue-700 ring-blue-200",
};

const BADGE_TEXT: Record<string, string> = {
  pending: "Awaiting approval",
  changes_requested: "Changes requested",
  in_progress: "In progress",
  on_hold: "On hold",
};

export function Badge({ value, text }: { value: string; text?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${
        TONES[value] ?? "bg-slate-100 text-slate-600 ring-slate-200"
      }`}
    >
      {text ?? BADGE_TEXT[value] ?? label(value)}
    </span>
  );
}

export const STATUS_DOT: Record<string, string> = {
  todo: "#94a3b8",
  in_progress: "#066bf5",
  review: "#f59e0b",
  done: "#10b981",
  lead: "#f59e0b",
  active: "#10b981",
  paused: "#94a3b8",
  closed: "#cbd5e1",
};

// ── Avatars ─────────────────────────────────────────────────────────────────
const AVATAR_BG = ["#7c3aed", "#066bf5", "#0891b2", "#059669", "#d97706", "#db2777", "#4f46e5"];

export function Avatar({ name, size = 32, ring = false }: { name: string | null | undefined; size?: number; ring?: boolean }) {
  const n = (name || "?").trim();
  const initials = n
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
  let h = 0;
  for (const c of n) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return (
    <span
      title={n}
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${ring ? "ring-2 ring-white" : ""}`}
      style={{ width: size, height: size, fontSize: Math.max(10, size * 0.38), background: AVATAR_BG[h % AVATAR_BG.length] }}
    >
      {initials}
    </span>
  );
}

// ── Progress visuals ────────────────────────────────────────────────────────
export function ProgressBar({ value, showLabel = true }: { value: number; showLabel?: boolean }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="flex items-center gap-2.5">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-gradient-to-r from-[#7c3aed] via-[#066bf5] to-[#00d4f8] transition-[width] duration-700" style={{ width: `${v}%` }} />
      </div>
      {showLabel && <span className="w-9 text-right text-xs font-semibold tabular-nums text-slate-600">{v}%</span>}
    </div>
  );
}

let ringId = 0;
export function ProgressRing({ value, size = 64, stroke = 7, label: text }: { value: number; size?: number; stroke?: number; label?: string }) {
  const v = Math.max(0, Math.min(100, value));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const id = `pr-${++ringId}`;
  return (
    <div className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="55%" stopColor="#066bf5" />
            <stop offset="100%" stopColor="#00d4f8" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#eef2f7" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={`url(#${id})`}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (v / 100) * c}
        />
      </svg>
      <span className="absolute text-center leading-none">
        <span className="block font-bold tabular-nums text-slate-900" style={{ fontSize: size * 0.24 }}>
          {v}%
        </span>
        {text && <span className="mt-0.5 block text-[10px] font-medium text-slate-500">{text}</span>}
      </span>
    </div>
  );
}

/** Donut chart for a handful of segments. */
export function Donut({
  segments,
  size = 132,
  stroke = 16,
  center,
}: {
  segments: { label: string; value: number; color: string }[];
  size?: number;
  stroke?: number;
  center?: ReactNode;
}) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex items-center gap-5">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" role="img" aria-label="Task status breakdown">
          <circle cx={size / 2} cy={size / 2} r={r} stroke="#eef2f7" strokeWidth={stroke} fill="none" />
          {total > 0 &&
            segments.map((s) => {
              const len = (s.value / total) * c;
              const el = (
                <circle
                  key={s.label}
                  cx={size / 2}
                  cy={size / 2}
                  r={r}
                  stroke={s.color}
                  strokeWidth={stroke}
                  fill="none"
                  strokeDasharray={`${Math.max(0, len - 2)} ${c}`}
                  strokeDashoffset={-offset}
                />
              );
              offset += len;
              return el;
            })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-center">{center}</div>
      </div>
      <ul className="min-w-0 space-y-1.5 text-sm">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
            <span className="text-slate-600">{s.label}</span>
            <span className="ml-auto pl-3 font-semibold tabular-nums text-slate-900">{s.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Layout primitives ───────────────────────────────────────────────────────
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] ${className}`}>
      {children}
    </div>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-slate-500">{children}</h2>
      {action}
    </div>
  );
}

export function StatCard({
  icon: Icon,
  label: text,
  value,
  hint,
  tone = "#066bf5",
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: string;
  href?: string;
}) {
  const body = (
    <Card className={`!p-4 ${href ? "transition hover:-translate-y-0.5 hover:shadow-md" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-medium text-slate-500">{text}</div>
          <div className="mt-1 font-heading text-2xl font-bold tabular-nums tracking-tight text-slate-900">{value}</div>
          {hint && <div className="mt-0.5 text-[11px] text-slate-400">{hint}</div>}
        </div>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: `${tone}14`, color: tone }}>
          <Icon className="h-[18px] w-[18px]" />
        </span>
      </div>
    </Card>
  );
  return href ? <Link href={href}>{body}</Link> : body;
}

export function PageHeader({
  title,
  subtitle,
  actions,
  eyebrow,
}: {
  title: string;
  subtitle?: ReactNode;
  actions?: ReactNode;
  eyebrow?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && <div className="mb-1.5">{eyebrow}</div>}
        <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Tabs({ tabs, active }: { tabs: { key: string; label: string; href: string; count?: number }[]; active: string }) {
  return (
    <nav className="-mx-1 mb-6 flex gap-1 overflow-x-auto border-b border-slate-200 px-1" aria-label="Project sections">
      {tabs.map((t) => {
        const on = t.key === active;
        return (
          <Link
            key={t.key}
            href={t.href}
            aria-current={on ? "page" : undefined}
            className={`relative -mb-px flex items-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition ${
              on ? "border-[#066bf5] text-slate-900" : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {t.label}
            {typeof t.count === "number" && t.count > 0 && (
              <span className={`rounded-full px-1.5 text-[11px] font-semibold ${on ? "bg-[#066bf5]/10 text-[#066bf5]" : "bg-slate-100 text-slate-500"}`}>
                {t.count}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function Flash({ error, ok }: { error?: string; ok?: string }) {
  if (!error && !ok) return null;
  return (
    <div
      role="status"
      className={`mb-5 flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium ${
        error ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${error ? "bg-red-500" : "bg-emerald-500"}`} />
      {error || ok}
    </div>
  );
}

export function Field({ name, label: text, children, hint }: { name: string; label: string; children: ReactNode; hint?: string }) {
  return (
    <div>
      <label htmlFor={name} className={labelCls}>
        {text}
      </label>
      {children}
      {hint && <p className="mt-1 text-[11px] text-slate-400">{hint}</p>}
    </div>
  );
}

export function Empty({ icon: Icon, title, children }: { icon?: LucideIcon; title?: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-10 text-center">
      {Icon && (
        <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c3aed]/10 to-[#00d4f8]/10 text-[#066bf5]">
          <Icon className="h-5 w-5" />
        </span>
      )}
      {title && <div className="text-sm font-semibold text-slate-800">{title}</div>}
      {children && <div className="mt-1 max-w-sm text-sm text-slate-500">{children}</div>}
    </div>
  );
}

/** Collapsible panel built on <details>, so it works without client JS. */
export function Disclosure({
  summary,
  children,
  className = "",
  open = false,
}: {
  summary: ReactNode;
  children: ReactNode;
  className?: string;
  open?: boolean;
}) {
  return (
    <details className={`group ${className}`} open={open}>
      <summary className="list-none [&::-webkit-details-marker]:hidden">{summary}</summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}
