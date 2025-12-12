import { Loader2 } from "lucide-react";
import { useEngineAnalysis } from "../hooks/useEngineAnalysis";
import { formatScore, formatPv } from "../utils/engineAnalysis.utils";
import { useMemo } from "react";
import { useChessBoardContext } from "@/features/game/contexts/ChessBoardContext";

interface EngineAnalysisPanelProps {
  numLines?: number;
}

export const EngineAnalysisPanel = ({
  numLines = 3,
}: EngineAnalysisPanelProps) => {
  const { lines, depth, isReady, isAnalyzing, analysisFen } = useEngineAnalysis(
    {
      numLines,
    }
  );
  const { color } = useChessBoardContext();
  // Only update displayData when analysisFen changes (new analysis arrives)
  // This keeps showing old lines until new analysis is ready
  const displayData = useMemo(() => {
    return { lines, fen: analysisFen };
  }, [analysisFen, lines]);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center gap-2 py-4 text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        <span className="text-sm">Loading engine...</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Engine Analysis</span>
        <span className="flex items-center gap-1">
          {isAnalyzing && <Loader2 className="size-3 animate-spin" />}
          Depth: {depth}
        </span>
      </div>

      <div className="space-y-1.5">
        {displayData.lines.length === 0 ? (
          <div className="py-2 text-center text-sm text-muted-foreground">
            {isAnalyzing ? "Analyzing..." : "No analysis available"}
          </div>
        ) : (
          displayData.lines.map((line) => (
            <div
              key={line.multipv}
              className="relative overflow-hidden rounded-md border border-border/50 bg-muted/30"
            >
              <div className="relative flex items-center gap-2 px-4 py-1.5">
                <span className="text-right text-sm font-semibold">
                  {formatScore(line, color)}
                </span>
                <span className="truncate text-sm text-foreground/90">
                  {formatPv(line.pv, displayData.fen)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
