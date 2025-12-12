import { useAnalysis } from "../contexts/EngineAnalysisContext";
import { formatScore, getWhitePercentage } from "../utils/engineAnalysis.utils";
import { cn } from "@/lib/utils";

export const EvaluationBar = () => {
  const { analysis } = useAnalysis();
  const { lines } = analysis;

  const bestLine = lines[0];
  const whitePercentage = bestLine ? getWhitePercentage(bestLine) : 50;

  return (
    <div className="relative overflow-hidden rounded-sm bg-neutral-600 h-full w-full">
      {/* White portion */}
      <div
        className="absolute bg-neutral-200 transition-all duration-300 ease-out"
        style={{ bottom: 0, left: 0, right: 0, height: `${whitePercentage}%` }}
      />

      {/* Score label */}
      <div
        className={cn(
          "absolute left-0 right-0 flex items-center justify-center py-2 writing-mode-vertical",
          whitePercentage > 50 ? "bottom-0" : "top-0"
        )}
      >
        <span
          className={cn(
            "text-[10px] font-bold",
            whitePercentage > 50 ? "text-neutral-800" : "text-neutral-200"
          )}
        >
          {bestLine ? formatScore(bestLine) : "0.0"}
        </span>
      </div>
    </div>
  );
};
