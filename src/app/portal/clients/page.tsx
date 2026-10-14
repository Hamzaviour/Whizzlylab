import Link from "next/link";
import { requireUser } from "@/lib/portal/auth";
import { getClients } from "@/lib/portal/data";
import { createClientAction } from "@/lib/portal/actions";
import { Badge, btnPrimary, Card, Empty, Field, Flash, inputCls, PageHeader } from "@/components/portal/ui";

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ok?: string }>;
}) {
  await requireUser(["admin", "team"]);
  const [{ error, ok }, clients] = await Promise.all([searchParams, getClients()]);

  return (
    <>
      <PageHeader title="Clients" subtitle="Leads and customers, with their projects and portal logins." />
      <Flash error={error} ok={ok} />

      <details className="group mb-6">
        <summary className={`${btnPrimary} list-none`}>+ New client</summary>
        <Card className="mt-3">
          <form action={createClientAction} className="grid gap-3 sm:grid-cols-2">
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
            <Field name="status" label="Status">
              <select id="status" name="status" className={inputCls} defaultValue="lead">
                <option value="lead">Lead</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="closed">Closed</option>
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field name="notes" label="Internal notes (never shown to the client)">
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
      </details>

      {clients.length === 0 ? (
        <Empty>No clients yet. Create your first one above.</Empty>
      ) : (
        <Card className="overflow-x-auto !p-0">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Projects</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clients.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link href={`/portal/clients/${c.id}`} className="font-medium text-slate-900 hover:text-[#066bf5]">
                      {c.name}
                    </Link>
                    {c.company && <div className="text-xs text-slate-500">{c.company}</div>}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{c.email ?? c.phone ?? "-"}</td>
                  <td className="px-4 py-3">
                    <Badge value={c.status} />
                  </td>
                  <td className="px-4 py-3 text-right text-slate-600">{c.project_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </>
  );
}
