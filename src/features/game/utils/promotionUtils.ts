import type { Piece, Square } from "chess.js";
import type { PlayerColor } from "@/features/game/types/game.types";

// Constants for chess board calculations
const FILE_OFFSET = 97; // ASCII code for 'a'
const BOARD_SIZE = 8;
const PROMOTION_RANKS = { white: "8", black: "1" } as const;

/**
 * Check if a move is a pawn promotion
 */
export const isPromotionMove = (toSquare: Square, piece?: Piece): boolean => {
  if (!piece || piece.type !== "p") return false;

  const toRank = toSquare[1];
  return (
    (piece.color === "w" && toRank === PROMOTION_RANKS.white) ||
    (piece.color === "b" && toRank === PROMOTION_RANKS.black)
  );
};

/**
 * Calculate position of promotion selector on the board
 */
export const calculatePromotionPosition = (
  square: string,
  orientation: PlayerColor
) => {
  const file = square.charCodeAt(0) - FILE_OFFSET;
  const rank = parseInt(square[1]) - 1;

  const displayFile = orientation === "white" ? file : BOARD_SIZE - 1 - file;
  const displayRank = orientation === "white" ? BOARD_SIZE - 1 - rank : rank;

  return {
    left: `${(displayFile / BOARD_SIZE) * 100}%`,
    top: `${(displayRank / BOARD_SIZE) * 100}%`,
  };
};

/**
 * Determine if promotion pieces should be displayed in reverse order
 * (stacking from top vs bottom based on player color and board orientation)
 */
export const shouldReversePromotionOrder = (
  playerColor: PlayerColor,
  boardOrientation: PlayerColor
): boolean => {
  return playerColor === boardOrientation;
};
