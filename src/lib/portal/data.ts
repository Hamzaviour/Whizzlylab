import "server-only";
import {
  sql,
  type Client,
  type Comment,
  type PortalUser,
  type Project,
  type Task,
  type Update,
  type ProjectLink,
  type Activity,
} from "./db";

/**
 * Read helpers. Every project-scoped helper takes the viewing user and applies
 * the visibility rules: clients only see their own projects, client-visible
 * tasks/updates, and non-internal comments.
 */

export type ProjectRow = Project & {
  client_name: string;
  client_company: string | null;
  task_total: number;
  task_done: number;
};

const isStaffUser = (u: PortalUser) => u.role !== "client";

export type ClientRow = Client & { project_count: number; active_projects: number; login_count: number };

export async function getClients(q = "", status = ""): Promise<ClientRow[]> {
  const like = q ? `%${q.replace(/[%_\\]/g, (m) => `\\${m}`)}%` : null;
  return (await sql()`
    SELECT c.*,
      (SELECT count(*)::int FROM projects p WHERE p.client_id = c.id) AS project_count,
      (SELECT count(*)::int FROM projects p WHERE p.client_id = c.id AND p.status IN ('planning','in_progress','review')) AS active_projects,
      (SELECT count(*)::int FROM users u WHERE u.client_id = c.id) AS login_count
    FROM clients c
    WHERE (${like}::text IS NULL OR c.name ILIKE ${like} OR c.company ILIKE ${like} OR c.email ILIKE ${like})
      AND (${status || null}::text IS NULL OR c.status = ${status || null})
    ORDER BY c.created_at DESC
  `) as ClientRow[];
}

export async function getClient(id: string): Promise<Client | null> {
  const rows = (await sql()`SELECT * FROM clients WHERE id = ${id}`) as Client[];
  return rows[0] ?? null;
}

export async function getClientUsers(clientId: string) {
  return (await sql()`
    SELECT id, email, name, created_at FROM users WHERE client_id = ${clientId} ORDER BY created_at
  `) as { id: string; email: string; name: string; created_at: string }[];
}

export async function getStaffUsers() {
  return (await sql()`
    SELECT id, email, name, role, created_at FROM users WHERE role IN ('admin','team') ORDER BY created_at
  `) as { id: string; email: string; name: string; role: "admin" | "team"; created_at: string }[];
}

export async function getProjects(user: PortalUser, clientId?: string): Promise<ProjectRow[]> {
  const q = sql();
  const scopedClient = user.role === "client" ? user.client_id : clientId ?? null;
  return (await q`
    SELECT p.id, p.client_id, p.name, p.description, p.status, p.progress,
           p.start_date::text AS start_date, p.due_date::text AS due_date, p.created_at,
           c.name AS client_name, c.company AS client_company,
           (SELECT count(*)::int FROM tasks t WHERE t.project_id = p.id AND (${isStaffUser(user)} OR t.client_visible)) AS task_total,
           (SELECT count(*)::int FROM tasks t WHERE t.project_id = p.id AND t.status = 'done' AND (${isStaffUser(user)} OR t.client_visible)) AS task_done
    FROM projects p JOIN clients c ON c.id = p.client_id
    WHERE (${scopedClient}::uuid IS NULL OR p.client_id = ${scopedClient}::uuid)
    ORDER BY (p.status = 'completed'), p.due_date NULLS LAST, p.created_at DESC
  `) as ProjectRow[];
}

export async function getProject(user: PortalUser, id: string): Promise<ProjectRow | null> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const rows = (await sql()`
    SELECT p.id, p.client_id, p.name, p.description, p.status, p.progress,
           p.start_date::text AS start_date, p.due_date::text AS due_date, p.created_at,
           c.name AS client_name, c.company AS client_company,
           (SELECT count(*)::int FROM tasks t WHERE t.project_id = p.id AND (${isStaffUser(user)} OR t.client_visible)) AS task_total,
           (SELECT count(*)::int FROM tasks t WHERE t.project_id = p.id AND t.status = 'done' AND (${isStaffUser(user)} OR t.client_visible)) AS task_done
    FROM projects p JOIN clients c ON c.id = p.client_id
    WHERE p.id = ${id}
  `) as ProjectRow[];
  const project = rows[0];
  if (!project) return null;
  if (user.role === "client" && project.client_id !== user.client_id) return null;
  return project;
}

