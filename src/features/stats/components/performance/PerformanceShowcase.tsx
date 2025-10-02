import { Bolt, Clock, Puzzle, Zap } from "lucide-react";

import { PerformanceCard } from "./PerformanceCard";

const performanceStats = [
  {
    icon: <Bolt className="size-8 text-yellow-400" />,
    label: "Bullet",
    rating: 1251,
    delta: 83,
    trend: "up" as const,
    points: [1180, 1195, 1208, 1220, 1240, 1251],
  },
  {
    icon: <Zap className="size-8 text-lime-400" />,
    label: "Blitz",
    rating: 1415,
    delta: 292,
    trend: "up" as const,
    points: [1120, 1180, 1255, 1300, 1360, 1415],
  },
  {
    icon: <Clock className="size-8 text-emerald-400" />,
    label: "Rapid",
    rating: 1574,
    delta: -9,
    trend: "down" as const,
    points: [1582, 1578, 1576, 1574, 1560, 1574],
  },
  {
    icon: <Puzzle className="size-8 text-orange-400" />,
    label: "Puzzles",
    rating: 2365,
    delta: 21,
    trend: "up" as const,
    points: [2210, 2260, 2280, 2290, 2335, 2365],
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
