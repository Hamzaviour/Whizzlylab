import Link from "next/link";
import {
  Activity as ActivityIcon,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FolderKanban,
  Inbox,
  ListChecks,
  Megaphone,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { requireUser, isStaff } from "@/lib/portal/auth";
import {
  getActivity,
  getClientPipeline,
  getDueSoon,
  getPendingApprovals,
  getProjects,
  getRecentUpdates,
  getStaffStats,
  getTaskBreakdown,
} from "@/lib/portal/data";
import { ActivityFeed, DueChip, GreetingBanner, ProjectCard } from "@/components/portal/blocks";
import { Badge, Card, Donut, Empty, ProgressRing, SectionTitle, StatCard, timeAgo } from "@/components/portal/ui";

/** Titles and family prefixes that shouldn't be used as a first name ("Ch Hamza Younas" -> "Hamza"). */
const NAME_PREFIXES = new Set([
  "ch", "chaudhry", "chaudhary", "chaudhri", "mr", "mrs", "ms", "miss", "dr", "prof", "sir", "engr", "eng",
  "syed", "sayed", "mian", "rana", "malik", "raja", "hafiz", "haji", "sheikh", "shaikh", "mirza", "khawaja", "sardar", "muhammad", "mohammad", "m",
]);

function greetingName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const first = parts.find((p) => !NAME_PREFIXES.has(p.toLowerCase().replace(/\.$/, "")));
  return first ?? parts[0] ?? "there";
}

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

