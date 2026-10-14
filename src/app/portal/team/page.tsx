import { ShieldCheck, Trash2, UserPlus } from "lucide-react";
import { requireUser } from "@/lib/portal/auth";
import { getStaffUsers } from "@/lib/portal/data";
import { createStaffUserAction, deleteStaffUserAction } from "@/lib/portal/actions";
import { Avatar, Badge, btnPrimary, Card, Field, Flash, inputCls, PageHeader, SectionTitle, timeAgo } from "@/components/portal/ui";

export default async function TeamPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ok?: string }>;
}) {
  const me = await requireUser(["admin"]);
  const [{ error, ok }, staff] = await Promise.all([searchParams, getStaffUsers()]);

  return (
    <>
      <PageHeader title="Team" subtitle="People who manage clients, projects, tasks and updates." />
      <Flash error={error} ok={ok} />
      <div className="grid gap-6 lg:grid-cols-5">
        <section className="lg:col-span-3">
          <SectionTitle>Members · {staff.length}</SectionTitle>
          <Card className="divide-y divide-slate-100 !p-0">
            {staff.map((s) => (
              <div key={s.id} className="flex items-center gap-3 px-5 py-3.5">
                <Avatar name={s.name} size={38} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold text-slate-900">{s.name}</span>
                    {s.id === me.id && <span className="text-[11px] text-slate-400">(you)</span>}
                  </div>
                  <div className="truncate text-xs text-slate-500">
                    {s.email} · joined {timeAgo(s.created_at)}
                  </div>
                </div>
                <Badge value={s.role} />
                {s.id !== me.id && (
                  <form action={deleteStaffUserAction}>
                    <input type="hidden" name="id" value={s.id} />
                    <button type="submit" className="cursor-pointer rounded-lg p-1.5 text-slate-300 hover:bg-red-50 hover:text-red-600" aria-label={`Remove ${s.name}`}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </div>
            ))}
          </Card>
        </section>
        <section className="lg:col-span-2">
          <SectionTitle>Invite a member</SectionTitle>
          <Card>
            <form action={createStaffUserAction} className="space-y-4">
              <Field name="name" label="Name">
                <input id="name" name="name" required className={inputCls} />
              </Field>
              <Field name="email" label="Email">
                <input id="email" name="email" type="email" required className={inputCls} />
              </Field>
              <Field name="password" label="Temporary password" hint="10+ characters. They can change it under Account.">
                <input id="password" name="password" type="password" required minLength={10} autoComplete="new-password" className={inputCls} />
              </Field>
              <Field name="role" label="Role">
                <select id="role" name="role" className={inputCls} defaultValue="team">
                  <option value="team">Team: manage clients and projects</option>
                  <option value="admin">Admin: also manage users and delete data</option>
                </select>
              </Field>
              <button type="submit" className={`${btnPrimary} w-full`}>
                <UserPlus className="h-4 w-4" /> Add member
              </button>
            </form>
          </Card>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5" /> Changing a password signs that person out everywhere.
          </p>
        </section>
      </div>
    </>
  );
}
