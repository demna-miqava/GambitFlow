import { Puzzle, Sun } from "lucide-react";

import { SimpleStatCard } from "./SimpleStatCard";
import { TIME_CONTROL_ICONS } from "@/consts/timeControlIcons";

const simpleStats = [
  {
    icon: <Sun className="size-12 text-yellow-300" />,
    label: "Games",
    value: "1,847",
  },
  {
    icon: <TIME_CONTROL_ICONS.blitz className="size-12" />,
    label: "Blitz",
    value: "1415",
    delta: 363,
  },
  {
    icon: <TIME_CONTROL_ICONS.bullet className="size-12" />,
    label: "Bullet",
    value: "1251",
    delta: 323,
  },
  {
    icon: <TIME_CONTROL_ICONS.rapid className="size-12" />,
    label: "Rapid",
    value: "1574",
    delta: 0,
  },
  {
    icon: <Puzzle className="size-12 text-orange-500" />,
    label: "Puzzles",
    value: "960",
    delta: -45,
  },
];

export const SimpleStatsGrid = () => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {simpleStats.map((stat) => (
        <SimpleStatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
};

export default SimpleStatsGrid;
