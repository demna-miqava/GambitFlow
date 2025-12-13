import { createContext, useContext } from "react";
import type { Puzzle, PuzzleStatus } from "../types/puzzle.types";

// Base context shape shared by all modes
interface PuzzleContextBase {
  puzzle: Puzzle | null;
  status: PuzzleStatus;
  isLoading: boolean;
  onNextPuzzle: () => void;
  onRetry: () => void;
  onHint: () => void;
  sessionStats: { solved: number; failed: number };
  restart: () => void;
  onShowSolution: () => void;
}

interface PuzzleContextInfinite extends PuzzleContextBase {
  mode: "infinite";
  isGameOver: false;
}

interface PuzzleContextRush extends PuzzleContextBase {
  mode: "rush";
  timeLeft: number;
  isGameOver: boolean;
}

interface PuzzleContextSurvival extends PuzzleContextBase {
  mode: "survival";
  lives: number;
  history: boolean[];
  isGameOver: boolean;
}

export type PuzzleContextType =
  | PuzzleContextInfinite
  | PuzzleContextRush
  | PuzzleContextSurvival;

export const PuzzleContext = createContext<PuzzleContextType | null>(null);

export const usePuzzle = () => {
  const context = useContext(PuzzleContext);
  if (!context) {
    throw new Error("usePuzzle must be used within a PuzzleProvider");
  }
  return context;
};

// Type-safe mode hooks
export const useRushMode = () => {
  const context = usePuzzle();
  if (context.mode !== "rush") {
    throw new Error("useRushMode must be used when mode is 'rush'");
  }
  return context;
};

export const useSurvivalMode = () => {
  const context = usePuzzle();
  if (context.mode !== "survival") {
    throw new Error("useSurvivalMode must be used when mode is 'survival'");
  }
  return context;
};
