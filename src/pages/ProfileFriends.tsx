import { useGetFriends } from "@/features/friends/hooks/useGetFriends";
import FriendPopover from "@/features/friends/components/Popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ProfileFriends = () => {
  const { friends, numberOfFriends } = useGetFriends();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Friends ({numberOfFriends})</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {friends.map((friend) => (
          <div
            key={friend.username}
            className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-sidebar-accent/20 transition-colors"
          >
            <Tooltip>
              <FriendPopover data={friend}>
                <TooltipTrigger asChild>
                  <img
                    src={friend.image}
                    alt={friend.username}
                    className="size-20 rounded-full cursor-pointer"
                  />
                </TooltipTrigger>
              </FriendPopover>
              <TooltipContent>
                <p>{friend.username}</p>
              </TooltipContent>
            </Tooltip>
            <p className="text-sm font-medium text-center">{friend.username}</p>
            <p className="text-xs text-muted-foreground">{friend.friendFor}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileFriends;
