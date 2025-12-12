import { GameTable } from "@/features/game-table";
import { Header } from "@/components/home/Header";
import { QuickPlayGrid } from "@/components/home/QuickPlayGrid";
import StatsCardList from "@/features/stats/components/card/StatsCardList";
import { useUser } from "@/hooks/useUser";
import { getProfileGamesRoute } from "@/constants/routes";

const Home = () => {
  const { id } = useUser();

  return (
    <div className="space-y-8">
      <Header />
      <QuickPlayGrid />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <GameTable
          variant="preview"
          actionHref={getProfileGamesRoute(id || 0)}
        />
        <aside className="lg:mr-8">
          <StatsCardList>
            <StatsCardList.Header showLink={true} />
            <StatsCardList.General />
            <StatsCardList.AccordionList />
          </StatsCardList>
        </aside>
      </div>
    </div>
  );
};

export default Home;
