import { useCallback, useEffect, useState } from "react";

export const useMoveNavigation = (totalMoves: number) => {
  // null means at current position, number means viewing history
  const [viewingIndex, setViewingIndex] = useState<number | null>(null);

  const isViewingHistory = viewingIndex !== null;
  const currentIndex = viewingIndex ?? totalMoves;
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex === totalMoves;

  // When new moves come in and we're at the current position, stay there
  useEffect(() => {
    if (!isViewingHistory) {
      setViewingIndex(null);
    }
  }, [totalMoves, isViewingHistory]);

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          goToPreviousMove();
          break;
        case "ArrowRight":
          goToNextMove();
          break;
        case "ArrowUp":
          goToFirstMove();
          break;
        case "ArrowDown":
          goToLastMove();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToFirstMove, goToPreviousMove, goToNextMove, goToLastMove]);

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
