import { usePendingFriendRequests } from "../hooks/usePendingFriendRequests";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { FriendRequest } from "@/services/friends";
import { IncomingRequests } from "./IncomingRequests";
import { OutgoingRequests } from "./OutgoingRequests";
import { useFriendRequestAction } from "../hooks/useFriendRequestAction";
import { useUser } from "@/hooks/useUser";

export const PendingFriendRequests = () => {
  const { id: userId } = useUser();
  const { sentRequests, receivedRequests, isLoading } =
    usePendingFriendRequests();
  const { mutate: handleAction } = useFriendRequestAction();

  const handleAccept = (request: FriendRequest) => {
    if (!userId) return;
    handleAction({
      requestId: `${request.id}`,
      userId,
      action: "accept",
    });
  };

  const handleDecline = (request: FriendRequest) => {
    if (!userId) return;
    handleAction({
      requestId: request.id,
      userId,
      action: "reject",
    });
  };

  const handleCancel = (request: FriendRequest) => {
    if (!userId) return;
    handleAction({
      requestId: request.id,
      userId,
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
