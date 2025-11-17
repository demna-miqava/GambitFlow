import { useCallback } from "react";
import { useNavigate } from "react-router";
import type { MatchFoundMessage } from "../types/websocket-messages";
import { MATCHMAKING_MESSAGE_TYPES } from "../constants/websocket-types";

/**
 * Hook to handle starting a game when match_found message is received
 * Used by both matchmaking and rematch flows
 */
export const useStartGame = () => {
  const navigate = useNavigate();

  const startGame = useCallback(
    (message: MatchFoundMessage) => {
      if (message.type !== MATCHMAKING_MESSAGE_TYPES.MATCH_FOUND) return;

      const {
        gameId,
        color,
        opponentRating,
        opponentUsername,
        time,
        increment,
        rating,
      } = message.data;

      if (gameId) {
        navigate(`/game/${gameId}`, {
          replace: true,
          state: {
            color: color,
            opponentRating: opponentRating,
            opponentUsername: opponentUsername,
            time,
            increment: increment ?? 0,
            rating,
          },
        });
      }
    },
    [navigate]
  );

  return { startGame };
};
