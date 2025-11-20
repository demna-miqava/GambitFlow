import { format } from "date-fns";
import { FriendCard } from "../../components/FriendCard";
import type { Friend, FriendActionHandlers } from "@/types";

interface FriendsListProps extends FriendActionHandlers {
  items: Friend[];
  emptyMessage?: string;
  currentUserId?: number;
  isOwnProfile?: boolean;
}

export const FriendsList = ({
  items,
  emptyMessage = "No friends yet",
  onChallenge,
  onMessage,
  onRemove,
  currentUserId,
  isOwnProfile,
}: FriendsListProps) => {
  if (items.length === 0 && emptyMessage) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((friend) => (
        <FriendCard
          key={friend.id}
          friend={friend}
          onChallenge={onChallenge}
          onMessage={onMessage}
          onRemove={onRemove}
          currentUserId={currentUserId}
          isOwnProfile={isOwnProfile}
          secondaryText={`Friends since ${format(
            new Date(friend.friendsSince),
            "MMM d, yyyy"
          )}`}
        />
      ))}
    </div>
  );
};
