import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/portal/auth";
import { sql } from "@/lib/portal/db";
import { loginAction, setupAdminAction } from "@/lib/portal/actions";
import { btnPrimary, Card, Field, Flash, inputCls } from "@/components/portal/ui";

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
    <div className="mx-auto max-w-md pt-8">
      <Card>
        <h1 className="font-heading text-2xl font-bold tracking-tight">
          {needsSetup ? "Set up your portal" : "Sign in"}
        </h1>
        <p className="mt-1 mb-5 text-sm text-slate-500">
          {needsSetup
            ? "Create the first admin account. This screen disappears once an account exists."
            : "Whizzly Lab client & team portal."}
        </p>
        <Flash error={error} ok={ok} />
        {needsSetup ? (
          <form action={setupAdminAction} className="space-y-3">
            <Field name="setup_code" label="Setup code (PORTAL_SETUP_CODE env var)">
              <input id="setup_code" name="setup_code" type="password" required autoComplete="off" className={inputCls} />
            </Field>
            <Field name="name" label="Your name">
              <input id="name" name="name" required autoComplete="name" className={inputCls} />
            </Field>
            <Field name="email" label="Email">
              <input id="email" name="email" type="email" required autoComplete="email" className={inputCls} />
            </Field>
            <Field name="password" label="Password (10+ characters)">
              <input id="password" name="password" type="password" required minLength={10} autoComplete="new-password" className={inputCls} />
            </Field>
            <button type="submit" className={`${btnPrimary} w-full`}>
              Create admin account
            </button>
          </form>
        ) : (
          <form action={loginAction} className="space-y-3">
            <Field name="email" label="Email">
              <input id="email" name="email" type="email" required autoComplete="email" className={inputCls} />
            </Field>
            <Field name="password" label="Password">
              <input id="password" name="password" type="password" required autoComplete="current-password" className={inputCls} />
            </Field>
            <button type="submit" className={`${btnPrimary} w-full`}>
              Sign in
            </button>
            <Link href="/portal/forgot" className="block text-center text-xs text-slate-500 hover:text-slate-800">
              Forgot your password?
            </Link>
          </form>
        )}
      </Card>
    </div>
  );
}
