import type { ReactNode } from "react";
import "@lichess-org/chessground/assets/chessground.base.css";
import "@lichess-org/chessground/assets/chessground.brown.css";
import "@lichess-org/chessground/assets/chessground.cburnett.css";

interface PlayerInfo {
  name: string;
  rating?: number;
  avatar?: ReactNode;
}

interface BoardLayoutProps {
  boardRef: React.RefObject<HTMLDivElement | null>;
  topPlayer: PlayerInfo;
  bottomPlayer: PlayerInfo;
  topPlayerClock?: ReactNode;
  bottomPlayerClock?: ReactNode;
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
}: BoardLayoutProps) => {
  return (
    <section className="flex w-full flex-1 flex-col overflow-hidden rounded-xl border border-border/60 bg-background shadow-sm">
      {/* Top Player (Opponent) */}
      <header className="flex items-center justify-between bg-card px-4 py-2 text-sm text-foreground">
        <div className="flex items-center gap-2">
          {topPlayer.avatar}
          <div className="leading-tight text-foreground">
            <p className="font-semibold">{topPlayer.name}</p>
            {topPlayer.rating !== undefined && (
              <p className="text-xs">{topPlayer.rating} rating</p>
            )}
          </div>
        </div>
        {topPlayerClock}
      </header>

      {/* Chess Board */}
      <div className="flex flex-1 items-center justify-center bg-background p-4">
        <div className="relative aspect-square w-full max-w-3xl">
          <div ref={boardRef} className="h-full w-full" />
        </div>
      </div>

      {/* Bottom Player (User) */}
      <footer className="flex items-center justify-between bg-card px-4 py-2 text-sm text-foreground">
        <div className="flex items-center gap-2">
          {bottomPlayer.avatar}
          <div className="leading-tight text-foreground">
            <p className="font-semibold">{bottomPlayer.name}</p>
            {bottomPlayer.rating !== undefined && (
              <p className="text-xs text-foreground">
                {bottomPlayer.rating} rating
              </p>
            )}
          </div>
        </div>
        {bottomPlayerClock}
      </footer>
    </section>
  );
};
