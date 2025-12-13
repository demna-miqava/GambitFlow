import { useEffect } from "react";
import { BoardLayout } from "@/features/game/components/BoardLayout";
import { useChessBoardContext } from "@/features/game/contexts/ChessBoardContext";

interface ImportGameBoardProps {
  disabled?: boolean;
}

const ImportGameBoard = ({ disabled = false }: ImportGameBoardProps) => {
  const { boardRef, cgRef } = useChessBoardContext();

  useEffect(() => {
    if (!cgRef.current) return;
    cgRef.current.set({ viewOnly: disabled });
  }, [cgRef, disabled]);

  return <BoardLayout boardRef={boardRef} />;
};

export default ImportGameBoard;
