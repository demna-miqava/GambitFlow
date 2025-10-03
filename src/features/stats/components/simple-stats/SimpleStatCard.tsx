import { type ReactNode } from "react";
import RatingDelta from "../RatingDelta";

export type SimpleStatCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  delta?: number;
};

export const SimpleStatCard = ({
  icon,
  label,
  value,
  delta,
}: SimpleStatCardProps) => {
  return (
    <div className="flex h-full min-h-[150px] flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-[#1a1d24] p-6 text-center text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      {icon}
      <div className="space-y-1">
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm text-white/70">{label}</p>
      </div>
      <RatingDelta delta={delta} />
    </div>
  );
};

export default SimpleStatCard;
