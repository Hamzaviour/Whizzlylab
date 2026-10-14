import { KeyRound, Mail, ShieldCheck } from "lucide-react";
import { requireUser } from "@/lib/portal/auth";
import { changePasswordAction, updateProfileAction } from "@/lib/portal/actions";
import { Avatar, Badge, btnPrimary, Card, Field, Flash, inputCls, PageHeader } from "@/components/portal/ui";

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ok?: string }>;
}) {
  const user = await requireUser();
  const { error, ok } = await searchParams;
  return (
    <div className="max-w-2xl">
      <PageHeader title="Account" subtitle="Your profile and security settings." />
      <Flash error={error} ok={ok} />
      <Card className="mb-6">
        <div className="flex items-center gap-4">
          <Avatar name={user.name} size={56} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg font-semibold text-slate-900">{user.name}</span>
              <Badge value={user.role} text={user.role === "client" ? "Client" : user.role === "admin" ? "Admin" : "Team"} />
            </div>
            <div className="mt-0.5 flex items-center gap-1.5 text-sm text-slate-500">
              <Mail className="h-4 w-4" /> {user.email}
            </div>
          </div>
        </div>
        <form action={updateProfileAction} className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Field name="name" label="Display name" hint="Shown to your team and clients across the portal.">
              <input id="name" name="name" required maxLength={120} defaultValue={user.name} autoComplete="name" className={inputCls} />
            </Field>
          </div>
          <button type="submit" className={`${btnPrimary} sm:mb-[22px]`}>
            Save
          </button>
        </form>
      </Card>
      <Card>
        <div className="mb-4 flex items-center gap-2">
          <KeyRound className="h-4 w-4 text-[#066bf5]" />
          <h2 className="font-semibold text-slate-900">Change password</h2>
        </div>
        <form action={changePasswordAction} className="space-y-4">
          <Field name="current" label="Current password">
            <input id="current" name="current" type="password" required autoComplete="current-password" className={inputCls} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="password" label="New password" hint="At least 10 characters.">
              <input id="password" name="password" type="password" required minLength={10} autoComplete="new-password" className={inputCls} />
            </Field>
            <Field name="confirm" label="Confirm new password">
              <input id="confirm" name="confirm" type="password" required minLength={10} autoComplete="new-password" className={inputCls} />
            </Field>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck className="h-3.5 w-3.5" /> Signs you out on all other devices.
            </p>
            <button type="submit" className={btnPrimary}>
              Update password
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
