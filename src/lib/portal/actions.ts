"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { createHash, randomBytes } from "node:crypto";
import { sql } from "./db";
import {
  createSession,
  destroySession,
  hashPassword,
  verifyPassword,
  requireUser,
  getUser,
} from "./auth";
import { getProject } from "./data";
import {
  notifyApprovalRequested,
  notifyApprovalResponse,
  notifyComment,
  notifyUpdatePosted,
  sendLoginCreated,
  sendPasswordReset,
} from "./notify";

const str = (fd: FormData, key: string, max = 2000): string =>
  String(fd.get(key) ?? "").trim().slice(0, max);
const optStr = (fd: FormData, key: string, max = 2000): string | null => str(fd, key, max) || null;
const optDate = (fd: FormData, key: string): string | null => {
  const v = str(fd, key, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null;
};
const oneOf = <T extends string>(v: string, allowed: readonly T[], fallback: T): T =>
  (allowed as readonly string[]).includes(v) ? (v as T) : fallback;
const uuid = (v: string) => /^[0-9a-f-]{36}$/i.test(v);
const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e) && e.length <= 254;

const STAFF = ["admin", "team"] as const;

// ── Auth ────────────────────────────────────────────────────────────────────
export async function loginAction(fd: FormData) {
  const email = str(fd, "email", 254).toLowerCase();
  const password = str(fd, "password", 200);
  const key = `login:${email}`;
  if ((await recentAttempts(key, 15)) >= 5) {
    redirect("/portal/login?error=Too+many+attempts.+Try+again+in+15+minutes");
  }
  const rows = (await sql()`SELECT id, password_hash FROM users WHERE email = ${email}`) as { id: string; password_hash: string }[];
  const row = rows[0];
  // Verify against a dummy hash when the user doesn't exist to keep timing similar.
  const ok = row
    ? await verifyPassword(password, row.password_hash)
    : (await verifyPassword(password, "scrypt$00$00"), false);
  if (!ok || !row) {
    await sql()`INSERT INTO login_attempts (key) VALUES (${key})`;
    redirect("/portal/login?error=Invalid+email+or+password");
  }
  await sql()`DELETE FROM login_attempts WHERE key = ${key}`;
  await createSession(row.id);
  redirect("/portal");
}

/** Number of recorded attempts for `key` in the last `minutes` minutes (old rows are pruned). */
async function recentAttempts(key: string, minutes: number): Promise<number> {
  await sql()`DELETE FROM login_attempts WHERE at < now() - interval '1 day'`;
  const rows = (await sql()`
    SELECT count(*)::int AS n FROM login_attempts WHERE key = ${key} AND at > now() - make_interval(mins => ${minutes})
  `) as { n: number }[];
  return rows[0].n;
}

// ── Password reset & change ────────────────────────────────────────────────
const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");

export async function forgotPasswordAction(fd: FormData) {
  const email = str(fd, "email", 254).toLowerCase();
  const key = `forgot:${email}`;
  // Same response whether or not the account exists, so emails can't be probed.
  const done = "/portal/forgot?ok=If+that+email+has+an+account,+a+reset+link+is+on+its+way";
  if (!validEmail(email) || (await recentAttempts(key, 60)) >= 3) redirect(done);
  await sql()`INSERT INTO login_attempts (key) VALUES (${key})`;
  const rows = (await sql()`SELECT id, name FROM users WHERE email = ${email}`) as { id: string; name: string }[];
  const user = rows[0];
  if (user) {
    const token = randomBytes(32).toString("base64url");
    await sql()`
      INSERT INTO auth_tokens (user_id, token_hash, expires_at)
      VALUES (${user.id}, ${sha256(token)}, now() + interval '1 hour')
    `;
    after(() => sendPasswordReset(email, user.name, token));
  }
  redirect(done);
}

