import { FriendRequestCard } from "./FriendRequestCard";
import type { FriendRequest } from "@/services/friends";

interface OutgoingRequestsProps {
  requests: FriendRequest[];
  onCancel: (request: FriendRequest) => void;
}

export const OutgoingRequests = ({
  requests,
  onCancel,
}: OutgoingRequestsProps) => {
  if (requests.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No outgoing friend requests
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {requests.map((request) => (
        <FriendRequestCard
          key={request.id}
          request={request}
          type="outgoing"
          onCancel={onCancel}
        />
      ))}
    </div>
  );
};
