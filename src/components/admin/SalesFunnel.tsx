import { IconChevronDown } from "@/components/icons";
import { demoSalesFunnel } from "@/lib/admin-demo-data";

/** Darkens as the funnel narrows, reinforcing that later stages are more qualified. */
const stageShades = [
  "bg-brand-50 text-brand-900",
  "bg-brand-100 text-brand-900",
  "bg-brand-200 text-brand-900",
  "bg-brand-400 text-white",
  "bg-brand-600 text-white",
];

export function SalesFunnel() {
  const maxValue = Math.max(...demoSalesFunnel.map((stage) => stage.value));

  return (
    <div className="flex flex-col items-center gap-1.5 py-2">
      {demoSalesFunnel.map((stage, index) => {
        const widthPct = Math.max(22, Math.round((stage.value / maxValue) * 100));
        const previous = demoSalesFunnel[index - 1];
        const conversionPct = previous ? Math.round((stage.value / previous.value) * 100) : null;

        return (
          <div key={stage.label} className="flex w-full flex-col items-center gap-1.5">
            {index > 0 ? (
              <div className="flex items-center gap-2 text-ink-300">
                <IconChevronDown className="h-4 w-4" />
                {conversionPct !== null ? (
                  <span className="text-[11px] font-medium text-ink-400">{conversionPct}%</span>
                ) : null}
              </div>
            ) : null}
            <div
              className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm ${stageShades[index] ?? stageShades[stageShades.length - 1]}`}
              style={{ width: `${widthPct}%`, minWidth: "180px" }}
            >
              <span className="font-medium">{stage.label}</span>
              <span className="font-heading text-base font-bold">{stage.value}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
