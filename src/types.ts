export interface Friend {
  id: string;
  username: string;
  image: string;
  avatar_url: string | null;
  fullName: string;
  created_at: string;
  blitz_rating: number;
  bullet_rating: number;
  rapid_rating: number;
}

/**
 * Friend action callbacks that accept friend ID
 */
export interface FriendActionHandlers {
  onChallenge?: (friend: Friend) => void;
  onMessage?: (friendId: string) => void;
  onRemove?: (friendId: string) => void;
}

/**
 * Friend suggestion action callbacks
 */
export interface FriendSuggestionActionHandlers {
  onChallenge?: (friend: Friend) => void;
  onMessage?: (friendId: string) => void;
  onAddFriend?: (friendId: string) => void;
}

export interface FriendsData {
  friends: Friend[];
  suggestions: Friend[];
}

export type PaginatedFriendsResponse = {
  data: Friend[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
