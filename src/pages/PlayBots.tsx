import { BoardLayout } from "@/features/game/components/BoardLayout";
import { GameLayout } from "@/features/game/components/GameLayout";
import {
  ChessBoardProvider,
  useChessBoardContext,
} from "@/features/game/contexts/ChessBoardContext";
import { BotSelector } from "@/features/play-bots/components/BotSelector";

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
