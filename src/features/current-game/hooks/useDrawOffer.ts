import { useState, useEffect, useMemo } from "react";
import type {
  DrawOfferMessage,
  DrawResponseMessage,
  GameEndedMessage,
} from "@/features/game/types/websocket-messages";
import { useUser } from "@/hooks/useUser";
import { messageDispatcher } from "@/services/websocketMessageDispatcher";
import { GAME_MESSAGE_TYPES } from "@/features/game/constants/websocket-types";

export const useDrawOffer = (gameEnded: boolean) => {
  const { id } = useUser();
  const [hasDrawOffer, setHasDrawOffer] = useState(false);
  const [opponentDeclinedDraw, setOpponentDeclinedDraw] = useState(false);

  useEffect(() => {
    const unsubDrawOffer = messageDispatcher.subscribe<DrawOfferMessage>(
      GAME_MESSAGE_TYPES.DRAW_OFFER,
      () => {
        setHasDrawOffer(true);
      }
    );

    const unsubDrawResponse = messageDispatcher.subscribe<DrawResponseMessage>(
      GAME_MESSAGE_TYPES.DRAW_RESPONSE,
      (data) => {
        if (data.userId === id) {
          setHasDrawOffer(false);
        } else {
          setOpponentDeclinedDraw(!data.accepted);
        }
      }
    );

    const unsubGameEnded = messageDispatcher.subscribe<GameEndedMessage>(
      GAME_MESSAGE_TYPES.GAME_ENDED,
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

  const showDrawOffer = useMemo(
    () => !gameEnded && hasDrawOffer,
    [gameEnded, hasDrawOffer]
  );

  const showOpponentDeclined = useMemo(
    () => opponentDeclinedDraw,
    [opponentDeclinedDraw]
  );

  return {
    showDrawOffer,
    showOpponentDeclined,
    setHasDrawOffer,
  };
};
