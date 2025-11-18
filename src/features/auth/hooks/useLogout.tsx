import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { useMutation } from "@tanstack/react-query";
import { logout as logoutApi } from "@/services/user";
import { ROUTES } from "@/constants/routes";

export const useLogout = () => {
  const navigate = useNavigate();
  const { clearUser } = useUser();

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      clearUser();
      navigate(ROUTES.AUTH.SIGN_IN);
    },
    onError: () => {
      // Even if the API call fails, clear local state and redirect
      clearUser();
      navigate(ROUTES.AUTH.SIGN_IN);
    },
  });

  const logout = () => {
    logoutMutation.mutate();
  };

  return { logout, isLoading: logoutMutation.isPending };
};
