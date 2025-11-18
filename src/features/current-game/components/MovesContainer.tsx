import { MovesList } from "./MovesList";
import MoveControls from "./MoveControls";
import DrawOffer from "./DrawOffer";
import { Button } from "@/components/ui/button";
import { useMatchmaking } from "@/features/matchmaking/hooks/useMatchmaking";
import { useLocation } from "react-router";
import MatchActions from "./MatchActions";
import { useLiveGame } from "../contexts/LiveGameContext";
import { useDrawOffer } from "../hooks/useDrawOffer";

export const MovesContainer = () => {
  const { time, increment } = useLocation()?.state || {};
  const { setShouldConnect, isSearching } = useMatchmaking({ time, increment });
  const { gameEnded, sendMessage } = useLiveGame();

  const { showDrawOffer, showOpponentDeclined, setHasDrawOffer } =
    useDrawOffer(gameEnded);

  return (
    <div className="flex h-full flex-col rounded-xl border border-border/60 bg-card">
      <div className="flex-1 overflow-auto p-4">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Moves</h2>
        <MovesList />
      </div>

      <div className="border-t border-border/60 space-y-4 px-4 mb-4">
        {showDrawOffer && (
          <DrawOffer
            sendMessage={sendMessage}
            onRespond={() => setHasDrawOffer(false)}
          />
        )}
        {showOpponentDeclined && (
          <div
            className="w-full rounded-lg border border-gray-500/40 bg-gray-500/15 p-4 dark:border-gray-500/30 dark:bg-gray-500/10"
            role="status"
            aria-live="polite"
          >
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Opponent declined the draw
            </p>
          </div>
        )}
        <MoveControls />
        <MatchActions gameEnded={gameEnded} />
        {gameEnded && (
          <Button
            variant="secondary"
            disabled={isSearching}
            onClick={() => setShouldConnect(true)}
            className="w-full"
          >
            {isSearching ? "Searching..." : "New Game"}
          </Button>
        )}
      </div>
    </div>
  );
};
