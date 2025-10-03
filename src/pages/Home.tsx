import { GameTable } from "@/features/game-table";
import { Header } from "@/features/home/components/Header";
import { QuickPlayGrid } from "@/features/home/components/QuickPlayGrid";
import CollapsibleStats from "@/features/stats/components/collapsible/CollapsibleStats";
import { useUser } from "@/hooks/useUser";

const Home = () => {
  const { userName } = useUser();

  return (
    <div className="space-y-8">
      <Header />
      <QuickPlayGrid />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <GameTable
          variant="preview"
          actionHref={`/profile/${userName}/games`}
        />
        <div className="lg:mr-8">
          <CollapsibleStats />
        </div>
      </div>
    </div>
  );
};

export default Home;
