import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useMessageDispatcher } from "@/hooks/useMessageDispatcher";
import { useUser } from "@/hooks/useUser";
import { QKEY_CHALLENGES } from "@/constants/queryKeys";
import { NOTIFICATION_MESSAGE_TYPES } from "../constants/websocket-types";
import ChallengeNotification from "../components/ChallengeNotification";
import { ROUTES, getGameRoute } from "@/constants/routes";
import type {
  NotificationWebSocketMessage,
  Challenge,
} from "../types/websocket-messages";

/**
 * Hook for handling challenge-related WebSocket messages.
 * Manages toast notifications, query cache updates, and navigation.
 *
 * @param handleAccept - Callback for accepting challenges
 * @param handleDecline - Callback for declining challenges
 */
export const useChallengeMessageHandlers = (
  handleAccept: (challengerId: string) => void,
  handleDecline: (challengerId: string) => void
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id: currentUserId } = useUser();

  // Handle challenge_received messages
  const handleChallengeReceived = useCallback(
    (message: NotificationWebSocketMessage) => {
      if (message.type !== NOTIFICATION_MESSAGE_TYPES.CHALLENGE_RECEIVED)
        return;

      // Add new challenge to the query data
      queryClient.setQueryData<Challenge[]>([QKEY_CHALLENGES], (old = []) => [
        ...old,
        {
          id: Date.now(),
          challengerId: message.data.challengerId,
          username: message.data.username,
          avatarUrl: message.data.avatarUrl,
          color: message.data.color,
          time: message.data.time,
          increment: message.data.increment,
          createdAt: message.data.createdAt,
        },
      ]);

      toast(
        <ChallengeNotification
          challengerId={message.data.challengerId}
          username={message.data.username}
          avatar={message.data.avatarUrl}
          time={message.data.time}
          increment={message.data.increment}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      );
    },
    [handleAccept, handleDecline, currentUserId]
  );

  // Handle opponent_unavailable messages
  const handleOpponentUnavailable = useCallback(() => {
    toast.dismiss();
    toast.error("Player is currently unavailable", {
      id: "currently_unavailable",
    });
  }, []);

  // Handle challenge_declined messages
  const handleChallengeDeclined = useCallback(() => {
    toast.dismiss();
    toast.info("Challenge was declined", { id: "challenge_declined" });
  }, []);

  // Handle error messages
  const handleError = useCallback((message: NotificationWebSocketMessage) => {
    if (message.type !== NOTIFICATION_MESSAGE_TYPES.ERROR) return;
    toast.dismiss();
    navigate(ROUTES.LANDING);
  }, [navigate]);

  // Handle match_created messages
  const handleMatchCreated = useCallback(
    (message: NotificationWebSocketMessage) => {
      if (message.type !== NOTIFICATION_MESSAGE_TYPES.MATCH_CREATED) return;

      toast.dismiss();
      // Clear all challenges when game starts
      queryClient.setQueryData<Challenge[]>([QKEY_CHALLENGES], []);
      navigate(getGameRoute(message.data.gameId), {
        replace: true,
        state: {
          color: message.data.color,
          opponentRating: message.data.opponentRating,
          opponentUsername: message.data.opponentUsername,
          time: message.data.time,
          increment: message.data.increment,
        },
      });
    },
    [queryClient, navigate]
  );

  // Subscribe to all message types
  useMessageDispatcher<NotificationWebSocketMessage>(
    NOTIFICATION_MESSAGE_TYPES.CHALLENGE_RECEIVED,
    handleChallengeReceived
  );

  useMessageDispatcher<NotificationWebSocketMessage>(
    NOTIFICATION_MESSAGE_TYPES.OPPONENT_UNAVAILABLE,
    handleOpponentUnavailable
  );

  useMessageDispatcher<NotificationWebSocketMessage>(
    NOTIFICATION_MESSAGE_TYPES.CHALLENGE_DECLINED,
    handleChallengeDeclined
  );

  useMessageDispatcher<NotificationWebSocketMessage>(
    NOTIFICATION_MESSAGE_TYPES.ERROR,
    handleError
  );

  useMessageDispatcher<NotificationWebSocketMessage>(
    NOTIFICATION_MESSAGE_TYPES.MATCH_CREATED,
    handleMatchCreated
  );
};
