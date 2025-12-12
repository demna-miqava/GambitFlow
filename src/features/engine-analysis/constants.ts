export const DEFAULT_STOCKFISH_URL = import.meta.env.VITE_STOCKFISH_URL;

export const DEFAULT_ENGINE_OPTIONS = {
  skillLevel: 20,
  depth: 18,
  moveTime: 2000,
  multiPv: 1,
};

export const ANALYSIS_DEFAULTS = {
  numLines: DEFAULT_ENGINE_OPTIONS.multiPv ?? 3,
  depth: DEFAULT_ENGINE_OPTIONS.depth,
  moveTime: DEFAULT_ENGINE_OPTIONS.moveTime,
  debounceMs: 300,
};

// Evaluation bar tuning
export const EVAL_BAR = {
  minPercentage: 5,
  maxPercentage: 95,
  pawnCap: 10,
  pawnScale: 4.5, // each pawn shifts 4.5% from center
};
