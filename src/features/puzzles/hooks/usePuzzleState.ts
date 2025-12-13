import { useState, useRef } from "react";
import type { Puzzle, PuzzleStatus } from "../types/puzzle.types";
import type { PlayerColor } from "@/features/game/types/game.types";

export const usePuzzleState = () => {
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [status, setStatus] = useState<PuzzleStatus>("solving");
  const [isLoading, setIsLoading] = useState(false);
  const [moveIndex, setMoveIndex] = useState(0);

  const [sessionStats, setSessionStats] = useState({ solved: 0, failed: 0 });

  const userColor = useRef<PlayerColor>("white");
  const isSystemMove = useRef(false);

  return {
    puzzle,
    setPuzzle,
    status,
    setStatus,
    isLoading,
    setIsLoading,
    moveIndex,
    setMoveIndex,
    sessionStats,
    setSessionStats,
    userColor,
    isSystemMove,
  };
};
