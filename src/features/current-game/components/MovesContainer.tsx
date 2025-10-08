import { MovesList } from "./MovesList";
import MoveControls from "./MoveControls";
import MatchActions from "./MatchActions";

export const MovesContainer = () => {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border/60 bg-background">
      <div className="flex-1 overflow-auto p-4">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Moves</h2>
        <MovesList />
      </div>

      <div className="border-t border-border/60 space-y-4 px-4 mb-4">
        <MoveControls />

        <MatchActions />
      </div>
    </div>
  );
};
