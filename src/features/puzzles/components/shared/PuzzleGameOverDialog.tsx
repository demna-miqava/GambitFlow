import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, Skull } from "lucide-react";

interface PuzzleGameOverDialogProps {
  isOpen: boolean;
  score: number;
  mode: "rush" | "survival";
  onRestart: () => void;
  onClose: () => void;
}

export const PuzzleGameOverDialog = ({
  isOpen,
  score,
  mode,
  onRestart,
  onClose,
}: PuzzleGameOverDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            {mode === "rush" ? (
              <Clock className="h-6 w-6 text-warning" />
            ) : (
              <Skull className="h-6 w-6 text-destructive" />
            )}
            Game Over
          </DialogTitle>
          <DialogDescription className="text-center pt-4">
            You solved
            <span className="block text-4xl font-bold py-2 text-primary">
              {score}
            </span>
            puzzles!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button onClick={onRestart} className="w-full sm:w-auto">
            Play Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
