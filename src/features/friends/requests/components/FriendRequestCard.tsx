import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/UserAvatar";
import type { FriendRequest } from "@/features/friends/types";

interface FriendRequestCardProps {
  request: FriendRequest;
  type: "incoming" | "outgoing";
  onAccept?: (request: FriendRequest) => void;
  onDecline?: (request: FriendRequest) => void;
  onCancel?: (request: FriendRequest) => void;
}

export const FriendRequestCard = ({
  request,
  type,
  onAccept,
  onDecline,
  onCancel,
}: FriendRequestCardProps) => {
  const displayUser =
    type === "incoming"
      ? {
          username: request.senderUsername,
          avatarUrl: request.senderAvatarUrl,
        }
      : {
          username: request.receiverUsername,
          avatarUrl: request.receiverAvatarUrl,
        };

  return (
    <div className="flex flex-col gap-2 p-4 border rounded-lg">
      <div className="flex items-center gap-3">
        <UserAvatar src={displayUser.avatarUrl} username={displayUser.username} />

        <div>
          <p className="font-medium">{displayUser.username}</p>
          <p className="text-sm text-muted-foreground">
            {type === "incoming"
              ? new Date(request.createdAt).toLocaleDateString()
              : `Sent ${new Date(request.createdAt).toLocaleDateString()}`}
          </p>
        </div>
      </div>

      <div className="flex gap-2 self-end">
        {type === "incoming" ? (
          <>
            <Button
              onClick={() => onDecline?.(request)}
              className="px-4 py-2 border rounded-md hover:bg-accent"
            >
              Decline
            </Button>
            <Button
              onClick={() => onAccept?.(request)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Accept
            </Button>
          </>
        ) : (
          <Button
            onClick={() => onCancel?.(request)}
            className="px-4 py-2 border rounded-md hover:bg-accent"
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};