export async function resetPasswordAction(fd: FormData) {
  const token = str(fd, "token", 100);
  const password = str(fd, "password", 200);
  const back = `/portal/reset/${encodeURIComponent(token)}`;
  if (password.length < 10) redirect(`${back}?error=Password+must+be+at+least+10+characters`);
  if (password !== str(fd, "confirm", 200)) redirect(`${back}?error=Passwords+do+not+match`);
  // Atomically consume the token so a link works exactly once.
  const rows = (await sql()`
    DELETE FROM auth_tokens WHERE token_hash = ${sha256(token)} AND expires_at > now() RETURNING user_id
  `) as { user_id: string }[];
  if (!rows[0]) redirect("/portal/forgot?error=That+reset+link+is+invalid+or+has+expired");
  const hash = await hashPassword(password);
  await sql()`UPDATE users SET password_hash = ${hash} WHERE id = ${rows[0].user_id}`;
  await sql()`DELETE FROM auth_tokens WHERE user_id = ${rows[0].user_id}`;
  redirect("/portal/login?ok=Password+updated.+Please+sign+in");
}

export async function changePasswordAction(fd: FormData) {
  const user = await requireUser();
  const current = str(fd, "current", 200);
  const next = str(fd, "password", 200);
  const rows = (await sql()`SELECT password_hash FROM users WHERE id = ${user.id}`) as { password_hash: string }[];
  if (!rows[0] || !(await verifyPassword(current, rows[0].password_hash))) {
    redirect("/portal/account?error=Current+password+is+incorrect");
  }
  if (next.length < 10) redirect("/portal/account?error=New+password+must+be+at+least+10+characters");
  if (next !== str(fd, "confirm", 200)) redirect("/portal/account?error=Passwords+do+not+match");
  await sql()`UPDATE users SET password_hash = ${await hashPassword(next)} WHERE id = ${user.id}`;
  // Sessions are tied to the password hash: this signs out other devices; re-issue ours.
  await createSession(user.id);
  redirect("/portal/account?ok=Password+changed");
}

export async function updateProfileAction(fd: FormData) {
  const user = await requireUser();
  const name = str(fd, "name", 120);
  if (!name) redirect("/portal/account?error=Name+is+required");
  await sql()`UPDATE users SET name = ${name} WHERE id = ${user.id}`;
  revalidatePath("/portal", "layout");
  redirect("/portal/account?ok=Profile+updated");
}

export async function logoutAction() {
  await destroySession();
  redirect("/portal/login");
}

/** One-time bootstrap: only works while the users table is empty. */
export async function setupAdminAction(fd: FormData) {
  const name = str(fd, "name", 120);
  const email = str(fd, "email", 254).toLowerCase();
  const password = str(fd, "password", 200);
  const code = str(fd, "setup_code", 200);
  const expectedCode = process.env.PORTAL_SETUP_CODE;
  if (!expectedCode || code !== expectedCode) {
    redirect("/portal/login?error=Invalid+setup+code");
  }
  if (!name || !validEmail(email) || password.length < 10) {
    redirect("/portal/login?error=Enter+a+name,+valid+email+and+a+password+of+10%2B+characters");
  }
  const hash = await hashPassword(password);
  const rows = (await sql()`
    INSERT INTO users (email, name, password_hash, role)
    SELECT ${email}, ${name}, ${hash}, 'admin' WHERE NOT EXISTS (SELECT 1 FROM users)
    RETURNING id
  `) as { id: string }[];
  if (!rows[0]) redirect("/portal/login?error=Setup+already+completed");
  await createSession(rows[0].id);
  redirect("/portal");
}

// ── Users ───────────────────────────────────────────────────────────────────
export async function createStaffUserAction(fd: FormData) {
  await requireUser(["admin"]);
  const name = str(fd, "name", 120);
  const email = str(fd, "email", 254).toLowerCase();
  const password = str(fd, "password", 200);
  const role = oneOf(str(fd, "role", 10), ["team", "admin"] as const, "team");
  if (!name || !validEmail(email) || password.length < 10) {
    redirect("/portal/team?error=Name,+valid+email+and+10%2B+char+password+required");
  }
  const hash = await hashPassword(password);
  const rows = (await sql()`
    INSERT INTO users (email, name, password_hash, role) VALUES (${email}, ${name}, ${hash}, ${role})
    ON CONFLICT (email) DO NOTHING RETURNING id
  `) as { id: string }[];
  if (!rows[0]) redirect("/portal/team?error=That+email+already+exists");
  revalidatePath("/portal/team");
  redirect("/portal/team?ok=User+created");
}

