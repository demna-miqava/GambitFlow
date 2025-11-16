import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { BOARD_CONFIG } from "../constants/board-config";
import { useParams } from "react-router";
import { parseWebSocketMessage } from "../utils/websocket-helpers";
import { messageDispatcher } from "@/services/websocketMessageDispatcher";
import type { GameWebSocketMessage } from "../types/websocket-messages";

/**
 * Hook to manage WebSocket connection for a live chess game
 * Parses incoming messages once and dispatches them to all subscribers
 *
 * IMPORTANT: This hook should only be called ONCE per game (in LiveGameContext)
 * to avoid duplicate message processing. Other components should get sendMessage
 * from useLiveGame() context instead of calling this hook directly.
 */
export const useGameWebSocket = () => {
  const { gameId } = useParams();

  const { lastMessage, sendMessage } = useWebSocket(
    gameId ? `${BOARD_CONFIG.WEBSOCKET_BASE_URL}/game/${gameId}` : null,
    { share: true }
  );

  useEffect(() => {
    if (!lastMessage) return;

    const data = parseWebSocketMessage<GameWebSocketMessage>(lastMessage);
    if (!data) return;

    messageDispatcher.dispatch(data);
  }, [lastMessage]);

  return { sendMessage, lastMessage };
};
