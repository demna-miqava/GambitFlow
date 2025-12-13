import { useMemo, type ReactNode } from "react";
import { useBasePuzzleSession } from "../hooks/useBasePuzzleSession";
import { PuzzleContext, type PuzzleContextType } from "./PuzzleContext";

export const InfinitePuzzleProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const session = useBasePuzzleSession();

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
      mode: "infinite" as const,
      isGameOver: false as const,
      restart: session.baseRestart,
    }),
    [session]
  );

  return (
    <PuzzleContext.Provider value={value}>{children}</PuzzleContext.Provider>
  );
};
