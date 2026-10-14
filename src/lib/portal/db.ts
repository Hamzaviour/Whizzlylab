import { neon } from "@neondatabase/serverless";

type Sql = ReturnType<typeof neon>;
let _sql: Sql | null = null;

/** Lazily-created Neon SQL client (tagged-template, parameterized). */
export function sql(): Sql {
  if (!_sql) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    _sql = neon(url);
  }
  return _sql;
}

export type Role = "admin" | "team" | "client";
export type ClientStatus = "lead" | "active" | "paused" | "closed";
export type ProjectStatus = "planning" | "in_progress" | "review" | "completed" | "on_hold";
export type TaskStatus = "todo" | "in_progress" | "review" | "done";

export interface PortalUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  client_id: string | null;
}

export interface Client {
  id: string;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  status: ClientStatus;
  notes: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  client_id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  progress: number;
  start_date: string | null;
  due_date: string | null;
  created_at: string;
}

export interface Task {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: "low" | "medium" | "high";
  assignee_id: string | null;
  assignee_name: string | null;
  due_date: string | null;
  client_visible: boolean;
  approval: "pending" | "approved" | "changes_requested" | null;
  approval_note: string | null;
  created_at: string;
}

export interface Update {
  id: string;
  project_id: string;
  author_id: string | null;
  author_name: string | null;
  title: string;
  body: string;
  kind: "update" | "milestone" | "delivery";
  client_visible: boolean;
  created_at: string;
}

export interface Comment {
  id: string;
  project_id: string;
  update_id: string | null;
  task_id: string | null;
  author_id: string | null;
  author_name: string | null;
  author_role: Role | null;
  body: string;
  internal: boolean;
  created_at: string;
}

export type LinkKind = "staging" | "production" | "repo" | "design" | "document" | "other";

export interface ProjectLink {
  id: string;
  project_id: string;
  title: string;
  url: string;
  kind: LinkKind;
  client_visible: boolean;
  created_at: string;
}

export interface Activity {
  id: string;
  project_id: string | null;
  project_name: string | null;
  actor_name: string | null;
  actor_role: Role | null;
  verb: string;
  detail: string | null;
  created_at: string;
}
