import { useState } from "react";
import { ChessBoardProvider } from "@/features/game/contexts/ChessBoardContext";
import { ArchiveGameProvider } from "@/features/archive-game/contexts/ArchiveGameContext";
import { EngineAnalysisProvider } from "@/features/engine-analysis";
import { GameLayout } from "@/features/game/components/GameLayout";
import BoardSection from "@/features/import-game/components/BoardSection";
import ImportGameSidebar from "@/features/import-game/components/ImportGameSidebar";

const ImportGame = () => {
  const [pgn, setPgn] = useState<string | null>(null);
  const isGameLoaded = !!pgn;

  const handleLoadPgn = (newPgn: string) => {
    setPgn(newPgn);
  };

  const handleNewGame = () => {
    setPgn(null);
  };

  return (
    <ChessBoardProvider
      color="white"
      isArchiveMode={isGameLoaded}
      key={pgn || "empty"}
    >
      <ArchiveGameProvider pgn={pgn || undefined}>
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
};

export default ImportGame;