export async function getTasks(user: PortalUser, projectId: string): Promise<Task[]> {
  return (await sql()`
    SELECT t.id, t.project_id, t.title, t.description, t.status, t.priority, t.assignee_id,
           u.name AS assignee_name, t.due_date::text AS due_date, t.client_visible,
           t.approval, t.approval_note, t.created_at
    FROM tasks t LEFT JOIN users u ON u.id = t.assignee_id
    WHERE t.project_id = ${projectId} AND (${isStaffUser(user)} OR t.client_visible)
    ORDER BY CASE t.priority WHEN 'high' THEN 0 WHEN 'medium' THEN 1 ELSE 2 END, t.created_at
  `) as Task[];
}

export async function getUpdates(user: PortalUser, projectId: string): Promise<Update[]> {
  return (await sql()`
    SELECT up.id, up.project_id, up.author_id, u.name AS author_name, up.title, up.body,
           up.kind, up.client_visible, up.created_at
    FROM updates up LEFT JOIN users u ON u.id = up.author_id
    WHERE up.project_id = ${projectId} AND (${isStaffUser(user)} OR up.client_visible)
    ORDER BY up.created_at DESC
  `) as Update[];
}

export async function getComments(user: PortalUser, projectId: string): Promise<Comment[]> {
  return (await sql()`
    SELECT c.id, c.project_id, c.update_id, c.task_id, c.author_id, u.name AS author_name,
           u.role AS author_role, c.body, c.internal, c.created_at
    FROM comments c LEFT JOIN users u ON u.id = c.author_id
    WHERE c.project_id = ${projectId} AND (${isStaffUser(user)} OR c.internal = false)
    ORDER BY c.created_at
  `) as Comment[];
}

export async function getRecentUpdates(user: PortalUser, limit = 8) {
  const scopedClient = user.role === "client" ? user.client_id : null;
  return (await sql()`
    SELECT up.id, up.project_id, p.name AS project_name, u.name AS author_name,
           up.title, up.kind, up.created_at
    FROM updates up
    JOIN projects p ON p.id = up.project_id
    LEFT JOIN users u ON u.id = up.author_id
    WHERE (${isStaffUser(user)} OR up.client_visible)
      AND (${scopedClient}::uuid IS NULL OR p.client_id = ${scopedClient}::uuid)
    ORDER BY up.created_at DESC LIMIT ${limit}
  `) as { id: string; project_id: string; project_name: string; author_name: string | null; title: string; kind: string; created_at: string }[];
}

export async function getStaffStats(user: PortalUser) {
  const rows = (await sql()`
    SELECT
      (SELECT count(*)::int FROM clients WHERE status = 'lead') AS leads,
      (SELECT count(*)::int FROM clients WHERE status = 'active') AS active_clients,
      (SELECT count(*)::int FROM projects WHERE status IN ('planning','in_progress','review')) AS active_projects,
      (SELECT count(*)::int FROM tasks WHERE status <> 'done') AS open_tasks,
      (SELECT count(*)::int FROM tasks WHERE status <> 'done' AND assignee_id = ${user.id}) AS my_tasks
  `) as { leads: number; active_clients: number; active_projects: number; open_tasks: number; my_tasks: number }[];
  return rows[0];
}

export async function getMyOpenTasks(user: PortalUser) {
  return (await sql()`
    SELECT t.id, t.title, t.status, t.priority, t.due_date::text AS due_date, t.project_id, p.name AS project_name
    FROM tasks t JOIN projects p ON p.id = t.project_id
    WHERE t.assignee_id = ${user.id} AND t.status <> 'done'
    ORDER BY t.due_date NULLS LAST, t.created_at LIMIT 10
  `) as { id: string; title: string; status: string; priority: string; due_date: string | null; project_id: string; project_name: string }[];
}

