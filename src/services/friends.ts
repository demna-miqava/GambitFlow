import { apiRequest } from ".";
import type { PaginatedFriendsResponse, Friend } from "@/types";
import type {
  PendingFriendRequestsResponse,
  SendFriendRequestParams,
} from "@/features/friends/types";

export const getFriendSuggestions = (
  query: string
): Promise<{ data: Friend[] }> => {
  return apiRequest("get", `/friends/suggestions?${query}`);
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
