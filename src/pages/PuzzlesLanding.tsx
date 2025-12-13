import { GameLayout } from "@/features/game/components/GameLayout";
import { LandingBoard } from "@/features/puzzles/components/layout/LandingBoard";
import { PuzzleModesList } from "@/features/puzzles/components/selectors/PuzzleModesList";

const PuzzlesLanding = () => {
  return (
    <GameLayout
      board={<LandingBoard />}
      sidebar={
        <div className="flex h-full flex-col gap-6 border p-4 bg-sidebar rounded-xl border-border/60">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Puzzles</h2>
            <p className="text-sm text-muted-foreground">
              Improve your chess tactics with our puzzle modes.
            </p>
          </div>

          <PuzzleModesList />
        </div>
      }
    />
  );
};

export default PuzzlesLanding;
