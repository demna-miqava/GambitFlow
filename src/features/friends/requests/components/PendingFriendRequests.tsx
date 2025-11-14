import { usePendingFriendRequests } from "../hooks/usePendingFriendRequests";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { FriendRequest } from "@/features/friends/types";
import { IncomingRequests } from "./IncomingRequests";
import { OutgoingRequests } from "./OutgoingRequests";
import { useFriendRequestAction } from "../hooks/useFriendRequestAction";

export const PendingFriendRequests = () => {
  const { sentRequests, receivedRequests, isLoading } =
    usePendingFriendRequests();
  const { mutate: handleAction } = useFriendRequestAction();

  const handleAccept = (request: FriendRequest) => {
    handleAction({
      requestId: `${request.id}`,
      action: "accept",
    });
  };

  const handleDecline = (request: FriendRequest) => {
    handleAction({
      requestId: `${request.id}`,
      action: "decline",
    });
  };

  const handleCancel = (request: FriendRequest) => {
    handleAction({
      requestId: `${request.id}`,
      action: "cancel",
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 text-muted-foreground">Loading...</div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Friend Requests</h2>

      <Tabs defaultValue="incoming" className="w-full">
        <TabsList>
          <TabsTrigger value="incoming">
            Incoming ({receivedRequests.length})
          </TabsTrigger>
          <TabsTrigger value="outgoing">
            Outgoing ({sentRequests.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="incoming" className="space-y-2 mt-4">
          <IncomingRequests
            requests={receivedRequests}
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        </TabsContent>

        <TabsContent value="outgoing" className="space-y-2 mt-4">
          <OutgoingRequests requests={sentRequests} onCancel={handleCancel} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
