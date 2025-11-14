import { createContext, useContext, useEffect, type ReactNode } from "react";
import useWebSocket from "react-use-websocket";
import { WS_BASE_URL } from "@/constants/apiConfig";
import { parseWebSocketMessage } from "@/features/game/utils/websocket-helpers";
import type {
  NotificationWebSocketMessage,
  Challenge,
} from "../types/websocket-messages";
import { toast } from "sonner";
import ChallengeNotification from "../components/ChallengeNotification";
import { useNavigate } from "react-router";
import { useUser } from "@/hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { QKEY_CHALLENGES } from "@/constants/queryKeys";
import { useManageChallenge } from "../hooks/useManageChallenge";

type ChallengesContextType = {
  sendMessage: (message: string) => void;
  readyState: number;
  handleAcceptChallenge: (challengerId: string) => void;
  handleDeclineChallenge: (challengerId: string) => void;
  sendChallenge: (data: {
    challengedId: string;
    color: "white" | "black" | "random";
    time: number;
    increment: number;
  }) => void;
};

const ChallengesContext = createContext<ChallengesContextType | undefined>(
  undefined
);

export const ChallengesProvider = ({ children }: { children: ReactNode }) => {
  const { id, isAuthenticated } = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { lastMessage, sendMessage, readyState } = useWebSocket(
    isAuthenticated && id ? `${WS_BASE_URL}/notifications` : null,
    {
      share: true,
    }
  );

  const { handleAccept, handleDecline, sendChallenge } = useManageChallenge(
    sendMessage,
    readyState
  );

  useEffect(() => {
    if (!lastMessage) return;
    const message =
      parseWebSocketMessage<NotificationWebSocketMessage>(lastMessage);
    if (!message) return;

    switch (message.type) {
      case "challenge_received":
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
        break;

      case "opponent_unavailable":
        toast.dismiss();
        toast.error("Player is currently unavailable", {
          id: "currently_unavailable",
        });
        break;

      case "challenge_declined":
        toast.dismiss();
        toast.info("Challenge was declined", { id: "challenge_declined" });
        break;

      case "error":
        toast.dismiss();
        toast.error(message.data.message, { id: "error" });
        break;

      case "match_created":
        toast.dismiss();
        // Clear all challenges when game starts
        queryClient.setQueryData<Challenge[]>([QKEY_CHALLENGES], []);
        navigate(`/game/${message.data.gameId}`, {
          replace: true,
          state: {
            color: message.data.color,
            opponentRating: message.data.opponentRating,
            opponentUsername: message.data.opponentUsername,
            time: message.data.time,
            increment: message.data.increment,
          },
        });
        break;

      default:
        console.warn("Unknown notification type:", message);
    }
  }, [lastMessage]);

  return (
    <ChallengesContext.Provider
      value={{
        sendMessage,
        readyState,
        handleAcceptChallenge: handleAccept,
        handleDeclineChallenge: handleDecline,
        sendChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
};

/* eslint-disable-next-line */
export const useChallenges = () => {
  const context = useContext(ChallengesContext);
  if (!context) {
    throw new Error("useChallenges must be used within ChallengesProvider");
  }
  return context;
};
