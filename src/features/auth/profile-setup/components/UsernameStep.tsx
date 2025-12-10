import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import type { ProfileSetupForm } from "../hooks/useProfileSetup";

type UsernameStepProps = {
  form: UseFormReturn<ProfileSetupForm>;
  isCheckingUsername: boolean;
  isUsernameAvailable: boolean;
  showAvailabilityStatus: boolean;
  canProceed: boolean;
  onContinue: () => void;
};

export const UsernameStep = ({
  form,
  isCheckingUsername,
  isUsernameAvailable,
  showAvailabilityStatus,
  canProceed,
  onContinue,
}: UsernameStepProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canProceed) {
      onContinue();
    }
  };

  const hasUsernameError = !!form.formState.errors.username;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold text-foreground">
            Choose your username
          </h2>
          <p className="text-sm text-muted-foreground">
            This is how other players will see you on ChessHub.
          </p>
        </div>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Enter your username"
                    className="pr-10"
                    autoComplete="off"
                    autoFocus
                    {...field}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {isCheckingUsername && (
                      <Loader2 className="size-5 animate-spin text-muted-foreground" />
                    )}
                    {showAvailabilityStatus && !isCheckingUsername && isUsernameAvailable && (
                      <CheckCircle className="size-5 text-green-500" />
                    )}
                    {showAvailabilityStatus && !isCheckingUsername && !isUsernameAvailable && (
                      <XCircle className="size-5 text-destructive" />
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
              {!hasUsernameError && showAvailabilityStatus && !isCheckingUsername && !isUsernameAvailable && (
                <p className="text-sm text-destructive">Username is already taken</p>
              )}
              {!hasUsernameError && showAvailabilityStatus && !isCheckingUsername && isUsernameAvailable && (
                <p className="text-sm text-green-500">Username is available</p>
              )}
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={!canProceed}
          className="w-full rounded-full px-8 py-6 text-base font-semibold disabled:opacity-60"
        >
          Continue
        </Button>
      </form>
    </Form>
  );
};
