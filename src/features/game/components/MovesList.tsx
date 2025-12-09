import { useMemo } from "react";
import { useChessBoardContext } from "@/features/game/contexts/ChessBoardContext";
import { useSettings } from "@/features/settings/SettingsContext";
import { renderMoveNotation } from "@/features/game/utils/notationUtils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { groupMovesIntoPairs } from "@/features/game/utils/moveListUtils";

export const MovesList = () => {
  const { chessRef } = useChessBoardContext();
  const { settings } = useSettings();

  const movePairs = useMemo(() => {
    const moves = chessRef.current?.history({ verbose: true }) || [];
    return groupMovesIntoPairs(moves);
  }, [chessRef.current.history().length]);

  const showIcons = settings?.pieceIconNotationEnabled ?? false;

  return (
    <ScrollArea className="h-[600px] w-full rounded-md border p-4">
      <div className="flex flex-col gap-2 rounded-lg p-3">
        {movePairs.map((pair) => (
          <div key={pair.moveNumber} className="flex text-sm justify-start">
            <span className="w-6 text-foreground">{pair.moveNumber}.</span>
            <div className="flex gap-4">
              {pair.white && (
                <span className="w-16 text-foreground">
                  {renderMoveNotation(pair.white, showIcons)}
                </span>
              )}

              {pair.black && (
                <span className="text-md w-16 text-foreground">
                  {renderMoveNotation(pair.black, showIcons)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
