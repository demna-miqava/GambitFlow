export interface Friend {
  id: string;
  username: string;
  image: string;
  avatar_url: string | null;
  fullName: string;
  created_at: string;
}

/**
 * Friend action callbacks that accept friend ID
 */
export interface FriendActionHandlers {
  onChallenge?: (friendId: string) => void;
  onMessage?: (friendId: string) => void;
  onRemove?: (friendId: string) => void;
}

/**
 * Friend suggestion action callbacks
 */
export interface FriendSuggestionActionHandlers {
  onChallenge?: (friendId: string) => void;
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
