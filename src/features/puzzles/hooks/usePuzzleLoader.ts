import { useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";
import { usePuzzleQuery } from "./usePuzzleQuery";
import { usePuzzleGame } from "./usePuzzleGame";
import { PUZZLE_CONFIG, PUZZLE_MESSAGES } from "../constants/puzzle.constants";
import type { usePuzzleState } from "./usePuzzleState";
import type { Puzzle } from "../types/puzzle.types";

interface UsePuzzleLoaderProps {
  puzzleState: ReturnType<typeof usePuzzleState>;
  onSolve: () => void;
  onFail: () => void;
  isEnabled?: boolean;
}

interface UsePuzzleLoaderReturn {
  loadNextPuzzle: () => Promise<void>;
  retryPuzzle: () => void;
  resetBoard: (puzzle: Puzzle) => void;
  onHint: () => void;
  onShowSolution: () => void;
  queryResult: ReturnType<typeof usePuzzleQuery>;
}

export const usePuzzleLoader = ({
  puzzleState,
  onSolve,
  onFail,
  isEnabled = true,
}: UsePuzzleLoaderProps): UsePuzzleLoaderReturn => {
  const {
    puzzle,
    setPuzzle,
    setStatus,
    setMoveIndex,
    isLoading,
    setIsLoading,
  } = puzzleState;

  const queryResult = usePuzzleQuery();
  const { data, fetchNextPage, hasNextPage, isFetching } = queryResult;

  const { resetBoard, onHint, showSolution } = usePuzzleGame({
    puzzleState,
    onSolve,
    onFail,
  });

  // Prevent race conditions from rapid calls
  const isLoadingRef = useRef(false);

  const loadNextPuzzle = useCallback(async () => {
    // Debounce - prevent multiple simultaneous calls
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    setIsLoading(true);
    try {
      const allPuzzles = data?.pages.flatMap((p) => p.data) ?? [];
      const currentIndex = puzzle
        ? allPuzzles.findIndex((p) => p.id === puzzle.id)
        : -1;
      const nextIndex = currentIndex + 1;

      if (nextIndex < allPuzzles.length) {
        const newPuzzle = allPuzzles[nextIndex];

        // Validate puzzle data
        if (!newPuzzle?.fen || !newPuzzle?.moves?.length) {
          console.error("Invalid puzzle data", newPuzzle);
          toast.error(PUZZLE_MESSAGES.INVALID_DATA);
          return;
        }

        setPuzzle(newPuzzle);
        setStatus("solving");
        setMoveIndex(0);
        resetBoard(newPuzzle);

        // Prefetch when nearing end of buffer
        const remaining = allPuzzles.length - (nextIndex + 1);
        if (remaining <= PUZZLE_CONFIG.PREFETCH.THRESHOLD) {
          if (hasNextPage && !isFetching) {
            fetchNextPage();
          }
        }
      } else {
        // No puzzle available in buffer
        if (hasNextPage) {
          fetchNextPage();
          toast.info(PUZZLE_MESSAGES.LOADING_MORE);
        } else {
          toast.error(PUZZLE_MESSAGES.NO_MORE);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(PUZZLE_MESSAGES.LOAD_ERROR);
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  }, [
    data,
    puzzle,
    hasNextPage,
    isFetching,
    fetchNextPage,
    setPuzzle,
    setStatus,
    setMoveIndex,
    resetBoard,
    setIsLoading,
  ]);

  const retryPuzzle = useCallback(() => {
    if (!puzzle) return;
    setStatus("solving");
    setMoveIndex(0);
    resetBoard(puzzle);
  }, [puzzle, setStatus, setMoveIndex, resetBoard]);

  // Initial load effect
  useEffect(() => {
    if (isEnabled && !puzzle && !isLoading && data) {
      const allPuzzles = data.pages.flatMap((p) => p.data);
      if (allPuzzles.length > 0) {
        loadNextPuzzle();
      }
    }
  }, [isEnabled, puzzle, isLoading, data, loadNextPuzzle]);

  return {
    loadNextPuzzle,
    retryPuzzle,
    resetBoard,
    onHint,
    onShowSolution: showSolution,
    queryResult,
  };
};
