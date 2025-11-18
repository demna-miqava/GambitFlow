import CurrentGameBoard from "@/features/current-game/components/CurrentGameBoard";
import { MovesContainer } from "@/features/current-game/components/MovesContainer";
import { ChessBoardProvider } from "@/features/game/contexts/ChessBoardContext";
import { GameNavigationProvider } from "@/features/game/contexts/GameNavigationContext";
import { LiveGameProvider } from "@/features/current-game/contexts/LiveGameContext";
import { useParams, useLocation } from "react-router";

const CurrentGame = () => {
  const { gameId } = useParams();
  const { color } = useLocation().state;

  return (
    <ChessBoardProvider color={color} key={gameId}>
      <GameNavigationProvider>
        <LiveGameProvider>
          <div className="grid h-full grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
            <div className="flex items-center justify-center">
              <CurrentGameBoard />
            </div>
            <MovesContainer />
          </div>
        </LiveGameProvider>
      </GameNavigationProvider>
    </ChessBoardProvider>
  );
};

export default CurrentGame;
