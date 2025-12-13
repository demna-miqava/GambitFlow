import { useState, useEffect } from "react";
import { usePuzzle } from "../../contexts";
import { PuzzleRushSidebar } from "../modes/PuzzleRushSidebar";
import { PuzzleSurvivalSidebar } from "../modes/PuzzleSurvivalSidebar";
import { PuzzleInfiniteSidebar } from "../modes/PuzzleInfiniteSidebar";
import { PuzzleGameOverDialog } from "../shared/PuzzleGameOverDialog";

export const PuzzleSidebar = () => {
  const { sessionStats, restart, mode, isGameOver } = usePuzzle();
  const [showGameOverDialog, setShowGameOverDialog] = useState(false);

  const isPuzzleGameOver =
    (mode === "rush" || mode === "survival") && isGameOver;

  useEffect(() => {
    if (isPuzzleGameOver) {
      setShowGameOverDialog(true);
    }
  }, [isPuzzleGameOver]);

  const handleGameOverDialogClose = () => {
    setShowGameOverDialog(false);
  };

  const handleRestart = () => {
    setShowGameOverDialog(false);
    restart();
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      {mode === "infinite" && <PuzzleInfiniteSidebar />}
      {mode === "rush" && <PuzzleRushSidebar />}
      {mode === "survival" && <PuzzleSurvivalSidebar />}
      {(mode === "rush" || mode === "survival") && (
        <PuzzleGameOverDialog
          isOpen={showGameOverDialog}
          score={sessionStats.solved}
          mode={mode}
          onRestart={handleRestart}
          onClose={handleGameOverDialogClose}
        />
      )}
    </div>
  );
};
