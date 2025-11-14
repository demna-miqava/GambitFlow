import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import GameStatsSummary from "./GameStatsSummary";
import { type ComprehensiveStatsData } from "../../hooks/useGetComprehensiveStats";
import { useQueryParams } from "@/hooks/useQueryParams";

const GameFilters = ({ statsData }: { statsData: ComprehensiveStatsData }) => {
  const [activeTab, setActiveTab] = useQueryParams("gameType", "all");
  const [opponentSearch, setOpponentSearch] = useQueryParams("opponent", "");

  const tabs = [
    { id: "all", label: "All Games" },
    { id: "white", label: "White" },
    { id: "black", label: "Black" },
  ];

  return (
    <div className="space-y-6 rounded-2xl border border-border bg-card p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Game Type Tabs */}
        <div className="flex gap-1 overflow-x-auto w-full sm:w-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-400 text-blue-400"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Opponent Search */}
        <div className="relative w-full sm:w-48">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Opponent..."
            value={opponentSearch}
            onChange={(e) => setOpponentSearch(e.target.value)}
            className="w-full pl-10"
          />
        </div>
      </div>
      <GameStatsSummary statsData={statsData} />
    </div>
  );
};

export default GameFilters;
