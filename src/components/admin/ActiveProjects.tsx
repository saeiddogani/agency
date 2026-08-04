import { EmptyState } from "@/components/admin/EmptyState";
import { demoActiveProjects, type ProjectStage } from "@/lib/admin-demo-data";

const stageBadge: Record<ProjectStage, string> = {
  Planning: "bg-ink-100 text-ink-600",
  Design: "bg-brand-50 text-brand-700",
  Development: "bg-amber-50 text-amber-700",
  Review: "bg-violet-50 text-violet-700",
  Launch: "bg-emerald-50 text-emerald-700",
};

const stageBar: Record<ProjectStage, string> = {
  Planning: "bg-ink-300",
  Design: "bg-brand-500",
  Development: "bg-amber-500",
  Review: "bg-violet-500",
  Launch: "bg-emerald-500",
};

export function ActiveProjects() {
  if (demoActiveProjects.length === 0) {
    return <EmptyState title="No active projects." message="Won leads will show up here once work begins." />;
  }

  return (
    <div className="-mx-5 overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-ink-100 text-left text-xs font-medium uppercase tracking-wide text-ink-400">
            <th className="px-5 py-2 font-medium">Project</th>
            <th className="px-5 py-2 font-medium">Client</th>
            <th className="px-5 py-2 font-medium">Stage</th>
            <th className="px-5 py-2 font-medium">Progress</th>
            <th className="px-5 py-2 font-medium">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {demoActiveProjects.map((project) => (
            <tr key={project.id} className="border-b border-ink-50 last:border-0">
              <td className="px-5 py-3 font-medium text-ink-900">{project.name}</td>
              <td className="px-5 py-3 text-ink-600">{project.client}</td>
              <td className="px-5 py-3">
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${stageBadge[project.stage]}`}
                >
                  {project.stageLabel ?? project.stage}
                </span>
              </td>
              <td className="px-5 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-ink-100">
                    <div
                      className={`h-full rounded-full ${stageBar[project.stage]}`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-ink-500">{project.progress}%</span>
                </div>
              </td>
              <td className="px-5 py-3 text-ink-600">{project.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