export async function getLinks(user: PortalUser, projectId: string): Promise<ProjectLink[]> {
  return (await sql()`
    SELECT id, project_id, title, url, kind, client_visible, created_at FROM project_links
    WHERE project_id = ${projectId} AND (${isStaffUser(user)} OR client_visible)
    ORDER BY created_at
  `) as ProjectLink[];
}

/** Activity feed. Clients only ever see client-visible entries for their own projects. */
export async function getActivity(user: PortalUser, opts: { projectId?: string; limit?: number } = {}): Promise<Activity[]> {
  const scopedClient = user.role === "client" ? user.client_id : null;
  return (await sql()`
    SELECT a.id, a.project_id, p.name AS project_name, u.name AS actor_name, u.role AS actor_role,
           a.verb, a.detail, a.created_at
    FROM activity a
    LEFT JOIN projects p ON p.id = a.project_id
    LEFT JOIN users u ON u.id = a.actor_id
    WHERE (${opts.projectId ?? null}::uuid IS NULL OR a.project_id = ${opts.projectId ?? null}::uuid)
      AND (${isStaffUser(user)} OR (a.client_visible AND p.client_id = ${scopedClient}::uuid))
    ORDER BY a.created_at DESC LIMIT ${opts.limit ?? 20}
  `) as Activity[];
}

export async function getTaskBreakdown(user: PortalUser) {
  const scopedClient = user.role === "client" ? user.client_id : null;
  const rows = (await sql()`
    SELECT t.status, count(*)::int AS n FROM tasks t JOIN projects p ON p.id = t.project_id
    WHERE (${isStaffUser(user)} OR (t.client_visible AND p.client_id = ${scopedClient}::uuid))
    GROUP BY t.status
  `) as { status: string; n: number }[];
  const out: Record<string, number> = { todo: 0, in_progress: 0, review: 0, done: 0 };
  for (const r of rows) out[r.status] = r.n;
  return out;
}

export async function getClientPipeline() {
  const rows = (await sql()`SELECT status, count(*)::int AS n FROM clients GROUP BY status`) as { status: string; n: number }[];
  const out: Record<string, number> = { lead: 0, active: 0, paused: 0, closed: 0 };
  for (const r of rows) out[r.status] = r.n;
  return out;
}

/** Open tasks that are overdue or due in the next 7 days. */
export async function getDueSoon(user: PortalUser, limit = 8) {
  const scopedClient = user.role === "client" ? user.client_id : null;
  return (await sql()`
    SELECT t.id, t.title, t.status, t.priority, t.due_date::text AS due_date, t.project_id,
           p.name AS project_name, u.name AS assignee_name, (t.due_date < current_date) AS overdue
    FROM tasks t JOIN projects p ON p.id = t.project_id LEFT JOIN users u ON u.id = t.assignee_id
    WHERE t.status <> 'done' AND t.due_date IS NOT NULL AND t.due_date <= current_date + 7
      AND (${isStaffUser(user)} OR (t.client_visible AND p.client_id = ${scopedClient}::uuid))
    ORDER BY t.due_date LIMIT ${limit}
  `) as { id: string; title: string; status: string; priority: string; due_date: string; project_id: string; project_name: string; assignee_name: string | null; overdue: boolean }[];
}

/** Tasks waiting on a client decision. */
export async function getPendingApprovals(user: PortalUser) {
  const scopedClient = user.role === "client" ? user.client_id : null;
  return (await sql()`
    SELECT t.id, t.title, t.project_id, p.name AS project_name, c.name AS client_name, t.updated_at
    FROM tasks t JOIN projects p ON p.id = t.project_id JOIN clients c ON c.id = p.client_id
    WHERE t.approval = 'pending' AND t.client_visible
      AND (${scopedClient}::uuid IS NULL OR p.client_id = ${scopedClient}::uuid)
    ORDER BY t.updated_at
  `) as { id: string; title: string; project_id: string; project_name: string; client_name: string; updated_at: string }[];
}

export async function getProjectTeam(projectId: string) {
  return (await sql()`
    SELECT DISTINCT u.id, u.name FROM tasks t JOIN users u ON u.id = t.assignee_id
    WHERE t.project_id = ${projectId} ORDER BY u.name
  `) as { id: string; name: string }[];
}
