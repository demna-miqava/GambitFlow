import { FriendRequestCard } from "./FriendRequestCard";
import type { FriendRequest } from "@/features/friends/types";

interface IncomingRequestsProps {
  requests: FriendRequest[];
  onAccept: (request: FriendRequest) => void;
  onDecline: (request: FriendRequest) => void;
}

export const IncomingRequests = ({
  requests,
  onAccept,
  onDecline,
}: IncomingRequestsProps) => {
  if (requests.length === 0) {
    return (
      <div className="text-start py-8 text-muted-foreground">
        No incoming friend requests
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {requests.map((request) => (
        <FriendRequestCard
          key={request.id}
          request={request}
          type="incoming"
          onAccept={onAccept}
          onDecline={onDecline}
        />
      ))}
    </div>
  );
};
