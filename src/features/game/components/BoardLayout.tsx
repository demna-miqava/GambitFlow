import type { ReactNode } from "react";
import "@lichess-org/chessground/assets/chessground.base.css";
import "@lichess-org/chessground/assets/chessground.brown.css";
import "@lichess-org/chessground/assets/chessground.cburnett.css";
import { PlayerDisplay } from "./PlayerDisplay";

interface PlayerInfo {
  name: string;
  startingRating?: number;
  newRating?: number;
  ratingChange?: number;
  avatar?: ReactNode;
}

interface BoardLayoutProps {
  boardRef: React.RefObject<HTMLDivElement | null>;
  topPlayer?: PlayerInfo;
  bottomPlayer?: PlayerInfo;
  topPlayerClock?: ReactNode;
  bottomPlayerClock?: ReactNode;
  children?: ReactNode;
}

/**
 * Reusable board layout component that displays a chess board
 * with player information and clocks at the top and bottom
 */
export const BoardLayout = ({
  boardRef,
  topPlayer,
  bottomPlayer,
  topPlayerClock,
  bottomPlayerClock,
  children,
}: BoardLayoutProps) => {
  return (
    <section className="flex w-full flex-1 flex-col overflow-hidden rounded-xl border border-border/60 bg-background shadow-sm">
      {topPlayer && <PlayerDisplay {...topPlayer} clock={topPlayerClock} />}

      <div className="flex flex-1 items-center justify-center bg-background">
        <div className="relative aspect-square w-full max-w-3xl">
          <div ref={boardRef} className="h-full w-full" />
          {children}
        </div>
      </div>

      {bottomPlayer && (
        <PlayerDisplay {...bottomPlayer} clock={bottomPlayerClock} />
      )}
    </section>
  );
};
