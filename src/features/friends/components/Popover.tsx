import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Friend } from "@/types";
import { Button } from "@/components/ui/button";
import { MessageSquare, Sword } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { UserAvatar } from "@/components/UserAvatar";
import { useFriendActions } from "../hooks/useFriendActions";
import { getProfileRoute } from "@/constants/routes";

const FriendPopover = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: Friend;
}) => {
  const { username, friendsSince, avatarUrl, id } = data;
  const navigate = useNavigate();
  const { onChallenge, onMessage } = useFriendActions();

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>
        <div className="flex-col gap-4">
          {/* TODO: This should be a link */}
          <button
            type="button"
            className="flex gap-6 text-left w-full hover:opacity-80 transition-opacity"
            onClick={() => {
              navigate(getProfileRoute(username));
            }}
          >
            <UserAvatar src={avatarUrl} username={username} />
            <div>
              <p>{username}</p>
              <p className="text-sm">
                Friends since {format(new Date(friendsSince), "MMM d, yyyy")}
              </p>
            </div>
          </button>
          <div className="flex gap-2 mt-4 justify-end">
            <Button
              size="sm"
              onClick={() => {
                onChallenge(data);
              }}
            >
              <Sword />
              Challenge
            </Button>
            <Button size="sm" onClick={() => onMessage(id)}>
              <MessageSquare />
              Message
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FriendPopover;
