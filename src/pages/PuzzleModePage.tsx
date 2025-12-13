import { Navigate, useParams } from "react-router-dom";
import { ChessBoardProvider } from "@/features/game/contexts/ChessBoardContext";
import {
  InfinitePuzzleProvider,
  RushPuzzleProvider,
  SurvivalPuzzleProvider,
} from "@/features/puzzles/contexts";
import { PuzzleBoard } from "@/features/puzzles/components/layout/PuzzleBoard";
import { GameLayout } from "@/features/game/components/GameLayout";
import { ROUTES } from "@/constants/routes";
import type { PuzzleMode } from "@/features/puzzles/types/puzzle.types";
import type { ReactNode } from "react";
import { PuzzleSidebar } from "@/features/puzzles/components/layout/PuzzleSidebar";

const PROVIDERS: Record<
  PuzzleMode,
  ({ children }: { children: ReactNode }) => ReactNode
> = {
  infinite: InfinitePuzzleProvider,
  rush: RushPuzzleProvider,
  survival: SurvivalPuzzleProvider,
};

const VALID_MODES: PuzzleMode[] = ["infinite", "rush", "survival"];

const PuzzleModePage = () => {
  const { mode } = useParams<{ mode: string }>();

  if (!mode || !VALID_MODES.includes(mode as PuzzleMode)) {
    return <Navigate to={ROUTES.PUZZLES} replace />;
  }

  const Provider = PROVIDERS[mode as PuzzleMode];

  return (
    <ChessBoardProvider color="white" key={mode}>
      <Provider>
        <GameLayout
          board={<PuzzleBoard />}
          sidebar={
            <div className="flex h-full flex-col gap-4">
              <PuzzleSidebar />
            </div>
          }
        />
      </Provider>
    </ChessBoardProvider>
  );
};

export default PuzzleModePage;
