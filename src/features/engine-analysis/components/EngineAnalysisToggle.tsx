import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAnalysis } from "../contexts/EngineAnalysisContext";

export const EngineAnalysisToggle = () => {
  const { setEngineEnabled, engineEnabled } = useAnalysis();

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold text-foreground">Analysis</h2>
      <div className="flex items-center gap-2">
        <Label
          htmlFor="engine-toggle"
          className="text-sm text-muted-foreground"
        >
          Engine
        </Label>
        <Switch
          id="engine-toggle"
          checked={engineEnabled}
          onCheckedChange={setEngineEnabled}
        />
      </div>
    </div>
  );
};
