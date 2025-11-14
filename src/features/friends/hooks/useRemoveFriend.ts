import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFriend } from "@/services/friends";
import { QKEY_USER_FRIENDS } from "@/constants/queryKeys";

export const useRemoveFriend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFriend,
    onSuccess: () => {
      // Invalidate friends list to refresh
      queryClient.invalidateQueries({ queryKey: [QKEY_USER_FRIENDS] });
    },
  });
};
