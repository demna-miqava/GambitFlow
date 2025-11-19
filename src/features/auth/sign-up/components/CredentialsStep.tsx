import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignup } from "../hooks/useSignup";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/PasswordInput";
import type { SignupSkill } from "../types";

export const CredentialsStep = ({
  selectedSkill,
}: {
  selectedSkill: SignupSkill;
}) => {
  const { form, onSubmit } = useSignup(selectedSkill);

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!form.formState.isValid}
          className="w-full rounded-full px-8 py-6 text-base font-semibold"
        >
          Create account
        </Button>
      </form>
    </Form>
  );
};
