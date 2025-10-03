import { useState } from "react";
import { useCreateGame } from "@/features/create-game/CreateGameContext";
import { useGetFriends } from "@/features/friends/hooks/useGetFriends";
import { useFriendsPagination } from "@/features/friends/hooks/useFriendsPagination";
import { FriendListItem } from "@/features/friends/components/FriendListItem";
import { Pagination } from "@/components/Pagination";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { Friend } from "@/types";

export const Friends = () => {
  const { setActiveSection } = useCreateGame();
  const { friends } = useGetFriends();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFriends = friends.filter(
    (friend) =>
      friend.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const {
    currentPage,
    totalPages,
    paginatedFriends,
    goToPage,
    hasNextPage,
    hasPreviousPage,
  } = useFriendsPagination({
    friends: filteredFriends,
    itemsPerPage: 10,
  });

  const handleChallenge = (friend: Friend) => {
    console.log("Challenge:", friend.username);
    setActiveSection("friend-invite-options");
  };

  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Play with friends</h3>
          <p className="text-xs text-sidebar-foreground/70">
            Send a challenge to someone in your list.
          </p>
        </div>
      </header>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search friends..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="space-y-2">
        {paginatedFriends.map((friend) => (
          <FriendListItem
            key={friend.username}
            friend={friend}
            onChallenge={handleChallenge}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
      />
    </section>
  );
};
