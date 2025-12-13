export type PuzzleStatus = "solving" | "success" | "failed";

export type PuzzleMode = "infinite" | "rush" | "survival";

export interface Puzzle {
  id: string;
  fen: string;
  moves: string[]; // UCI format (e.g., "e2e4")
  rating: number;
  themes: string[];
}

export interface PuzzleResponse {
  data: Puzzle[];
  nextCursor: number;
}

export interface SessionStats {
  solved: number;
  failed: number;
}
