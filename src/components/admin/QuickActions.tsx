import { IconPlus } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { demoQuickActions } from "@/lib/admin-demo-data";

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-2.5">
      {demoQuickActions.map((action) => (
        <Button key={action.id} type="button" variant="outline" size="md" className="gap-1.5">
          <IconPlus className="h-4 w-4" />
          {action.label}
        </Button>
      ))}
    </div>
  );
}
