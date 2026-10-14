import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser, isStaff } from "@/lib/portal/auth";
import { getComments, getProject, getStaffUsers, getTasks, getUpdates } from "@/lib/portal/data";
import type { Comment, Task, TaskStatus } from "@/lib/portal/db";
import {
  addCommentAction,
  createTaskAction,
  deleteProjectAction,
  deleteTaskAction,
  deleteUpdateAction,
  postUpdateAction,
  setTaskStatusAction,
  toggleTaskVisibilityAction,
  updateProjectAction,
} from "@/lib/portal/actions";
import {
  Badge,
  btnDanger,
  btnGhost,
  btnPrimary,
  Card,
  Empty,
  Field,
  Flash,
  fmtDate,
  fmtDateTime,
  inputCls,
  label,
  PageHeader,
  ProgressBar,
} from "@/components/portal/ui";

const COLUMNS: { status: TaskStatus; title: string }[] = [
  { status: "todo", title: "To do" },
  { status: "in_progress", title: "In progress" },
  { status: "review", title: "In review" },
  { status: "done", title: "Done" },
];

function CommentForm({ projectId, updateId, staff }: { projectId: string; updateId: string; staff: boolean }) {
  return (
    <form action={addCommentAction} className="mt-3 flex flex-wrap items-center gap-2">
      <input type="hidden" name="project_id" value={projectId} />
      <input type="hidden" name="update_id" value={updateId} />
      <input name="body" required maxLength={4000} placeholder="Write a comment..." aria-label="Comment" className={`${inputCls} flex-1 min-w-[180px]`} />
      {staff && (
        <label className="flex items-center gap-1.5 text-xs text-slate-500">
          <input type="checkbox" name="internal" /> Internal
        </label>
      )}
      <button type="submit" className={btnGhost}>
        Comment
      </button>
    </form>
  );
}

function CommentList({ comments }: { comments: Comment[] }) {
  if (comments.length === 0) return null;
  return (
    <ul className="mt-3 space-y-2 border-t border-slate-100 pt-3">
      {comments.map((c) => (
        <li key={c.id} className={`rounded-lg px-3 py-2 text-sm ${c.internal ? "bg-amber-50" : "bg-slate-50"}`}>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-medium text-slate-800">{c.author_name ?? "Unknown"}</span>
            {c.author_role === "client" && <Badge value="active" />}
            {c.internal && <span className="font-medium text-amber-700">Internal</span>}
            <span>{fmtDateTime(c.created_at)}</span>
          </div>
          <p className="mt-1 whitespace-pre-wrap text-slate-700">{c.body}</p>
        </li>
      ))}
    </ul>
  );
}

