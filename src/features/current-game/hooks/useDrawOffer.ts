import { useState, useEffect } from "react";
import type {
  DrawOfferMessage,
  DrawResponseMessage,
  GameEndedMessage,
} from "@/features/game/types/websocket-messages";
import { useUser } from "@/hooks/useUser";
import { messageDispatcher } from "@/features/game/services/WebSocketMessageDispatcher";

export const useDrawOffer = (gameEnded: boolean) => {
  const { id } = useUser();
  const [hasDrawOffer, setHasDrawOffer] = useState(false);
  const [opponentDeclinedDraw, setOpponentDeclinedDraw] = useState(false);

  useEffect(() => {
    const unsubDrawOffer = messageDispatcher.subscribe<DrawOfferMessage>(
      "draw_offer",
      () => {
        setHasDrawOffer(true);
      }
    );

    const unsubDrawResponse = messageDispatcher.subscribe<DrawResponseMessage>(
      "draw_response",
      (data) => {
        if (data.userId === id) {
          setHasDrawOffer(false);
        } else {
          setOpponentDeclinedDraw(!data.accepted);
        }
      }
    );

    const unsubGameEnded = messageDispatcher.subscribe<GameEndedMessage>(
      "game_ended",
      () => {
        setHasDrawOffer(false);
      }
    );

    return () => {
      unsubDrawOffer();
      unsubDrawResponse();
      unsubGameEnded();
    };
  }, [id]);

  const showDrawOffer = !gameEnded && hasDrawOffer;
  const showOpponentDeclined = opponentDeclinedDraw;

  return {
    showDrawOffer,
    showOpponentDeclined,
    setHasDrawOffer,
  };
};
