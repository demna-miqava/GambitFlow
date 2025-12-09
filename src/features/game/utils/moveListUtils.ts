/**
 * Gets the move number from a move index (0-based index to 1-based move number)
 */
export function getMoveNumber(index: number): number {
  return Math.floor(index / 2) + 1;
}

/**
 * Generic move pair interface for grouping moves
 */
export interface MovePair<T> {
  moveNumber: number;
  white: T | null;
  black: T | null;
}

/**
 * Groups moves into pairs (white/black) for display
 * Works with any move type by using a generic
 */
export function groupMovesIntoPairs<T>(moves: T[]): MovePair<T>[] {
  const pairs: MovePair<T>[] = [];

  for (let i = 0; i < moves.length; i += 2) {
    pairs.push({
      moveNumber: getMoveNumber(i),
      white: moves[i] ?? null,
      black: moves[i + 1] ?? null,
    });
  }

  return pairs;
}

/**
 * Groups moves into pairs with index tracking
 * Useful when you need to track the original index of each move
 */
export interface IndexedMovePair<T> {
  moveNumber: number;
  white: { item: T; index: number } | null;
  black: { item: T; index: number } | null;
}

export function groupMovesIntoPairsWithIndex<T>(
  moves: T[]
): IndexedMovePair<T>[] {
  const pairs: IndexedMovePair<T>[] = [];

  for (let i = 0; i < moves.length; i += 2) {
    pairs.push({
      moveNumber: getMoveNumber(i),
      white: moves[i] ? { item: moves[i], index: i } : null,
      black: moves[i + 1] ? { item: moves[i + 1], index: i + 1 } : null,
    });
  }

  return pairs;
}
