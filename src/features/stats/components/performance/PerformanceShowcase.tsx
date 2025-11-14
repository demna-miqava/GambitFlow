import { Puzzle } from "lucide-react";

import { PerformanceCard } from "./PerformanceCard";
import { TIME_CONTROL_ICONS } from "@/constants/timeControlIcons";

const performanceStats = [
  {
    icon: <TIME_CONTROL_ICONS.bullet className="size-8" />,
    label: "Bullet",
    rating: 1251,
    delta: 83,
  },
  {
    icon: <TIME_CONTROL_ICONS.blitz className="size-8" />,
    label: "Blitz",
    rating: 1415,
    delta: 292,
  },
  {
    icon: <TIME_CONTROL_ICONS.rapid className="size-8" />,
    label: "Rapid",
    rating: 1574,
    delta: -9,
  },
  {
    icon: <Puzzle className="size-8 text-orange-400" />,
    label: "Puzzles",
    rating: 2365,
    delta: 21,
  },
];

export const PerformanceShowcase = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 2xl:grid-cols-4 gap-4">
      {performanceStats.map((stat) => (
        <PerformanceCard key={stat.label} {...stat} />
      ))}
    </div>
  );
};

export default PerformanceShowcase;
