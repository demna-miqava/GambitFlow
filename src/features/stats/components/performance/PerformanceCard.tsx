import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Trend = "up" | "down" | "neutral";

export type PerformanceCardProps = {
  icon: ReactNode;
  label: string;
  rating: number;
  delta?: number;
  trend?: Trend;
  points?: number[];
  className?: string;
};

const getTrendIcon = (trend: Trend) => {
  if (trend === "up") return ArrowUpRight;
  if (trend === "down") return ArrowDownRight;
  return null;
};

const getTrendColor = (trend: Trend) => {
  if (trend === "up") return "text-lime-400";
  if (trend === "down") return "text-rose-400";
  return "text-white/60";
};

export const PerformanceCard = ({
  icon,
  label,
  rating,
  delta,
  trend = "neutral",
  className,
}: PerformanceCardProps) => {
  const TrendIcon = getTrendIcon(trend);
  const trendColor = getTrendColor(trend);

  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-2xl border border-white/10 bg-[#1a1d24] p-3 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-2">
          <div className="text-md">{icon}</div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-white/70">{label}</span>
            <p className="text-md font-bold">{rating}</p>
          </div>
        </div>
        {!!delta && TrendIcon && (
          <div
            className={cn(
              "flex items-center gap-1 text-xs font-semibold",
              trendColor
            )}
          >
            <TrendIcon className="size-3.5" />
            <span>{Math.abs(delta)}</span>
          </div>
        )}
      </div>

      <div className="mt-2 h-14 rounded-lg border border-white/5 bg-black/20 p-1">
        <p className="text-[10px] text-white/50">chart here</p>
      </div>
    </div>
  );
};

export default PerformanceCard;
