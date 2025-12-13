import { Button } from "@/components/ui/button";
import {
  EngineAnalysisPanel,
  EngineAnalysisToggle,
  useAnalysis,
} from "@/features/engine-analysis";
import { AnalysisMovesList } from "@/features/archive-game/components/AnalysisMovesList";
import { AnalysisMoveControls } from "@/features/archive-game/components/AnalysisMoveControls";

interface AnalysisSidebarContentProps {
  onNewGame: () => void;
}

export const AnalysisSidebarContent = ({
  onNewGame,
}: AnalysisSidebarContentProps) => {
  const { engineEnabled } = useAnalysis();

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-card p-4 flex-1">
      <EngineAnalysisToggle />
      {engineEnabled && <EngineAnalysisPanel numLines={3} />}
      <div className="flex-1">
        <AnalysisMovesList />
      </div>
      <div className="mt-4">
        <AnalysisMoveControls />
      </div>
      <Button variant="outline" onClick={onNewGame} className="w-full">
        Load New PGN
      </Button>
    </div>
  );
};