export async function deleteStaffUserAction(fd: FormData) {
  const me = await requireUser(["admin"]);
  const id = str(fd, "id", 40);
  if (!uuid(id) || id === me.id) redirect("/portal/team?error=Cannot+delete+this+user");
  await sql()`DELETE FROM users WHERE id = ${id} AND role IN ('admin','team')`;
  revalidatePath("/portal/team");
  redirect("/portal/team?ok=User+removed");
}

export async function createClientLoginAction(fd: FormData) {
  await requireUser([...STAFF]);
  const clientId = str(fd, "client_id", 40);
  const name = str(fd, "name", 120);
  const email = str(fd, "email", 254).toLowerCase();
  const password = str(fd, "password", 200);
  const back = `/portal/clients/${clientId}`;
  if (!uuid(clientId)) redirect("/portal/clients");
  if (!name || !validEmail(email) || password.length < 10) {
    redirect(`${back}?error=Name,+valid+email+and+10%2B+char+password+required`);
  }
  const hash = await hashPassword(password);
  const rows = (await sql()`
    INSERT INTO users (email, name, password_hash, role, client_id)
    VALUES (${email}, ${name}, ${hash}, 'client', ${clientId})
    ON CONFLICT (email) DO NOTHING RETURNING id
  `) as { id: string }[];
  if (!rows[0]) redirect(`${back}?error=That+email+already+exists`);
  if (fd.get("send_welcome") === "on") after(() => sendLoginCreated(email, name));
  revalidatePath(back);
  redirect(`${back}?ok=Client+login+created`);
}

export async function deleteClientLoginAction(fd: FormData) {
  await requireUser([...STAFF]);
  const id = str(fd, "id", 40);
  const clientId = str(fd, "client_id", 40);
  if (uuid(id)) await sql()`DELETE FROM users WHERE id = ${id} AND role = 'client'`;
  revalidatePath(`/portal/clients/${clientId}`);
  redirect(`/portal/clients/${clientId}?ok=Login+removed`);
}

// ── Clients ─────────────────────────────────────────────────────────────────
const CLIENT_STATUS = ["lead", "active", "paused", "closed"] as const;

export async function createClientAction(fd: FormData) {
  const user = await requireUser([...STAFF]);
  const name = str(fd, "name", 160);
  if (!name) redirect("/portal/clients?error=Name+is+required");
  const rows = (await sql()`
    INSERT INTO clients (name, company, email, phone, status, notes)
    VALUES (${name}, ${optStr(fd, "company", 160)}, ${optStr(fd, "email", 254)}, ${optStr(fd, "phone", 60)},
            ${oneOf(str(fd, "status", 10), CLIENT_STATUS, "lead")}, ${optStr(fd, "notes", 4000)})
    RETURNING id
  `) as { id: string }[];
  await logActivity({ clientId: rows[0].id, actorId: user.id, verb: "added client", detail: name, clientVisible: false });
  revalidatePath("/portal/clients");
  redirect(`/portal/clients/${rows[0].id}`);
}

export async function updateClientAction(fd: FormData) {
  await requireUser([...STAFF]);
  const id = str(fd, "id", 40);
  const name = str(fd, "name", 160);
  if (!uuid(id) || !name) redirect("/portal/clients");
  await sql()`
    UPDATE clients SET name = ${name}, company = ${optStr(fd, "company", 160)}, email = ${optStr(fd, "email", 254)},
      phone = ${optStr(fd, "phone", 60)}, status = ${oneOf(str(fd, "status", 10), CLIENT_STATUS, "lead")},
      notes = ${optStr(fd, "notes", 4000)}
    WHERE id = ${id}
  `;
  revalidatePath(`/portal/clients/${id}`);
  redirect(`/portal/clients/${id}?ok=Client+saved`);
}

