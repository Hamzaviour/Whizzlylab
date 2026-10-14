import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/portal/auth";
import { getClient, getClientUsers, getProjects } from "@/lib/portal/data";
import {
  createClientLoginAction,
  createProjectAction,
  deleteClientAction,
  deleteClientLoginAction,
  updateClientAction,
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
  inputCls,
  PageHeader,
  ProgressBar,
} from "@/components/portal/ui";

export default async function ClientDetail({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; ok?: string }>;
}) {
  const user = await requireUser(["admin", "team"]);
  const [{ id }, { error, ok }] = await Promise.all([params, searchParams]);
  const client = /^[0-9a-f-]{36}$/i.test(id) ? await getClient(id) : null;
  if (!client) notFound();
  const [projects, logins] = await Promise.all([getProjects(user, client.id), getClientUsers(client.id)]);

  return (
    <>
      <Link href="/portal/clients" className="mb-2 inline-block text-xs text-slate-500 hover:text-slate-800">
        ← All clients
      </Link>
      <PageHeader
        title={client.name}
        subtitle={client.company}
        actions={<Badge value={client.status} />}
      />
      <Flash error={error} ok={ok} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Projects</h2>
            </div>
            {projects.length === 0 ? (
              <Empty>No projects for this client yet.</Empty>
            ) : (
              <div className="space-y-3">
                {projects.map((p) => (
                  <Link key={p.id} href={`/portal/projects/${p.id}`} className="block">
                    <Card className="transition hover:-translate-y-0.5 hover:shadow-md">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-slate-900">{p.name}</span>
                        <Badge value={p.status} />
                      </div>
                      <div className="mt-3">
                        <ProgressBar value={p.progress} />
                      </div>
                      {p.due_date && <div className="mt-2 text-xs text-slate-500">Due {fmtDate(p.due_date)}</div>}
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            <details className="mt-4">
              <summary className={`${btnGhost} list-none`}>+ New project</summary>
              <Card className="mt-3">
                <form action={createProjectAction} className="grid gap-3 sm:grid-cols-2">
                  <input type="hidden" name="client_id" value={client.id} />
                  <div className="sm:col-span-2">
                    <Field name="p_name" label="Project name *">
                      <input id="p_name" name="name" required className={inputCls} />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field name="p_desc" label="Description (visible to the client)">
                      <textarea id="p_desc" name="description" rows={3} className={inputCls} />
                    </Field>
                  </div>
                  <Field name="p_start" label="Start date">
                    <input id="p_start" name="start_date" type="date" className={inputCls} />
                  </Field>
                  <Field name="p_due" label="Due date">
                    <input id="p_due" name="due_date" type="date" className={inputCls} />
                  </Field>
                  <div className="sm:col-span-2">
                    <button type="submit" className={btnPrimary}>
                      Create project
                    </button>
                  </div>
                </form>
              </Card>
            </details>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Client details</h2>
            <Card>
              <form action={updateClientAction} className="grid gap-3 sm:grid-cols-2">
                <input type="hidden" name="id" value={client.id} />
                <Field name="name" label="Contact name *">
                  <input id="name" name="name" required defaultValue={client.name} className={inputCls} />
                </Field>
                <Field name="company" label="Company">
                  <input id="company" name="company" defaultValue={client.company ?? ""} className={inputCls} />
                </Field>
                <Field name="email" label="Email">
                  <input id="email" name="email" type="email" defaultValue={client.email ?? ""} className={inputCls} />
                </Field>
                <Field name="phone" label="Phone">
                  <input id="phone" name="phone" defaultValue={client.phone ?? ""} className={inputCls} />
                </Field>
                <Field name="status" label="Status">
                  <select id="status" name="status" defaultValue={client.status} className={inputCls}>
                    <option value="lead">Lead</option>
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="closed">Closed</option>
                  </select>
                </Field>
                <div className="sm:col-span-2">
                  <Field name="notes" label="Internal notes (never shown to the client)">
                    <textarea id="notes" name="notes" rows={4} defaultValue={client.notes ?? ""} className={inputCls} />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" className={btnPrimary}>
                    Save client
                  </button>
                </div>
              </form>
            </Card>
          </section>
        </div>

        <aside className="space-y-6">
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Portal logins</h2>
            <Card className="space-y-4">
              {logins.length === 0 ? (
                <p className="text-sm text-slate-500">No logins yet. Create one so this client can see their projects.</p>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {logins.map((l) => (
                    <li key={l.id} className="flex items-center justify-between gap-2 py-2">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium text-slate-900">{l.name}</div>
                        <div className="truncate text-xs text-slate-500">{l.email}</div>
                      </div>
                      <form action={deleteClientLoginAction}>
                        <input type="hidden" name="id" value={l.id} />
                        <input type="hidden" name="client_id" value={client.id} />
                        <button type="submit" className={btnDanger}>
                          Remove
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              )}
              <form action={createClientLoginAction} className="space-y-2 border-t border-slate-100 pt-4">
                <input type="hidden" name="client_id" value={client.id} />
                <input name="name" required placeholder="Name" aria-label="Login name" className={inputCls} defaultValue={client.name} />
                <input name="email" type="email" required placeholder="Email" aria-label="Login email" className={inputCls} defaultValue={client.email ?? ""} />
                <input name="password" type="password" required minLength={10} placeholder="Password (10+ chars)" aria-label="Login password" autoComplete="new-password" className={inputCls} />
                <label className="flex items-center gap-2 text-xs text-slate-600">
                  <input type="checkbox" name="send_welcome" defaultChecked /> Email them a welcome message (no password included)
                </label>
                <button type="submit" className={`${btnPrimary} w-full`}>
                  Create client login
                </button>
                <p className="text-xs text-slate-500">Share the email and password with the client. They only ever see their own projects.</p>
              </form>
            </Card>
          </section>

          {user.role === "admin" && (
            <details>
              <summary className="cursor-pointer text-xs font-medium text-red-600">Danger zone</summary>
              <form action={deleteClientAction} className="mt-3">
                <input type="hidden" name="id" value={client.id} />
                <button type="submit" className={btnDanger}>
                  Permanently delete client, logins and all projects
                </button>
              </form>
            </details>
          )}
        </aside>
      </div>
    </>
  );
}
