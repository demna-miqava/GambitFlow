import { useEffect, useState } from "react";
import type { GameEndedMessage } from "@/features/game/types/websocket-messages";
import { useChessSound } from "@/features/game/hooks/useChessSound";
import { useUser } from "@/hooks/useUser";
import { useChessBoardContext } from "@/features/game/contexts/ChessBoardContext";
import { getGameEndMessage } from "../constants/gameEndMessages";
import { messageDispatcher } from "@/features/game/services/WebSocketMessageDispatcher";
import { useSettings } from "@/features/settings/SettingsContext";
import { useLiveGame } from "../contexts/LiveGameContext";

type FinishState = {
  title: string;
  description?: string;
  ratingChange?: number;
  newRating?: number;
  opponentRatingChange?: number;
  opponentNewRating?: number;
};

export const useGameActions = () => {
  const { sendMessage } = useLiveGame();
  const { chessRef } = useChessBoardContext();
  const { settings } = useSettings();
  const { playGenericSound } = useChessSound(settings?.soundsEnabled);
  const { id: currentUserId } = useUser();

  const [openGameResultDialog, setOpenGameResultDialog] = useState(false);
  const [finish, setFinish] = useState<FinishState | null>(null);

  const hasMoves = (chessRef.current?.history().length || 0) > 0;

  useEffect(() => {
    const unsubscribe = messageDispatcher.subscribe<GameEndedMessage>(
      "game_ended",
      (data) => {
        const { reason, winnerId } = data;

        const isWinner = winnerId === currentUserId;
        const message = getGameEndMessage(reason, isWinner);

        if (message) {
          setFinish(message);
          setOpenGameResultDialog(true);
          playGenericSound();
        }
      }
    );

    return unsubscribe;
  }, [playGenericSound, currentUserId]);

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
