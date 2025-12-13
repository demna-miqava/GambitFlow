import type { Move } from "chess.js";
import type {
  AnalysisMoveNode,
  AnalysisPosition,
  AddMoveResult,
  BranchMove,
} from "../types/analysis.types";

const STARTING_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

/**
 * Converts chess.js moves to our tree structure
 */
export function createTreeFromMoves(moves: Move[]): AnalysisMoveNode[] {
  return moves.map((move) => ({
    move: move.san,
    branches: [],
    from: move.from,
    to: move.to,
    fen: move.after,
  }));
}

/**
 * Creates the initial position (at the start of the game)
 */
export function createInitialPosition(): AnalysisPosition {
  return {
    mainLineIndex: 0,
    branch: null,
  };
}

/**
 * Creates a position on the main line at a given move index
 */
export function createMainLinePosition(index: number): AnalysisPosition {
  return {
    mainLineIndex: index + 1,
    branch: null,
  };
}

/**
 * Finds an existing branch that starts with the given move
 * Returns the branch index or -1 if not found
 */
export function findExistingBranchIndex(
  node: AnalysisMoveNode,
  moveSan: string
): number {
  return node.branches.findIndex((b) => b[0]?.move === moveSan);
}

/**
 * Builds the FEN for a given position
 */
export function buildPositionFen(
  moves: AnalysisMoveNode[],
  position: AnalysisPosition
): string {
  const { mainLineIndex, branch } = position;

  // At starting position
  if (mainLineIndex === 0 && !branch) {
    return STARTING_FEN;
  }

  // In a branch - get FEN from branch move
  if (branch) {
    const branchMove =
      moves[mainLineIndex]?.branches[branch.branchIndex]?.[branch.moveIndex];
    return branchMove?.fen ?? STARTING_FEN;
  }

  // On main line - get FEN from the move at current position
  const node = moves[mainLineIndex - 1];
  return node?.fen ?? STARTING_FEN;
}

/**
 * Gets the expected move at current position (for detecting divergence)
 */
export function getExpectedMove(
  originalMoves: string[],
  position: AnalysisPosition
): string | null {
  const { mainLineIndex, branch } = position;

  // If in a branch, no expected move from original game
  if (branch) return null;

  // If past the original game, no expected move
  if (mainLineIndex >= originalMoves.length) return null;

  return originalMoves[mainLineIndex];
}

/**
 * Checks if a position is at the start
 */
export function isAtStart(position: AnalysisPosition): boolean {
  return position.mainLineIndex === 0 && !position.branch;
}

/**
 * Checks if a position is at the end of its current line
 */
export function isAtEnd(
  moves: AnalysisMoveNode[],
  position: AnalysisPosition
): boolean {
  const { mainLineIndex, branch } = position;

  if (!branch) {
    return mainLineIndex === moves.length;
  }

  // In a branch - check if at end of branch
  const branchMoves = moves[mainLineIndex]?.branches[branch.branchIndex];
  if (!branchMoves) return true;
  return branch.moveIndex === branchMoves.length - 1;
}

/**
 * Checks if position is in a branch
 */
export function isInBranch(position: AnalysisPosition): boolean {
  return position.branch !== null;
}

interface AddMoveOptions {
  extendMainLine?: boolean;
}

/**
 * Adds a move to the tree
 * @param extendMainLine - If true, moves at the end extend the main line instead of creating branches
 */
