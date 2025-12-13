import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { type PuzzleModeConfig } from "../../config/puzzleModes";
import { cn } from "@/lib/utils";

interface PuzzleModeItemProps {
  mode: PuzzleModeConfig;
}

const buttonClasses = "h-auto w-full flex-col items-start gap-1 p-4";

export const PuzzleModeItem = ({ mode }: PuzzleModeItemProps) => {
  const innerContent = (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          <mode.icon className={`size-6 ${mode.iconColor}`} />
          {mode.title}
        </div>
        {!mode.disabled && (
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
      <span className="text-xs text-muted-foreground">{mode.description}</span>
    </>
  );

  if (mode.disabled) {
    return (
      <div className="cursor-not-allowed opacity-50">
        <Button variant="outline" className={buttonClasses} disabled>
          {innerContent}
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      className={cn(buttonClasses, "cursor-pointer")}
      asChild
    >
      <Link to={mode.url}>{innerContent}</Link>
    </Button>
  );
};
