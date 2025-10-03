import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const RatingDelta = ({
  delta,
  className,
}: {
  delta?: number;
  className?: string;
}) => {
  if (delta === 0 || !delta) return null;

  const trend = delta > 0 ? "up" : "down";
  const trendColor = trend === "up" ? "text-green-400" : "text-red-400";
  const IconComponent = trend === "up" ? TrendingUp : TrendingDown;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <IconComponent className={`size-3 ${trendColor}`} />
      <span className={trendColor}>{Math.abs(delta)}</span>
    </div>
  );
};

export default RatingDelta;