export default async function PortalHome() {
  const user = await requireUser();
  const staff = isStaff(user);
  const firstName = greetingName(user.name);

  const [projects, updates, activity, breakdown, dueSoon, approvals, stats, pipeline] = await Promise.all([
    getProjects(user),
    getRecentUpdates(user, 6),
    getActivity(user, { limit: 8 }),
    getTaskBreakdown(user),
    getDueSoon(user, 6),
    getPendingApprovals(user),
    staff ? getStaffStats(user) : Promise.resolve(null),
    staff ? getClientPipeline() : Promise.resolve(null),
  ]);

  const activeProjects = projects.filter((p) => p.status !== "completed");
  const overall = projects.length ? Math.round(projects.reduce((s, p) => s + p.progress, 0) / projects.length) : 0;
  const totalTasks = breakdown.todo + breakdown.in_progress + breakdown.review + breakdown.done;
  const overdue = dueSoon.filter((t) => t.overdue).length;

  const donut = (
    <Donut
      segments={[
        { label: "To do", value: breakdown.todo, color: "#94a3b8" },
        { label: "In progress", value: breakdown.in_progress, color: "#066bf5" },
        { label: "In review", value: breakdown.review, color: "#f59e0b" },
        { label: "Done", value: breakdown.done, color: "#10b981" },
      ]}
      center={
        <div>
          <div className="font-heading text-2xl font-bold tabular-nums text-slate-900">{totalTasks}</div>
          <div className="text-[11px] font-medium text-slate-500">tasks</div>
        </div>
      }
    />
  );

  return (
    <>
      <GreetingBanner
        title={`${greeting()}, ${firstName}`}
        subtitle={
          staff
            ? `${activeProjects.length} active project${activeProjects.length === 1 ? "" : "s"}, ${stats?.open_tasks ?? 0} open tasks${
                overdue ? ` and ${overdue} overdue` : ""
              }. Here's what's moving today.`
            : "Here's the latest on your projects with Whizzly Lab: progress, deliverables waiting for you and recent updates."
        }
      >
        {!staff && projects.length > 0 && (
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
            <div className="rounded-full bg-white p-1">
              <ProgressRing value={overall} size={64} stroke={7} />
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-slate-400">Overall progress</div>
              <div className="mt-0.5 text-sm text-slate-200">
                {projects.length} project{projects.length === 1 ? "" : "s"}
              </div>
            </div>
          </div>
        )}
        {staff && (
          <Link
            href="/portal/clients"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-lg transition hover:-translate-y-px"
          >
            <Sparkles className="h-4 w-4 text-[#7c3aed]" /> New client or project
          </Link>
        )}
      </GreetingBanner>

      {/* Pending approvals: the one thing that needs attention */}
      {approvals.length > 0 && (
        <Card className="mb-8 border-amber-200 !bg-gradient-to-r from-amber-50 to-white">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Inbox className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-slate-900">
                {staff
                  ? `${approvals.length} deliverable${approvals.length === 1 ? "" : "s"} waiting on client approval`
                  : `${approvals.length} deliverable${approvals.length === 1 ? " needs" : "s need"} your approval`}
              </div>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
                {approvals.slice(0, 4).map((a) => (
                  <Link key={a.id} href={`/portal/projects/${a.project_id}?tab=board`} className="inline-flex items-center gap-1 hover:text-slate-900">
                    {a.title}
                    <span className="text-slate-400">· {staff ? a.client_name : a.project_name}</span>
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href={`/portal/projects/${approvals[0].project_id}?tab=board`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-600"
            >
              {staff ? "View" : "Review now"} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Card>
      )}

      {stats && pipeline && (
        <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard icon={Users} label="Active clients" value={stats.active_clients} hint={`${stats.leads} lead${stats.leads === 1 ? "" : "s"} in pipeline`} tone="#7c3aed" href="/portal/clients" />
          <StatCard icon={FolderKanban} label="Active projects" value={stats.active_projects} hint={`${projects.length} total`} tone="#066bf5" href="/portal/projects" />
          <StatCard icon={ListChecks} label="Open tasks" value={stats.open_tasks} hint={`${stats.my_tasks} assigned to you`} tone="#0891b2" />
          <StatCard
            icon={overdue ? AlertTriangle : CheckCircle2}
            label="Overdue"
            value={overdue}
            hint={overdue ? "Needs attention" : "All on schedule"}
            tone={overdue ? "#dc2626" : "#10b981"}
          />
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-8 xl:col-span-2">
          <section>
            <SectionTitle
              action={
                projects.length > 0 && (
                  <Link href="/portal/projects" className="text-xs font-semibold text-[#066bf5] hover:underline">
                    View all
                  </Link>
                )
              }
            >
              {staff ? "Active projects" : "Your projects"}
            </SectionTitle>
            {projects.length === 0 ? (
              <Empty icon={FolderKanban} title="No projects yet">
                {staff ? (
                  <>
                    <Link href="/portal/clients" className="font-semibold text-[#066bf5]">
                      Add a client
                    </Link>{" "}
                    to start your first project.
                  </>
                ) : (
                  "Your Whizzly Lab team will share projects here as soon as work begins."
                )}
              </Empty>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {(activeProjects.length ? activeProjects : projects).slice(0, 6).map((p) => (
                  <ProjectCard key={p.id} p={p} showClient={staff} />
                ))}
              </div>
            )}
          </section>

          <section>
            <SectionTitle>Latest updates</SectionTitle>
            {updates.length === 0 ? (
              <Empty icon={Megaphone} title="No updates yet">
                Progress updates, milestones and deliveries will appear here.
              </Empty>
            ) : (
              <Card className="divide-y divide-slate-100 !p-0">
                {updates.map((u) => (
                  <Link key={u.id} href={`/portal/projects/${u.project_id}?tab=updates`} className="flex items-center gap-4 px-5 py-4 transition hover:bg-slate-50/80">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#066bf5]/10 text-[#066bf5]">
                      <Megaphone className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-semibold text-slate-900">{u.title}</span>
                        {u.kind !== "update" && <Badge value={u.kind} />}
                      </div>
                      <div className="mt-0.5 truncate text-xs text-slate-500">
                        {u.project_name} · {u.author_name ?? "Whizzly Lab"} · {timeAgo(u.created_at)}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-slate-300" />
                  </Link>
                ))}
              </Card>
            )}
          </section>
        </div>

        <aside className="space-y-8">
          <section>
            <SectionTitle>Task overview</SectionTitle>
            <Card>{totalTasks === 0 ? <p className="text-sm text-slate-500">No tasks yet.</p> : donut}</Card>
          </section>

          {staff && pipeline && (
            <section>
              <SectionTitle
                action={
                  <Link href="/portal/clients?view=board" className="text-xs font-semibold text-[#066bf5] hover:underline">
                    Pipeline
                  </Link>
                }
              >
                Client pipeline
              </SectionTitle>
              <Card className="space-y-3">
                {(["lead", "active", "paused", "closed"] as const).map((s) => {
                  const total = Math.max(1, pipeline.lead + pipeline.active + pipeline.paused + pipeline.closed);
                  const color = { lead: "#f59e0b", active: "#10b981", paused: "#94a3b8", closed: "#cbd5e1" }[s];
                  return (
                    <Link key={s} href={`/portal/clients?status=${s}`} className="block">
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="font-medium capitalize text-slate-600">{s === "lead" ? "Leads" : s}</span>
                        <span className="font-semibold tabular-nums text-slate-900">{pipeline[s]}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full" style={{ width: `${(pipeline[s] / total) * 100}%`, background: color }} />
                      </div>
                    </Link>
                  );
                })}
                <div className="flex items-center gap-1.5 pt-1 text-[11px] text-slate-400">
                  <TrendingUp className="h-3.5 w-3.5" />{" "}
                  {pipeline.lead} lead{pipeline.lead === 1 ? "" : "s"} waiting to convert
                </div>
              </Card>
            </section>
          )}

          <section>
            <SectionTitle>Due soon</SectionTitle>
            {dueSoon.length === 0 ? (
              <Empty icon={CheckCircle2} title="Nothing due this week" />
            ) : (
              <Card className="divide-y divide-slate-100 !p-0">
                {dueSoon.map((t) => (
                  <Link key={t.id} href={`/portal/projects/${t.project_id}?tab=board`} className="block px-4 py-3 transition hover:bg-slate-50/80">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-medium text-slate-900">{t.title}</span>
                      <DueChip date={t.due_date} />
                    </div>
                    <div className="mt-0.5 truncate text-xs text-slate-500">
                      {t.project_name}
                      {staff && t.assignee_name ? ` · ${t.assignee_name}` : ""}
                    </div>
                  </Link>
                ))}
              </Card>
            )}
          </section>

          <section>
            <SectionTitle>Recent activity</SectionTitle>
            {activity.length === 0 ? (
              <Empty icon={ActivityIcon} title="No activity yet" />
            ) : (
              <Card>
                <ActivityFeed items={activity} />
              </Card>
            )}
          </section>
        </aside>
      </div>
    </>
  );
}
