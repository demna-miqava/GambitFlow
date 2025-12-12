export interface EvaluationLine {
  score: number; // Centipawns
  mate?: number;
  pv: string[]; // Principal variation (moves in UCI format)
  depth: number;
  multipv: number; // Line number (1 = best, 2 = second best, etc.)
}
