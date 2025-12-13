import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";

const PuzzleCardHeader = ({ status }: { status: string }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg p-3 text-sm font-medium",
        status === "solving" && "bg-muted text-muted-foreground",
        status === "success" &&
          "text-success bg-success-bg dark:bg-green-900/30 dark:text-green-400",
        status === "failed" &&
          "text-destructive bg-destructive/10 dark:bg-red-900/30 dark:text-red-400"
      )}
    >
      {status === "solving" && <span>Find the best move!</span>}
      {status === "success" && (
        <>
          <CheckCircle2 className="h-5 w-5" />
          <span>Solved! Great job.</span>
        </>
      )}
      {status === "failed" && (
        <>
          <XCircle className="h-5 w-5" />
          <span>Incorrect. Try again?</span>
        </>
      )}
    </div>
  );
};

export default PuzzleCardHeader;