export async function deleteClientAction(fd: FormData) {
  await requireUser(["admin"]);
  const id = str(fd, "id", 40);
  if (uuid(id)) await sql()`DELETE FROM clients WHERE id = ${id}`;
  revalidatePath("/portal/clients");
  redirect("/portal/clients");
}

// ── Activity log ────────────────────────────────────────────────────────────
async function logActivity(a: {
  projectId?: string | null;
  clientId?: string | null;
  actorId: string | null;
  verb: string;
  detail?: string | null;
  clientVisible?: boolean;
}) {
  try {
    await sql()`
      INSERT INTO activity (project_id, client_id, actor_id, verb, detail, client_visible)
      VALUES (${a.projectId ?? null}, ${a.clientId ?? null}, ${a.actorId}, ${a.verb},
              ${a.detail ? a.detail.slice(0, 300) : null}, ${a.clientVisible ?? true})
    `;
  } catch (e) {
    console.error("[portal] activity log failed:", e);
  }
}

const TABS = ["overview", "board", "updates", "discussion", "files", "activity", "settings"] as const;

/** Redirect back to a project tab, optionally with a flash message. */
function projectUrl(projectId: string, fd: FormData, flash?: { ok?: string; error?: string }) {
  const tab = oneOf(str(fd, "tab", 20), TABS, "overview");
  const qs = new URLSearchParams({ tab });
  if (flash?.ok) qs.set("ok", flash.ok);
  if (flash?.error) qs.set("error", flash.error);
  return `/portal/projects/${projectId}?${qs}`;
}

// ── Projects ────────────────────────────────────────────────────────────────
const PROJECT_STATUS = ["planning", "in_progress", "review", "completed", "on_hold"] as const;

export async function createProjectAction(fd: FormData) {
  const user = await requireUser([...STAFF]);
  const clientId = str(fd, "client_id", 40);
  const name = str(fd, "name", 160);
  if (!uuid(clientId)) redirect("/portal/clients");
  if (!name) redirect(`/portal/clients/${clientId}?error=Project+name+is+required`);
  const rows = (await sql()`
    INSERT INTO projects (client_id, name, description, status, start_date, due_date)
    VALUES (${clientId}, ${name}, ${optStr(fd, "description", 4000)},
            ${oneOf(str(fd, "status", 12), PROJECT_STATUS, "planning")}, ${optDate(fd, "start_date")}, ${optDate(fd, "due_date")})
    RETURNING id
  `) as { id: string }[];
  await logActivity({ projectId: rows[0].id, clientId, actorId: user.id, verb: "started the project", detail: name });
  revalidatePath("/portal");
  redirect(`/portal/projects/${rows[0].id}`);
}

export async function updateProjectAction(fd: FormData) {
  const user = await requireUser([...STAFF]);
  const id = str(fd, "id", 40);
  const name = str(fd, "name", 160);
  if (!uuid(id) || !name) redirect("/portal");
  const progress = Math.max(0, Math.min(100, Math.round(Number(str(fd, "progress", 4)) || 0)));
  const status = oneOf(str(fd, "status", 12), PROJECT_STATUS, "planning");
  const before = (await sql()`SELECT status FROM projects WHERE id = ${id}`) as { status: string }[];
  await sql()`
    UPDATE projects SET name = ${name}, description = ${optStr(fd, "description", 4000)},
      status = ${status}, progress = ${progress},
      start_date = ${optDate(fd, "start_date")}, due_date = ${optDate(fd, "due_date")}
    WHERE id = ${id}
  `;
  if (before[0] && before[0].status !== status) {
    await logActivity({ projectId: id, actorId: user.id, verb: "changed project status to", detail: status.replace(/_/g, " ") });
  }
  revalidatePath(`/portal/projects/${id}`);
  redirect(projectUrl(id, fd, { ok: "Project saved" }));
}

