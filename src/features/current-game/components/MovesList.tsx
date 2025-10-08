import type { Move } from "chess.js";
import { useCurrentGame } from "../CurrentGameContext";
import { useMemo } from "react";

export const MovesList = () => {
  const { chessRef } = useCurrentGame();

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
  }, [chessRef.current?.history()]);

  return (
    <div className="flex flex-col gap-2">
      {movePairs.map((pair, index) => (
        <div key={index} className="flex gap-2 text-sm">
          <span className="w-6 text-foreground">{index + 1}.</span>
          <span className="w-10 text-foreground">{pair.white.san}</span>

          {pair.black && (
            <span className="text-md w-16 text-foreground">
              {pair.black.san}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
