import { useUser } from "@/hooks/useUser";
import { User } from "lucide-react";
import "@lichess-org/chessground/assets/chessground.base.css";
import "@lichess-org/chessground/assets/chessground.brown.css";
import "@lichess-org/chessground/assets/chessground.cburnett.css";
import { useCurrentGame } from "../CurrentGameContext";
import { useLocation } from "react-router";

const CurrentGameBoard = () => {
  const { userName, image } = useUser();
  const { boardRef } = useCurrentGame();

  const { opponentRating, opponentUserName } = useLocation().state || {
    opponentRating: 0,
    opponentUserName: "",
  };

  return (
    <section className="flex w-full flex-1 flex-col overflow-hidden rounded-xl border border-border/60 bg-[#1a1a1a] shadow-sm">
      <header className="flex items-center justify-between bg-[#2f2f2f] px-4 py-2 text-sm text-white">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-[#3d3d3d]">
            <User className="size-4" />
          </div>
          <div className="leading-tight">
            <p className="font-semibold">{opponentUserName}</p>
            <p className="text-xs text-white/70">{opponentRating} rating</p>
          </div>
        </div>
        <span className="rounded-md bg-black/50 px-2 py-1 text-xs tracking-wider">
          3:00
        </span>
      </header>

      <div className="flex flex-1 items-center justify-center bg-[#2a2a2a] p-4">
        <div className="relative aspect-square w-full max-w-3xl">
          <div ref={boardRef} className="h-full w-full" />
        </div>
      </div>

      <footer className="flex items-center justify-between bg-[#2f2f2f] px-4 py-2 text-sm text-white">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center overflow-hidden rounded-full">
            <img
              src={image}
              alt="Player avatar"
              className="size-full object-cover"
            />
          </div>
          <div className="leading-tight">
            <p className="font-semibold">{userName}</p>
            <p className="text-xs text-white/70">3415 rating</p>
          </div>
        </div>
        <span className="rounded-md bg-black/50 px-2 py-1 text-xs tracking-wider">
          3:00
        </span>
      </footer>
    </section>
  );
};

export default CurrentGameBoard;