function TaskCard({ task, projectId, staff }: { task: Task; projectId: string; staff: boolean }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-medium text-slate-900">{task.title}</span>
        <Badge value={task.priority} />
      </div>
      {task.description && <p className="mt-1 whitespace-pre-wrap text-xs text-slate-500">{task.description}</p>}
      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500">
        {task.assignee_name && <span>{task.assignee_name}</span>}
        {task.due_date && <span>Due {fmtDate(task.due_date)}</span>}
        {staff && !task.client_visible && <span className="font-medium text-amber-700">Internal</span>}
      </div>
      {staff && (
        <div className="mt-2 flex flex-wrap gap-1">
          {COLUMNS.filter((c) => c.status !== task.status).map((c) => (
            <form key={c.status} action={setTaskStatusAction}>
              <input type="hidden" name="id" value={task.id} />
              <input type="hidden" name="project_id" value={projectId} />
              <input type="hidden" name="status" value={c.status} />
              <button type="submit" className={btnGhost} title={`Move to ${c.title}`}>
                → {c.title}
              </button>
            </form>
          ))}
          <form action={toggleTaskVisibilityAction}>
            <input type="hidden" name="id" value={task.id} />
            <input type="hidden" name="project_id" value={projectId} />
            <button type="submit" className={btnGhost}>
              {task.client_visible ? "Hide from client" : "Show to client"}
            </button>
          </form>
          <form action={deleteTaskAction}>
            <input type="hidden" name="id" value={task.id} />
            <input type="hidden" name="project_id" value={projectId} />
            <button type="submit" className={btnDanger}>
              Delete
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; ok?: string }>;
}) {
  const user = await requireUser();
  const staff = isStaff(user);
  const [{ id }, { error, ok }] = await Promise.all([params, searchParams]);
  const project = await getProject(user, id);
  if (!project) notFound();

  const [tasks, updates, comments, team] = await Promise.all([
    getTasks(user, id),
    getUpdates(user, id),
    getComments(user, id),
    staff ? getStaffUsers() : Promise.resolve([]),
  ]);

  return (
    <>
      <Link href={staff ? `/portal/clients/${project.client_id}` : "/portal"} className="mb-2 inline-block text-xs text-slate-500 hover:text-slate-800">
        ← {staff ? project.client_name : "My projects"}
      </Link>
      <PageHeader
        title={project.name}
        subtitle={staff ? `${project.client_name}${project.client_company ? ` · ${project.client_company}` : ""}` : undefined}
        actions={<Badge value={project.status} />}
      />
      <Flash error={error} ok={ok} />

      <Card className="mb-8">
        <ProgressBar value={project.progress} />
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-500">
          <span>
            {project.task_done}/{project.task_total} tasks done
          </span>
          {project.start_date && <span>Started {fmtDate(project.start_date)}</span>}
          {project.due_date && <span>Due {fmtDate(project.due_date)}</span>}
        </div>
        {project.description && <p className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{project.description}</p>}
      </Card>

      {/* ── Updates ─────────────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Updates</h2>

        {staff && (
          <details className="mb-4">
            <summary className={`${btnPrimary} list-none`}>+ Post an update</summary>
            <Card className="mt-3">
              <form action={postUpdateAction} className="grid gap-3 sm:grid-cols-3">
                <input type="hidden" name="project_id" value={project.id} />
                <div className="sm:col-span-2">
                  <Field name="u_title" label="Title *">
                    <input id="u_title" name="title" required maxLength={200} className={inputCls} placeholder="e.g. Staging build is live" />
                  </Field>
                </div>
                <Field name="u_kind" label="Type">
                  <select id="u_kind" name="kind" className={inputCls} defaultValue="update">
                    <option value="update">Update</option>
                    <option value="milestone">Milestone</option>
                    <option value="delivery">Delivery</option>
                  </select>
                </Field>
                <div className="sm:col-span-3">
                  <Field name="u_body" label="Details *">
                    <textarea id="u_body" name="body" required rows={4} maxLength={8000} className={inputCls} placeholder="What was done, what's next, anything you need from the client..." />
                  </Field>
                </div>
                <label className="flex items-center gap-2 text-sm text-slate-700 sm:col-span-3">
                  <input type="checkbox" name="client_visible" defaultChecked /> Visible to the client
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700 sm:col-span-3">
                  <input type="checkbox" name="notify" defaultChecked /> Email the client about this update
                </label>
                <div className="sm:col-span-3">
                  <button type="submit" className={btnPrimary}>
                    Post update
                  </button>
                </div>
              </form>
            </Card>
          </details>
        )}

        {updates.length === 0 ? (
          <Empty>No updates posted yet.</Empty>
        ) : (
          <div className="space-y-4">
            {updates.map((u) => (
              <Card key={u.id}>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge value={u.kind} />
                  <h3 className="font-semibold text-slate-900">{u.title}</h3>
                  {staff && !u.client_visible && <span className="text-xs font-medium text-amber-700">Internal</span>}
                </div>
                <div className="mt-0.5 text-xs text-slate-500">
                  {u.author_name ?? "Team"} · {fmtDateTime(u.created_at)}
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{u.body}</p>
                <CommentList comments={comments.filter((c) => c.update_id === u.id)} />
                <CommentForm projectId={project.id} updateId={u.id} staff={staff} />
                {staff && (
                  <form action={deleteUpdateAction} className="mt-3">
                    <input type="hidden" name="id" value={u.id} />
                    <input type="hidden" name="project_id" value={project.id} />
                    <button type="submit" className={btnDanger}>
                      Delete update
                    </button>
                  </form>
                )}
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* ── Tasks ───────────────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Tasks</h2>

        {staff && (
          <details className="mb-4">
            <summary className={`${btnPrimary} list-none`}>+ Add task</summary>
            <Card className="mt-3">
              <form action={createTaskAction} className="grid gap-3 sm:grid-cols-4">
                <input type="hidden" name="project_id" value={project.id} />
                <div className="sm:col-span-4">
                  <Field name="t_title" label="Title *">
                    <input id="t_title" name="title" required maxLength={200} className={inputCls} />
                  </Field>
                </div>
                <div className="sm:col-span-4">
                  <Field name="t_desc" label="Description">
                    <textarea id="t_desc" name="description" rows={2} className={inputCls} />
                  </Field>
                </div>
                <Field name="t_prio" label="Priority">
                  <select id="t_prio" name="priority" className={inputCls} defaultValue="medium">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </Field>
                <Field name="t_assignee" label="Assignee">
                  <select id="t_assignee" name="assignee_id" className={inputCls} defaultValue={user.id}>
                    {team.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field name="t_due" label="Due date">
                  <input id="t_due" name="due_date" type="date" className={inputCls} />
                </Field>
                <label className="flex items-end gap-2 pb-2 text-sm text-slate-700">
                  <input type="checkbox" name="client_visible" defaultChecked /> Visible to client
                </label>
                <div className="sm:col-span-4">
                  <button type="submit" className={btnPrimary}>
                    Add task
                  </button>
                </div>
              </form>
            </Card>
          </details>
        )}

        {tasks.length === 0 ? (
          <Empty>No tasks yet.</Empty>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {COLUMNS.map((col) => {
              const items = tasks.filter((t) => t.status === col.status);
              return (
                <div key={col.status} className="rounded-2xl bg-slate-100/70 p-3">
                  <div className="mb-3 flex items-center justify-between px-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <span>{col.title}</span>
                    <span className="rounded-full bg-white px-2 py-0.5 text-slate-600">{items.length}</span>
                  </div>
                  <div className="space-y-2">
                    {items.length === 0 ? (
                      <div className="px-1 py-3 text-center text-xs text-slate-400">Nothing here</div>
                    ) : (
                      items.map((t) => <TaskCard key={t.id} task={t} projectId={project.id} staff={staff} />)
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Project settings (staff) ────────────────────────────────── */}
      {staff && (
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Project settings</h2>
          <Card>
            <form action={updateProjectAction} className="grid gap-3 sm:grid-cols-4">
              <input type="hidden" name="id" value={project.id} />
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
              <Field name="s_progress" label="Progress %">
                <input id="s_progress" name="progress" type="number" min={0} max={100} defaultValue={project.progress} className={inputCls} />
              </Field>
              <div className="sm:col-span-4">
                <Field name="s_desc" label="Description (visible to client)">
                  <textarea id="s_desc" name="description" rows={3} defaultValue={project.description ?? ""} className={inputCls} />
                </Field>
              </div>
              <Field name="s_start" label="Start date">
                <input id="s_start" name="start_date" type="date" defaultValue={project.start_date ?? ""} className={inputCls} />
              </Field>
              <Field name="s_due" label="Due date">
                <input id="s_due" name="due_date" type="date" defaultValue={project.due_date ?? ""} className={inputCls} />
              </Field>
              <div className="flex items-end sm:col-span-2">
                <button type="submit" className={btnPrimary}>
                  Save project
                </button>
              </div>
            </form>
            <p className="mt-3 text-xs text-slate-500">Progress also updates automatically whenever a task is moved, added or deleted.</p>
            {user.role === "admin" && (
              <details className="mt-4 border-t border-slate-100 pt-4">
                <summary className="cursor-pointer text-xs font-medium text-red-600">Danger zone</summary>
                <form action={deleteProjectAction} className="mt-3">
                  <input type="hidden" name="id" value={project.id} />
                  <input type="hidden" name="client_id" value={project.client_id} />
                  <button type="submit" className={btnDanger}>
                    Permanently delete this project, its tasks and updates
                  </button>
                </form>
              </details>
            )}
          </Card>
        </section>
      )}
    </>
  );
}
