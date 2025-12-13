import { useState } from "react";
import { ChessBoardProvider } from "@/features/game/contexts/ChessBoardContext";
import { ArchiveGameProvider } from "@/features/archive-game/contexts/ArchiveGameContext";
import { EngineAnalysisProvider } from "@/features/engine-analysis";
import { GameLayout } from "@/features/game/components/GameLayout";
import BoardSection from "@/features/import-game/components/BoardSection";
import ImportGameSidebar from "@/features/import-game/components/ImportGameSidebar";

const ImportGameContent = () => {
  const [pgn, setPgn] = useState<string | null>(null);
  const isGameLoaded = pgn !== null;

  const handleLoadPgn = (newPgn: string) => {
    setPgn(newPgn);
  };

  const handleNewGame = () => {
    setPgn(null);
  };

  if (isGameLoaded) {
    return (
      <ChessBoardProvider color="white" isArchiveMode={true} key={pgn}>
        <ArchiveGameProvider pgn={pgn}>
          <EngineAnalysisProvider>
            <GameLayout
              board={<BoardSection isGameLoaded={isGameLoaded} />}
              sidebar={
                <ImportGameSidebar
                  onLoadPgn={handleLoadPgn}
                  onNewGame={handleNewGame}
                  isGameLoaded={isGameLoaded}
                />
              }
            />
          </EngineAnalysisProvider>
        </ArchiveGameProvider>
      </ChessBoardProvider>
    );
  }

  return (
    <ChessBoardProvider color="white" isArchiveMode={false}>
      <EngineAnalysisProvider>
        <GameLayout
          board={<BoardSection isGameLoaded={isGameLoaded} />}
          sidebar={
            <ImportGameSidebar
              onLoadPgn={handleLoadPgn}
              onNewGame={handleNewGame}
              isGameLoaded={isGameLoaded}
            />
          }
        />
      </EngineAnalysisProvider>
    </ChessBoardProvider>
  );
};

const ImportGame = () => {
  return <ImportGameContent />;
};

export default ImportGame;
