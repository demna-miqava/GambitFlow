export const PUZZLE_CONFIG = {
  RUSH: {
    DURATION_SECONDS: 180,
    TIMER_INTERVAL_MS: 1000,
  },
  SURVIVAL: {
    INITIAL_LIVES: 3,
  },
  PREFETCH: {
    THRESHOLD: 2,
    MAX_PAGES: 2,
  },
} as const;

export const PUZZLE_QUERY_KEY = "puzzles";

export const PUZZLE_MESSAGES = {
  LOADING_MORE: "Loading more puzzles...",
  NO_MORE: "No more puzzles available",
  LOAD_ERROR: "Failed to load puzzle",
  INVALID_DATA: "Invalid puzzle data received",
} as const;
