import {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
  type ReactNode,
} from "react";
import { useBasePuzzleSession } from "../hooks/useBasePuzzleSession";
import { PUZZLE_CONFIG } from "../constants/puzzle.constants";
import { PuzzleContext, type PuzzleContextType } from "./PuzzleContext";

export const SurvivalPuzzleProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [lives, setLives] = useState<number>(
    PUZZLE_CONFIG.SURVIVAL.INITIAL_LIVES
  );
  const [history, setHistory] = useState<boolean[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const loadNextPuzzleRef = useRef<(() => void) | null>(null);

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
  }, []);

  // Auto-advance on solve
  const onPuzzleSolved = useCallback(() => {
    setHistory((prev) => [...prev, true]);
    loadNextPuzzleRef.current?.();
  }, []);

  // Auto-advance on fail (if lives remain)
  const onPuzzleFailed = useCallback(() => {
    setHistory((prev) => [...prev, false]);

    setLives((prev) => {
      const newLives = prev - 1;
      if (newLives <= 0) {
        handleGameOver();
        return 0;
      }
      // Auto-advance when lives remain
      loadNextPuzzleRef.current?.();
      return newLives;
    });
  }, [handleGameOver]);

  const session = useBasePuzzleSession({
    onPuzzleSolved,
    onPuzzleFailed,
    isGameOver,
  });

  // Keep ref in sync
  useEffect(() => {
    loadNextPuzzleRef.current = session.loadNextPuzzle;
  }, [session.loadNextPuzzle]);

  const restart = useCallback(() => {
    setLives(PUZZLE_CONFIG.SURVIVAL.INITIAL_LIVES);
    setHistory([]);
    setIsGameOver(false);
    session.baseRestart();
  }, [session]);

  const value = useMemo<PuzzleContextType>(
    () => ({
      puzzle: session.puzzle,
      status: session.status,
      isLoading: session.isLoading,
      onNextPuzzle: session.loadNextPuzzle,
      onRetry: session.onRetry,
      onHint: session.onHint,
      onShowSolution: session.onShowSolution,
      sessionStats: session.sessionStats,
      mode: "survival" as const,
      lives,
      history,
      isGameOver,
      restart,
    }),
    [session, lives, history, isGameOver, restart]
  );

  return (
    <PuzzleContext.Provider value={value}>{children}</PuzzleContext.Provider>
  );
};
