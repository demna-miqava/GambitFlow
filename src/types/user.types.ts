export type User = {
  id: string;
  username: string;
  email: string;
  skill: string;
  avatarUrl: string | null;
  friendsCount: number;
  blitzRating: number;
  bulletRating: number;
  rapidRating: number;
  createdAt: string;
};

export type AuthResponse = {
  user: User;
};
