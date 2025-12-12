import {
  EngineAnalysisPanel,
  EngineAnalysisToggle,
  useAnalysis,
} from "@/features/engine-analysis";
import { AnalysisMovesList } from "./AnalysisMovesList";
import { AnalysisMoveControls } from "./AnalysisMoveControls";

const ArchiveGameSidebar = () => {
  const { engineEnabled } = useAnalysis();

  return (
    <div className="flex gap-3 w-full">
      <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-card p-4 flex-1">
        <EngineAnalysisToggle />
        {engineEnabled && <EngineAnalysisPanel numLines={3} />}
        <div className="flex-1">
          <AnalysisMovesList />
        </div>
        <div className="mt-4">
          <AnalysisMoveControls />
        </div>
      </div>
    </div>
  );
};

export default ArchiveGameSidebar;
