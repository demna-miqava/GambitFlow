import { useMemo, useState } from "react";
import type { Friend } from "@/types";

export const useFriendsSearch = (friends: Friend[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFriends = useMemo(() => {
    if (!searchQuery.trim()) {
      return friends;
    }

    const query = searchQuery.toLowerCase();
    return friends.filter(
      (friend) =>
        friend.username.toLowerCase().includes(query) ||
        friend.fullName.toLowerCase().includes(query)
    );
  }, [friends, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredFriends,
  };
};
