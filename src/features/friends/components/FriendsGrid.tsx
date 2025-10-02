import { useGetFriends } from "../hooks/useGetFriends";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FriendsGrid = () => {
  const { friends, numberOfFriends } = useGetFriends();

  return (
    <aside className="rounded-2xl border p-4 flex flex-col gap-4">
      <h3 className="text-sm font-semibold">Friends ({numberOfFriends})</h3>
      <div className="grid grid-cols-5 gap-2">
        {friends.map((friend) => (
          <div key={friend.username} className="flex justify-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <img
                  src={friend.image}
                  alt={friend.username}
                  className="size-12 rounded-full cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{friend.username}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default FriendsGrid;
