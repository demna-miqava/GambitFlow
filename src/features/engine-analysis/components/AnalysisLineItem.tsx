import { formatScore, formatPv } from "../utils/engineAnalysis.utils";
import type { EvaluationLine } from "../types";
import type { PlayerColor } from "@/features/game/types/game.types";

interface AnalysisLineItemProps {
  line: EvaluationLine;
  fen: string;
  playerColor: PlayerColor;
}

export const AnalysisLineItem = ({
  line,
  fen,
  playerColor,
}: AnalysisLineItemProps) => {
  return (
    <div className="relative overflow-hidden rounded-md border border-border/50 bg-muted/30">
      <div className="relative flex items-center gap-2 px-4 py-1.5">
        <span className="text-right text-sm font-semibold">
          {formatScore(line, playerColor)}
        </span>
        <span className="truncate text-sm text-foreground/90">
          {formatPv(line.pv, fen)}
        </span>
      </div>
    </div>
  );
};
