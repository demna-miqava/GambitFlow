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

export const RushPuzzleProvider = ({ children }: { children: ReactNode }) => {
  const [timeLeft, setTimeLeft] = useState<number>(
    PUZZLE_CONFIG.RUSH.DURATION_SECONDS
  );
  const [isGameOver, setIsGameOver] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const loadNextPuzzleRef = useRef<(() => void) | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleGameOver = useCallback(() => {
    stopTimer();
    setIsGameOver(true);
  }, [stopTimer]);

  // Auto-advance to next puzzle on solve
  const onPuzzleSolved = useCallback(() => {
    loadNextPuzzleRef.current?.();
  }, []);

  const session = useBasePuzzleSession({
    onPuzzleSolved,
    isGameOver,
  });

  // Keep ref in sync
  useEffect(() => {
    loadNextPuzzleRef.current = session.loadNextPuzzle;
  }, [session.loadNextPuzzle]);

  // Timer effect - only start/stop based on isGameOver
  useEffect(() => {
    if (isGameOver) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, PUZZLE_CONFIG.RUSH.TIMER_INTERVAL_MS);

    return stopTimer;
  }, [isGameOver, handleGameOver, stopTimer]);

  const restart = useCallback(() => {
    setTimeLeft(PUZZLE_CONFIG.RUSH.DURATION_SECONDS);
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
      mode: "rush" as const,
      timeLeft,
      isGameOver,
      restart,
    }),
    [session, timeLeft, isGameOver, restart]
  );

  return (
    <PuzzleContext.Provider value={value}>{children}</PuzzleContext.Provider>
  );
};
