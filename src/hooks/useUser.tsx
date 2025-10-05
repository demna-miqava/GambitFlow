import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, type User } from "@/services/user";
import Cookies from "js-cookie";
import { QKEY_USER } from "@/consts/queryKeys";

export const useUser = () => {
  const queryClient = useQueryClient();
  const token = Cookies.get("token");

  const {
    data: userData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [QKEY_USER],
    queryFn: getCurrentUser,
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });

  const setUser = (userData: User) => {
    queryClient.setQueryData([QKEY_USER], userData);
  };

  const clearUser = () => {
    queryClient.removeQueries({ queryKey: [QKEY_USER] });
    Cookies.remove("token");
  };

  return {
    ...userData,
    userName: userData?.username || "",
    image:
      userData?.avatar_url ??
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtb2ps4gYYHa5dwBB49DJGsUbQWVbtGAZHeQ&s",
    friendsCount: userData?.friendsCount ?? 0,
    joinedAt: userData?.created_at ?? "",
    isLoading,
    error,
    setUser,
    clearUser,
    isAuthenticated: !!token && !!userData,
    refetch,
  };
};
