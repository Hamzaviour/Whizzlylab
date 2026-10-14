import Link from "next/link";
import { FolderKanban } from "lucide-react";
import { requireUser, isStaff } from "@/lib/portal/auth";
import { getProjects } from "@/lib/portal/data";
import { ProjectCard } from "@/components/portal/blocks";
import { Empty, label, PageHeader } from "@/components/portal/ui";

const FILTERS = ["all", "active", "planning", "in_progress", "review", "on_hold", "completed"] as const;

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const user = await requireUser();
  const staff = isStaff(user);
  const { status = "active" } = await searchParams;
  const filter = (FILTERS as readonly string[]).includes(status) ? status : "active";
  const all = await getProjects(user);
  const projects = all.filter((p) =>
    filter === "all" ? true : filter === "active" ? ["planning", "in_progress", "review"].includes(p.status) : p.status === filter
  );

  return (
    <>
      <PageHeader title={staff ? "Projects" : "My projects"} subtitle={`${all.length} project${all.length === 1 ? "" : "s"} in total`} />
      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count =
            f === "all"
              ? all.length
              : f === "active"
                ? all.filter((p) => ["planning", "in_progress", "review"].includes(p.status)).length
                : all.filter((p) => p.status === f).length;
          const on = f === filter;
          return (
            <Link
              key={f}
              href={`/portal/projects?status=${f}`}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                on ? "border-[#066bf5] bg-[#066bf5] text-white shadow-sm" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              {f === "all" ? "All" : f === "active" ? "Active" : label(f)}
              <span className={on ? "text-white/80" : "text-slate-400"}>{count}</span>
            </Link>
          );
        })}
      </div>
      {projects.length === 0 ? (
        <Empty icon={FolderKanban} title="No projects here">
          {staff ? "Create projects from a client's page." : "Nothing in this view yet."}
        </Empty>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} p={p} showClient={staff} />
          ))}
        </div>
      )}
    </>
  );
}
