import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { WS_BASE_URL } from "@/constants/apiConfig";
import { useUser } from "@/hooks/useUser";
import { parseWebSocketMessage } from "@/features/game/utils/websocket-helpers";
import { messageDispatcher } from "@/services/websocketMessageDispatcher";
import type { NotificationWebSocketMessage } from "../types/websocket-messages";

/**
 * Hook for managing the notifications WebSocket connection.
 * Only connects when user is authenticated.
 * Parses incoming messages and dispatches them to all subscribers.
 *
 * @returns WebSocket connection state and methods
 */
export const useNotificationWebSocket = () => {
  const { id, isAuthenticated } = useUser();

  const { lastMessage, sendMessage, readyState } = useWebSocket(
    isAuthenticated && id ? `${WS_BASE_URL}/notifications` : null,
    {
      share: true,
    }
  );

  // Parse and dispatch messages to subscribers
  useEffect(() => {
    if (!lastMessage) return;

    const message =
      parseWebSocketMessage<NotificationWebSocketMessage>(lastMessage);
    if (!message) return;

    messageDispatcher.dispatch(message);
  }, [lastMessage]);

  return {
    sendMessage,
    readyState,
  };
};
