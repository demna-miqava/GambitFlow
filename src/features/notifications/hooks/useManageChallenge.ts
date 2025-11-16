import { useCallback } from "react";
import { toast } from "sonner";
import type {
  AcceptChallengeMessage,
  DeclineChallengeMessage,
  SendChallengeMessage,
  Challenge,
} from "../types/websocket-messages";
import { NOTIFICATION_MESSAGE_TYPES } from "../constants/websocket-types";
import { useQueryClient } from "@tanstack/react-query";
import { QKEY_CHALLENGES } from "@/constants/queryKeys";
import type { SendMessage } from "react-use-websocket";
import type { ReadyState } from "react-use-websocket";

export const useManageChallenge = (
  sendMessage: SendMessage,
  readyState: ReadyState
) => {
  const queryClient = useQueryClient();

  const checkConnection = useCallback(() => {
    if (readyState !== 1) {
      toast.error("Connection lost. Please try again.");
      return false;
    }
    return true;
  }, [readyState]);

  const sendChallenge = useCallback(
    (data: {
      challengedId: string;
      color: "white" | "black" | "random";
      time: number;
      increment: number;
    }) => {
      if (!checkConnection()) return;

      const message: SendChallengeMessage = {
        type: NOTIFICATION_MESSAGE_TYPES.CHALLENGE_SENT,
        data,
      };

      sendMessage(JSON.stringify(message));
      toast.success("Challenge sent!");
    },
    [checkConnection, sendMessage]
  );

  const handleAccept = useCallback(
    (challengerId: string) => {
      if (!checkConnection()) return;

      toast.dismiss();

      queryClient.setQueryData([QKEY_CHALLENGES], []);

      const message: AcceptChallengeMessage = {
        type: NOTIFICATION_MESSAGE_TYPES.CHALLENGE_ACCEPTED,
        data: {
          challengerId,
        },
      };

      sendMessage(JSON.stringify(message));
    },
    [checkConnection, queryClient, sendMessage]
  );

  const handleDecline = useCallback(
    (challengerId: string) => {
      if (!checkConnection()) return;

      // Remove challenge from local state
      queryClient.setQueryData<Challenge[]>([QKEY_CHALLENGES], (old = []) =>
        old.filter((challenge) => challenge.challengerId !== challengerId)
      );

      const message: DeclineChallengeMessage = {
        type: NOTIFICATION_MESSAGE_TYPES.CHALLENGE_DECLINED,
        data: {
          challengerId,
        },
      };

      sendMessage(JSON.stringify(message));
      toast.dismiss();
    },
    [checkConnection, queryClient, sendMessage]
  );

  return {
    sendChallenge,
    handleAccept,
    handleDecline,
  };
};
