import { useEffect, useState } from "react";
import { useGameWebSocket } from "@/features/game/hooks/useGameWebSocket";
import { useCurrentGame } from "../CurrentGameContext";
import { parseWebSocketMessage } from "@/features/game/utils/websocket-helpers";
import type { GameWebSocketMessage } from "@/features/game/types/websocket-messages";
import { useChessSound } from "@/features/game/hooks/useChessSound";

type FinishState = {
  title: string;
  description?: string;
};

export const useGameActions = () => {
  const { sendMessage, lastMessage } = useGameWebSocket();
  const { chessRef } = useCurrentGame();
  const { playGenericSound } = useChessSound();

  const [openGameResultDialog, setOpenGameResultDialog] = useState(false);
  const [finish, setFinish] = useState<FinishState | null>(null);

  const hasMoves = (chessRef.current?.history().length || 0) > 0;

  // Handle incoming server events
  useEffect(() => {
    const data = parseWebSocketMessage<GameWebSocketMessage>(lastMessage);
    if (!data) return;

    // Draw accepted by either side
    if (data.type === "game_ended") {
      setFinish({
        title: "Draw agreed",
        description: "The game ended in a draw.",
      });
      setOpenGameResultDialog(true);
      playGenericSound();
      return;
    }

    // Resignation event
    if (data.type === "resign") {
      setFinish({
        title: "You won by resignation!",
        description: "Resignation.",
      });
      playGenericSound();
      setOpenGameResultDialog(true);
      return;
    }

    if (data.type === "abort") {
      setFinish({
        title: "Game aborted!",
        description: "The opponent aborted the game.",
      });
      setOpenGameResultDialog(true);
      playGenericSound();
      return;
    }
  }, [lastMessage, playGenericSound]);

  const onResign = () => {
    sendMessage(JSON.stringify({ type: "resign" }));
    setFinish({
      title: "You resigned",
      description: "The game has ended.",
    });
    setOpenGameResultDialog(true);
    playGenericSound();
  };

  const onOfferDraw = () => {
    sendMessage(JSON.stringify({ type: "draw_offer" }));
  };

  const onAbort = () => {
    playGenericSound();
    sendMessage(JSON.stringify({ type: "abort" }));
    setFinish({
      title: "Game aborted",
      description: "The game has been aborted.",
    });
    setOpenGameResultDialog(true);
  };

  return {
    openGameResultDialog,
    setOpenGameResultDialog,
    finish,
    onResign,
    onOfferDraw,
    onAbort,
    hasMoves,
  };
};
