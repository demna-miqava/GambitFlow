import { Button } from "@/components/ui/button";
import { RotateCcw, ArrowRight, Eye } from "lucide-react";
import { type PuzzleStatus } from "../../types/puzzle.types";

interface PuzzleActionButtonsProps {
  status: PuzzleStatus;
  onRetry: () => void;
  onNextPuzzle: () => void;
  onHint: () => void;
  onShowSolution: () => void;
}

export const PuzzleActionButtons = ({
  status,
  onRetry,
  onNextPuzzle,
  onHint,
  onShowSolution,
}: PuzzleActionButtonsProps) => {
  return (
    <div className="flex flex-col gap-2">
      {status === "failed" && (
        <div className="flex gap-2 w-full">
          <Button onClick={onRetry} variant="outline" className="flex-1">
            <RotateCcw className="h-4 w-4" />
            Retry
          </Button>
          <Button onClick={onShowSolution} variant="outline" className="flex-1">
            <Eye className="h-4 w-4" />
            Show Solution
          </Button>
        </div>
      )}

      {status === "success" && (
        <Button
          onClick={onNextPuzzle}
          className="w-full gap-2 bg-success hover:bg-success/90 text-success-foreground"
        >
          Next Puzzle
          <ArrowRight className="h-4 w-4" />
        </Button>
      )}

      {status === "solving" && (
        <Button
          onClick={onHint}
          variant="outline"
          className="w-full text-xs text-muted-foreground"
        >
          Show Hint
        </Button>
      )}
    </div>
  );
};
