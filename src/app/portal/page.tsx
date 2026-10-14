import Link from "next/link";
import { requireUser, isStaff } from "@/lib/portal/auth";
import { getMyOpenTasks, getProjects, getRecentUpdates, getStaffStats } from "@/lib/portal/data";
import { Badge, Card, Empty, fmtDate, fmtDateTime, PageHeader, ProgressBar } from "@/components/portal/ui";

export default async function PortalHome() {
  const user = await requireUser();
  const staff = isStaff(user);
  const [projects, updates, stats, myTasks] = await Promise.all([
    getProjects(user),
    getRecentUpdates(user, 8),
    staff ? getStaffStats(user) : Promise.resolve(null),
    staff ? getMyOpenTasks(user) : Promise.resolve([]),
  ]);

  return (
    <>
      <PageHeader
        title={staff ? "Dashboard" : "Your projects"}
        subtitle={staff ? `Welcome back, ${user.name.split(" ")[0]}.` : "Track progress, tasks and updates from the Whizzly Lab team."}
      />

      {stats && (
        <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-5">
          {[
            ["Leads", stats.leads],
            ["Active clients", stats.active_clients],
            ["Active projects", stats.active_projects],
            ["Open tasks", stats.open_tasks],
            ["My open tasks", stats.my_tasks],
          ].map(([k, v]) => (
            <Card key={k as string} className="!p-4">
              <div className="text-2xl font-bold text-slate-900">{v}</div>
              <div className="text-xs text-slate-500">{k}</div>
            </Card>
          ))}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Projects</h2>
          {projects.length === 0 ? (
            <Empty>
              {staff ? (
                <>
                  No projects yet. <Link href="/portal/clients" className="font-medium text-[#066bf5]">Add a client</Link> to create one.
                </>
              ) : (
                "No projects have been shared with you yet."
              )}
            </Empty>
          ) : (
            <div className="space-y-3">
              {projects.map((p) => (
                <Link key={p.id} href={`/portal/projects/${p.id}`} className="block">
                  <Card className="transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="font-semibold text-slate-900">{p.name}</div>
                        {staff && (
                          <div className="text-xs text-slate-500">
                            {p.client_name}
                            {p.client_company ? ` · ${p.client_company}` : ""}
                          </div>
                        )}
                      </div>
                      <Badge value={p.status} />
                    </div>
                    <div className="mt-3">
                      <ProgressBar value={p.progress} />
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-slate-500">
                      <span>
                        {p.task_done}/{p.task_total} tasks done
                      </span>
                      {p.due_date && <span>Due {fmtDate(p.due_date)}</span>}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>

        <aside className="space-y-6">
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Latest updates</h2>
            {updates.length === 0 ? (
              <Empty>No updates yet.</Empty>
            ) : (
              <Card className="divide-y divide-slate-100 !p-0">
                {updates.map((u) => (
                  <Link key={u.id} href={`/portal/projects/${u.project_id}`} className="block px-4 py-3 hover:bg-slate-50">
                    <div className="flex items-center gap-2">
                      <Badge value={u.kind} />
                      <span className="truncate text-sm font-medium text-slate-900">{u.title}</span>
                    </div>
                    <div className="mt-0.5 text-xs text-slate-500">
                      {u.project_name} · {u.author_name ?? "Team"} · {fmtDateTime(u.created_at)}
                    </div>
                  </Link>
                ))}
              </Card>
            )}
          </section>

          {staff && (
            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">My open tasks</h2>
              {myTasks.length === 0 ? (
                <Empty>Nothing assigned to you.</Empty>
              ) : (
                <Card className="divide-y divide-slate-100 !p-0">
                  {myTasks.map((t) => (
                    <Link key={t.id} href={`/portal/projects/${t.project_id}`} className="block px-4 py-3 hover:bg-slate-50">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-medium text-slate-900">{t.title}</span>
                        <Badge value={t.priority} />
                      </div>
                      <div className="mt-0.5 text-xs text-slate-500">
                        {t.project_name}
                        {t.due_date ? ` · due ${fmtDate(t.due_date)}` : ""}
                      </div>
                    </Link>
                  ))}
                </Card>
              )}
            </section>
          )}
        </aside>
      </div>
    </>
  );
}
