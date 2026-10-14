import "server-only";
import {
  sql,
  type Client,
  type Comment,
  type PortalUser,
  type Project,
  type Task,
  type Update,
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

export async function getClients(): Promise<(Client & { project_count: number })[]> {
  return (await sql()`
    SELECT c.*, (SELECT count(*)::int FROM projects p WHERE p.client_id = c.id) AS project_count
    FROM clients c ORDER BY c.created_at DESC
  `) as (Client & { project_count: number })[];
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
           u.name AS assignee_name, t.due_date::text AS due_date, t.client_visible, t.created_at
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
