import { PendingFriendRequests } from "@/features/friends/requests/components/PendingFriendRequests";
import { FriendsPaginatedList } from "@/features/friends/list/components/FriendsPaginatedList";
import { FriendsSearch } from "@/features/friends/list/components/FriendsSearch";
import { SuggestedFriends } from "@/features/friends/suggestions/components/SuggestedFriends";
import { useUserFriends } from "@/features/friends/list/hooks/useUserFriends";
import { useFriendActions } from "@/features/friends/hooks/useFriendActions";

const ProfileFriends = () => {
  const { friends, page, setPage, pagination, search, isLoading } =
    useUserFriends({
      defaultLimit: 1,
    });
  const { onChallenge, onRemove, onMessage } = useFriendActions();

  const total = pagination?.total ?? 0;

  return (
    <section className="space-y-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
      <section className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Friends ({total})</h2>
          </div>

          <FriendsPaginatedList
            friends={friends}
            page={page}
            setPage={setPage}
            pagination={pagination}
            isLoading={isLoading}
            onChallenge={onChallenge}
            onMessage={onMessage}
            onRemove={onRemove}
            searchSlot={<FriendsSearch />}
            emptyMessage={
              search
                ? `No friends found matching "${search}"`
                : "No friends yet"
            }
            showPagination={!search}
          />
        </div>

        <SuggestedFriends />
      </section>
      <PendingFriendRequests />
    </section>
  );
};

export default ProfileFriends;
