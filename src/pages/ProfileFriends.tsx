import { useGetFriends } from "@/features/friends/hooks/useGetFriends";
import { useFriendsSearch } from "@/features/friends/hooks/useFriendsSearch";
import { useFriendsPagination } from "@/features/friends/hooks/useFriendsPagination";
import { FriendListItem } from "@/features/friends/components/FriendListItem";
import { Pagination } from "@/components/Pagination";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { Friend } from "@/types";

const ProfileFriends = () => {
  const { friends, numberOfFriends } = useGetFriends();
  const { searchQuery, setSearchQuery, filteredFriends } =
    useFriendsSearch(friends);

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
    // TODO: Implement challenge logic
  };

  const handleMessage = (friend: Friend) => {
    console.log("Message:", friend.username);
    // TODO: Implement message logic
  };

  const handleRemove = (friend: Friend) => {
    console.log("Remove:", friend.username);
    // TODO: Implement remove logic
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Friends ({numberOfFriends})</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="space-y-2">
        {paginatedFriends.length > 0 ? (
          paginatedFriends.map((friend) => (
            <FriendListItem
              key={friend.username}
              friend={friend}
              onChallenge={handleChallenge}
              onMessage={handleMessage}
              onRemove={handleRemove}
            />
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No friends found matching "{searchQuery}"
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
      />
    </div>
  );
};

export default ProfileFriends;
