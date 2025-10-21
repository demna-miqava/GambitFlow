import FriendsGrid from "@/features/friends/list/components/FriendsGrid";
import { GameTable } from "@/features/game-table";
import PerformanceShowcase from "@/features/stats/components/performance/PerformanceShowcase";
import { useUser } from "@/hooks/useUser";

const ProfileOverview = () => {
  const { userName } = useUser();

  const profileGamesHref = `/profile/${userName}/games`;

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
      <div className="space-y-6">
        <PerformanceShowcase />
        <GameTable variant="preview" actionHref={profileGamesHref} />
      </div>
      <aside className="flex flex-col gap-4">
        <FriendsGrid />
      </aside>
    </div>
  );
};

export default ProfileOverview;
