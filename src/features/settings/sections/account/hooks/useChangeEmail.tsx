import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { changeEmail } from "@/services/user";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { emailSchema } from "@/lib/schemas/validation.schemas";
import { useUser } from "@/hooks/useUser";

const changeEmailSchema = z
  .object({
    newEmail: emailSchema,
    confirmEmail: z.string().min(1, "Please confirm your new email"),
  })
  .refine((data) => data.newEmail === data.confirmEmail, {
    message: "Email addresses do not match",
    path: ["confirmEmail"],
  });

export type ChangeEmailForm = z.infer<typeof changeEmailSchema>;

export const useChangeEmail = () => {
  const { refetch } = useUser();

  const changeEmailMutation = useMutation({
    mutationFn: changeEmail,
    onSuccess: (data) => {
      toast.success(data.message || "Email changed successfully");
      form.reset();
      refetch();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Failed to change email");
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });

  const form = useForm<ChangeEmailForm>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      newEmail: "",
      confirmEmail: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: ChangeEmailForm) => {
    changeEmailMutation.mutate({
      newEmail: data.newEmail,
    });
  };

  return {
    form,
    onSubmit,
    isLoading: changeEmailMutation.isPending,
  };
};
