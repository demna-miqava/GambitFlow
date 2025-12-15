import { BoardLayout } from "@/features/game/components/BoardLayout";
import { GameLayout } from "@/features/game/components/GameLayout";
import {
  ChessBoardProvider,
  useChessBoardContext,
} from "@/features/game/contexts/ChessBoardContext";
import { useChessBoard } from "@/features/game/hooks/useChessBoard";
import { BotSelector } from "@/features/play-bots/components/BotSelector";
import { useRef } from "react";

const PlayBots = () => {
  return (
    <ChessBoardProvider color="white">
      <GameLayout board={<BoardSection />} sidebar={<BotSelector />} />
    </ChessBoardProvider>
  );
};

export default PlayBots;

const BoardSection = () => {
  const { boardRef } = useChessBoardContext();
  return <BoardLayout boardRef={boardRef} />;
};
