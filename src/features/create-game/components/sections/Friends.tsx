import { useState } from "react";
import { useUserFriends } from "@/features/friends/list/hooks/useUserFriends";
import { FriendsPaginatedList } from "@/features/friends/list/components/FriendsPaginatedList";
import { FriendsLocalSearch } from "@/features/friends/list/components/FriendsLocalSearch";
import { useDebounce } from "@/hooks/useDebounce";
import type { Friend } from "@/types";
import { useGameSetup } from "../../CreateGameContext";

export const Friends = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);
  const { setSelectedFriend, setActiveSection } = useGameSetup();

  const onChallenge = (friend: Friend) => {
    setSelectedFriend(friend);
    setActiveSection("friend-invite-options");
  };
  const { friends, page, setPage, pagination, isLoading } = useUserFriends({
    defaultLimit: 1,
    searchQuery: debouncedSearch,
    useLocalState: true,
  });

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

      <FriendsPaginatedList
        friends={friends}
        page={page}
        setPage={setPage}
        pagination={pagination}
        isLoading={isLoading}
        onChallenge={onChallenge}
        searchSlot={
          <FriendsLocalSearch value={searchQuery} onChange={setSearchQuery} />
        }
        emptyMessage="No friends found"
      />
    </section>
  );
};
