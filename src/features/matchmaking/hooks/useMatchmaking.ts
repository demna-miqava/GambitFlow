import { useEffect, useMemo, useState, useCallback } from "react";
import useWebSocket from "react-use-websocket";
import { BOARD_CONFIG } from "@/features/game/constants/board-config";
import type {
  MatchmakingMessage,
  MatchFoundMessage,
} from "../types/websocket-messages";
import { MATCHMAKING_MESSAGE_TYPES } from "../constants/websocket-types";
import { parseWebSocketMessage } from "@/features/game/utils/websocket-helpers";
import { messageDispatcher } from "@/services/websocketMessageDispatcher";
import { useMessageDispatcher } from "@/hooks/useMessageDispatcher";
import { useStartGame } from "./useStartGame";

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
  const { startGame } = useStartGame();

  const wsUrl = useMemo(
    () =>
      shouldConnect
        ? `${BOARD_CONFIG.WEBSOCKET_BASE_URL}/matchmaking?time=${time}&increment=${increment}`
        : null,
    [shouldConnect, time, increment]
  );

  const { sendMessage, lastMessage, readyState } = useWebSocket(wsUrl, {
    share: true,
    shouldReconnect: () => false,
  });

  // Parse and dispatch messages
  useEffect(() => {
    if (!lastMessage) return;

    const message = parseWebSocketMessage<MatchmakingMessage>(lastMessage);
    if (!message) return;

    messageDispatcher.dispatch(message);
  }, [lastMessage]);

  const handleMatchFound = useCallback(
    (message: MatchFoundMessage) => {
      startGame(message);
      // Disconnect from matchmaking WebSocket after match is found
      setShouldConnect(false);
    },
    [startGame]
  );

  useMessageDispatcher<MatchFoundMessage>(
    MATCHMAKING_MESSAGE_TYPES.MATCH_FOUND,
    handleMatchFound
  );

  const isSearching = lastMessage
    ? parseWebSocketMessage<MatchmakingMessage>(lastMessage)?.type ===
      MATCHMAKING_MESSAGE_TYPES.SEARCHING
    : false;

  return {
    sendMessage,
    lastMessage,
    readyState,
    setShouldConnect,
    isSearching,
  };
};
