export type User = {
  id: number;
  username: string;
  email: string;
  skill: string;
  avatarUrl: string | null;
  friendCount: number;
  blitzRating: number;
  bulletRating: number;
  rapidRating: number;
  createdAt: string;
};

export type AuthResponse = {
  user: User;
};

export type UserProfile = {
  id: number;
  username: string;
  avatarUrl: string | null;
  createdAt: string;
  rapidRating: number;
  blitzRating: number;
  bulletRating: number;
  friendCount: number;
};

export type UserProfileResponse = {
  user: UserProfile;
};
