import { useRushMode } from "@/features/puzzles/contexts/PuzzleContext";
import { PuzzleControls } from "../shared/PuzzleControls";
import { Button } from "@/components/ui/button";
import { Clock, Play } from "lucide-react";

export const PuzzleRushSidebar = () => {
  const context = useRushMode();
  const { timeLeft, isGameOver, restart } = context;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-4">
      <div className="bg-card border rounded-xl p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-5 w-5" />
          <span className="font-medium">Time Left</span>
        </div>
        <span
          className={`text-2xl font-mono font-bold ${
            timeLeft < 30 ? "text-destructive animate-pulse" : "text-primary"
          }`}
        >
          {formatTime(timeLeft)}
        </span>
      </div>

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
