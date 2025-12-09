import type { Chess } from "chess.js";
import type { Api } from "@lichess-org/chessground/api";
import type { Key } from "@lichess-org/chessground/types";
import type { PlayerColor } from "../types/game.types";

/**
 * Calculate legal moves for all pieces on the board
 */
export const calculateLegalMoves = (chess: Chess) => {
  return new Map(
    chess
      .moves({ verbose: true })
      .map((m) => [
        m.from,
        chess.moves({ square: m.from, verbose: true }).map((move) => move.to),
      ])
  );
};

/**
 * Get turn color from chess instance
 */
export const getTurnColor = (chess: Chess): PlayerColor => {
  return chess.turn() === "w" ? "white" : "black";
};

export interface SyncBoardOptions {
  cg: Api;
  chess: Chess;
  movableColor: PlayerColor | "both";
  lastMove?: [Key, Key];
  playPremove?: boolean;
}

/**
 * Synchronize the chessground board state with the chess.js instance.
 * Returns the current turn color.
 */
export const syncBoard = ({
  cg,
  chess,
  movableColor,
  lastMove,
  playPremove = false,
}: SyncBoardOptions): PlayerColor => {
  const turn = getTurnColor(chess);

  const dests =
    movableColor === "both"
      ? calculateLegalMoves(chess)
      : turn === movableColor
        ? calculateLegalMoves(chess)
        : new Map();

  cg.set({
    fen: chess.fen(),
    turnColor: turn,
    movable: {
      color: movableColor,
      dests,
    },
    check: chess.inCheck(),
    lastMove,
  });

  if (playPremove && movableColor !== "both" && turn === movableColor) {
    cg.playPremove();
  }

  return turn;
};
