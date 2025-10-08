import type { Chess } from "chess.js";
import type { Api } from "@lichess-org/chessground/api";
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
 * Synchronize the chessground board state with the chess.js instance
 * This updates the board UI after a move is made
 */
export const syncBoardState = (
  chessRef: React.RefObject<Chess | null>,
  cgRef: React.RefObject<Api | null>,
  playerColor: PlayerColor,
  setTurn: React.Dispatch<PlayerColor>
) => {
  const chess = chessRef.current;
  if (!chess || !cgRef.current) return;

  const turn = chess.turn();
  const playerColorCode = playerColor === "white" ? "w" : "b";
  const isMyTurn = turn === playerColorCode;

  cgRef.current.set({
    fen: chess.fen(),
    turnColor: turn === "w" ? "white" : "black",
    movable: {
      color: playerColor,
      dests: isMyTurn ? calculateLegalMoves(chess) : new Map(),
    },
    check: chess.inCheck(),
  });
  setTurn(turn === "w" ? "white" : "black");

  if (isMyTurn) {
    cgRef.current.playPremove();
  }
};
