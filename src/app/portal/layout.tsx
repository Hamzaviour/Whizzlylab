import type { Metadata } from "next";
import { getUser } from "@/lib/portal/auth";
import Shell from "@/components/portal/Shell";

export const metadata: Metadata = {
  title: "Client Portal",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  // Signed-out screens (login, forgot, reset) render full-bleed without the app shell.
  if (!user) {
    return <div className="relative z-10 min-h-screen bg-[#f5f7fb] text-slate-900 [color-scheme:light]">{children}</div>;
  }

  return <Shell user={{ name: user.name, email: user.email, role: user.role }}>{children}</Shell>;
}
