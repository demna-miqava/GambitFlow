import { useCallback } from "react";
import { usePuzzleState } from "./usePuzzleState";
import { usePuzzleLoader } from "./usePuzzleLoader";

interface UseBasePuzzleSessionOptions {
  onPuzzleSolved?: () => void;
  onPuzzleFailed?: () => void;
  isGameOver?: boolean;
}

export const useBasePuzzleSession = (
  options: UseBasePuzzleSessionOptions = {}
) => {
  const { onPuzzleSolved, onPuzzleFailed, isGameOver = false } = options;

  const puzzleState = usePuzzleState();
  const { puzzle, status, isLoading, setSessionStats } = puzzleState;

  const onSolve = useCallback(() => {
    if (isGameOver) return;
    setSessionStats((prev) => ({ ...prev, solved: prev.solved + 1 }));
    onPuzzleSolved?.();
  }, [isGameOver, setSessionStats, onPuzzleSolved]);

  const onFail = useCallback(() => {
    if (isGameOver) return;
    setSessionStats((prev) => ({ ...prev, failed: prev.failed + 1 }));
    onPuzzleFailed?.();
  }, [isGameOver, setSessionStats, onPuzzleFailed]);

  const loader = usePuzzleLoader({
    puzzleState,
    onSolve,
    onFail,
  });

  const baseRestart = useCallback(() => {
    setSessionStats({ solved: 0, failed: 0 });
    loader.loadNextPuzzle();
  }, [setSessionStats, loader]);

  const onRetry = useCallback(() => {
    if (isGameOver) return;
    loader.retryPuzzle();
  }, [isGameOver, loader]);

  return {
    // State
    puzzle,
    status,
    isLoading,
    sessionStats: puzzleState.sessionStats,
    // Actions
    loadNextPuzzle: loader.loadNextPuzzle,
    onRetry,
    onHint: loader.onHint,
    onShowSolution: loader.onShowSolution,
    baseRestart,
    // For extending
    setSessionStats,
    puzzleState,
  };
};
