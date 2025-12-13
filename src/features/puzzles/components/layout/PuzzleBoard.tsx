import { useChessBoardContext } from "@/features/game/contexts/ChessBoardContext";
import { BoardLayout } from "@/features/game/components/BoardLayout";

export const PuzzleBoard = () => {
  const { boardRef } = useChessBoardContext();

  return (
    <div className="w-full max-w-3xl">
      <BoardLayout boardRef={boardRef} />
    </div>
  );
};
