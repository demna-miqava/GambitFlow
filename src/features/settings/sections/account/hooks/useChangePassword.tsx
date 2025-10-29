import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/services/user";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { passwordSchema } from "@/lib/schemas/validation.schemas";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

export const useChangePassword = () => {
  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      toast.success(data.message || "Password changed successfully");
      form.reset();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || "Failed to change password"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });

  const form = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: ChangePasswordForm) => {
    changePasswordMutation.mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  return {
    form,
    onSubmit,
    isLoading: changePasswordMutation.isPending,
  };
};
