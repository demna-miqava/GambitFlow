import { ChessBoardProvider } from "@/features/game/contexts/ChessBoardContext";
import { ArchiveGameProvider } from "@/features/archive-game/contexts/ArchiveGameContext";
import { GameNotFound } from "@/features/archive-game/components/GameNotFound";
import { EngineAnalysisProvider } from "@/features/engine-analysis";
import { useParams } from "react-router-dom";
import { useGameData } from "@/features/archive-game/hooks/useGameData";
import { useUser } from "@/hooks/useUser";
import type { PlayerColor } from "@/features/game/types/game.types";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { GameLayout } from "@/features/game/components/GameLayout";
import BoardSection from "@/features/archive-game/components/BoardSection";
import ArchiveGameSidebar from "@/features/archive-game/components/ArchiveGameSidebar";

const ArchiveGame = () => {
  const { gameId } = useParams();
  const { data: gameData, isPending, error } = useGameData(gameId);
  const { id: currentUserId } = useUser();

  if (isPending) {
    return <FullScreenLoader />;
  }

  if (error || !gameData) {
    return <GameNotFound />;
  }

  // Determine the board orientation based on current user
  const playerColor: PlayerColor =
    gameData.whitePlayer.id === Number(currentUserId) ? "white" : "black";

  return (
    <ChessBoardProvider color={playerColor} isArchiveMode={true} key={gameId}>
      <ArchiveGameProvider pgn={gameData.pgn || ""}>
        <EngineAnalysisProvider>
          <GameLayout
            board={<BoardSection gameData={gameData} />}
            sidebar={<ArchiveGameSidebar />}
          />
        </EngineAnalysisProvider>
      </ArchiveGameProvider>
    </ChessBoardProvider>
  );
};

export default ArchiveGame;
