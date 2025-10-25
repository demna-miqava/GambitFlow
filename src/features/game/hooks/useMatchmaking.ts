import { useEffect, useMemo, useState } from "react";
import useWebSocket from "react-use-websocket";
import { useNavigate } from "react-router";
import { BOARD_CONFIG } from "../constants/board-config";
import type { MatchmakingMessage } from "../types/game.types";

interface UseMatchmakingProps {
  time: number;
  increment: number;
}

/**
 * Hook to manage matchmaking WebSocket connection
 * Handles finding opponents and navigating to game when match is found
 */
export const useMatchmaking = ({ time, increment }: UseMatchmakingProps) => {
  const [shouldConnect, setShouldConnect] = useState(false);
  const navigate = useNavigate();

  const wsUrl = useMemo(
    () =>
      shouldConnect
        ? `${BOARD_CONFIG.WEBSOCKET_BASE_URL}/matchmaking?time=${time}&increment=${increment}`
        : null,
    [shouldConnect, time, increment]
  );

  const { sendMessage, lastMessage, readyState } = useWebSocket(wsUrl, {
    share: true,
  });

  useEffect(() => {
    if (!lastMessage) return;

    const data: MatchmakingMessage = JSON.parse(lastMessage.data);

    const { gameId, color, opponentRating, opponentUsername, time, increment } =
      data.data;
    if (data.type === "match_found" && gameId) {
      navigate(`/game/${gameId}`, {
        state: {
          color: color,
          opponentRating: opponentRating,
          opponentUsername: opponentUsername,
          time,
          increment: increment ?? 0,
        },
      });
    }
  }, [lastMessage, navigate]);

  return {
    sendMessage,
    lastMessage,
    readyState,
    setShouldConnect,
    isSearching: lastMessage
      ? (JSON.parse(lastMessage.data) as MatchmakingMessage).type ===
        "searching"
      : false,
  };
};
