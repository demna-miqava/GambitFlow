export type FriendRequest = {
  id: number;
  senderId: string;
  receiverId: string;
  senderUsername: string;
  receiverUsername: string;
  senderAvatarUrl: string;
  receiverAvatarUrl: string;
  createdAt: string;
};

export type PendingFriendRequestsResponse = {
  incoming: FriendRequest[];
  outgoing: FriendRequest[];
};

export type SendFriendRequestParams = {
  receiverId: string;
};
