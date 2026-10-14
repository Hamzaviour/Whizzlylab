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
import { notifyComment, notifyUpdatePosted, sendLoginCreated, sendPasswordReset } from "./notify";

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
  await requireUser([...STAFF]);
  const name = str(fd, "name", 160);
  if (!name) redirect("/portal/clients?error=Name+is+required");
  const rows = (await sql()`
    INSERT INTO clients (name, company, email, phone, status, notes)
    VALUES (${name}, ${optStr(fd, "company", 160)}, ${optStr(fd, "email", 254)}, ${optStr(fd, "phone", 60)},
            ${oneOf(str(fd, "status", 10), CLIENT_STATUS, "lead")}, ${optStr(fd, "notes", 4000)})
    RETURNING id
  `) as { id: string }[];
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

// ── Projects ────────────────────────────────────────────────────────────────
const PROJECT_STATUS = ["planning", "in_progress", "review", "completed", "on_hold"] as const;

export async function createProjectAction(fd: FormData) {
  await requireUser([...STAFF]);
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
  revalidatePath("/portal");
  redirect(`/portal/projects/${rows[0].id}`);
}

export async function updateProjectAction(fd: FormData) {
  await requireUser([...STAFF]);
  const id = str(fd, "id", 40);
  const name = str(fd, "name", 160);
  if (!uuid(id) || !name) redirect("/portal");
  const progress = Math.max(0, Math.min(100, Math.round(Number(str(fd, "progress", 4)) || 0)));
  await sql()`
    UPDATE projects SET name = ${name}, description = ${optStr(fd, "description", 4000)},
      status = ${oneOf(str(fd, "status", 12), PROJECT_STATUS, "planning")}, progress = ${progress},
      start_date = ${optDate(fd, "start_date")}, due_date = ${optDate(fd, "due_date")}
    WHERE id = ${id}
  `;
  revalidatePath(`/portal/projects/${id}`);
  redirect(`/portal/projects/${id}?ok=Project+saved`);
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

/** Keeps the project's progress bar in sync with its tasks. */
async function syncProgress(projectId: string) {
  await sql()`
    UPDATE projects SET progress = COALESCE((
      SELECT round(100.0 * count(*) FILTER (WHERE status = 'done') / NULLIF(count(*), 0))::int
      FROM tasks WHERE project_id = ${projectId}), progress)
    WHERE id = ${projectId}
  `;
}

export async function createTaskAction(fd: FormData) {
  const user = await requireUser([...STAFF]);
  const projectId = str(fd, "project_id", 40);
  const title = str(fd, "title", 200);
  const back = `/portal/projects/${projectId}`;
  if (!uuid(projectId)) redirect("/portal");
  if (!title) redirect(`${back}?error=Task+title+is+required`);
  const assignee = str(fd, "assignee_id", 40);
  await sql()`
    INSERT INTO tasks (project_id, title, description, priority, assignee_id, due_date, client_visible)
    VALUES (${projectId}, ${title}, ${optStr(fd, "description", 2000)},
            ${oneOf(str(fd, "priority", 8), ["low", "medium", "high"] as const, "medium")},
            ${uuid(assignee) ? assignee : user.id}, ${optDate(fd, "due_date")}, ${fd.get("client_visible") === "on"})
  `;
  await syncProgress(projectId);
  revalidatePath(back);
  redirect(back);
}

export async function setTaskStatusAction(fd: FormData) {
  await requireUser([...STAFF]);
  const id = str(fd, "id", 40);
  const projectId = str(fd, "project_id", 40);
  const status = oneOf(str(fd, "status", 12), TASK_STATUS, "todo");
  if (!uuid(id) || !uuid(projectId)) redirect("/portal");
  await sql()`UPDATE tasks SET status = ${status} WHERE id = ${id} AND project_id = ${projectId}`;
  await syncProgress(projectId);
  revalidatePath(`/portal/projects/${projectId}`);
  redirect(`/portal/projects/${projectId}`);
}

export async function toggleTaskVisibilityAction(fd: FormData) {
  await requireUser([...STAFF]);
  const id = str(fd, "id", 40);
  const projectId = str(fd, "project_id", 40);
  if (uuid(id) && uuid(projectId)) {
    await sql()`UPDATE tasks SET client_visible = NOT client_visible WHERE id = ${id} AND project_id = ${projectId}`;
  }
  revalidatePath(`/portal/projects/${projectId}`);
  redirect(`/portal/projects/${projectId}`);
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
  redirect(`/portal/projects/${projectId}`);
}

// ── Updates & comments ──────────────────────────────────────────────────────
export async function postUpdateAction(fd: FormData) {
  const user = await requireUser([...STAFF]);
  const projectId = str(fd, "project_id", 40);
  const title = str(fd, "title", 200);
  const body = str(fd, "body", 8000);
  const back = `/portal/projects/${projectId}`;
  if (!uuid(projectId)) redirect("/portal");
  if (!title || !body) redirect(`${back}?error=Update+needs+a+title+and+details`);
  const visible = fd.get("client_visible") === "on";
  await sql()`
    INSERT INTO updates (project_id, author_id, title, body, kind, client_visible)
    VALUES (${projectId}, ${user.id}, ${title}, ${body},
            ${oneOf(str(fd, "kind", 10), ["update", "milestone", "delivery"] as const, "update")},
            ${visible})
  `;
  if (visible && fd.get("notify") === "on") after(() => notifyUpdatePosted(projectId, title, body, user.name));
  revalidatePath(back);
  redirect(`${back}?ok=Update+posted`);
}

export async function deleteUpdateAction(fd: FormData) {
  await requireUser([...STAFF]);
  const id = str(fd, "id", 40);
  const projectId = str(fd, "project_id", 40);
  if (uuid(id) && uuid(projectId)) await sql()`DELETE FROM updates WHERE id = ${id} AND project_id = ${projectId}`;
  revalidatePath(`/portal/projects/${projectId}`);
  redirect(`/portal/projects/${projectId}`);
}

export async function addCommentAction(fd: FormData) {
  const user = await getUser();
  if (!user) redirect("/portal/login");
  const projectId = str(fd, "project_id", 40);
  const updateId = str(fd, "update_id", 40);
  const body = str(fd, "body", 4000);
  const back = `/portal/projects/${projectId}`;
  // getProject enforces that clients can only reach their own projects.
  const project = uuid(projectId) ? await getProject(user, projectId) : null;
  if (!project) redirect("/portal");
  if (!body) redirect(back);
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
  if (!internal) after(() => notifyComment(projectId, body, user.name, user.role === "client"));
  revalidatePath(back);
  redirect(back);
}
