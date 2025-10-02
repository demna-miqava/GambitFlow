import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

export type SimpleStatCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  delta?: number;
};

const getTrendStyles = (delta?: number) => {
  const trend = delta ? (delta > 0 ? "up" : "down") : "neutral";
  switch (trend) {
    case "up":
      return { color: "text-lime-400", TrendIcon: ArrowUpRight };
    case "down":
      return { color: "text-rose-400", TrendIcon: ArrowDownRight };
    default:
      return { color: "text-white/60", TrendIcon: null };
  }
};

export const SimpleStatCard = ({
  icon,
  label,
  value,
  delta,
}: SimpleStatCardProps) => {
  const { color, TrendIcon } = getTrendStyles(delta);

  return (
    <div className="flex h-full min-h-[150px] flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-[#1a1d24] p-6 text-center text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      {icon}
      <div className="space-y-1">
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm text-white/70">{label}</p>
      </div>
      {!!delta && (
        <div className="h-6 flex items-center justify-center">
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-semibold",
              color
            )}
          >
            {TrendIcon ? <TrendIcon className="size-4" /> : null}
            <span>{delta ? Math.abs(delta) : delta}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleStatCard;
