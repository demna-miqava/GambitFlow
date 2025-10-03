import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQueryParams } from "../../hooks/useQueryParams";
import GameStatsSummary from "./GameStatsSummary";
import { type ComprehensiveStatsData } from "../../hooks/useGetComprehensiveStats";

const GameFilters = ({ statsData }: { statsData: ComprehensiveStatsData }) => {
  const [activeTab, setActiveTab] = useQueryParams("gameType", "all");
  const [opponentSearch, setOpponentSearch] = useQueryParams("opponent", "");

  const tabs = [
    { id: "all", label: "All Games" },
    { id: "white", label: "White" },
    { id: "black", label: "Black" },
  ];

  return (
    <div className="space-y-6 rounded-2xl border border-white/10 bg-[#1a1d24] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
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
                  : "text-white/70 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Opponent Search */}
        <div className="relative w-full sm:w-48">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/50" />
          <Input
            type="text"
            placeholder="Opponent..."
            value={opponentSearch}
            onChange={(e) => setOpponentSearch(e.target.value)}
            className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/50 pl-10"
          />
        </div>
      </div>
      <GameStatsSummary statsData={statsData} />
    </div>
  );
};

export default GameFilters;