export async function deleteProjectAction(fd: FormData) {
  await requireUser(["admin"]);
  const id = str(fd, "id", 40);
  const clientId = str(fd, "client_id", 40);
  if (uuid(id)) await sql()`DELETE FROM projects WHERE id = ${id}`;
  revalidatePath("/portal");
  redirect(uuid(clientId) ? `/portal/clients/${clientId}` : "/portal");
}

// ── Tasks ───────────────────────────────────────────────────────────────────
const TASK_STATUS = ["todo", "in_progress", "review", "done"] as const;
const PRIORITY = ["low", "medium", "high"] as const;

/** Keeps the project's progress bar in sync with its tasks. */
async function syncProgress(projectId: string) {
  await sql()`
    UPDATE projects SET progress = COALESCE((
      SELECT round(100.0 * count(*) FILTER (WHERE status = 'done') / NULLIF(count(*), 0))::int
      FROM tasks WHERE project_id = ${projectId}), progress)
    WHERE id = ${projectId}
  `;
}

async function taskInfo(id: string, projectId: string) {
  const rows = (await sql()`SELECT title, client_visible FROM tasks WHERE id = ${id} AND project_id = ${projectId}`) as {
    title: string;
    client_visible: boolean;
  }[];
  return rows[0] ?? null;
}

export async function createTaskAction(fd: FormData) {
  const user = await requireUser([...STAFF]);
  const projectId = str(fd, "project_id", 40);
  const title = str(fd, "title", 200);
  if (!uuid(projectId)) redirect("/portal");
  if (!title) redirect(projectUrl(projectId, fd, { error: "Task title is required" }));
  const assignee = str(fd, "assignee_id", 40);
  const visible = fd.get("client_visible") === "on";
  await sql()`
    INSERT INTO tasks (project_id, title, description, priority, assignee_id, due_date, client_visible, status)
    VALUES (${projectId}, ${title}, ${optStr(fd, "description", 2000)}, ${oneOf(str(fd, "priority", 8), PRIORITY, "medium")},
            ${uuid(assignee) ? assignee : user.id}, ${optDate(fd, "due_date")}, ${visible},
            ${oneOf(str(fd, "status", 12), TASK_STATUS, "todo")})
  `;
  await syncProgress(projectId);
  await logActivity({ projectId, actorId: user.id, verb: "added task", detail: title, clientVisible: visible });
  revalidatePath(`/portal/projects/${projectId}`);
  redirect(projectUrl(projectId, fd));
}

export async function editTaskAction(fd: FormData) {
  await requireUser([...STAFF]);
  const id = str(fd, "id", 40);
  const projectId = str(fd, "project_id", 40);
  const title = str(fd, "title", 200);
  if (!uuid(id) || !uuid(projectId)) redirect("/portal");
  if (!title) redirect(projectUrl(projectId, fd, { error: "Task title is required" }));
  const assignee = str(fd, "assignee_id", 40);
  await sql()`
    UPDATE tasks SET title = ${title}, description = ${optStr(fd, "description", 2000)},
      priority = ${oneOf(str(fd, "priority", 8), PRIORITY, "medium")},
      assignee_id = ${uuid(assignee) ? assignee : null}, due_date = ${optDate(fd, "due_date")},
      client_visible = ${fd.get("client_visible") === "on"}, updated_at = now()
    WHERE id = ${id} AND project_id = ${projectId}
  `;
  revalidatePath(`/portal/projects/${projectId}`);
  redirect(projectUrl(projectId, fd, { ok: "Task updated" }));
}

export async function setTaskStatusAction(fd: FormData) {
  const user = await requireUser([...STAFF]);
  const id = str(fd, "id", 40);
  const projectId = str(fd, "project_id", 40);
  const status = oneOf(str(fd, "status", 12), TASK_STATUS, "todo");
  if (!uuid(id) || !uuid(projectId)) redirect("/portal");
  await sql()`UPDATE tasks SET status = ${status}, updated_at = now() WHERE id = ${id} AND project_id = ${projectId}`;
  await syncProgress(projectId);
  const t = await taskInfo(id, projectId);
  if (t) {
    await logActivity({
      projectId,
      actorId: user.id,
      verb: status === "done" ? "completed task" : `moved to ${status.replace(/_/g, " ")}:`,
      detail: t.title,
      clientVisible: t.client_visible,
    });
  }
  revalidatePath(`/portal/projects/${projectId}`);
  redirect(projectUrl(projectId, fd));
}

