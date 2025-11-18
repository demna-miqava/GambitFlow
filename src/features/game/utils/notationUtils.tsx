import type { Move } from "chess.js";
import { PIECE_SVGS } from "@/features/game/constants/promotion";
import type { ReactNode } from "react";
import type { PlayerColor } from "@/features/game/types/game.types";

export const renderMoveNotation = (
  move: Move,
  showIcons: boolean
): ReactNode => {
  if (!showIcons) {
    return move.san;
  }

  const san = move.san;
  const pieceColor: PlayerColor = move.color === "w" ? "white" : "black";

  // Check if the move starts with a piece letter (Q, R, B, N)
  const pieceMatch = san.match(/^([QRBN])/);

  if (pieceMatch) {
    const pieceLetter = pieceMatch[1];
    const pieceKey = pieceLetter.toLowerCase() as "q" | "r" | "b" | "n";
    const pieceIcon = PIECE_SVGS[pieceColor][pieceKey];
    const restOfNotation = san.slice(1);

    return (
      <span className="inline-flex items-center gap-0.5 align-middle">
        <img
          src={pieceIcon}
          alt={pieceLetter}
          className="w-5 h-5 object-contain flex-shrink-0"
        />
        <span>{restOfNotation}</span>
      </span>
    );
  }

  // For pawn moves, castling, or moves without piece letters, show as text
  return san;
};
