import { useSurvivalMode } from "@/features/puzzles/contexts/PuzzleContext";
import { PuzzleControls } from "../shared/PuzzleControls";
import { Button } from "@/components/ui/button";
import { Heart, Check, X, Play } from "lucide-react";

export const PuzzleSurvivalSidebar = () => {
  const context = useSurvivalMode();
  const { lives, history, isGameOver, restart } = context;

  return (
    <div className="space-y-4">
      <div className="bg-card border rounded-xl p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Heart className="h-5 w-5 text-destructive" />
          <span className="font-medium">Lives</span>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3].map((i) => (
            <Heart
              key={i}
              className={`h-6 w-6 transition-all ${
                i <= lives
                  ? "fill-destructive text-destructive"
                  : "text-muted/30"
              }`}
            />
          ))}
        </div>
      </div>

      {history.length > 0 && (
        <div className="bg-card border rounded-xl p-3">
          <div className="text-xs text-muted-foreground mb-2">History</div>
          <div className="flex flex-wrap gap-1.5">
            {history.map((result, idx) => (
              <div
                key={idx}
                className={`p-1.5 rounded-full transition-all ${
                  result
                    ? "bg-success-bg text-success"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {result ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <X className="h-3 w-3" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {!isGameOver && <PuzzleControls />}

      {isGameOver && (
        <Button onClick={restart} className="w-full" size="lg">
          <Play className="h-4 w-4 mr-2" />
          Play Again
        </Button>
      )}
    </div>
  );
};
