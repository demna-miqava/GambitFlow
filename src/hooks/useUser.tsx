import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/user";
import type { User } from "@/types";
import { QKEY_USER } from "@/constants/queryKeys";

export const useUser = (enabled: boolean = true) => {
  const queryClient = useQueryClient();

  const {
    data: userData,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: [QKEY_USER],
    queryFn: getCurrentUser,
    retry: false,
    enabled,
  });

  const setUser = (userData: User) => {
    queryClient.setQueryData([QKEY_USER], userData);
  };

  const clearUser = () => {
    queryClient.removeQueries({ queryKey: [QKEY_USER] });
  };

  return {
    ...userData,
    username: userData?.username || "",
    image:
      userData?.avatarUrl ??
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtb2ps4gYYHa5dwBB49DJGsUbQWVbtGAZHeQ&s",
    friendsCount: userData?.friendsCount ?? 0,
    joinedAt: userData?.createdAt ?? "",
    isPending,
    error,
    setUser,
    clearUser,
    isAuthenticated: !!userData,
    refetch,
  };
};
