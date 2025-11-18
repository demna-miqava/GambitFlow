import StatsCardList from "@/features/stats/components/card/StatsCardList";
import ComprehensiveStats from "@/features/stats/components/comprehensive-stats/ComprehensiveStats";
import SimpleStatsGrid from "@/features/stats/components/simple-stats/SimpleStatsGrid";
import StatsDaysSelect from "@/features/stats/components/StatsDaysSelect";
import StatsVariantSelect from "@/features/stats/components/StatsVariantSelect";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useCallback } from "react";

const ProfileStats = () => {
  const [variant, setVariant] = useQueryParams("variant", "all");

  const onGameTypeClick = useCallback(
    (gameType: string) => {
      setVariant(gameType);
    },
    [setVariant]
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <main className="space-y-4">
          <div className="flex gap-4">
            <StatsVariantSelect />
            <StatsDaysSelect />
          </div>
          {variant === "all" ? <SimpleStatsGrid /> : <ComprehensiveStats />}
        </main>
        <aside>
          <StatsCardList onGameTypeClick={onGameTypeClick}>
            <StatsCardList.Header showLink={false} />
            <StatsCardList.General />
            <StatsCardList.ButtonsList />
          </StatsCardList>
        </aside>
      </div>
    </div>
  );
};

export default ProfileStats;
