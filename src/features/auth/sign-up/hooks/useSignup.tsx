import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import type { SignupSkill } from "../types";
import { useMutation } from "@tanstack/react-query";
import { signUp, type AuthResponse } from "@/services/user";
import Cookies from "js-cookie";
import { useUser } from "@/hooks/useUser";
import { AxiosError } from "axios";
import { toast } from "sonner";

const signupSchema = z.object({
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    ),
  userName: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must contain at least 8 characters, 2 uppercase letters, 2 lowercase letters, 2 numbers, and 1 special character"
    ),
});

export type SignUpForm = z.infer<typeof signupSchema>;

export type SignUpData = SignUpForm & { skill: SignupSkill };

export const useSignup = (selectedSkill: SignupSkill) => {
  const navigate = useNavigate();
  const { refetch } = useUser();

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data: AuthResponse) => {
      Cookies.set("token", data.session.access_token, { expires: 7 });
      refetch();
      navigate("/home");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    },
  });

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpForm) => {
    console.log(data, selectedSkill);

    signUpMutation.mutate({
      ...data,
      skill: selectedSkill,
    });
  };

  return {
    form,
    onSubmit,
  };
};
