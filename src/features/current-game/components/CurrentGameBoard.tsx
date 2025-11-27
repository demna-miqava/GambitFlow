import { useUser } from "@/hooks/useUser";
import { useLocation } from "react-router-dom";
import Clock from "./Clock";
import { BoardLayout } from "@/features/game/components/BoardLayout";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { useRef, useMemo } from "react";
import { useSettings } from "@/features/settings/SettingsContext";
import { calculatePlayerRating } from "../utils/rating-helpers";
import { useChessBoardContext } from "@/features/game/contexts/ChessBoardContext";
import { useLiveGame } from "../contexts/LiveGameContext";
import { GAME_MESSAGE_TYPES } from "@/features/game/constants/websocket-types";
import { PromotionSelector } from "@/features/game/components/PromotionSelector";

const CurrentGameBoard = () => {
  const { username, image, id } = useUser();
  const { boardRef, turn } = useChessBoardContext();
  const {
    gameEnded,
    ratingChanges,
    sendMessage,
    whiteTimeLeft,
    blackTimeLeft,
    pendingPromotion,
    handlePromotionSelect,
    cancelPromotion,
  } = useLiveGame();
  const timeoutSentRef = useRef(false);
  const { settings } = useSettings();

  const { opponentRating, opponentUsername, opponentId, rating, color, time } =
    useLocation().state || {
      opponentRating: 0,
      opponentUsername: "",
      opponentId: undefined,
      color: "",
      time: 180,
      rating: 0,
    };

  const playerRatings = useMemo(
    () =>
      calculatePlayerRating(
        rating,
        color,
        ratingChanges,
        settings?.showRatingsDuringGameEnabled ?? false,
        true
      ),
    [rating, color, ratingChanges, settings?.showRatingsDuringGameEnabled]
  );

  const opponentRatings = useMemo(
    () =>
      calculatePlayerRating(
        opponentRating,
        color,
        ratingChanges,
        settings?.showRatingsDuringGameEnabled ?? false,
        false
      ),
    [
      opponentRating,
      color,
      ratingChanges,
      settings?.showRatingsDuringGameEnabled,
    ]
  );

  const handleTimeout = (timedOutUserId: number) => {
    if (!timeoutSentRef.current) {
      timeoutSentRef.current = true;
      sendMessage(
        JSON.stringify({
          type: GAME_MESSAGE_TYPES.TIMEOUT,
          userId: timedOutUserId,
        })
      );
    }
  };

  return (
    <BoardLayout
      boardRef={boardRef}
      topPlayer={{
        name: opponentUsername,
        startingRating: opponentRatings.startingRating,
        newRating: opponentRatings.newRating,
        ratingChange: gameEnded ? opponentRatings.ratingChange : undefined,
        avatar: (
          <PlayerAvatar username={opponentUsername} isOpponent size="sm" />
        ),
      }}
      bottomPlayer={{
        name: username,
        startingRating: playerRatings.startingRating,
        newRating: playerRatings.newRating,
        ratingChange: gameEnded ? playerRatings.ratingChange : undefined,
        avatar: (
          <PlayerAvatar username={username} avatarUrl={image} size="sm" />
        ),
      }}
      topPlayerClock={
        <Clock
          startingTime={time}
          isActive={turn !== color}
          onTimeout={
            turn !== color && opponentId
              ? () => handleTimeout(opponentId)
              : undefined
          }
          gameEnded={gameEnded}
          serverTimeLeft={color === "white" ? blackTimeLeft : whiteTimeLeft}
        />
      }
      bottomPlayerClock={
        <Clock
          startingTime={time}
          isActive={turn === color}
          onTimeout={turn === color && id ? () => handleTimeout(id) : undefined}
          gameEnded={gameEnded}
          serverTimeLeft={color === "white" ? whiteTimeLeft : blackTimeLeft}
        />
      }
    >
      {pendingPromotion && (
        <PromotionSelector
          color={color}
          square={pendingPromotion.to}
          onSelect={handlePromotionSelect}
          onCancel={cancelPromotion}
          boardOrientation={color}
        />
      )}
    </BoardLayout>
  );
};

export default CurrentGameBoard;