export async function toggleTaskVisibilityAction(fd: FormData) {
  await requireUser([...STAFF]);
  const id = str(fd, "id", 40);
  const projectId = str(fd, "project_id", 40);
  if (uuid(id) && uuid(projectId)) {
    await sql()`UPDATE tasks SET client_visible = NOT client_visible, updated_at = now() WHERE id = ${id} AND project_id = ${projectId}`;
  }
  revalidatePath(`/portal/projects/${projectId}`);
  redirect(projectUrl(projectId, fd));
}

export async function deleteTaskAction(fd: FormData) {
  await requireUser([...STAFF]);
  const id = str(fd, "id", 40);
  const projectId = str(fd, "project_id", 40);
  if (uuid(id) && uuid(projectId)) {
    await sql()`DELETE FROM tasks WHERE id = ${id} AND project_id = ${projectId}`;
    await syncProgress(projectId);
  }
  revalidatePath(`/portal/projects/${projectId}`);
  redirect(projectUrl(projectId, fd));
}

// ── Client approvals ────────────────────────────────────────────────────────
export async function requestApprovalAction(fd: FormData) {
  const user = await requireUser([...STAFF]);
  const id = str(fd, "id", 40);
  const projectId = str(fd, "project_id", 40);
  if (!uuid(id) || !uuid(projectId)) redirect("/portal");
  // Asking for approval makes the task visible to the client and moves it to review.
  const rows = (await sql()`
    UPDATE tasks SET approval = 'pending', approval_note = NULL, client_visible = true,
      status = CASE WHEN status = 'done' THEN status ELSE 'review' END, updated_at = now()
    WHERE id = ${id} AND project_id = ${projectId} RETURNING title
  `) as { title: string }[];
  if (rows[0]) {
    const title = rows[0].title;
    await logActivity({ projectId, actorId: user.id, verb: "requested client approval for", detail: title });
    after(() => notifyApprovalRequested(projectId, title));
  }
  revalidatePath(`/portal/projects/${projectId}`);
  redirect(projectUrl(projectId, fd, { ok: "Approval requested from the client" }));
}

export async function respondApprovalAction(fd: FormData) {
  const user = await requireUser(["client"]);
  const id = str(fd, "id", 40);
  const projectId = str(fd, "project_id", 40);
  const decision = oneOf(str(fd, "decision", 20), ["approved", "changes_requested"] as const, "approved");
  const note = optStr(fd, "note", 2000);
  // getProject enforces that the client owns this project.
  const project = uuid(projectId) ? await getProject(user, projectId) : null;
  if (!project || !uuid(id)) redirect("/portal");
  if (decision === "changes_requested" && !note) {
    redirect(projectUrl(projectId, fd, { error: "Please describe the changes you need" }));
  }
  const rows = (await sql()`
    UPDATE tasks SET approval = ${decision}, approval_note = ${note},
      status = CASE WHEN ${decision} = 'approved' THEN 'done' ELSE 'in_progress' END, updated_at = now()
    WHERE id = ${id} AND project_id = ${projectId} AND approval = 'pending' AND client_visible
    RETURNING title
  `) as { title: string }[];
  if (rows[0]) {
    const title = rows[0].title;
    await syncProgress(projectId);
    await logActivity({
      projectId,
      actorId: user.id,
      verb: decision === "approved" ? "approved" : "requested changes on",
      detail: note ? `${title}: ${note}` : title,
    });
    after(() => notifyApprovalResponse(projectId, title, decision, note, user.name));
  }
  revalidatePath(`/portal/projects/${projectId}`);
  redirect(projectUrl(projectId, fd, { ok: decision === "approved" ? "Approved. Thank you!" : "Change request sent to the team" }));
}

