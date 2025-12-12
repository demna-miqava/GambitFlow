import { useMemo, useCallback } from "react";
import { useArchiveGame } from "../contexts/ArchiveGameContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MoveButton } from "./MoveButton";
import { BranchDisplay } from "./BranchDisplay";
import { createMainLinePosition } from "../utils/analysisTree";
import { groupMovesIntoPairsWithIndex } from "@/features/game/utils/moveListUtils";

export const AnalysisMovesList = () => {
  const { moves, currentPosition, goToPosition, isInBranch } = useArchiveGame();

  const movePairs = useMemo(() => groupMovesIntoPairsWithIndex(moves), [moves]);
  const isMainLineActive = useCallback(
    (index: number) => {
      if (isInBranch) return false;
      return currentPosition.mainLineIndex === index + 1;
    },
    [currentPosition, isInBranch]
  );

  if (moves.length === 0) {
    return (
      <ScrollArea className="h-[600px] w-full rounded-md border p-4">
        <p className="text-muted-foreground text-sm text-center py-4">
          No moves yet. Make a move on the board to start analyzing.
        </p>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="h-[400px] w-full rounded-md border p-4 overflow-x-hidden">
      <div
        role="list"
        aria-label="Game moves"
        className="flex flex-col gap-2 rounded-lg p-3 min-w-0 overflow-hidden"
      >
        {movePairs.map((pair) => (
          <div
            key={pair.moveNumber}
            role="listitem"
            className="flex flex-col gap-1 min-w-0"
          >
            <div className="flex flex-wrap text-sm items-center gap-x-2">
              <span className="text-muted-foreground font-medium shrink-0">
                {pair.moveNumber}.
              </span>
              {pair.white && (
                <MoveButton
                  move={pair.white.item.move}
                  isActive={isMainLineActive(pair.white.index)}
                  onClick={() =>
                    goToPosition(createMainLinePosition(pair.white!.index))
                  }
                />
              )}
              {pair.black && (
                <MoveButton
                  move={pair.black.item.move}
                  isActive={isMainLineActive(pair.black.index)}
                  onClick={() =>
                    goToPosition(createMainLinePosition(pair.black!.index))
                  }
                />
              )}
            </div>

            {pair.white && pair.white.item.branches.length > 0 && (
              <BranchDisplay
                branches={pair.white.item.branches}
                mainLineIndex={pair.white.index}
                isWhiteMove={true}
                activePosition={currentPosition}
                onNavigate={goToPosition}
              />
            )}

            {pair.black && pair.black.item.branches.length > 0 && (
              <BranchDisplay
                branches={pair.black.item.branches}
                mainLineIndex={pair.black.index}
                isWhiteMove={false}
                activePosition={currentPosition}
                onNavigate={goToPosition}
              />
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
