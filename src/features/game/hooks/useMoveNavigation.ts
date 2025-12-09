import { useCallback, useEffect, useState } from "react";
import { useArrowKeyNavigation } from "./useArrowKeyNavigation";

export const useMoveNavigation = (totalMoves: number) => {
  // null means at current position, number means viewing history
  const [viewingIndex, setViewingIndex] = useState<number | null>(null);

  const isViewingHistory = viewingIndex !== null;
  const currentIndex = viewingIndex ?? totalMoves;
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex === totalMoves;

  // When new moves come in, return to current position
  useEffect(() => {
    // Always return to current position when totalMoves changes
    setViewingIndex(null);
  }, [totalMoves]);

  const goToFirstMove = useCallback(() => {
    setViewingIndex(0);
  }, []);

  const goToPreviousMove = useCallback(() => {
    setViewingIndex((prev) => {
      const current = prev ?? totalMoves;
      return Math.max(0, current - 1);
    });
  }, [totalMoves]);

  const goToNextMove = useCallback(() => {
    setViewingIndex((prev) => {
      const current = prev ?? totalMoves;
      if (current > totalMoves) return null; // Already at the end
      const next = current + 1;
      // If we've reached the current position, set to null
      return next > totalMoves ? null : next;
    });
  }, [totalMoves]);

  const goToLastMove = useCallback(() => {
    setViewingIndex(null); // null = current position
  }, []);

  useArrowKeyNavigation({
    onLeft: goToPreviousMove,
    onRight: goToNextMove,
    onUp: goToFirstMove,
    onDown: goToLastMove,
  });

  return {
    currentIndex,
    viewingIndex,
    isViewingHistory,
    goToFirstMove,
    goToPreviousMove,
    goToNextMove,
    goToLastMove,
    isAtStart,
    isAtEnd,
  };
};
