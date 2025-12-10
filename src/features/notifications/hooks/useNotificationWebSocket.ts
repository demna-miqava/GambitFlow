import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { WS_BASE_URL } from "@/constants/apiConfig";
import { useUser } from "@/hooks/useUser";
import { useAuthenticatedWebSocketUrl } from "@/hooks/useAuthenticatedWebSocketUrl";
import { parseWebSocketMessage } from "@/features/game/utils/websocket-helpers";
import { messageDispatcher } from "@/services/websocketMessageDispatcher";
import type { NotificationWebSocketMessage } from "../types/websocket-messages";

/**
 * Hook for managing the notifications WebSocket connection.
 * Only connects when user is authenticated and has a chess profile.
 * Parses incoming messages and dispatches them to all subscribers.
 *
 * @returns WebSocket connection state and methods
 */
export const useNotificationWebSocket = () => {
  const { id, isAuthenticated, hasProfile } = useUser();

  const baseUrl = isAuthenticated && id && hasProfile ? `${WS_BASE_URL}/notifications` : null;
  const wsUrl = useAuthenticatedWebSocketUrl(baseUrl, true);

  const { lastMessage, sendMessage, readyState } = useWebSocket(wsUrl, {
    share: true,
  });

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
