import { useEffect } from "react";
import { messageDispatcher } from "@/services/websocketMessageDispatcher";

type WebSocketMessage = { type: string; [key: string]: unknown };

/**
 * A reusable hook for subscribing to WebSocket message dispatcher events.
 * Automatically handles cleanup on unmount and re-subscribes when handler changes.
 *
 * @param messageType - The type of message to subscribe to
 * @param handler - Callback function to handle the message (should be memoized with useCallback)
 *
 * @example
 * ```tsx
 * const handleMove = useCallback((message: MoveMessage) => {
 *   console.log('Move received:', message.move);
 * }, [dependencies]);
 *
 * useMessageDispatcher('move', handleMove);
 * ```
 */
export const useMessageDispatcher = <T extends WebSocketMessage>(
  messageType: string,
  handler: (message: T) => void
) => {
  useEffect(() => {
    const unsubscribe = messageDispatcher.subscribe<T>(messageType, handler);
    return unsubscribe;
  }, [messageType, handler]);
};
