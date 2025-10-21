import { Button } from "@/components/ui/button";
import type { FriendRequest } from "@/services/friends";

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
          username: request.senderUserName,
          image: request.senderImage,
        }
      : {
          username: request.receiverUserName,
          image: request.receiverImage,
        };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center gap-3">
        {/* use profile */}
        <img
          src={displayUser.image}
          alt={displayUser.username}
          className="size-12 rounded-full"
        />
        <div>
          <p className="font-medium">{displayUser.username}</p>
          <p className="text-sm text-muted-foreground">
            {type === "incoming"
              ? new Date(request.created_at).toLocaleDateString()
              : `Sent ${new Date(request.created_at).toLocaleDateString()}`}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        {type === "incoming" ? (
          <>
            <Button
              onClick={() => onAccept?.(request)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Accept
            </Button>
            <Button
              onClick={() => onDecline?.(request)}
              className="px-4 py-2 border rounded-md hover:bg-accent"
            >
              Decline
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
