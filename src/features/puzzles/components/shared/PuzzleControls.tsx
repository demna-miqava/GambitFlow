import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePuzzle } from "../../contexts/PuzzleContext";
import PuzzleCardHeader from "./PuzzleCardHeader";
import { PuzzleActionButtons } from "./PuzzleActionButtons";
import { PuzzleThemes } from "./PuzzleThemes";

export const PuzzleControls = () => {
  const { status, onRetry, onNextPuzzle, puzzle, onHint, onShowSolution } =
    usePuzzle();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Puzzle</CardTitle>
        <CardDescription>
          {puzzle ? `Rating: ${puzzle.rating}` : "Loading..."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Display */}
        <PuzzleCardHeader status={status} />

        {/* Action Buttons */}
        <PuzzleActionButtons
          status={status}
          onRetry={onRetry}
          onNextPuzzle={onNextPuzzle}
          onHint={onHint}
          onShowSolution={onShowSolution}
        />

        {/* Themes Tags */}
        <PuzzleThemes themes={puzzle?.themes} />
      </CardContent>
    </Card>
  );
};
