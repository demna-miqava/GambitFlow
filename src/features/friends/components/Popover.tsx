import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Friend } from "@/types";
import { Button } from "@/components/ui/button";
import { MessageSquare, Sword } from "lucide-react";
import { useNavigate } from "react-router";
import { format } from "date-fns";

const FriendPopover = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: Friend;
}) => {
  const { username, created_at, image } = data;
  // recieve id to fetch friend
  const navigate = useNavigate();
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>
        <div className="flex-col gap-4">
          <button
            type="button"
            className="flex gap-6 text-left w-full hover:opacity-80 transition-opacity"
            onClick={() => {
              navigate(`/profile/${username}`);
            }}
          >
            <img src={image} alt={username} className="size-12 rounded-full" />
            <div>
              <h3>{username}</h3>
              <p className="text-sm">
                Friends since {format(new Date(created_at), "MMM d, yyyy")}
              </p>
            </div>
          </button>
          <div className="flex gap-2 mt-4 justify-end">
            <Button size="sm">
              <Sword />
              Challenge
            </Button>
            <Button size="sm">
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
