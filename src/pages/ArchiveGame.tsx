import ArchiveGameBoard from "@/features/archive-game/components/ArchiveGameBoard";
import { ChessBoardProvider } from "@/features/game/contexts/ChessBoardContext";
import { ArchiveGameProvider } from "@/features/archive-game/contexts/ArchiveGameContext";
import { GameNotFound } from "@/features/archive-game/components/GameNotFound";
import { AnalysisMovesList } from "@/features/archive-game/components/AnalysisMovesList";
import { AnalysisMoveControls } from "@/features/archive-game/components/AnalysisMoveControls";
import { useParams } from "react-router-dom";
import { useGameData } from "@/features/archive-game/hooks/useGameData";
import { useUser } from "@/hooks/useUser";
import type { PlayerColor } from "@/features/game/types/game.types";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { GameLayout } from "@/features/game/components/GameLayout";

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
        <GameLayout
          board={
            <ArchiveGameBoard
              whitePlayer={gameData.whitePlayer}
              blackPlayer={gameData.blackPlayer}
              timeControl={gameData.time}
            />
          }
          sidebar={
            <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-card p-4  w-full">
              <h2 className="text-lg font-semibold text-foreground">
                Analysis
              </h2>
              <div className="flex-1">
                <AnalysisMovesList />
              </div>
              <div className="mt-4">
                <AnalysisMoveControls />
              </div>
            </div>
          }
        />
      </ArchiveGameProvider>
    </ChessBoardProvider>
  );
};

export default ArchiveGame;
