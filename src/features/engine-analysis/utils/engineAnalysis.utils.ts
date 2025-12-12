import { Chess } from "chess.js";
import { EVAL_BAR } from "@/features/engine-analysis/constants";
import type { EvaluationLine } from "../types";
import type { PlayerColor } from "@/features/game/types/game.types";

/**
 * Format evaluation score for display
 */
export const formatScore = (
  line: EvaluationLine,
  playerColor?: PlayerColor
): string => {
  // Evaluation Bar case: Absolute values, no signs
  if (!playerColor) {
    if (line.mate !== undefined) {
      return `M${Math.abs(line.mate)}`;
    }
    return Math.abs(line.score / 100).toFixed(1);
  }

  // Analysis Lines case: Relative signed values based on player color
  const multiplier = playerColor === "black" ? -1 : 1;

  if (line.mate !== undefined) {
    const relativeMate = line.mate * multiplier;
    return relativeMate > 0 ? `M${relativeMate}` : `-M${Math.abs(relativeMate)}`;
  }

  const relativeScore = (line.score * multiplier) / 100;
  const sign = relativeScore > 0 ? "+" : "";
  return `${sign}${relativeScore.toFixed(1)}`;
};

/**
 * Calculate white's percentage for evaluation bar (5-95 to always show both sides)
 */
export const getWhitePercentage = (line: EvaluationLine): number => {
  const { minPercentage, maxPercentage, pawnCap, pawnScale } = EVAL_BAR;

  if (line.mate !== undefined) {
    // If a mate is found, the bar should be fully one-sided
    return line.mate > 0 ? 100 : 0;
  }

  const pawnScore = line.score / 100;

  // Beyond +/- cap pawns, clamp to min/max
  if (pawnScore >= pawnCap) return maxPercentage;
  if (pawnScore <= -pawnCap) return minPercentage;

  // Scale: 0 = 50%, +cap = max, -cap = min
  const percentage = 50 + pawnScore * pawnScale;
  return Math.max(minPercentage, Math.min(maxPercentage, percentage));
};

/**
 * Convert UCI moves to SAN notation
 */
export const formatPv = (
  pv: string[],
  fen: string,
  maxMoves: number = 6
): string => {
  if (!fen) return pv.slice(0, maxMoves).join(" ");

  try {
    const tempChess = new Chess(fen);
    const sanMoves: string[] = [];

    for (let i = 0; i < Math.min(pv.length, maxMoves); i++) {
      const uciMove = pv[i];
      const from = uciMove.slice(0, 2);
      const to = uciMove.slice(2, 4);
      const promotion = uciMove[4];

      const move = tempChess.move({ from, to, promotion });
      if (move) {
        sanMoves.push(move.san);
      } else {
        break;
      }
    }

    return sanMoves.join(" ");
  } catch {
    return pv.slice(0, maxMoves).join(" ");
  }
};
