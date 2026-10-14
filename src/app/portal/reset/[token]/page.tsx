import { resetPasswordAction } from "@/lib/portal/actions";
import { btnPrimary, Card, Field, Flash, inputCls } from "@/components/portal/ui";

export default async function ResetPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const [{ token }, { error }] = await Promise.all([params, searchParams]);
  return (
    <div className="mx-auto max-w-md pt-8">
      <Card>
        <h1 className="font-heading text-2xl font-bold tracking-tight">Set a new password</h1>
        <p className="mt-1 mb-5 text-sm text-slate-500">Choose a password of at least 10 characters.</p>
        <Flash error={error} />
        <form action={resetPasswordAction} className="space-y-3">
          <input type="hidden" name="token" value={decodeURIComponent(token)} />
          <Field name="password" label="New password">
            <input id="password" name="password" type="password" required minLength={10} autoComplete="new-password" className={inputCls} />
          </Field>
          <Field name="confirm" label="Confirm new password">
            <input id="confirm" name="confirm" type="password" required minLength={10} autoComplete="new-password" className={inputCls} />
          </Field>
          <button type="submit" className={`${btnPrimary} w-full`}>
            Update password
          </button>
        </form>
      </Card>
    </div>
  );
}
