type WebSocketMessage = { type: string; [key: string]: unknown };

type MessageHandler<T extends WebSocketMessage = WebSocketMessage> = (
  message: T
) => void;

/**
 * Centralized WebSocket message dispatcher.
 * Provides pub/sub pattern for WebSocket messages across the application.
 *
 * This dispatcher is used by both game and notification WebSocket connections
 * to distribute messages to multiple subscribers without tight coupling.
 */
class WebSocketMessageDispatcher {
  private handlers = new Map<string, Set<MessageHandler>>();

  subscribe<T extends WebSocketMessage>(
    messageType: string,
    handler: MessageHandler<T>
  ) {
    if (!this.handlers.has(messageType)) {
      this.handlers.set(messageType, new Set());
    }
    this.handlers.get(messageType)!.add(handler as MessageHandler);

    return () => {
      const handlers = this.handlers.get(messageType);
      if (handlers) {
        handlers.delete(handler as MessageHandler);
        if (handlers.size === 0) {
          this.handlers.delete(messageType);
        }
      }
    };
  }

  dispatch(message: WebSocketMessage) {
    const handlers = this.handlers.get(message.type);
    if (handlers) {
      handlers.forEach((handler) => handler(message));
    }
  }
}

export const messageDispatcher = new WebSocketMessageDispatcher();
