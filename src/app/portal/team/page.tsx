import { requireUser } from "@/lib/portal/auth";
import { getStaffUsers } from "@/lib/portal/data";
import { createStaffUserAction, deleteStaffUserAction } from "@/lib/portal/actions";
import { Badge, btnDanger, btnPrimary, Card, Field, Flash, inputCls, PageHeader } from "@/components/portal/ui";

export default async function TeamPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ok?: string }>;
}) {
  const me = await requireUser(["admin"]);
  const [{ error, ok }, staff] = await Promise.all([searchParams, getStaffUsers()]);

  return (
    <>
      <PageHeader title="Team" subtitle="People who can manage clients, projects, tasks and updates." />
      <Flash error={error} ok={ok} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="divide-y divide-slate-100 !p-0">
          {staff.map((s) => (
            <div key={s.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-slate-900">{s.name}</div>
                <div className="truncate text-xs text-slate-500">{s.email}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge value={s.role === "admin" ? "milestone" : "update"} />
                <span className="text-xs capitalize text-slate-500">{s.role}</span>
                {s.id !== me.id && (
                  <form action={deleteStaffUserAction}>
                    <input type="hidden" name="id" value={s.id} />
                    <button type="submit" className={btnDanger}>
                      Remove
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </Card>
        <Card>
          <h2 className="mb-3 text-sm font-semibold text-slate-900">Add a team member</h2>
          <form action={createStaffUserAction} className="space-y-3">
            <Field name="name" label="Name">
              <input id="name" name="name" required className={inputCls} />
            </Field>
            <Field name="email" label="Email">
              <input id="email" name="email" type="email" required className={inputCls} />
            </Field>
            <Field name="password" label="Temporary password (10+ characters)">
              <input id="password" name="password" type="password" required minLength={10} autoComplete="new-password" className={inputCls} />
            </Field>
            <Field name="role" label="Role">
              <select id="role" name="role" className={inputCls} defaultValue="team">
                <option value="team">Team (manage clients and projects)</option>
                <option value="admin">Admin (also manage users and delete data)</option>
              </select>
            </Field>
            <button type="submit" className={btnPrimary}>
              Create user
            </button>
          </form>
        </Card>
      </div>
    </>
  );
}
