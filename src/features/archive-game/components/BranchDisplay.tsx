import { getMoveNumber } from "@/features/game/utils/moveListUtils";
import type { AnalysisPosition, BranchMove } from "../types/analysis.types";
import BranchLine from "./BranchLine";

interface BranchDisplayProps {
  branches: BranchMove[][];
  mainLineIndex: number;
  isWhiteMove: boolean;
  activePosition: AnalysisPosition;
  onNavigate: (position: AnalysisPosition) => void;
}

export const BranchDisplay = ({
  branches,
  mainLineIndex,
  isWhiteMove,
  activePosition,
  onNavigate,
}: BranchDisplayProps) => {
  if (branches.length === 0) return null;

  const moveNumber = getMoveNumber(mainLineIndex);

  return (
    <div
      role="group"
      aria-label={`Alternative moves at move ${moveNumber}`}
      className="ml-4 my-1 pl-2 border-l-2 border-muted-foreground/30 min-w-0 max-w-full overflow-hidden"
    >
      {branches.map((branch, branchIdx) => (
        <BranchLine
          key={branchIdx}
          branch={branch}
          mainLineIndex={mainLineIndex}
          branchIndex={branchIdx}
          startMoveNumber={moveNumber}
          isWhiteMove={isWhiteMove}
          activePosition={activePosition}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
};
