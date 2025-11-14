export interface Friend {
  id: string;
  username: string;
  image: string;
  avatarUrl: string | null;
  friendsSince: string;
  blitzRating: number;
  bulletRating: number;
  rapidRating: number;
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

/**
 * Base friend action handlers shared across all friend interactions
 */
interface BaseFriendActionHandlers {
  onChallenge?: (friend: Friend) => void;
  onMessage?: (friendId: string) => void;
}

export interface FriendActionHandlers extends BaseFriendActionHandlers {
  onRemove?: (friendId: string) => void;
}

export interface FriendSuggestionActionHandlers
  extends BaseFriendActionHandlers {
  onAddFriend?: (friendId: string) => void;
}

export interface FriendsData {
  friends: Friend[];
  suggestions: Friend[];
}
