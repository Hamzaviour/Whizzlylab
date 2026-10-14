import { KeyRound } from "lucide-react";
import { resetPasswordAction } from "@/lib/portal/actions";
import AuthFrame from "@/components/portal/AuthFrame";
import { btnPrimary, Field, Flash, inputCls } from "@/components/portal/ui";

export default async function ResetPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const [{ token }, { error }] = await Promise.all([params, searchParams]);
  return (
    <AuthFrame>
      <h1 className="font-heading text-[28px] font-bold tracking-tight text-slate-900">Choose a new password</h1>
      <p className="mb-7 mt-1.5 text-sm text-slate-500">Use at least 10 characters. This signs you out on other devices.</p>
      <Flash error={error} />
      <form action={resetPasswordAction} className="space-y-4">
        <input type="hidden" name="token" value={decodeURIComponent(token)} />
        <Field name="password" label="New password">
          <input id="password" name="password" type="password" required minLength={10} autoComplete="new-password" className={inputCls} />
        </Field>
        <Field name="confirm" label="Confirm new password">
          <input id="confirm" name="confirm" type="password" required minLength={10} autoComplete="new-password" className={inputCls} />
        </Field>
        <button type="submit" className={`${btnPrimary} w-full`}>
          <KeyRound className="h-4 w-4" /> Update password
        </button>
      </form>
    </AuthFrame>
  );
}
