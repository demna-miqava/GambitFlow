import { useState, useEffect, useCallback } from "react";
import type {
  RematchRequestMessage,
  RematchResponseMessage,
  CancelRematchMessage,
} from "@/features/game/types/websocket-messages";
import type { MatchFoundMessage } from "@/features/matchmaking/types/websocket-messages";
import { MATCHMAKING_MESSAGE_TYPES } from "@/features/matchmaking/constants/websocket-types";
import { useStartGame } from "@/features/matchmaking/hooks/useStartGame";
import { messageDispatcher } from "@/services/websocketMessageDispatcher";
import { useLiveGame } from "../contexts/LiveGameContext";
import { GAME_MESSAGE_TYPES } from "@/features/game/constants/websocket-types";

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
      GAME_MESSAGE_TYPES.REMATCH_CANCELED,
      () => {
        setRematchOffered(false);
      }
    );

    const unsubRequest = messageDispatcher.subscribe<RematchRequestMessage>(
      GAME_MESSAGE_TYPES.REMATCH_REQUEST,
      () => {
        setRematchOffered(true);
      }
    );

    const unsubResponse = messageDispatcher.subscribe<RematchResponseMessage>(
      GAME_MESSAGE_TYPES.REMATCH_RESPONSE,
      (data) => {
        if (!data.accepted) {
          setRematchDeclined(true);
          setRematchRequested(false);
        }
      }
    );

    const unsubMatchFound = messageDispatcher.subscribe<MatchFoundMessage>(
      MATCHMAKING_MESSAGE_TYPES.MATCH_FOUND,
      (data) => {
        startGame(data);
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

  const requestRematch = useCallback(() => {
    sendMessage(JSON.stringify({ type: GAME_MESSAGE_TYPES.REMATCH_REQUEST }));
    setRematchRequested(true);
  }, [sendMessage]);

  const acceptRematch = useCallback(() => {
    sendMessage(
      JSON.stringify({ type: GAME_MESSAGE_TYPES.REMATCH_RESPONSE, data: { accepted: true } })
    );
  }, [sendMessage]);

  const declineRematch = useCallback(() => {
    sendMessage(
      JSON.stringify({ type: GAME_MESSAGE_TYPES.REMATCH_RESPONSE, data: { accepted: false } })
    );
    setRematchOffered(false);
  }, [sendMessage]);

  const cancelRematch = useCallback(() => {
    sendMessage(JSON.stringify({ type: GAME_MESSAGE_TYPES.CANCEL_REMATCH }));
    setRematchRequested(false);
  }, [sendMessage]);

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
