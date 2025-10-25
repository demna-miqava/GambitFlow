import { useState, useEffect } from "react";
import { useGameWebSocket } from "@/features/game/hooks/useGameWebSocket";
import { parseWebSocketMessage } from "@/features/game/utils/websocket-helpers";
import type { GameWebSocketMessage } from "@/features/game/types/websocket-messages";
import type { MatchmakingMessage } from "@/features/game/types/game.types";
import { useStartGame } from "@/features/game/hooks/useStartGame";

export const useRematch = ({
  setOpenGameResultDialog,
}: {
  setOpenGameResultDialog: (open: boolean) => void;
}) => {
  const { sendMessage, lastMessage } = useGameWebSocket();

  const { startGame } = useStartGame();

  const [rematchRequested, setRematchRequested] = useState(false);
  const [rematchOffered, setRematchOffered] = useState(false);
  const [rematchDeclined, setRematchDeclined] = useState(false);
  useEffect(() => {
    if (!lastMessage) return;

    try {
      const data = parseWebSocketMessage(lastMessage) as
        | GameWebSocketMessage
        | MatchmakingMessage;
      if (!data) return;

      if (data.type === "rematch_canceled") {
        setRematchOffered(false);
      }

      if (data.type === "rematch_request") {
        setRematchOffered(true);
        return;
      }

      if (data.type === "rematch_response") {
        if (!data.accepted) {
          setRematchDeclined(true);
          setRematchRequested(false);
        }
        return;
      }

      if (data.type === "match_found") {
        startGame(data as MatchmakingMessage);
        setOpenGameResultDialog(false);
      }
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  }, [lastMessage, startGame]);

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
