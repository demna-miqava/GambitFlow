import { createContext, useContext, type ReactNode, useMemo } from "react";
import { useNotificationWebSocket } from "../hooks/useNotificationWebSocket";
import { useManageChallenge } from "../hooks/useManageChallenge";
import { useChallengeMessageHandlers } from "../hooks/useChallengeMessageHandlers";

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
  // Manage WebSocket connection
  const { sendMessage, readyState } = useNotificationWebSocket();

  // Manage challenge actions (send, accept, decline)
  const { handleAccept, handleDecline, sendChallenge } = useManageChallenge(
    sendMessage,
    readyState
  );

  // Handle incoming challenge messages
  useChallengeMessageHandlers(handleAccept, handleDecline);

  const value = useMemo(
    () => ({
      sendMessage,
      readyState,
      handleAcceptChallenge: handleAccept,
      handleDeclineChallenge: handleDecline,
      sendChallenge,
    }),
    [sendMessage, readyState, handleAccept, handleDecline, sendChallenge]
  );

  return (
    <ChallengesContext.Provider value={value}>
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
