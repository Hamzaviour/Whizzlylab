import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const POINTS = [
  "Live progress on every project and milestone",
  "Approve deliverables and request changes in one click",
  "Updates, files and conversations in one place",
];

/** Split-screen frame for the signed-out portal pages. */
export default function AuthFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden overflow-hidden bg-[#0b0820] p-12 text-white lg:flex lg:flex-col">
        <div aria-hidden className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#7c3aed] opacity-40 blur-[120px]" />
        <div aria-hidden className="absolute -bottom-32 right-0 h-[28rem] w-[28rem] rounded-full bg-[#066bf5] opacity-40 blur-[140px]" />
        <div aria-hidden className="absolute right-24 top-1/3 h-48 w-48 rounded-full bg-[#00d4f8] opacity-25 blur-[100px]" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
        />

        <div className="relative flex items-center gap-3">
          <Image src="/portal-mark.png" alt="" width={44} height={44} priority />
          <div className="leading-tight">
            <div className="font-heading text-lg font-bold">Whizzly Lab</div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7dd3fc]">Client Portal</div>
          </div>
        </div>

        <div className="relative mt-auto max-w-md">
          <Image src="/portal-mark.png" alt="" width={120} height={120} className="mb-8 drop-shadow-[0_20px_40px_rgba(124,58,237,0.5)]" />
          <h2 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight">
            Your project,{" "}
            <span className="bg-gradient-to-r from-[#c4b5fd] via-[#7dd3fc] to-[#67e8f9] bg-clip-text text-transparent">fully transparent.</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-300">
            Where innovation meets extraordinary thinking. Follow every sprint with the Whizzly Lab team, in real time.
          </p>
          <ul className="mt-8 space-y-3">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#67e8f9]" /> {p}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative mt-12 text-xs text-slate-500">© Whizzly Lab · whizzlylab.com</p>
      </aside>

      <main className="flex items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-[400px]">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <Image src="/portal-mark.png" alt="" width={36} height={36} priority />
            <div className="leading-tight">
              <div className="font-heading text-[15px] font-bold">Whizzly Lab</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#066bf5]">Client Portal</div>
            </div>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
