import { apiRequest } from ".";
import type { PaginatedFriendsResponse, Friend } from "@/types";

export type FriendRequest = {
  id: string;
  senderId: string;
  receiverId: string;
  senderUserName: string;
  receiverUserName: string;
  senderImage: string;
  receiverImage: string;
  status: string;
  created_at: string;
};

export type PendingFriendRequestsResponse = {
  sent: FriendRequest[];
  received: FriendRequest[];
};

export const getFriendSuggestions = (query: string): Promise<Friend[]> => {
  return apiRequest("get", `/friends/suggestions?${query}`);
};

export type SendFriendRequestParams = {
  senderId: string;
  receiverId: string;
};

export const searchFriends = (
  query: string
): Promise<PaginatedFriendsResponse> => {
  return apiRequest("get", `/friends/search?${query}`);
};

export const sendFriendRequest = (
  data: SendFriendRequestParams
): Promise<void> => {
  return apiRequest("post", "/friend-requests", { data });
};

export const getPendingFriendRequests =
  (): Promise<PendingFriendRequestsResponse> => {
    return apiRequest("get", "/friend-requests/pending");
  };

export const removeFriend = (friendId: string): Promise<void> => {
  return apiRequest("delete", `/friends/${friendId}`);
};
