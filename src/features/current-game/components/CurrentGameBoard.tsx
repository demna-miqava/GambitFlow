import { useUser } from "@/hooks/useUser";
import { User } from "lucide-react";
import { useLocation } from "react-router";
import Clock from "./Clock";
import { BoardLayout } from "@/features/game/components/BoardLayout";
import { UserAvatar } from "@/components/UserAvatar";
import { useRef, useMemo } from "react";
import { useSettings } from "@/features/settings/SettingsContext";
import { calculatePlayerRating } from "../utils/rating-helpers";
import { useChessBoardContext } from "@/features/game/contexts/ChessBoardContext";
import { useLiveGame } from "../contexts/LiveGameContext";
import { GAME_MESSAGE_TYPES } from "@/features/game/constants/websocket-types";

const CurrentGameBoard = () => {
  const { username, image } = useUser();
  const { boardRef, turn } = useChessBoardContext();
  const { gameEnded, ratingChanges, sendMessage } = useLiveGame();
  const timeoutSentRef = useRef(false);
  const { settings } = useSettings();

  const { opponentRating, opponentUsername, rating, color, time, increment } =
    useLocation().state || {
      opponentRating: 0,
      opponentUsername: "",
      color: "",
      time: 180,
      increment: 0,
      rating: 0,
    };

  // Calculate player and opponent ratings with useMemo for performance
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
    [opponentRating, color, ratingChanges, settings?.showRatingsDuringGameEnabled]
  );

  const handleTimeout = () => {
    if (!timeoutSentRef.current) {
      timeoutSentRef.current = true;
      sendMessage(JSON.stringify({ type: GAME_MESSAGE_TYPES.TIMEOUT }));
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
          <div className="flex size-8 items-center justify-center rounded-full bg-[#3d3d3d]">
            <User className="size-4" />
          </div>
        ),
      }}
      bottomPlayer={{
        name: username,
        startingRating: playerRatings.startingRating,
        newRating: playerRatings.newRating,
        ratingChange: gameEnded ? playerRatings.ratingChange : undefined,
        avatar: (
          <div className="flex size-8 items-center justify-center overflow-hidden rounded-full">
            <UserAvatar src={image} username={username} />
          </div>
        ),
      }}
      topPlayerClock={
        <Clock
          startingTime={time}
          increment={increment}
          isActive={turn !== color}
          onTimeout={turn !== color ? handleTimeout : undefined}
          gameEnded={gameEnded}
        />
      }
      bottomPlayerClock={
        <Clock
          startingTime={time}
          increment={increment}
          isActive={turn === color}
          onTimeout={turn === color ? handleTimeout : undefined}
          gameEnded={gameEnded}
        />
      }
    />
  );
};

export default CurrentGameBoard;
