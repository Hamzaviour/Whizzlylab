import { requireUser } from "@/lib/portal/auth";
import { changePasswordAction } from "@/lib/portal/actions";
import { btnPrimary, Card, Field, Flash, inputCls, PageHeader } from "@/components/portal/ui";

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ok?: string }>;
}) {
  const user = await requireUser();
  const { error, ok } = await searchParams;
  return (
    <div className="max-w-lg">
      <PageHeader title="Account" subtitle={`${user.name} · ${user.email}`} />
      <Flash error={error} ok={ok} />
      <Card>
        <h2 className="mb-3 text-sm font-semibold text-slate-900">Change password</h2>
        <form action={changePasswordAction} className="space-y-3">
          <Field name="current" label="Current password">
            <input id="current" name="current" type="password" required autoComplete="current-password" className={inputCls} />
          </Field>
          <Field name="password" label="New password (10+ characters)">
            <input id="password" name="password" type="password" required minLength={10} autoComplete="new-password" className={inputCls} />
          </Field>
          <Field name="confirm" label="Confirm new password">
            <input id="confirm" name="confirm" type="password" required minLength={10} autoComplete="new-password" className={inputCls} />
          </Field>
          <button type="submit" className={btnPrimary}>
            Change password
          </button>
          <p className="text-xs text-slate-500">Changing your password signs you out on all other devices.</p>
        </form>
      </Card>
    </div>
  );
}
