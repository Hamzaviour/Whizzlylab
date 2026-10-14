import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2 } from "lucide-react";
import type { Activity } from "@/lib/portal/db";
import type { ProjectRow } from "@/lib/portal/data";
import { Avatar, Badge, Card, daysUntil, fmtDate, ProgressRing, timeAgo } from "./ui";

export function DueChip({ date, done = false }: { date: string | null; done?: boolean }) {
  const d = daysUntil(date);
  if (d === null) return null;
  const tone = done
    ? "bg-slate-100 text-slate-500"
    : d < 0
      ? "bg-red-50 text-red-700"
      : d <= 3
        ? "bg-amber-50 text-amber-700"
        : "bg-slate-100 text-slate-600";
  const text = done ? fmtDate(date) : d < 0 ? `${-d}d overdue` : d === 0 ? "Due today" : d === 1 ? "Due tomorrow" : `Due ${fmtDate(date)}`;
  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium ${tone}`}>
      <CalendarDays className="h-3 w-3" />
      {text}
    </span>
  );
}

export function ProjectCard({ p, showClient }: { p: ProjectRow; showClient: boolean }) {
  return (
    <Link href={`/portal/projects/${p.id}`} className="group block">
      <Card className="h-full transition duration-200 group-hover:-translate-y-0.5 group-hover:border-slate-300 group-hover:shadow-[0_14px_32px_-16px_rgba(6,107,245,0.35)]">
        <div className="flex items-start gap-4">
          <ProgressRing value={p.progress} size={58} stroke={6} />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="truncate font-heading text-[15px] font-semibold text-slate-900">{p.name}</h3>
              <Badge value={p.status} />
            </div>
            {showClient && (
              <p className="mt-0.5 truncate text-xs text-slate-500">
                {p.client_name}
                {p.client_company ? ` · ${p.client_company}` : ""}
              </p>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                {p.task_done}/{p.task_total} tasks
              </span>
              {p.due_date && <DueChip date={p.due_date} done={p.status === "completed"} />}
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end text-xs font-medium text-[#066bf5] opacity-0 transition group-hover:opacity-100">
          Open project <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </div>
      </Card>
    </Link>
  );
}

export function ActivityFeed({ items, showProject = true }: { items: Activity[]; showProject?: boolean }) {
  return (
    <ol className="relative space-y-4 before:absolute before:bottom-2 before:left-[15px] before:top-2 before:w-px before:bg-slate-200">
      {items.map((a) => (
        <li key={a.id} className="relative flex gap-3">
          <span className="relative z-10">
            <Avatar name={a.actor_name ?? "Whizzly Lab"} size={31} ring />
          </span>
          <div className="min-w-0 flex-1 pt-0.5 text-sm">
            <p className="text-slate-600">
              <span className="font-semibold text-slate-900">{a.actor_name ?? "Someone"}</span> {a.verb}{" "}
              {a.detail && <span className="font-medium text-slate-800">{a.detail.length > 90 ? `${a.detail.slice(0, 90)}…` : a.detail}</span>}
            </p>
            <p className="mt-0.5 text-[11px] text-slate-400">
              {showProject && a.project_name && a.project_id ? (
                <>
                  <Link href={`/portal/projects/${a.project_id}`} className="hover:text-slate-700">
                    {a.project_name}
                  </Link>{" "}
                  ·{" "}
                </>
              ) : null}
              {timeAgo(a.created_at)}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function GreetingBanner({ title, subtitle, children }: { title: string; subtitle: string; children?: React.ReactNode }) {
  return (
    <div className="relative mb-8 overflow-hidden rounded-3xl bg-[#0b0820] p-6 text-white shadow-[0_24px_60px_-30px_rgba(76,29,149,0.7)] sm:p-8">
      <div aria-hidden className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[#7c3aed] opacity-50 blur-[90px]" />
      <div aria-hidden className="absolute -bottom-24 right-40 h-64 w-64 rounded-full bg-[#066bf5] opacity-50 blur-[90px]" />
      <div aria-hidden className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-[#00d4f8] opacity-25 blur-[80px]" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "20px 20px" }}
      />
      <div className="relative flex flex-wrap items-center justify-between gap-6">
        <div className="max-w-xl">
          <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
