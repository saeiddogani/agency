import { PipelineCard } from "@/components/admin/PipelineCard";
import { demoLeads, pipelineStages } from "@/lib/admin-demo-data";

export function SalesPipeline() {
  return (
    <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-2">
      {pipelineStages.map((stage) => {
        const leads = demoLeads.filter((lead) => lead.stage === stage);
        return (
          <div key={stage} className="flex w-64 shrink-0 flex-col gap-3">
            <div className="flex items-baseline justify-between px-1">
              <h3 className="text-sm font-semibold text-ink-900">{stage}</h3>
              <span className="text-xs font-medium text-ink-400">
                {leads.length} {leads.length === 1 ? "lead" : "leads"}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {leads.length === 0 ? (
                <div className="rounded-lg border border-dashed border-ink-200 px-3 py-6 text-center text-xs text-ink-400">
                  No leads
                </div>
              ) : (
                leads.map((lead) => <PipelineCard key={lead.id} lead={lead} />)
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
