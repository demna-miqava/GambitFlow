import { useUser } from "@/hooks/useUser";
import { User } from "lucide-react";
import { useCurrentGame } from "../CurrentGameContext";
import { useLocation } from "react-router";
import Clock from "./Clock";
import { BoardLayout } from "@/features/game/components/BoardLayout";

const CurrentGameBoard = () => {
  const { userName, image } = useUser();
  const { boardRef, turn } = useCurrentGame();
  const startingTime = 60000;
  const increment = 2000;
  const { opponentRating, opponentUserName, color } = useLocation().state || {
    opponentRating: 0,
    opponentUserName: "",
    color: "",
  };

  return (
    <BoardLayout
      boardRef={boardRef}
      topPlayer={{
        name: opponentUserName,
        rating: opponentRating,
        avatar: (
          <div className="flex size-8 items-center justify-center rounded-full bg-[#3d3d3d]">
            <User className="size-4" />
          </div>
        ),
      }}
      bottomPlayer={{
        name: userName,
        rating: 3415,
        avatar: (
          <div className="flex size-8 items-center justify-center overflow-hidden rounded-full">
            <img
              src={image}
              alt="Player avatar"
              className="size-full object-cover"
            />
          </div>
        ),
      }}
      topPlayerClock={
        <Clock
          startingTime={startingTime}
          increment={increment}
          isActive={turn !== color}
        />
      }
      bottomPlayerClock={
        <Clock
          startingTime={startingTime}
          increment={increment}
          isActive={turn === color}
        />
      }
    />
  );
};

export default CurrentGameBoard;
