import Link from "next/link";
import { KanbanSquare, List, Mail, Phone, Search, UserPlus, Users } from "lucide-react";
import { requireUser } from "@/lib/portal/auth";
import { getClients, type ClientRow } from "@/lib/portal/data";
import { createClientAction } from "@/lib/portal/actions";
import {
  Avatar,
  Badge,
  btnPrimary,
  Card,
  Disclosure,
  Empty,
  Field,
  Flash,
  inputCls,
  PageHeader,
  STATUS_DOT,
} from "@/components/portal/ui";

const STATUSES = ["lead", "active", "paused", "closed"] as const;
const STATUS_LABEL: Record<string, string> = { lead: "Leads", active: "Active", paused: "Paused", closed: "Closed" };

function ClientCard({ c }: { c: ClientRow }) {
  return (
    <Link href={`/portal/clients/${c.id}`} className="block">
      <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-center gap-3">
          <Avatar name={c.company || c.name} size={34} />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-slate-900">{c.company || c.name}</div>
            {c.company && <div className="truncate text-xs text-slate-500">{c.name}</div>}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-500">
          <span>
            {c.project_count} project{c.project_count === 1 ? "" : "s"}
          </span>
          {c.login_count > 0 && <span className="text-emerald-600">● Portal access</span>}
        </div>
      </div>
    </Link>
  );
}

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ok?: string; q?: string; status?: string; view?: string }>;
}) {
  await requireUser(["admin", "team"]);
  const sp = await searchParams;
  const q = (sp.q ?? "").trim().slice(0, 100);
  const status = (STATUSES as readonly string[]).includes(sp.status ?? "") ? (sp.status as string) : "";
  const view = sp.view === "board" ? "board" : "list";
  const [clients, all] = await Promise.all([getClients(q, view === "board" ? "" : status), getClients()]);
  const counts = Object.fromEntries(STATUSES.map((s) => [s, all.filter((c) => c.status === s).length]));
  const qs = (patch: Record<string, string>) => {
    const p = new URLSearchParams({ ...(q ? { q } : {}), ...(status ? { status } : {}), view, ...patch });
    for (const [k, v] of [...p.entries()]) if (!v) p.delete(k);
    return `/portal/clients?${p}`;
  };

  return (
    <>
      <PageHeader
        title="Clients"
        subtitle={`${all.length} client${all.length === 1 ? "" : "s"} · ${counts.lead} lead${counts.lead === 1 ? "" : "s"} in the pipeline`}
        actions={
          <div className="flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
            <Link
              href={qs({ view: "list" })}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${view === "list" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900"}`}
            >
              <List className="h-3.5 w-3.5" /> List
            </Link>
            <Link
              href={qs({ view: "board" })}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${view === "board" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900"}`}
            >
              <KanbanSquare className="h-3.5 w-3.5" /> Pipeline
            </Link>
          </div>
        }
      />
      <Flash error={sp.error} ok={sp.ok} />

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <form className="relative min-w-[220px] flex-1" action="/portal/clients">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input name="q" defaultValue={q} placeholder="Search by name, company or email…" aria-label="Search clients" className={`${inputCls} pl-10`} />
          {status && <input type="hidden" name="status" value={status} />}
          <input type="hidden" name="view" value={view} />
        </form>
      </div>

      <Disclosure
        className="mb-6"
        summary={
          <span className={`${btnPrimary} cursor-pointer`}>
            <UserPlus className="h-4 w-4" /> New client
          </span>
        }
      >
        <NewClientForm />
      </Disclosure>


      {view === "list" && (
        <div className="mb-4 flex flex-wrap gap-2">
          <Link
            href={qs({ status: "" })}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${!status ? "border-[#066bf5] bg-[#066bf5] text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}
          >
            All <span className="opacity-70">{all.length}</span>
          </Link>
          {STATUSES.map((s) => (
            <Link
              key={s}
              href={qs({ status: s })}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                status === s ? "border-[#066bf5] bg-[#066bf5] text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS_DOT[s] }} />
              {STATUS_LABEL[s]} <span className="opacity-70">{counts[s]}</span>
            </Link>
          ))}
        </div>
      )}

      {clients.length === 0 ? (
        <Empty icon={Users} title={q || status ? "No matching clients" : "No clients yet"}>
          {q || status ? "Try a different search or filter." : "Add your first client with the New client button."}
        </Empty>
      ) : view === "board" ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {STATUSES.map((s) => {
            const items = clients.filter((c) => c.status === s);
            return (
              <div key={s} className="rounded-2xl border border-slate-200/70 bg-slate-100/60 p-3">
                <div className="mb-3 flex items-center gap-2 px-1">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: STATUS_DOT[s] }} />
                  <span className="text-sm font-semibold text-slate-700">{STATUS_LABEL[s]}</span>
                  <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-500 shadow-sm">{items.length}</span>
                </div>
                <div className="space-y-2.5">
                  {items.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 px-3 py-6 text-center text-xs text-slate-400">Empty</div>
                  ) : (
                    items.map((c) => <ClientCard key={c.id} c={c} />)
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card className="overflow-x-auto !p-0">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50/70 text-[11px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Client</th>
                <th className="px-5 py-3 font-semibold">Contact</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Projects</th>
                <th className="px-5 py-3 font-semibold">Portal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clients.map((c) => (
                <tr key={c.id} className="transition hover:bg-slate-50/70">
                  <td className="px-5 py-3.5">
                    <Link href={`/portal/clients/${c.id}`} className="flex items-center gap-3">
                      <Avatar name={c.company || c.name} size={34} />
                      <span className="min-w-0">
                        <span className="block truncate font-semibold text-slate-900 hover:text-[#066bf5]">{c.company || c.name}</span>
                        {c.company && <span className="block truncate text-xs text-slate-500">{c.name}</span>}
                      </span>
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-600">
                    {c.email && (
                      <span className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-slate-400" /> {c.email}
                      </span>
                    )}
                    {c.phone && (
                      <span className="mt-0.5 flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-slate-400" /> {c.phone}
                      </span>
                    )}
                    {!c.email && !c.phone && <span className="text-slate-400">-</span>}
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge value={c.status} />
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">
                    <span className="font-semibold text-slate-900">{c.active_projects}</span> active
                    <span className="text-slate-400"> / {c.project_count}</span>
                  </td>
                  <td className="px-5 py-3.5 text-xs">
                    {c.login_count > 0 ? (
                      <span className="font-medium text-emerald-600">● {c.login_count} login{c.login_count === 1 ? "" : "s"}</span>
                    ) : (
                      <span className="text-slate-400">No access</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </>
  );
}

function NewClientForm() {
  return (
    <Card>
        <form action={createClientAction} className="grid gap-4 sm:grid-cols-2">
          <Field name="name" label="Contact name *">
            <input id="name" name="name" required className={inputCls} />
          </Field>
          <Field name="company" label="Company">
            <input id="company" name="company" className={inputCls} />
          </Field>
          <Field name="email" label="Email">
            <input id="email" name="email" type="email" className={inputCls} />
          </Field>
          <Field name="phone" label="Phone">
            <input id="phone" name="phone" className={inputCls} />
          </Field>
          <Field name="status" label="Stage">
            <select id="status" name="status" className={inputCls} defaultValue="lead">
              <option value="lead">Lead</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="closed">Closed</option>
            </select>
          </Field>
          <div className="sm:col-span-2">
            <Field name="notes" label="Internal notes" hint="Never shown to the client.">
              <textarea id="notes" name="notes" rows={3} className={inputCls} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className={btnPrimary}>
              Create client
            </button>
          </div>
        </form>
    </Card>
  );
}
