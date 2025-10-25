import { useEffect, useState } from "react";
import { useGameWebSocket } from "@/features/game/hooks/useGameWebSocket";
import { useCurrentGame } from "../CurrentGameContext";
import { parseWebSocketMessage } from "@/features/game/utils/websocket-helpers";
import type { GameWebSocketMessage } from "@/features/game/types/websocket-messages";
import { useChessSound } from "@/features/game/hooks/useChessSound";
import { useUser } from "@/hooks/useUser";

type FinishState = {
  title: string;
  description?: string;
};

export const useGameActions = () => {
  const { sendMessage, lastMessage, closeConnection } = useGameWebSocket();
  const { chessRef } = useCurrentGame();
  const { playGenericSound } = useChessSound();
  const { id: currentUserId } = useUser();

  const [openGameResultDialog, setOpenGameResultDialog] = useState(false);
  const [finish, setFinish] = useState<FinishState | null>(null);

  const hasMoves = (chessRef.current?.history().length || 0) > 0;

  // Handle incoming server events
  useEffect(() => {
    const data = parseWebSocketMessage<GameWebSocketMessage>(lastMessage);
    if (!data) return;

    if (data.type === "game_ended") {
      const { reason, winnerId } = data;
      const isWinner = winnerId === currentUserId;

      // Close WebSocket connection when game ends
      // closeConnection();

      if (reason === "resignation") {
        setFinish({
          title: isWinner ? "You won by resignation!" : "You resigned",
          description: isWinner
            ? "Your opponent resigned."
            : "The game has ended.",
        });
        playGenericSound();
        setOpenGameResultDialog(true);
      }

      if (reason === "draw_agreement") {
        setFinish({
          title: "Draw agreed",
          description: "The game ended in a draw.",
        });
        setOpenGameResultDialog(true);
        playGenericSound();
        return;
      }

      if (reason === "aborted") {
        setFinish({
          title: "Game aborted!",
          description: "The game has been aborted.",
        });
        setOpenGameResultDialog(true);
        playGenericSound();
        return;
      }

      if (reason === "checkmate") {
        setFinish({
          title: isWinner ? "You won by checkmate!" : "Checkmate",
          description: isWinner ? "Congratulations!" : "You lost the game.",
        });
        setOpenGameResultDialog(true);
        playGenericSound();
        return;
      }

      if (reason === "timeout") {
        setFinish({
          title: isWinner ? "You won on time!" : "Time's up",
          description: isWinner
            ? "Your opponent ran out of time."
            : "You ran out of time.",
        });
        setOpenGameResultDialog(true);
        playGenericSound();
        return;
      }
    }
  }, [lastMessage, playGenericSound, currentUserId, closeConnection]);

  const onResign = () => {
    sendMessage(JSON.stringify({ type: "resign" }));
  };

  const onOfferDraw = () => {
    sendMessage(JSON.stringify({ type: "draw_offer" }));
  };

  const onAbort = () => {
    sendMessage(JSON.stringify({ type: "abort" }));
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
