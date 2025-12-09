import type { AnalysisPosition, BranchMove } from "../types/analysis.types";
import { arePositionsEqual } from "../utils/analysisTree";
import { MoveButton } from "./MoveButton";

interface BranchLineProps {
  branch: BranchMove[];
  mainLineIndex: number;
  branchIndex: number;
  startMoveNumber: number;
  isWhiteMove: boolean;
  activePosition: AnalysisPosition;
  onNavigate: (position: AnalysisPosition) => void;
}

const BranchLine = ({
  branch,
  mainLineIndex,
  branchIndex,
  startMoveNumber,
  isWhiteMove,
  activePosition,
  onNavigate,
}: BranchLineProps) => {
  let moveNumber = startMoveNumber;
  let isWhite = isWhiteMove;

  return (
    <div className="text-sm text-muted-foreground leading-relaxed flex flex-wrap items-baseline gap-x-1 w-full">
      {branch.map((move, moveIdx) => {
        const position: AnalysisPosition = {
          mainLineIndex,
          branch: { branchIndex, moveIndex: moveIdx },
        };
        const isActive = arePositionsEqual(position, activePosition);
        const showMoveNumber = isWhite;
        const currentMoveNumber = moveNumber;

        // Update for next iteration
        if (!isWhite) moveNumber++;
        isWhite = !isWhite;

        return (
          <span key={moveIdx} className="inline-flex items-baseline gap-x-0.5">
            {showMoveNumber && (
              <span className="text-xs">{currentMoveNumber}.</span>
            )}
            {moveIdx === 0 && !isWhiteMove && (
              <span className="text-xs">{currentMoveNumber}...</span>
            )}
            <MoveButton
              move={move.move}
              isActive={isActive}
              onClick={() => onNavigate(position)}
            />
          </span>
        );
      })}
    </div>
  );
};

export default BranchLine;
