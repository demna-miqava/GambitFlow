import { useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";

export const useDeleteAccount = () => {
  const { user } = useUser();

  const { mutate: deleteAccount, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("User not found");
      await user.delete();
    },
  });

  return { deleteAccount, isLoading };
};
