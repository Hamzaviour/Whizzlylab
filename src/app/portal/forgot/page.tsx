import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { forgotPasswordAction } from "@/lib/portal/actions";
import AuthFrame from "@/components/portal/AuthFrame";
import { btnPrimary, Field, Flash, inputCls } from "@/components/portal/ui";

export default async function ForgotPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ok?: string }>;
}) {
  const { error, ok } = await searchParams;
  return (
    <AuthFrame>
      <h1 className="font-heading text-[28px] font-bold tracking-tight text-slate-900">Reset your password</h1>
      <p className="mb-7 mt-1.5 text-sm text-slate-500">Enter your account email and we&apos;ll send you a secure link to set a new one.</p>
      <Flash error={error} ok={ok} />
      <form action={forgotPasswordAction} className="space-y-4">
        <Field name="email" label="Email">
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={inputCls} />
        </Field>
        <button type="submit" className={`${btnPrimary} w-full`}>
          <Mail className="h-4 w-4" /> Send reset link
        </button>
      </form>
      <Link href="/portal/login" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900">
        <ArrowLeft className="h-4 w-4" /> Back to sign in
      </Link>
    </AuthFrame>
  );
}
