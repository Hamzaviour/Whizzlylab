import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Code2,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Flag,
  Globe,
  Inbox,
  Link2,
  ListChecks,
  Megaphone,
  MessageSquare,
  Package,
  PenTool,
  Plus,
  Rocket,
  RotateCcw,
  Send,
  ThumbsUp,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import { requireUser, isStaff } from "@/lib/portal/auth";
import {
  getActivity,
  getComments,
  getLinks,
  getProject,
  getProjectTeam,
  getStaffUsers,
  getTasks,
  getUpdates,
} from "@/lib/portal/data";
import type { Comment, LinkKind, PortalUser, Task, TaskStatus } from "@/lib/portal/db";
import {
  addCommentAction,
  addLinkAction,
  createTaskAction,
  deleteLinkAction,
  deleteProjectAction,
  deleteTaskAction,
  deleteUpdateAction,
  editTaskAction,
  postUpdateAction,
  requestApprovalAction,
  respondApprovalAction,
  setTaskStatusAction,
  toggleTaskVisibilityAction,
  updateProjectAction,
} from "@/lib/portal/actions";
import { ActivityFeed, DueChip } from "@/components/portal/blocks";
import {
  Avatar,
  Badge,
  btnDanger,
  btnGhost,
  btnPrimary,
  btnSecondary,
  Card,
  daysUntil,
  Disclosure,
  Empty,
  Field,
  Flash,
  fmtDate,
  fmtDateTime,
  inputCls,
  label,
  ProgressRing,
  SectionTitle,
  Tabs,
  timeAgo,
} from "@/components/portal/ui";

const COLUMNS: { status: TaskStatus; title: string; color: string }[] = [
  { status: "todo", title: "To do", color: "#94a3b8" },
  { status: "in_progress", title: "In progress", color: "#066bf5" },
  { status: "review", title: "In review", color: "#f59e0b" },
  { status: "done", title: "Done", color: "#10b981" },
];

const LINK_META: Record<LinkKind, { icon: LucideIcon; label: string; color: string }> = {
  staging: { icon: Rocket, label: "Staging", color: "#7c3aed" },
  production: { icon: Globe, label: "Live site", color: "#10b981" },
  repo: { icon: Code2, label: "Repository", color: "#0f172a" },
  design: { icon: PenTool, label: "Design", color: "#db2777" },
  document: { icon: FileText, label: "Document", color: "#066bf5" },
  other: { icon: Link2, label: "Link", color: "#64748b" },
};

type TabKey = "overview" | "board" | "updates" | "discussion" | "files" | "activity" | "settings";

/** Hidden fields every project form carries so actions can redirect back to the same tab. */
function Ctx({ projectId, tab }: { projectId: string; tab: TabKey }) {
  return (
    <>
      <input type="hidden" name="project_id" value={projectId} />
      <input type="hidden" name="tab" value={tab} />
    </>
  );
}

