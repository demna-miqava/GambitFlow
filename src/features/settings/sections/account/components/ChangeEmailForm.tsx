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
import { useChangeEmail } from "../hooks/useChangeEmail";

export const ChangeEmailForm = () => {
  const { form, onSubmit, isLoading } = useChangeEmail();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Email Address</h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="newEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter new email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Retype new email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={!form.formState.isValid || isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? "Updating..." : "Update Email"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