export function addMoveToTree(
  moves: AnalysisMoveNode[],
  originalMoves: string[],
  position: AnalysisPosition,
  move: Move,
  options: AddMoveOptions = {}
): AddMoveResult {
  const { extendMainLine = false } = options;
  const { mainLineIndex, branch } = position;
  const moveSan = move.san;

  const newBranchMove: BranchMove = {
    move: moveSan,
    from: move.from,
    to: move.to,
    fen: move.after,
  };

  // Case 1: In a branch
  if (branch) {
    const branchMoves = moves[mainLineIndex]?.branches[branch.branchIndex];
    if (!branchMoves) {
      return { position, moves };
    }

    const nextMoveIndex = branch.moveIndex + 1;

    // Check if move matches next move in branch
    if (branchMoves[nextMoveIndex]?.move === moveSan) {
      return {
        position: {
          mainLineIndex,
          branch: { branchIndex: branch.branchIndex, moveIndex: nextMoveIndex },
        },
        moves,
      };
    }

    // Different move - truncate branch and add new move
    const newMoves = structuredClone(moves);
    const newBranch = newMoves[mainLineIndex].branches[branch.branchIndex];
    // Keep moves up to current position, then add new move
    newBranch.splice(
      nextMoveIndex,
      newBranch.length - nextMoveIndex,
      newBranchMove
    );

    return {
      position: {
        mainLineIndex,
        branch: { branchIndex: branch.branchIndex, moveIndex: nextMoveIndex },
      },
      moves: newMoves,
    };
  }

  // Case 2: On main line, move matches expected - advance
  const expectedMove = getExpectedMove(originalMoves, position);
  if (expectedMove === moveSan) {
    return {
      position: { mainLineIndex: mainLineIndex + 1, branch: null },
      moves,
    };
  }

  // Case 3: On main line, move diverges - create or enter branch
  if (mainLineIndex < moves.length) {
    const mainNode = moves[mainLineIndex];

    // Check if this branch already exists
    const existingBranchIndex = findExistingBranchIndex(mainNode, moveSan);

    if (existingBranchIndex !== -1) {
      return {
        position: {
          mainLineIndex,
          branch: { branchIndex: existingBranchIndex, moveIndex: 0 },
        },
        moves,
      };
    }

    // Create new branch
    const newMoves = structuredClone(moves);
    const newBranchIndex = newMoves[mainLineIndex].branches.length;
    newMoves[mainLineIndex].branches.push([newBranchMove]);

    return {
      position: {
        mainLineIndex,
        branch: { branchIndex: newBranchIndex, moveIndex: 0 },
      },
      moves: newMoves,
    };
  }

  // Case 4: At end of original game
  if (moves.length === 0) {
    const newNode: AnalysisMoveNode = {
      move: moveSan,
      branches: [],
      from: move.from,
      to: move.to,
      fen: move.after,
    };
    return {
      position: { mainLineIndex: 1, branch: null },
      moves: [newNode],
    };
  }

  // Case 5: extendMainLine mode - always extend the main line at the end
  if (extendMainLine) {
    const newNode: AnalysisMoveNode = {
      move: moveSan,
      branches: [],
      from: move.from,
      to: move.to,
      fen: move.after,
    };
    return {
      position: { mainLineIndex: moves.length + 1, branch: null },
      moves: [...moves, newNode],
    };
  }

  // Case 6: Create branch on last move (original behavior)
  const lastMoveIndex = moves.length - 1;
  const lastNode = moves[lastMoveIndex];

  // Check if branch already exists
  const existingBranchIndex = findExistingBranchIndex(lastNode, moveSan);

  if (existingBranchIndex !== -1) {
    return {
      position: {
        mainLineIndex: lastMoveIndex,
        branch: { branchIndex: existingBranchIndex, moveIndex: 0 },
      },
      moves,
    };
  }

  // Create new branch on last move
  const newMoves = structuredClone(moves);
  const newBranchIndex = newMoves[lastMoveIndex].branches.length;
  newMoves[lastMoveIndex].branches.push([newBranchMove]);

  return {
    position: {
      mainLineIndex: lastMoveIndex,
      branch: { branchIndex: newBranchIndex, moveIndex: 0 },
    },
    moves: newMoves,
  };
}

/**
 * Navigate to end of current line
 */
export function goToEndPosition(
  moves: AnalysisMoveNode[],
  position: AnalysisPosition
): AnalysisPosition {
  const { mainLineIndex, branch } = position;

  if (!branch) {
    return { mainLineIndex: moves.length, branch: null };
  }

  // In a branch - go to end of branch
  const branchMoves = moves[mainLineIndex]?.branches[branch.branchIndex];
  if (!branchMoves) return position;

  return {
    mainLineIndex,
    branch: {
      branchIndex: branch.branchIndex,
      moveIndex: branchMoves.length - 1,
    },
  };
}

/**
 * Go forward one move
 */
export function goForwardPosition(
  moves: AnalysisMoveNode[],
  position: AnalysisPosition
): AnalysisPosition | null {
  const { mainLineIndex, branch } = position;

  if (!branch) {
    if (mainLineIndex < moves.length) {
      return { mainLineIndex: mainLineIndex + 1, branch: null };
    }
    return null;
  }

  // In a branch
  const branchMoves = moves[mainLineIndex]?.branches[branch.branchIndex];
  if (!branchMoves) return null;

  if (branch.moveIndex < branchMoves.length - 1) {
    return {
      mainLineIndex,
      branch: {
        branchIndex: branch.branchIndex,
        moveIndex: branch.moveIndex + 1,
      },
    };
  }
  return null;
}

/**
 * Go back one move
 */
export function goBackPosition(
  position: AnalysisPosition
): AnalysisPosition | null {
  const { mainLineIndex, branch } = position;
  if (!branch) {
    if (mainLineIndex > 0) {
      return { mainLineIndex: mainLineIndex - 1, branch: null };
    }
    return null;
  }

  // In a branch
  if (branch.moveIndex > 0) {
    return {
      mainLineIndex,
      branch: {
        branchIndex: branch.branchIndex,
        moveIndex: branch.moveIndex - 1,
      },
    };
  }

  // At first move of branch - return to main line position before branch
  return { mainLineIndex, branch: null };
}

/**
 * Exit branch and return to main line
 */
export function exitBranchPosition(
  position: AnalysisPosition
): AnalysisPosition {
  if (position.branch) {
    return {
      mainLineIndex: position.mainLineIndex + 1,
      branch: null,
    };
  }
  return position;
}

/**
 * Compare two positions for equality
 */
export function arePositionsEqual(
  a: AnalysisPosition,
  b: AnalysisPosition
): boolean {
  if (a.mainLineIndex !== b.mainLineIndex) return false;
  if (a.branch === null && b.branch === null) return true;
  if (a.branch === null || b.branch === null) return false;
  return (
    a.branch.branchIndex === b.branch.branchIndex &&
    a.branch.moveIndex === b.branch.moveIndex
  );
}

/**
 * Clears all branches from the tree, keeping only the main line
 */
export function clearAllBranches(
  moves: AnalysisMoveNode[]
): AnalysisMoveNode[] {
  return moves.map((node) => ({
    ...node,
    branches: [],
  }));
}
