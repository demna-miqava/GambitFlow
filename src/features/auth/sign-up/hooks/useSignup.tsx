import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import type { SignupSkill } from "../types";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/services/user";
import { useUser } from "@/hooks/useUser";
import { AxiosError } from "axios";
import { toast } from "sonner";
import {
  emailSchema,
  passwordSchema,
  usernameSchema,
} from "@/lib/schemas/validation.schemas";

const signupSchema = z.object({
  email: emailSchema,
  username: usernameSchema,
  password: passwordSchema,
});

export type SignUpForm = z.infer<typeof signupSchema>;

export type SignUpData = SignUpForm & { skill: SignupSkill };

export const useSignup = (selectedSkill: SignupSkill) => {
  const navigate = useNavigate();
  const { refetch } = useUser(false);

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
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
