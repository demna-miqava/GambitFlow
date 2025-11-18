import type { Move } from "chess.js";
import { useChessBoardContext } from "@/features/game/contexts/ChessBoardContext";
import { useMemo } from "react";
import { useSettings } from "@/features/settings/SettingsContext";
import { renderMoveNotation } from "@/features/game/utils/notationUtils";

export const MovesList = () => {
  const { chessRef } = useChessBoardContext();
  const { settings } = useSettings();

  const movePairs = useMemo(() => {
    const moves = chessRef.current?.history({ verbose: true }) || [];

    const movePairs: Array<{ white: Move; black?: Move }> = [];

    for (let i = 0; i < moves.length; i += 2) {
      movePairs.push({
        white: moves[i],
        black: moves[i + 1],
      });
    }

    return movePairs;
  }, [chessRef.current.history().length]);

  const showIcons = settings?.pieceIconNotationEnabled ?? false;

  return (
    <div className="flex flex-col gap-2 rounded-lg p-3">
      {movePairs.map((pair, index) => (
        <div key={index} className="flex gap-2 text-sm">
          <span className="w-6 text-foreground">{index + 1}.</span>
          <span className="w-10 text-foreground">
            {renderMoveNotation(pair.white, showIcons)}
          </span>

          {pair.black && (
            <span className="text-md w-16 text-foreground">
              {renderMoveNotation(pair.black, showIcons)}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
