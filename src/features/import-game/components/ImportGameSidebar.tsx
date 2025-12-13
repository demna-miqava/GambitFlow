import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  EngineAnalysisPanel,
  EngineAnalysisToggle,
  useAnalysis,
} from "@/features/engine-analysis";
import { AnalysisMovesList } from "@/features/archive-game/components/AnalysisMovesList";
import { AnalysisMoveControls } from "@/features/archive-game/components/AnalysisMoveControls";
import { usePgnInput } from "../hooks/usePgnInput";

interface ImportGameSidebarProps {
  onLoadPgn: (pgn: string) => void;
  onNewGame: () => void;
  isGameLoaded: boolean;
}

const ImportGameSidebar = ({
  onLoadPgn,
  onNewGame,
  isGameLoaded,
}: ImportGameSidebarProps) => {
  const { engineEnabled } = useAnalysis();
  const { pgnInput, error, handleInputChange, handleLoadPgn, handleClear } =
    usePgnInput({ onLoadPgn });

  if (isGameLoaded) {
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
          <Button variant="outline" onClick={onNewGame} className="w-full">
            Load New PGN
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 w-full">
      <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-card p-4 flex-1">
        <div className="space-y-2">
          <Label htmlFor="pgn-input">Paste PGN</Label>
          <Textarea
            id="pgn-input"
            placeholder="Paste your PGN here..."
            value={pgnInput}
            onChange={(e) => handleInputChange(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <div className="flex gap-2">
          <Button onClick={handleLoadPgn} className="flex-1">
            Load Game
          </Button>
          <Button variant="outline" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImportGameSidebar;
