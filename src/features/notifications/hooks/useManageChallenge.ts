import { toast } from "sonner";
import type {
  AcceptChallengeMessage,
  DeclineChallengeMessage,
  SendChallengeMessage,
  Challenge,
} from "../types/websocket-messages";
import { useQueryClient } from "@tanstack/react-query";
import { QKEY_CHALLENGES } from "@/constants/queryKeys";
import type { SendMessage } from "react-use-websocket";
import type { ReadyState } from "react-use-websocket";

export const useManageChallenge = (sendMessage: SendMessage, readyState: ReadyState) => {
  const queryClient = useQueryClient();

  const checkConnection = () => {
    if (readyState !== 1) {
      toast.error("Connection lost. Please try again.");
      return false;
    }
    return true;
  };

  const sendChallenge = (data: {
    challengedId: string;
    color: "white" | "black" | "random";
    time: number;
    increment: number;
  }) => {
    if (!checkConnection()) return;

    const message: SendChallengeMessage = {
      type: "challenge_sent",
      data,
    };

    sendMessage(JSON.stringify(message));
    toast.success("Challenge sent!");
  };

  const handleAccept = (challengerId: string) => {
    if (!checkConnection()) return;

    toast.dismiss();

    queryClient.setQueryData([QKEY_CHALLENGES], []);

    const message: AcceptChallengeMessage = {
      type: "challenge_accepted",
      data: {
        challengerId,
      },
    };

    sendMessage(JSON.stringify(message));
  };

  const handleDecline = (challengerId: string) => {
    if (!checkConnection()) return;

    // Remove challenge from local state
    queryClient.setQueryData<Challenge[]>([QKEY_CHALLENGES], (old = []) =>
      old.filter((challenge) => challenge.challengerId !== challengerId)
    );

    const message: DeclineChallengeMessage = {
      type: "challenge_declined",
      data: {
        challengerId,
      },
    };

    sendMessage(JSON.stringify(message));
    toast.dismiss();
  };

  return {
    sendChallenge,
    handleAccept,
    handleDecline,
  };
};
