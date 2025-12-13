import { useCallback, useMemo, useState } from "react";
import type { Move } from "chess.js";
import type { AnalysisMoveNode, AnalysisPosition } from "../types/analysis.types";
import * as TreeUtils from "../utils/analysisTree";

interface UseAnalysisTreeOptions {
  initialMoves?: Move[];
  extendMainLine?: boolean;
}

export const useAnalysisTree = ({
  initialMoves = [],
  extendMainLine = false,
}: UseAnalysisTreeOptions = {}) => {
  const [moves, setMoves] = useState<AnalysisMoveNode[]>(() =>
    TreeUtils.createTreeFromMoves(initialMoves)
  );

  const [currentPosition, setCurrentPosition] = useState<AnalysisPosition>(
    TreeUtils.createInitialPosition
  );

  const originalMoves = useMemo(
    () => initialMoves.map((m) => m.san),
    [initialMoves]
  );

  // Derived state (memoized)
  const isInBranch = useMemo(
    () => TreeUtils.isInBranch(currentPosition),
    [currentPosition]
  );
  const isAtStart = useMemo(
    () => TreeUtils.isAtStart(currentPosition),
    [currentPosition]
  );
  const isAtEnd = useMemo(
    () => TreeUtils.isAtEnd(moves, currentPosition),
    [moves, currentPosition]
  );

  // Add a move to the tree
  const addMove = useCallback(
    (move: Move) => {
      const result = TreeUtils.addMoveToTree(
        moves,
        originalMoves,
        currentPosition,
        move,
        { extendMainLine }
      );

      if (result.moves !== moves) {
        setMoves(result.moves);
      }
      setCurrentPosition(result.position);
      return result;
    },
    [moves, originalMoves, currentPosition, extendMainLine]
  );

  // Reset tree with new moves
  const reset = useCallback((newMoves: Move[] = []) => {
    setMoves(TreeUtils.createTreeFromMoves(newMoves));
    setCurrentPosition(TreeUtils.createInitialPosition());
  }, []);

  // Clear all branches, keeping only main line
  const clearBranches = useCallback(() => {
    setMoves(TreeUtils.clearAllBranches(moves));
    // If currently in a branch, return to main line
    if (currentPosition.branch) {
      setCurrentPosition(TreeUtils.exitBranchPosition(currentPosition));
    }
  }, [moves, currentPosition]);

  // Check if there are any branches
  const hasBranches = useMemo(
    () => moves.some((node) => node.branches.length > 0),
    [moves]
  );

  return {
    // State
    moves,
    currentPosition,
    setCurrentPosition,
    originalMoves,
    isInBranch,
    isAtStart,
    isAtEnd,
    hasBranches,

    // Actions
    addMove,
    reset,
    clearBranches,
  };
};
