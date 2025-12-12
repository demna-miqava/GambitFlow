import { EvaluationBar, useAnalysis } from "@/features/engine-analysis";
import ArchiveGameBoard from "./ArchiveGameBoard";
import type { Game } from "@/types";

const BoardSection = ({ gameData }: { gameData: Game }) => {
  const { engineEnabled } = useAnalysis();

  return (
    <div className="flex gap-3 w-full">
      <div className="hidden lg:block w-7 self-stretch">
        {engineEnabled && <EvaluationBar />}
      </div>
      <ArchiveGameBoard
        whitePlayer={gameData.whitePlayer}
        blackPlayer={gameData.blackPlayer}
        timeControl={gameData.time}
      />
    </div>
  );
};

export default BoardSection;
