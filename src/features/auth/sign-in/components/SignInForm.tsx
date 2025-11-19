import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useSignIn } from "../hooks/useSignIn";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/PasswordInput";
import { ROUTES } from "@/constants/routes";

const SignInForm = () => {
  const { form, onSubmit, isLoading } = useSignIn();

  return (
    <Form {...form}>
      <form className="w-full space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="emailOrUsername"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-sm font-semibold">
                Email or username
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="you@example.com"
                  {...field}
                  className="h-12 rounded-xl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-sm font-semibold">Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="••••••••"
                  {...field}
                  className="h-12 rounded-xl"
                  autoComplete="on"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end text-sm text-muted-foreground">
          <Link
            to={ROUTES.AUTH.FORGOT_PASSWORD}
            className="text-foreground hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full px-8 py-6 text-base font-semibold"
        >
          {isLoading ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
