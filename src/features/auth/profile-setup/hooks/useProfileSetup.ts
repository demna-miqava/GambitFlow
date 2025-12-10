import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { syncProfile, checkUsernameAvailability } from "@/services/user";
import { useDebounce } from "@/hooks/useDebounce";
import { ROUTES } from "@/constants/routes";
import type { SignupSkill } from "../types";
import {
  QKEY_PROFILE_STATUS,
  QKEY_USERNAME_AVAILABILITY,
} from "@/constants/queryKeys";

const profileSetupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  skill: z.enum(["new", "beginner", "intermediate", "advanced"], {
    message: "Please select a skill level",
  }),
});

export type ProfileSetupForm = z.infer<typeof profileSetupSchema>;

type Step = "username" | "skill";

export const useProfileSetup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [step, setStep] = useState<Step>("username");

  const form = useForm<ProfileSetupForm>({
    resolver: zodResolver(profileSetupSchema),
    defaultValues: {
      username: "",
    },
    mode: "onChange",
  });

  const username = form.watch("username");
  const debouncedUsername = useDebounce(username, 500);

  const isValidFormat =
    username.length >= 3 &&
    username.length <= 20 &&
    /^[a-zA-Z0-9_]+$/.test(username);

  const {
    data: availabilityData,
    isLoading: isCheckingUsername,
    isFetched: isAvailabilityFetched,
  } = useQuery({
    queryKey: [QKEY_USERNAME_AVAILABILITY, debouncedUsername],
    queryFn: () => checkUsernameAvailability(debouncedUsername),
    enabled:
      isValidFormat &&
      debouncedUsername === username &&
      debouncedUsername.length > 0,
  });

  const isUsernameAvailable = availabilityData?.available ?? false;
  const showAvailabilityStatus =
    isAvailabilityFetched && isValidFormat && debouncedUsername === username;

  const { mutate: createProfile, isPending: isCreatingProfile } = useMutation({
    mutationFn: syncProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QKEY_PROFILE_STATUS] });
      toast.success("Profile created successfully!");
      navigate(ROUTES.HOME, { replace: true });
    },
    onError: (error: Error & { response?: { status: number } }) => {
      if (error.response?.status === 409) {
        toast.error("Username is already taken. Please choose another.");
        setStep("username");
      } else {
        toast.error("Failed to create profile. Please try again.");
      }
    },
  });

  const canProceedToSkill =
    isValidFormat && isUsernameAvailable && !isCheckingUsername;

  const goToSkillStep = () => {
    if (canProceedToSkill) {
      setStep("skill");
    }
  };

  const goToUsernameStep = () => {
    setStep("username");
  };

  const onSubmit = (data: ProfileSetupForm) => {
    createProfile({
      username: data.username,
      skill: data.skill as SignupSkill,
    });
  };

  const selectSkill = (skill: SignupSkill) => {
    form.setValue("skill", skill);
  };

  return {
    form,
    step,
    username,
    isCheckingUsername,
    isUsernameAvailable,
    showAvailabilityStatus,
    canProceedToSkill,
    isCreatingProfile,
    goToSkillStep,
    goToUsernameStep,
    onSubmit: form.handleSubmit(onSubmit),
    selectSkill,
  };
};
