import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, KeyRound } from "lucide-react";
import { getUser } from "@/lib/portal/auth";
import { sql } from "@/lib/portal/db";
import { loginAction, setupAdminAction } from "@/lib/portal/actions";
import AuthFrame from "@/components/portal/AuthFrame";
import { btnPrimary, Field, Flash, inputCls } from "@/components/portal/ui";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ok?: string }>;
}) {
  if (await getUser()) redirect("/portal");
  const { error, ok } = await searchParams;
  const rows = (await sql()`SELECT count(*)::int AS n FROM users`) as { n: number }[];
  const needsSetup = rows[0].n === 0;

  return (
    <AuthFrame>
      <h1 className="font-heading text-[28px] font-bold tracking-tight text-slate-900">
        {needsSetup ? "Set up your portal" : "Welcome back"}
      </h1>
      <p className="mb-7 mt-1.5 text-sm text-slate-500">
        {needsSetup
          ? "Create the first admin account. This screen disappears once an account exists."
          : "Sign in to follow your projects with the Whizzly Lab team."}
      </p>
      <Flash error={error} ok={ok} />

      {needsSetup ? (
        <form action={setupAdminAction} className="space-y-4">
          <Field name="setup_code" label="Setup code" hint="The PORTAL_SETUP_CODE environment variable.">
            <input id="setup_code" name="setup_code" type="password" required autoComplete="off" className={inputCls} />
          </Field>
          <Field name="name" label="Your name">
            <input id="name" name="name" required autoComplete="name" className={inputCls} />
          </Field>
          <Field name="email" label="Email">
            <input id="email" name="email" type="email" required autoComplete="email" className={inputCls} />
          </Field>
          <Field name="password" label="Password" hint="At least 10 characters.">
            <input id="password" name="password" type="password" required minLength={10} autoComplete="new-password" className={inputCls} />
          </Field>
          <button type="submit" className={`${btnPrimary} w-full`}>
            <KeyRound className="h-4 w-4" /> Create admin account
          </button>
        </form>
      ) : (
        <form action={loginAction} className="space-y-4">
          <Field name="email" label="Email">
            <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={inputCls} />
          </Field>
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="password" className="text-xs font-semibold text-slate-600">
                Password
              </label>
              <Link href="/portal/forgot" className="text-xs font-medium text-[#066bf5] hover:underline">
                Forgot password?
              </Link>
            </div>
            <input id="password" name="password" type="password" required autoComplete="current-password" className={inputCls} />
          </div>
          <button type="submit" className={`${btnPrimary} w-full`}>
            Sign in <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      )}

      <p className="mt-8 text-center text-xs text-slate-400">
        Need access? Contact your Whizzly Lab project lead or{" "}
        <a href="mailto:whizzlylab@gmail.com" className="font-medium text-slate-600 hover:text-slate-900">
          whizzlylab@gmail.com
        </a>
      </p>
    </AuthFrame>
  );
}