// ── Links & resources ───────────────────────────────────────────────────────
const LINK_KINDS = ["staging", "production", "repo", "design", "document", "other"] as const;

export async function addLinkAction(fd: FormData) {
  const user = await requireUser([...STAFF]);
  const projectId = str(fd, "project_id", 40);
  const title = str(fd, "title", 160);
  const raw = str(fd, "url", 1000);
  if (!uuid(projectId)) redirect("/portal");
  let url: string | null = null;
  try {
    const parsed = new URL(raw);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") url = parsed.toString();
  } catch {
    url = null;
  }
  if (!title || !url) redirect(projectUrl(projectId, fd, { error: "Add a title and a full http(s) link" }));
  const visible = fd.get("client_visible") === "on";
  await sql()`
    INSERT INTO project_links (project_id, title, url, kind, client_visible, created_by)
    VALUES (${projectId}, ${title}, ${url}, ${oneOf(str(fd, "kind", 12), LINK_KINDS, "other")}, ${visible}, ${user.id})
  `;
  await logActivity({ projectId, actorId: user.id, verb: "shared a link:", detail: title, clientVisible: visible });
  revalidatePath(`/portal/projects/${projectId}`);
  redirect(projectUrl(projectId, fd, { ok: "Link added" }));
}

export async function deleteLinkAction(fd: FormData) {
  await requireUser([...STAFF]);
  const id = str(fd, "id", 40);
  const projectId = str(fd, "project_id", 40);
  if (uuid(id) && uuid(projectId)) await sql()`DELETE FROM project_links WHERE id = ${id} AND project_id = ${projectId}`;
  revalidatePath(`/portal/projects/${projectId}`);
  redirect(projectUrl(projectId, fd));
}

// ── Files ───────────────────────────────────────────────────────────────────
// Stored in Postgres, so uploads go through a server action and must stay under
// Vercel's 4.5 MB request cap. Videos and archives of builds belong in links.
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
const FILE_TYPES: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  svg: "image/svg+xml",
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  txt: "text/plain",
  csv: "text/csv",
  md: "text/markdown",
  zip: "application/zip",
};

export async function uploadFilesAction(fd: FormData) {
  const user = await getUser();
  if (!user) redirect("/portal/login");
  const projectId = str(fd, "project_id", 40);
  // getProject enforces that clients can only upload to their own projects.
  const project = uuid(projectId) ? await getProject(user, projectId) : null;
  if (!project) redirect("/portal");
  const files = fd.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length === 0) redirect(projectUrl(projectId, fd, { error: "Choose at least one file" }));
  const total = files.reduce((n, f) => n + f.size, 0);
  if (total > MAX_UPLOAD_BYTES) redirect(projectUrl(projectId, fd, { error: "Uploads are limited to 4 MB at a time" }));
  const typed = files.map((f) => {
    const name = f.name.replace(/[\\/\x00-\x1f]/g, "_").slice(0, 200) || "file";
    const ext = name.includes(".") ? name.split(".").pop()!.toLowerCase() : "";
    return { file: f, name, mime: FILE_TYPES[ext] };
  });
  const rejected = typed.find((t) => !t.mime);
  if (rejected) {
    redirect(projectUrl(projectId, fd, { error: `${rejected.name} is not a supported file type (images, PDF, Office, text or zip)` }));
  }
  // Client uploads are always shared with the team; staff can keep files internal.
  const visible = user.role === "client" || fd.get("client_visible") === "on";
  for (const t of typed) {
    const b64 = Buffer.from(await t.file.arrayBuffer()).toString("base64");
    await sql()`
      INSERT INTO project_files (project_id, name, mime, size, data, client_visible, created_by)
      VALUES (${projectId}, ${t.name}, ${t.mime}, ${t.file.size}, decode(${b64}, 'base64'), ${visible}, ${user.id})
    `;
  }
  await logActivity({
    projectId,
    actorId: user.id,
    verb: typed.length === 1 ? "uploaded a file:" : `uploaded ${typed.length} files:`,
    detail: typed.map((t) => t.name).join(", "),
    clientVisible: visible,
  });
  revalidatePath(`/portal/projects/${projectId}`);
  redirect(projectUrl(projectId, fd, { ok: typed.length === 1 ? "File uploaded" : `${typed.length} files uploaded` }));
}