// ── Comments ────────────────────────────────────────────────────────────────
function CommentThread({ comments }: { comments: Comment[] }) {
  if (comments.length === 0) return null;
  return (
    <ul className="space-y-3">
      {comments.map((c) => {
        const fromClient = c.author_role === "client";
        return (
          <li key={c.id} className="flex gap-3">
            <Avatar name={c.author_name} size={30} />
            <div className={`min-w-0 flex-1 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm ${c.internal ? "border border-amber-200 bg-amber-50" : fromClient ? "bg-cyan-50/70" : "bg-slate-50"}`}>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-semibold text-slate-900">{c.author_name ?? "Unknown"}</span>
                {fromClient ? <Badge value="client" text="Client" /> : <Badge value="team" text="Whizzly Lab" />}
                {c.internal && <Badge value="internal" text="Internal note" />}
                <span className="text-slate-400">{timeAgo(c.created_at)}</span>
              </div>
              <p className="mt-1 whitespace-pre-wrap text-slate-700">{c.body}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function CommentForm({ projectId, tab, updateId, staff, placeholder }: { projectId: string; tab: TabKey; updateId?: string; staff: boolean; placeholder?: string }) {
  return (
    <form action={addCommentAction} className="flex flex-col gap-2 sm:flex-row sm:items-start">
      <Ctx projectId={projectId} tab={tab} />
      {updateId && <input type="hidden" name="update_id" value={updateId} />}
      <textarea
        name="body"
        required
        maxLength={4000}
        rows={1}
        placeholder={placeholder ?? "Write a reply…"}
        aria-label="Comment"
        className={`${inputCls} min-h-[42px] flex-1 resize-y`}
      />
      <div className="flex items-center gap-3">
        {staff && (
          <label className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap text-xs text-slate-500">
            <input type="checkbox" name="internal" className="accent-amber-500" /> Internal
          </label>
        )}
        <button type="submit" className={btnSecondary}>
          <Send className="h-4 w-4" /> Send
        </button>
      </div>
    </form>
  );
}

// ── Task card ───────────────────────────────────────────────────────────────
function TaskCard({
  task,
  projectId,
  staff,
  team,
}: {
  task: Task;
  projectId: string;
  staff: boolean;
  team: { id: string; name: string }[];
}) {
  const pending = task.approval === "pending";
  return (
    <div
      className={`rounded-xl border bg-white p-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition hover:shadow-md ${
        pending ? "border-amber-300 ring-2 ring-amber-100" : "border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-semibold leading-snug text-slate-900">{task.title}</span>
        <Badge value={task.priority} />
      </div>
      {task.description && <p className="mt-1.5 line-clamp-3 whitespace-pre-wrap text-xs leading-relaxed text-slate-500">{task.description}</p>}

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {task.approval && <Badge value={task.approval} />}
        {task.due_date && <DueChip date={task.due_date} done={task.status === "done"} />}
        {staff && !task.client_visible && (
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-1.5 py-0.5 text-[11px] font-medium text-amber-800">
            <EyeOff className="h-3 w-3" /> Internal
          </span>
        )}
        {task.assignee_name && (
          <span className="ml-auto">
            <Avatar name={task.assignee_name} size={22} />
          </span>
        )}
      </div>

      {task.approval === "changes_requested" && task.approval_note && (
        <p className="mt-2 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs text-red-700">
          <span className="font-semibold">Client feedback:</span> {task.approval_note}
        </p>
      )}

      {/* Client approval controls */}
      {!staff && pending && (
        <div className="mt-3 space-y-2 border-t border-slate-100 pt-3">
          <form action={respondApprovalAction}>
            <Ctx projectId={projectId} tab="board" />
            <input type="hidden" name="id" value={task.id} />
            <input type="hidden" name="decision" value="approved" />
            <button type="submit" className="inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-600">
              <ThumbsUp className="h-3.5 w-3.5" /> Approve
            </button>
          </form>
          <Disclosure
            summary={
              <span className="inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                <RotateCcw className="h-3.5 w-3.5" /> Request changes
              </span>
            }
          >
            <form action={respondApprovalAction} className="space-y-2">
              <Ctx projectId={projectId} tab="board" />
              <input type="hidden" name="id" value={task.id} />
              <input type="hidden" name="decision" value="changes_requested" />
              <textarea name="note" required rows={3} placeholder="What should change?" aria-label="Requested changes" className={inputCls} />
              <button type="submit" className={`${btnPrimary} w-full !py-2 !text-xs`}>
                Send feedback
              </button>
            </form>
          </Disclosure>
        </div>
      )}

      {/* Staff controls */}
      {staff && (
        <Disclosure
          className="mt-3 border-t border-slate-100 pt-2"
          summary={<span className="cursor-pointer text-[11px] font-semibold text-slate-400 hover:text-slate-700">Manage ▾</span>}
        >
          <div className="space-y-3">
            <div className="flex flex-wrap gap-1">
              {COLUMNS.filter((c) => c.status !== task.status).map((c) => (
                <form key={c.status} action={setTaskStatusAction}>
                  <Ctx projectId={projectId} tab="board" />
                  <input type="hidden" name="id" value={task.id} />
                  <input type="hidden" name="status" value={c.status} />
                  <button type="submit" className={btnGhost} title={`Move to ${c.title}`}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.color }} /> {c.title}
                  </button>
                </form>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {!pending && (
                <form action={requestApprovalAction}>
                  <Ctx projectId={projectId} tab="board" />
                  <input type="hidden" name="id" value={task.id} />
                  <button type="submit" className={btnGhost}>
                    <Inbox className="h-3 w-3" /> Request approval
                  </button>
                </form>
              )}
              <form action={toggleTaskVisibilityAction}>
                <Ctx projectId={projectId} tab="board" />
                <input type="hidden" name="id" value={task.id} />
                <button type="submit" className={btnGhost}>
                  {task.client_visible ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  {task.client_visible ? "Hide from client" : "Show to client"}
                </button>
              </form>
              <form action={deleteTaskAction}>
                <Ctx projectId={projectId} tab="board" />
                <input type="hidden" name="id" value={task.id} />
                <button type="submit" className={btnDanger}>
                  <Trash2 className="h-3 w-3" /> Delete
                </button>
              </form>
            </div>
            <form action={editTaskAction} className="space-y-2 rounded-xl bg-slate-50 p-2.5">
              <Ctx projectId={projectId} tab="board" />
              <input type="hidden" name="id" value={task.id} />
              <input name="title" required defaultValue={task.title} aria-label="Title" className={`${inputCls} !py-1.5`} />
              <textarea name="description" rows={2} defaultValue={task.description ?? ""} aria-label="Description" placeholder="Description" className={`${inputCls} !py-1.5`} />
              <div className="grid grid-cols-2 gap-2">
                <select name="priority" defaultValue={task.priority} aria-label="Priority" className={`${inputCls} !py-1.5`}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <input name="due_date" type="date" defaultValue={task.due_date ?? ""} aria-label="Due date" className={`${inputCls} !py-1.5`} />
              </div>
              <select name="assignee_id" defaultValue={task.assignee_id ?? ""} aria-label="Assignee" className={`${inputCls} !py-1.5`}>
                <option value="">Unassigned</option>
                {team.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
              <label className="flex items-center gap-1.5 text-xs text-slate-600">
                <input type="checkbox" name="client_visible" defaultChecked={task.client_visible} /> Visible to client
              </label>
              <button type="submit" className={`${btnPrimary} w-full !py-1.5 !text-xs`}>
                Save task
              </button>
            </form>
          </div>
        </Disclosure>
      )}
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; ok?: string; tab?: string }>;
}) {
  const user = await requireUser();
  const staff = isStaff(user);
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  const project = await getProject(user, id);
  if (!project) notFound();

  const allowedTabs: TabKey[] = ["overview", "board", "updates", "discussion", "files", "activity", ...(staff ? (["settings"] as TabKey[]) : [])];
  const tab: TabKey = (allowedTabs as string[]).includes(sp.tab ?? "") ? (sp.tab as TabKey) : "overview";

  const [tasks, updates, comments, links, activity, staffUsers, projectTeam] = await Promise.all([
    getTasks(user, id),
    getUpdates(user, id),
    getComments(user, id),
    getLinks(user, id),
    getActivity(user, { projectId: id, limit: tab === "activity" ? 60 : 8 }),
    staff ? getStaffUsers() : Promise.resolve([]),
    getProjectTeam(id),
  ]);

  const generalComments = comments.filter((c) => !c.update_id);
  const pendingApprovals = tasks.filter((t) => t.approval === "pending");
  const daysLeft = daysUntil(project.due_date);
  const href = (t: TabKey) => `/portal/projects/${id}?tab=${t}`;

  const tabs = [
    { key: "overview", label: "Overview", href: href("overview") },
    { key: "board", label: "Tasks", href: href("board"), count: tasks.filter((t) => t.status !== "done").length },
    { key: "updates", label: "Updates", href: href("updates"), count: updates.length },
    { key: "discussion", label: "Discussion", href: href("discussion"), count: generalComments.length },
    { key: "files", label: "Files & links", href: href("files"), count: links.length },
    { key: "activity", label: "Activity", href: href("activity") },
    ...(staff ? [{ key: "settings", label: "Settings", href: href("settings") }] : []),
  ];

  return (
    <>
      <Link
        href={staff ? `/portal/clients/${project.client_id}` : "/portal/projects"}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" /> {staff ? project.client_name : "My projects"}
      </Link>

      {/* Project hero */}
      <Card className="relative mb-6 overflow-hidden !p-0">
        <div aria-hidden className="h-1.5 bg-gradient-to-r from-[#7c3aed] via-[#066bf5] to-[#00d4f8]" />
        <div className="flex flex-wrap items-center gap-6 p-6">
          <ProgressRing value={project.progress} size={92} stroke={8} label="complete" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-[26px]">{project.name}</h1>
              <Badge value={project.status} />
            </div>
            {staff && (
              <p className="mt-1 text-sm text-slate-500">
                {project.client_name}
                {project.client_company ? ` · ${project.client_company}` : ""}
              </p>
            )}
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <ListChecks className="h-3.5 w-3.5" /> {project.task_done}/{project.task_total} tasks done
              </span>
              {project.start_date && (
                <span className="inline-flex items-center gap-1.5">
                  <Flag className="h-3.5 w-3.5" /> Started {fmtDate(project.start_date)}
                </span>
              )}
              {project.due_date && (
                <span className={`inline-flex items-center gap-1.5 ${daysLeft !== null && daysLeft < 0 && project.status !== "completed" ? "font-semibold text-red-600" : ""}`}>
                  <Clock className="h-3.5 w-3.5" /> Due {fmtDate(project.due_date)}
                  {project.status !== "completed" && daysLeft !== null && ` (${daysLeft < 0 ? `${-daysLeft}d overdue` : `${daysLeft}d left`})`}
                </span>
              )}
            </div>
          </div>
          {projectTeam.length > 0 && (
            <div className="flex -space-x-2" aria-label="Project team">
              {projectTeam.slice(0, 5).map((m) => (
                <Avatar key={m.id} name={m.name} size={34} ring />
              ))}
            </div>
          )}
        </div>
      </Card>

      <Tabs tabs={tabs} active={tab} />
      <Flash error={sp.error} ok={sp.ok} />

      {/* ── Overview ── */}
      {tab === "overview" && (
        <div className="grid gap-6 xl:grid-cols-3">
          <div className="space-y-6 xl:col-span-2">
            {!staff && pendingApprovals.length > 0 && (
              <Card className="border-amber-200 !bg-gradient-to-r from-amber-50 to-white">
                <div className="flex flex-wrap items-center gap-4">
                  <Inbox className="h-5 w-5 text-amber-600" />
                  <div className="flex-1 text-sm">
                    <span className="font-semibold text-slate-900">
                      {pendingApprovals.length} deliverable{pendingApprovals.length === 1 ? "" : "s"} waiting for your approval
                    </span>
                    <span className="text-slate-500"> · {pendingApprovals.map((t) => t.title).join(", ")}</span>
                  </div>
                  <Link href={href("board")} className="rounded-xl bg-amber-500 px-3.5 py-2 text-sm font-semibold text-white hover:bg-amber-600">
                    Review
                  </Link>
                </div>
              </Card>
            )}

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                { label: "Completed", value: tasks.filter((t) => t.status === "done").length, color: "#10b981", icon: CheckCircle2 },
                { label: "In progress", value: tasks.filter((t) => t.status === "in_progress").length, color: "#066bf5", icon: Rocket },
                { label: "In review", value: tasks.filter((t) => t.status === "review").length, color: "#f59e0b", icon: Eye },
                { label: "Updates", value: updates.length, color: "#7c3aed", icon: Megaphone },
              ].map((s) => (
                <Card key={s.label} className="!p-4">
                  <s.icon className="h-4 w-4" style={{ color: s.color }} />
                  <div className="mt-2 font-heading text-2xl font-bold tabular-nums text-slate-900">{s.value}</div>
                  <div className="text-xs text-slate-500">{s.label}</div>
                </Card>
              ))}
            </div>

            {project.description && (
              <section>
                <SectionTitle>About this project</SectionTitle>
                <Card>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{project.description}</p>
                </Card>
              </section>
            )}

            <section>
              <SectionTitle>Milestones & deliveries</SectionTitle>
              {updates.filter((u) => u.kind !== "update").length === 0 ? (
                <Empty icon={Flag} title="No milestones yet">
                  Milestones and deliveries posted by the team show up here as a timeline.
                </Empty>
              ) : (
                <Card>
                  <ol className="relative space-y-5 border-l-2 border-dashed border-slate-200 pl-6">
                    {updates
                      .filter((u) => u.kind !== "update")
                      .map((u) => (
                        <li key={u.id} className="relative">
                          <span
                            className={`absolute -left-[33px] top-0.5 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-white ${
                              u.kind === "delivery" ? "bg-emerald-500" : "bg-[#7c3aed]"
                            } text-white`}
                          >
                            {u.kind === "delivery" ? <Package className="h-3 w-3" /> : <Flag className="h-3 w-3" />}
                          </span>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-semibold text-slate-900">{u.title}</span>
                            <Badge value={u.kind} />
                          </div>
                          <p className="mt-0.5 text-xs text-slate-500">{fmtDate(u.created_at)}</p>
                        </li>
                      ))}
                  </ol>
                </Card>
              )}
            </section>

            {updates[0] && (
              <section>
                <SectionTitle action={<Link href={href("updates")} className="text-xs font-semibold text-[#066bf5] hover:underline">All updates</Link>}>
                  Latest update
                </SectionTitle>
                <Card>
                  <div className="flex items-center gap-2">
                    <Badge value={updates[0].kind} />
                    <h3 className="font-semibold text-slate-900">{updates[0].title}</h3>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {updates[0].author_name ?? "Whizzly Lab"} · {fmtDateTime(updates[0].created_at)}
                  </p>
                  <p className="mt-3 line-clamp-5 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{updates[0].body}</p>
                </Card>
              </section>
            )}
          </div>

          <aside className="space-y-6">
            <section>
              <SectionTitle action={<Link href={href("files")} className="text-xs font-semibold text-[#066bf5] hover:underline">Manage</Link>}>
                Quick links
              </SectionTitle>
              {links.length === 0 ? (
                <Empty icon={Link2} title="No links yet" />
              ) : (
                <Card className="space-y-1 !p-2">
                  {links.slice(0, 6).map((l) => {
                    const meta = LINK_META[l.kind];
                    return (
                      <a key={l.id} href={l.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-50">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${meta.color}12`, color: meta.color }}>
                          <meta.icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-slate-900">{l.title}</span>
                          <span className="block text-[11px] text-slate-400">{meta.label}</span>
                        </span>
                        <ExternalLink className="h-3.5 w-3.5 text-slate-300" />
                      </a>
                    );
                  })}
                </Card>
              )}
            </section>
            <section>
              <SectionTitle>Recent activity</SectionTitle>
              {activity.length === 0 ? (
                <Empty title="No activity yet" />
              ) : (
                <Card>
                  <ActivityFeed items={activity} showProject={false} />
                </Card>
              )}
            </section>
          </aside>
        </div>
      )}

      {/* ── Board ── */}
      {tab === "board" && (
        <>
          {staff && (
            <Disclosure
              className="mb-5"
              summary={
                <span className={`${btnPrimary} cursor-pointer`}>
                  <Plus className="h-4 w-4" /> Add task
                </span>
              }
            >
              <Card>
                <form action={createTaskAction} className="grid gap-3 sm:grid-cols-4">
                  <Ctx projectId={project.id} tab="board" />
                  <div className="sm:col-span-4">
                    <Field name="t_title" label="Title *">
                      <input id="t_title" name="title" required maxLength={200} className={inputCls} placeholder="e.g. Build checkout flow" />
                    </Field>
                  </div>
                  <div className="sm:col-span-4">
                    <Field name="t_desc" label="Description">
                      <textarea id="t_desc" name="description" rows={2} className={inputCls} />
                    </Field>
                  </div>
                  <Field name="t_status" label="Column">
                    <select id="t_status" name="status" className={inputCls} defaultValue="todo">
                      {COLUMNS.map((c) => (
                        <option key={c.status} value={c.status}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field name="t_prio" label="Priority">
                    <select id="t_prio" name="priority" className={inputCls} defaultValue="medium">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </Field>
                  <Field name="t_assignee" label="Assignee">
                    <select id="t_assignee" name="assignee_id" className={inputCls} defaultValue={user.id}>
                      {staffUsers.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field name="t_due" label="Due date">
                    <input id="t_due" name="due_date" type="date" className={inputCls} />
                  </Field>
                  <label className="flex items-center gap-2 text-sm text-slate-700 sm:col-span-3">
                    <input type="checkbox" name="client_visible" defaultChecked /> Visible to the client
                  </label>
                  <div className="sm:col-span-1 sm:text-right">
                    <button type="submit" className={btnPrimary}>
                      Add task
                    </button>
                  </div>
                </form>
              </Card>
            </Disclosure>
          )}

          {tasks.length === 0 ? (
            <Empty icon={ListChecks} title="No tasks yet">
              {staff ? "Add the first task to start planning this project." : "The team hasn't shared any tasks yet."}
            </Empty>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {COLUMNS.map((col) => {
                const items = tasks.filter((t) => t.status === col.status);
                return (
                  <div key={col.status} className="flex flex-col rounded-2xl border border-slate-200/70 bg-slate-100/60 p-3">
                    <div className="mb-3 flex items-center gap-2 px-1">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: col.color }} />
                      <span className="text-sm font-semibold text-slate-700">{col.title}</span>
                      <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-500 shadow-sm">{items.length}</span>
                    </div>
                    <div className="space-y-2.5">
                      {items.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-slate-300 px-3 py-6 text-center text-xs text-slate-400">Nothing here</div>
                      ) : (
                        items.map((t) => <TaskCard key={t.id} task={t} projectId={project.id} staff={staff} team={staffUsers} />)
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* ── Updates ── */}
      {tab === "updates" && (
        <div className="mx-auto max-w-3xl">
          {staff && (
            <Disclosure
              className="mb-6"
              summary={
                <span className={`${btnPrimary} cursor-pointer`}>
                  <Megaphone className="h-4 w-4" /> Post an update
                </span>
              }
            >
              <Card>
                <form action={postUpdateAction} className="grid gap-3 sm:grid-cols-3">
                  <Ctx projectId={project.id} tab="updates" />
                  <div className="sm:col-span-2">
                    <Field name="u_title" label="Title *">
                      <input id="u_title" name="title" required maxLength={200} className={inputCls} placeholder="e.g. Staging build is live" />
                    </Field>
                  </div>
                  <Field name="u_kind" label="Type">
                    <select id="u_kind" name="kind" className={inputCls} defaultValue="update">
                      <option value="update">Progress update</option>
                      <option value="milestone">Milestone</option>
                      <option value="delivery">Delivery</option>
                    </select>
                  </Field>
                  <div className="sm:col-span-3">
                    <Field name="u_body" label="Details *">
                      <textarea id="u_body" name="body" required rows={5} maxLength={8000} className={inputCls} placeholder="What was done, what's next, anything you need from the client…" />
                    </Field>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-700 sm:col-span-3">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" name="client_visible" defaultChecked /> Visible to the client
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" name="notify" defaultChecked /> Email the client
                    </label>
                  </div>
                  <div className="sm:col-span-3">
                    <button type="submit" className={btnPrimary}>
                      <Send className="h-4 w-4" /> Publish update
                    </button>
                  </div>
                </form>
              </Card>
            </Disclosure>
          )}

          {updates.length === 0 ? (
            <Empty icon={Megaphone} title="No updates yet">
              {staff ? "Post the first progress update for your client." : "Your team's progress updates will appear here."}
            </Empty>
          ) : (
            <div className="space-y-5">
              {updates.map((u) => (
                <Card key={u.id} className="!p-0">
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <Avatar name={u.author_name ?? "Whizzly Lab"} size={38} />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-heading text-base font-semibold text-slate-900">{u.title}</h3>
                          <Badge value={u.kind} />
                          {staff && !u.client_visible && <Badge value="internal" text="Internal" />}
                        </div>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {u.author_name ?? "Whizzly Lab"} · {fmtDateTime(u.created_at)}
                        </p>
                      </div>
                      {staff && (
                        <form action={deleteUpdateAction}>
                          <Ctx projectId={project.id} tab="updates" />
                          <input type="hidden" name="id" value={u.id} />
                          <button type="submit" className="cursor-pointer rounded-lg p-1.5 text-slate-300 hover:bg-red-50 hover:text-red-600" aria-label="Delete update">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </form>
                      )}
                    </div>
                    <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{u.body}</p>
                  </div>
                  <div className="space-y-4 rounded-b-2xl border-t border-slate-100 bg-slate-50/60 p-5">
                    <CommentThread comments={comments.filter((c) => c.update_id === u.id)} />
                    <CommentForm projectId={project.id} tab="updates" updateId={u.id} staff={staff} />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Discussion ── */}
      {tab === "discussion" && (
        <div className="mx-auto max-w-3xl">
          <Card>
            <div className="mb-5 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-[#066bf5]" />
              <h2 className="font-semibold text-slate-900">Project discussion</h2>
              <span className="text-xs text-slate-400">Questions, feedback and decisions</span>
            </div>
            {generalComments.length === 0 ? (
              <p className="mb-5 text-sm text-slate-500">No messages yet. Start the conversation below.</p>
            ) : (
              <div className="mb-5">
                <CommentThread comments={generalComments} />
              </div>
            )}
            <CommentForm projectId={project.id} tab="discussion" staff={staff} placeholder={staff ? "Message the client or leave an internal note…" : "Ask a question or share feedback with the team…"} />
          </Card>
        </div>
      )}

      {/* ── Files & links ── */}
      {tab === "files" && (
        <>
          {staff && (
            <Disclosure
              className="mb-5"
              summary={
                <span className={`${btnPrimary} cursor-pointer`}>
                  <Plus className="h-4 w-4" /> Add link
                </span>
              }
            >
              <Card>
                <form action={addLinkAction} className="grid gap-3 sm:grid-cols-4">
                  <Ctx projectId={project.id} tab="files" />
                  <Field name="l_title" label="Title *">
                    <input id="l_title" name="title" required maxLength={160} className={inputCls} placeholder="Staging site" />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field name="l_url" label="URL *">
                      <input id="l_url" name="url" type="url" required className={inputCls} placeholder="https://" />
                    </Field>
                  </div>
                  <Field name="l_kind" label="Type">
                    <select id="l_kind" name="kind" className={inputCls} defaultValue="staging">
                      {(Object.keys(LINK_META) as LinkKind[]).map((k) => (
                        <option key={k} value={k}>
                          {LINK_META[k].label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <label className="flex items-center gap-2 text-sm text-slate-700 sm:col-span-3">
                    <input type="checkbox" name="client_visible" defaultChecked /> Visible to the client
                  </label>
                  <div className="sm:text-right">
                    <button type="submit" className={btnPrimary}>
                      Add link
                    </button>
                  </div>
                </form>
              </Card>
            </Disclosure>
          )}
          {links.length === 0 ? (
            <Empty icon={Link2} title="No files or links yet">
              Staging sites, designs, repositories and documents shared for this project live here.
            </Empty>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {links.map((l) => {
                const meta = LINK_META[l.kind];
                let host = "";
                try {
                  host = new URL(l.url).hostname;
                } catch {
                  host = l.url;
                }
                return (
                  <Card key={l.id} className="group !p-4 transition hover:shadow-md">
                    <div className="flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: `${meta.color}12`, color: meta.color }}>
                        <meta.icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <a href={l.url} target="_blank" rel="noopener noreferrer" className="block truncate font-semibold text-slate-900 hover:text-[#066bf5]">
                          {l.title}
                        </a>
                        <p className="truncate text-xs text-slate-500">{host}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-600">{meta.label}</span>
                          {staff && !l.client_visible && <Badge value="internal" text="Internal" />}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <a href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-[#066bf5]">
                        Open <ExternalLink className="h-3 w-3" />
                      </a>
                      {staff && (
                        <form action={deleteLinkAction}>
                          <Ctx projectId={project.id} tab="files" />
                          <input type="hidden" name="id" value={l.id} />
                          <button type="submit" className="cursor-pointer text-xs text-slate-400 hover:text-red-600">
                            Remove
                          </button>
                        </form>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* ── Activity ── */}
      {tab === "activity" && (
        <div className="mx-auto max-w-3xl">
          {activity.length === 0 ? (
            <Empty title="No activity yet" />
          ) : (
            <Card>
              <ActivityFeed items={activity} showProject={false} />
            </Card>
          )}
        </div>
      )}

      {/* ── Settings (staff) ── */}
      {tab === "settings" && staff && <ProjectSettings project={project} user={user} />}
    </>
  );
}

function ProjectSettings({
  project,
  user,
}: {
  project: NonNullable<Awaited<ReturnType<typeof getProject>>>;
  user: PortalUser;
}) {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card>
        <h2 className="mb-4 font-semibold text-slate-900">Project details</h2>
        <form action={updateProjectAction} className="grid gap-4 sm:grid-cols-4">
          <input type="hidden" name="id" value={project.id} />
          <input type="hidden" name="tab" value="settings" />
          <div className="sm:col-span-2">
            <Field name="s_name" label="Name *">
              <input id="s_name" name="name" required defaultValue={project.name} className={inputCls} />
            </Field>
          </div>
          <Field name="s_status" label="Status">
            <select id="s_status" name="status" defaultValue={project.status} className={inputCls}>
              {["planning", "in_progress", "review", "completed", "on_hold"].map((s) => (
                <option key={s} value={s}>
                  {label(s)}
                </option>
              ))}
            </select>
          </Field>
          <Field name="s_progress" label="Progress %" hint="Auto-updates from tasks">
            <input id="s_progress" name="progress" type="number" min={0} max={100} defaultValue={project.progress} className={inputCls} />
          </Field>
          <div className="sm:col-span-4">
            <Field name="s_desc" label="Description (visible to client)">
              <textarea id="s_desc" name="description" rows={4} defaultValue={project.description ?? ""} className={inputCls} />
            </Field>
          </div>
          <Field name="s_start" label="Start date">
            <input id="s_start" name="start_date" type="date" defaultValue={project.start_date ?? ""} className={inputCls} />
          </Field>
          <Field name="s_due" label="Due date">
            <input id="s_due" name="due_date" type="date" defaultValue={project.due_date ?? ""} className={inputCls} />
          </Field>
          <div className="flex items-end justify-end sm:col-span-2">
            <button type="submit" className={btnPrimary}>
              Save changes
            </button>
          </div>
        </form>
      </Card>

      {user.role === "admin" && (
        <Card className="border-red-200">
          <h2 className="font-semibold text-red-700">Danger zone</h2>
          <p className="mt-1 text-sm text-slate-500">Permanently delete this project with all its tasks, updates, comments and links. This cannot be undone.</p>
          <Disclosure
            className="mt-4"
            summary={<span className={`${btnDanger} cursor-pointer`}>Delete project…</span>}
          >
            <form action={deleteProjectAction}>
              <input type="hidden" name="id" value={project.id} />
              <input type="hidden" name="client_id" value={project.client_id} />
              <button type="submit" className="cursor-pointer rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700">
                Yes, permanently delete &ldquo;{project.name}&rdquo;
              </button>
            </form>
          </Disclosure>
        </Card>
      )}
    </div>
  );
}
