import type { User, UserProfileResponse, PaginatedFriendsResponse, PaginatedGamesResponse } from "@/types";
import type { SignupSkill } from "@/features/auth/profile-setup/types";
import { apiRequest } from ".";

export type ProfileStatusResponse = {
  hasProfile: boolean;
  user: User | null;
};

export const getProfileStatus = async (): Promise<ProfileStatusResponse> => {
  return apiRequest<ProfileStatusResponse>("get", "/users/status");
};

export type SyncProfileData = {
  username: string;
  skill: SignupSkill;
};

export const syncProfile = async (data: SyncProfileData): Promise<{ message: string; user: User }> => {
  return apiRequest<{ message: string; user: User }>("post", "/users/sync", { data });
};

export const checkUsernameAvailability = async (username: string): Promise<{ available: boolean }> => {
  return apiRequest<{ available: boolean }>("get", `/users/check-username?username=${encodeURIComponent(username)}`);
};

export const getUserProfile = async (userId: number): Promise<UserProfileResponse> => {
  return apiRequest<UserProfileResponse>("get", `/users/${userId}`);
};

export const getUserFriends = async (userId: number, query: string): Promise<PaginatedFriendsResponse> => {
  return apiRequest<PaginatedFriendsResponse>("get", `/users/${userId}/friends?${query}`);
};

export const getUserGames = async (userId: number, query: string): Promise<PaginatedGamesResponse> => {
  return apiRequest<PaginatedGamesResponse>("get", `/users/${userId}/games?${query}`);
};
