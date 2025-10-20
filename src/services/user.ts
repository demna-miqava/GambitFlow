import type { SignUpData } from "@/features/auth/sign-up/hooks/useSignup";
import type { SignInForm } from "@/features/auth/sign-in/hooks/useSignIn";
import { apiRequest } from ".";
import Cookies from "js-cookie";

export type User = {
  id: string;
  username: string;
  email: string;
  skill: string;
  avatar_url: string | null;
  friendsCount: number;
  blitz_rating: number;
  bullet_rating: number;
  rapid_rating: number;
  created_at: string;
};

export type AuthResponse = {
  session: { access_token: string };
  user: User;
};

export const signUp = async (data: SignUpData) => {
  return apiRequest<AuthResponse>("post", "/users/signup", { data });
};

export const signIn = async (data: SignInForm) => {
  return apiRequest<AuthResponse>("post", "/users/signin", { data });
};

export const getCurrentUser = async (): Promise<User> => {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await apiRequest<{ user: User }>("get", "/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.user;
};
