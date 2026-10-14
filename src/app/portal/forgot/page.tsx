import Link from "next/link";
import { forgotPasswordAction } from "@/lib/portal/actions";
import { btnPrimary, Card, Field, Flash, inputCls } from "@/components/portal/ui";

export default async function ForgotPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ok?: string }>;
}) {
  const { error, ok } = await searchParams;
  return (
    <div className="mx-auto max-w-md pt-8">
      <Card>
        <h1 className="font-heading text-2xl font-bold tracking-tight">Forgot your password?</h1>
        <p className="mt-1 mb-5 text-sm text-slate-500">Enter your account email and we&apos;ll send you a link to set a new one.</p>
        <Flash error={error} ok={ok} />
        <form action={forgotPasswordAction} className="space-y-3">
          <Field name="email" label="Email">
            <input id="email" name="email" type="email" required autoComplete="email" className={inputCls} />
          </Field>
          <button type="submit" className={`${btnPrimary} w-full`}>
            Send reset link
          </button>
        </form>
        <Link href="/portal/login" className="mt-4 inline-block text-xs text-slate-500 hover:text-slate-800">
          ← Back to sign in
        </Link>
      </Card>
    </div>
  );
}
