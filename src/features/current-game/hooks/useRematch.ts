import { useState, useEffect } from "react";
import type {
  RematchRequestMessage,
  RematchResponseMessage,
  CancelRematchMessage,
} from "@/features/game/types/websocket-messages";
import type { MatchmakingMessage } from "@/features/game/types/game.types";
import { useStartGame } from "@/features/game/hooks/useStartGame";
import { messageDispatcher } from "@/features/game/services/WebSocketMessageDispatcher";
import { useLiveGame } from "../contexts/LiveGameContext";

export const useRematch = ({
  setOpenGameResultDialog,
}: {
  setOpenGameResultDialog: (open: boolean) => void;
}) => {
  const { sendMessage } = useLiveGame();
  const { startGame } = useStartGame();

  const [rematchRequested, setRematchRequested] = useState(false);
  const [rematchOffered, setRematchOffered] = useState(false);
  const [rematchDeclined, setRematchDeclined] = useState(false);

  useEffect(() => {
    const unsubCanceled = messageDispatcher.subscribe<CancelRematchMessage>(
      "rematch_canceled",
      () => {
        setRematchOffered(false);
      }
    );

    const unsubRequest = messageDispatcher.subscribe<RematchRequestMessage>(
      "rematch_request",
      () => {
        setRematchOffered(true);
      }
    );

    const unsubResponse = messageDispatcher.subscribe<RematchResponseMessage>(
      "rematch_response",
      (data) => {
        if (!data.accepted) {
          setRematchDeclined(true);
          setRematchRequested(false);
        }
      }
    );

    const unsubMatchFound = messageDispatcher.subscribe(
      "match_found",
      (data) => {
        startGame(data as unknown as MatchmakingMessage);
        setOpenGameResultDialog(false);
      }
    );

    return () => {
      unsubCanceled();
      unsubRequest();
      unsubResponse();
      unsubMatchFound();
    };
  }, [startGame, setOpenGameResultDialog]);

  const requestRematch = () => {
    sendMessage(JSON.stringify({ type: "rematch_request" }));
    setRematchRequested(true);
  };

  const acceptRematch = () => {
    sendMessage(
      JSON.stringify({ type: "rematch_response", data: { accepted: true } })
    );
  };

  const declineRematch = () => {
    sendMessage(
      JSON.stringify({ type: "rematch_response", data: { accepted: false } })
    );
    setRematchOffered(false);
  };

  const cancelRematch = () => {
    sendMessage(JSON.stringify({ type: "cancel_rematch" }));
    setRematchRequested(false);
  };

  return {
    rematchRequested,
    rematchOffered,
    rematchDeclined,
    requestRematch,
    acceptRematch,
    declineRematch,
    cancelRematch,
  };
};
