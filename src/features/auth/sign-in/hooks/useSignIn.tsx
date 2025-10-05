import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { signIn, type AuthResponse } from "@/services/user";
import Cookies from "js-cookie";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";
import { AxiosError } from "axios";

const signInSchema = z.object({
  emailOrUsername: z.string().min(1, "Email or username is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export type SignInForm = z.infer<typeof signInSchema>;

export const useSignIn = () => {
  const navigate = useNavigate();
  const { refetch } = useUser();

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: (data: AuthResponse, variables) => {
      const expires = variables.rememberMe ? 30 : 7;
      Cookies.set("token", data.session.access_token, { expires });
      refetch();
      navigate("/home");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    },
  });

  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      emailOrUsername: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInForm) => {
    signInMutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    isLoading: signInMutation.isPending,
    isError: signInMutation.isError,
  };
};
