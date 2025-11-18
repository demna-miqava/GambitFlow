import type { PieceSymbol } from "chess.js";
import type { PlayerColor } from "@/features/game/types/game.types";

// Import piece SVGs
import WhiteQueen from "@/assets/pieces/white_queen.svg";
import WhiteRook from "@/assets/pieces/white_rook.svg";
import WhiteBishop from "@/assets/pieces/white_bishop.svg";
import WhiteKnight from "@/assets/pieces/white_knight.svg";
import BlackQueen from "@/assets/pieces/black_quuen.svg";
import BlackRook from "@/assets/pieces/black_rook.svg";
import BlackBishop from "@/assets/pieces/black_bishop.svg";
import BlackKnight from "@/assets/pieces/black_knight.svg";

export type PromotionPiece = "q" | "r" | "b" | "n";

export const PROMOTION_PIECES: readonly PromotionPiece[] = [
  "q",
  "r",
  "b",
  "n",
] as const;

export const PIECE_NAMES: Readonly<Record<PieceSymbol, string>> = {
  q: "queen",
  r: "rook",
  b: "bishop",
  n: "knight",
  p: "pawn",
  k: "king",
} as const;

export const PIECE_SVGS: Readonly<
  Record<PlayerColor, Record<PromotionPiece, string>>
> = {
  white: {
    q: WhiteQueen,
    r: WhiteRook,
    b: WhiteBishop,
    n: WhiteKnight,
  },
  black: {
    q: BlackQueen,
    r: BlackRook,
    b: BlackBishop,
    n: BlackKnight,
  },
} as const;
