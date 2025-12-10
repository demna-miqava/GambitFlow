import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
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
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

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
    if (!user) return;

    setIsLoading(true);
    try {
      await user.updatePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success("Password changed successfully");
      form.reset();
    } catch (error) {
      const clerkError = error as { errors?: { message: string }[] };
      const message = clerkError.errors?.[0]?.message || "Failed to change password";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    onSubmit,
    isLoading,
  };
};
