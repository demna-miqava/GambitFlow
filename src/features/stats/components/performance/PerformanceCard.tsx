import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import RatingDelta from "../RatingDelta";

export type PerformanceCardProps = {
  icon: ReactNode;
  label: string;
  rating: number;
  delta?: number;
  className?: string;
};

// TODO: Refactor
export const PerformanceCard = ({
  icon,
  label,
  rating,
  delta,
  className,
}: PerformanceCardProps) => {
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
        {!!delta && <RatingDelta delta={delta} />}
      </div>

      <div className="mt-2 h-14 rounded-lg border border-white/5 bg-black/20 p-1">
        <p className="text-[10px] text-white/50">chart here</p>
      </div>
    </div>
  );
};

export default PerformanceCard;
