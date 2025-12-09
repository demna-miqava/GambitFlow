import Clock from "@/features/current-game/components/Clock";
import { BoardLayout } from "@/features/game/components/BoardLayout";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { useChessBoardContext } from "@/features/game/contexts/ChessBoardContext";

interface ArchiveGameBoardProps {
  whitePlayer: {
    username: string;
    rating: number;
    avatarUrl?: string;
  };
  blackPlayer: {
    username: string;
    rating: number;
    avatarUrl?: string;
  };
  timeControl: number;
}

const ArchiveGameBoard = ({
  whitePlayer,
  blackPlayer,
  timeControl,
}: ArchiveGameBoardProps) => {
  const { boardRef, color } = useChessBoardContext();

  const topPlayer = color === "white" ? blackPlayer : whitePlayer;
  const bottomPlayer = color === "white" ? whitePlayer : blackPlayer;

  return (
    <BoardLayout
      boardRef={boardRef}
      topPlayer={{
        name: topPlayer.username,
        startingRating: topPlayer.rating,
        avatar: (
          <PlayerAvatar
            username={topPlayer.username}
            avatarUrl={topPlayer.avatarUrl}
            isOpponent={color === "white"}
            size="sm"
          />
        ),
      }}
      bottomPlayer={{
        name: bottomPlayer.username,
        startingRating: bottomPlayer.rating,
        avatar: (
          <PlayerAvatar
            username={bottomPlayer.username}
            avatarUrl={bottomPlayer.avatarUrl}
            isOpponent={color === "black"}
            size="sm"
          />
        ),
      }}
      topPlayerClock={
        <Clock startingTime={timeControl} isActive={false} gameEnded={true} />
      }
      bottomPlayerClock={
        <Clock startingTime={timeControl} isActive={false} gameEnded={true} />
      }
    />
  );
};

export default ArchiveGameBoard;
