import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, FolderPlus, KeyRound, Mail, Phone, StickyNote, Trash2 } from "lucide-react";
import { requireUser } from "@/lib/portal/auth";
import { getClient, getClientUsers, getProjects } from "@/lib/portal/data";
import {
  createClientLoginAction,
  createProjectAction,
  deleteClientAction,
  deleteClientLoginAction,
  updateClientAction,
} from "@/lib/portal/actions";
import { ProjectCard } from "@/components/portal/blocks";
import {
  Avatar,
  Badge,
  btnDanger,
  btnPrimary,
  Card,
  Disclosure,
  Empty,
  Field,
  Flash,
  inputCls,
  SectionTitle,
  timeAgo,
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
  const display = client.company || client.name;

  return (
    <>
      <Link href="/portal/clients" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900">
        <ArrowLeft className="h-4 w-4" /> All clients
      </Link>

      <Card className="mb-6 !p-0">
        <div aria-hidden className="h-1.5 rounded-t-2xl bg-gradient-to-r from-[#7c3aed] via-[#066bf5] to-[#00d4f8]" />
        <div className="flex flex-wrap items-center gap-5 p-6">
          <Avatar name={display} size={60} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-900">{display}</h1>
              <Badge value={client.status} />
            </div>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-500">
              {client.company && (
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" /> {client.name}
                </span>
              )}
              {client.email && (
                <a href={`mailto:${client.email}`} className="inline-flex items-center gap-1.5 hover:text-slate-900">
                  <Mail className="h-4 w-4" /> {client.email}
                </a>
              )}
              {client.phone && (
                <a href={`tel:${client.phone}`} className="inline-flex items-center gap-1.5 hover:text-slate-900">
                  <Phone className="h-4 w-4" /> {client.phone}
                </a>
              )}
            </div>
          </div>
          <div className="flex gap-6 text-center">
            <div>
              <div className="font-heading text-2xl font-bold text-slate-900">{projects.length}</div>
              <div className="text-xs text-slate-500">Projects</div>
            </div>
            <div>
              <div className="font-heading text-2xl font-bold text-slate-900">{logins.length}</div>
              <div className="text-xs text-slate-500">Logins</div>
            </div>
          </div>
        </div>
      </Card>

      <Flash error={error} ok={ok} />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-8 xl:col-span-2">
          <section>
            <SectionTitle>Projects</SectionTitle>
            <Disclosure
              className="mb-4"
              summary={
                <span className={`${btnPrimary} cursor-pointer`}>
                  <FolderPlus className="h-4 w-4" /> New project
                </span>
              }
            >
              <Card>
                <form action={createProjectAction} className="grid gap-4 sm:grid-cols-2">
                  <input type="hidden" name="client_id" value={client.id} />
                  <div className="sm:col-span-2">
                    <Field name="p_name" label="Project name *">
                      <input id="p_name" name="name" required className={inputCls} placeholder="e.g. E-commerce platform rebuild" />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field name="p_desc" label="Description" hint="Visible to the client.">
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
            </Disclosure>
            {projects.length === 0 ? (
              <Empty icon={FolderPlus} title="No projects yet">
                Create the first project for this client.
              </Empty>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {projects.map((p) => (
                  <ProjectCard key={p.id} p={p} showClient={false} />
                ))}
              </div>
            )}
          </section>

          <section>
            <SectionTitle>Client details</SectionTitle>
            <Card>
              <form action={updateClientAction} className="grid gap-4 sm:grid-cols-2">
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
                <Field name="status" label="Stage">
                  <select id="status" name="status" defaultValue={client.status} className={inputCls}>
                    <option value="lead">Lead</option>
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="closed">Closed</option>
                  </select>
                </Field>
                <div className="sm:col-span-2">
                  <Field name="notes" label="Internal notes" hint="Never shown to the client.">
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

        <aside className="space-y-8">
          {client.notes && (
            <section>
              <SectionTitle>Internal notes</SectionTitle>
              <Card className="border-amber-200 !bg-amber-50/60">
                <StickyNote className="mb-2 h-4 w-4 text-amber-600" />
                <p className="whitespace-pre-wrap text-sm text-slate-700">{client.notes}</p>
              </Card>
            </section>
          )}

          <section>
            <SectionTitle>Portal access</SectionTitle>
            <Card className="space-y-4">
              {logins.length === 0 ? (
                <p className="text-sm text-slate-500">No logins yet. Create one so this client can follow their projects.</p>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {logins.map((l) => (
                    <li key={l.id} className="flex items-center gap-3 py-2.5">
                      <Avatar name={l.name} size={32} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold text-slate-900">{l.name}</div>
                        <div className="truncate text-xs text-slate-500">
                          {l.email} · added {timeAgo(l.created_at)}
                        </div>
                      </div>
                      <form action={deleteClientLoginAction}>
                        <input type="hidden" name="id" value={l.id} />
                        <input type="hidden" name="client_id" value={client.id} />
                        <button type="submit" className="cursor-pointer rounded-lg p-1.5 text-slate-300 hover:bg-red-50 hover:text-red-600" aria-label={`Remove ${l.name}`}>
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              )}
              <Disclosure
                summary={
                  <span className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-600 hover:border-[#066bf5] hover:text-[#066bf5]">
                    <KeyRound className="h-4 w-4" /> Create client login
                  </span>
                }
              >
                <form action={createClientLoginAction} className="space-y-3">
                  <input type="hidden" name="client_id" value={client.id} />
                  <input name="name" required placeholder="Name" aria-label="Login name" className={inputCls} defaultValue={client.name} />
                  <input name="email" type="email" required placeholder="Email" aria-label="Login email" className={inputCls} defaultValue={client.email ?? ""} />
                  <input name="password" type="password" required minLength={10} placeholder="Password (10+ chars)" aria-label="Login password" autoComplete="new-password" className={inputCls} />
                  <label className="flex items-center gap-2 text-xs text-slate-600">
                    <input type="checkbox" name="send_welcome" defaultChecked /> Email a welcome message (password not included)
                  </label>
                  <button type="submit" className={`${btnPrimary} w-full`}>
                    Create login
                  </button>
                  <p className="text-[11px] text-slate-400">Share the password with the client yourself. They only ever see their own projects.</p>
                </form>
              </Disclosure>
            </Card>
          </section>

          {user.role === "admin" && (
            <section>
              <Card className="border-red-200">
                <h3 className="text-sm font-semibold text-red-700">Danger zone</h3>
                <p className="mt-1 text-xs text-slate-500">Deletes this client, their logins and every project. This cannot be undone.</p>
                <Disclosure className="mt-3" summary={<span className={`${btnDanger} cursor-pointer`}>Delete client…</span>}>
                  <form action={deleteClientAction}>
                    <input type="hidden" name="id" value={client.id} />
                    <button type="submit" className="cursor-pointer rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700">
                      Yes, permanently delete {display}
                    </button>
                  </form>
                </Disclosure>
              </Card>
            </section>
          )}
        </aside>
      </div>
    </>
  );
}
