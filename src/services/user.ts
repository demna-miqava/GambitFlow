import type { SignUpData } from "@/features/auth/sign-up/hooks/useSignup";
import type { SignInForm } from "@/features/auth/sign-in/hooks/useSignIn";
import type { User, AuthResponse } from "@/types";
import type { ChangePasswordData, ChangeEmailData } from "@/features/auth/types";
import { apiRequest } from ".";

export const signUp = async (data: SignUpData) => {
  return apiRequest<AuthResponse>("post", "/users/signup", { data });
};

export const signIn = async (data: SignInForm) => {
  return apiRequest<AuthResponse>("post", "/users/signin", { data });
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await apiRequest<{ user: User }>("get", "/users/me");

  return response.user;
};

export const logout = async () => {
  return apiRequest<void>("post", "/users/logout");
};

export const changePassword = async (data: ChangePasswordData) => {
  return apiRequest<{ message: string }>("put", "/users/change-password", {
    data,
  });
};

export const changeEmail = async (data: ChangeEmailData) => {
  return apiRequest<{ message: string }>("put", "/users/change-email", {
    data,
  });
};