export async function deleteFileAction(fd: FormData) {
  const user = await getUser();
  if (!user) redirect("/portal/login");
  const id = str(fd, "id", 40);
  const projectId = str(fd, "project_id", 40);
  if (uuid(id) && uuid(projectId)) {
    // Staff can remove any file; clients only the ones they uploaded.
    await sql()`
      DELETE FROM project_files WHERE id = ${id} AND project_id = ${projectId}
        AND (${user.role !== "client"} OR created_by = ${user.id})
    `;
  }
  revalidatePath(`/portal/projects/${projectId}`);
  redirect(projectUrl(projectId, fd));
}

// ── Updates & comments ──────────────────────────────────────────────────────
export async function postUpdateAction(fd: FormData) {
  const user = await requireUser([...STAFF]);
  const projectId = str(fd, "project_id", 40);
  const title = str(fd, "title", 200);
  const body = str(fd, "body", 8000);
  if (!uuid(projectId)) redirect("/portal");
  if (!title || !body) redirect(projectUrl(projectId, fd, { error: "Update needs a title and details" }));
  const visible = fd.get("client_visible") === "on";
  const kind = oneOf(str(fd, "kind", 10), ["update", "milestone", "delivery"] as const, "update");
  await sql()`
    INSERT INTO updates (project_id, author_id, title, body, kind, client_visible)
    VALUES (${projectId}, ${user.id}, ${title}, ${body}, ${kind}, ${visible})
  `;
  await logActivity({
    projectId,
    actorId: user.id,
    verb: kind === "update" ? "posted an update:" : `posted a ${kind}:`,
    detail: title,
    clientVisible: visible,
  });
  if (visible && fd.get("notify") === "on") after(() => notifyUpdatePosted(projectId, title, body, user.name));
  revalidatePath(`/portal/projects/${projectId}`);
  redirect(projectUrl(projectId, fd, { ok: "Update posted" }));
}

export async function deleteUpdateAction(fd: FormData) {
  await requireUser([...STAFF]);
  const id = str(fd, "id", 40);
  const projectId = str(fd, "project_id", 40);
  if (uuid(id) && uuid(projectId)) await sql()`DELETE FROM updates WHERE id = ${id} AND project_id = ${projectId}`;
  revalidatePath(`/portal/projects/${projectId}`);
  redirect(projectUrl(projectId, fd));
}

export async function addCommentAction(fd: FormData) {
  const user = await getUser();
  if (!user) redirect("/portal/login");
  const projectId = str(fd, "project_id", 40);
  const updateId = str(fd, "update_id", 40);
  const body = str(fd, "body", 4000);
  // getProject enforces that clients can only reach their own projects.
  const project = uuid(projectId) ? await getProject(user, projectId) : null;
  if (!project) redirect("/portal");
  if (!body) redirect(projectUrl(projectId, fd));
  const internal = user.role !== "client" && fd.get("internal") === "on";
  // The update (if any) must belong to this project and be visible to the commenter.
  let linkedUpdate: string | null = null;
  if (uuid(updateId)) {
    const rows = (await sql()`
      SELECT id FROM updates WHERE id = ${updateId} AND project_id = ${projectId}
        AND (${user.role !== "client"} OR client_visible)
    `) as { id: string }[];
    linkedUpdate = rows[0]?.id ?? null;
  }
  await sql()`
    INSERT INTO comments (project_id, update_id, author_id, body, internal)
    VALUES (${projectId}, ${linkedUpdate}, ${user.id}, ${body}, ${internal})
  `;
  await logActivity({ projectId, actorId: user.id, verb: "commented:", detail: body, clientVisible: !internal });
  if (!internal) after(() => notifyComment(projectId, body, user.name, user.role === "client"));
  revalidatePath(`/portal/projects/${projectId}`);
  redirect(projectUrl(projectId, fd));
}
