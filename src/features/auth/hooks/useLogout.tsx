import { useClerk } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const { signOut } = useClerk();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      queryClient.clear();
      await signOut();
    },
  });

  return { logout, isLoading };
};
