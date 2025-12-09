import type { Square } from "chess.js";

// A single move in a branch (no nested branches)
export interface BranchMove {
  move: string;
  from?: Square;
  to?: Square;
  fen?: string;
}

// A main line move that can have branches attached
export interface AnalysisMoveNode {
  move: string;
  branches: BranchMove[][]; // Each branch is a flat array of moves
  from?: Square;
  to?: Square;
  fen?: string;
}

// Position within a branch
export interface BranchPosition {
  branchIndex: number; // Which branch (0, 1, 2...)
  moveIndex: number; // Which move within that branch (0, 1, 2...)
}

export interface AnalysisPosition {
  mainLineIndex: number; // Index in main line (1-based: after move 1, after move 2...)
  branch: BranchPosition | null; // null = on main line
}

// Result of adding a move to the tree
export interface AddMoveResult {
  position: AnalysisPosition;
  moves: AnalysisMoveNode[];
}
