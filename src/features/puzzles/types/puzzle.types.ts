export type PuzzleStatus = "solving" | "success" | "failed";

export interface Puzzle {
    id: string;
    fen: string;
    moves: string[]; // UCI format (e.g., "e2e4")
    rating: number;
    themes: string[];
}
