import { useEffect, useRef } from "react";
import { Chessground } from "@lichess-org/chessground";
import { BoardLayout } from "@/features/game/components/BoardLayout";
import { useUser } from "@/hooks/useUser";
import { PlayerAvatar } from "@/components/PlayerAvatar";

export const LandingBoard = () => {
  const boardRef = useRef<HTMLDivElement>(null);
  const { username, image } = useUser();

  useEffect(() => {
    if (boardRef.current) {
      Chessground(boardRef.current, {
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
        viewOnly: true,
        coordinates: true,
      });
    }
  }, []);

  return (
    <BoardLayout
      boardRef={boardRef}
      topPlayer={{
        name: "Puzzles",
        avatar: <PlayerAvatar username="Puzzles" isOpponent size="sm" />,
      }}
      bottomPlayer={{
        name: username,
        avatar: (
          <PlayerAvatar username={username} avatarUrl={image} size="sm" />
        ),
      }}
    />
  );
};
