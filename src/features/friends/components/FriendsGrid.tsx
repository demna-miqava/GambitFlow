import { useGetFriends } from "../hooks/useGetFriends";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import FriendPopover from "./Popover";
import { Link, useParams } from "react-router";

const FriendsGrid = () => {
  const { friends, numberOfFriends } = useGetFriends();
  const { userName } = useParams();

  return (
    <aside className="rounded-2xl border p-4 flex flex-col gap-4">
      <Link to={`/profile/${userName}/friends`}>
        <h3 className="text-sm font-semibold">Friends ({numberOfFriends})</h3>
      </Link>
      <div className="grid grid-cols-5 gap-2">
        {friends.map((friend) => (
          <div key={friend.username} className="flex justify-center">
            <Tooltip>
              <FriendPopover data={friend}>
                <TooltipTrigger asChild>
                  <img
                    src={friend.image}
                    alt={friend.username}
                    className="size-12 rounded-full cursor-pointer"
                  />
                </TooltipTrigger>
              </FriendPopover>
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
