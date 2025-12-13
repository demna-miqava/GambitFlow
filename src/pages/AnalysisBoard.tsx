import { ChessBoardProvider } from "@/features/game/contexts/ChessBoardContext";
import { ArchiveGameProvider } from "@/features/archive-game/contexts/ArchiveGameContext";
import { EngineAnalysisProvider } from "@/features/engine-analysis";
import { GameLayout } from "@/features/game/components/GameLayout";
import AnalysisBoardSection from "@/features/import-game/components/BoardSection";
import AnalysisBoardSidebar from "@/features/archive-game/components/ArchiveGameSidebar";

const AnalysisBoard = () => {
  return (
    <ChessBoardProvider color="white" isArchiveMode>
      <ArchiveGameProvider extendMainLine>
        <EngineAnalysisProvider defaultEnabled>
          <GameLayout
            board={<AnalysisBoardSection isGameLoaded />}
            sidebar={<AnalysisBoardSidebar />}
          />
        </EngineAnalysisProvider>
      </ArchiveGameProvider>
    </ChessBoardProvider>
  );
};

export default AnalysisBoard;
