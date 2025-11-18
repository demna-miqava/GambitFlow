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
              <FormLabel className="text-sm font-semibold text-white">
                Email or username
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="you@example.com"
                  {...field}
                  className="h-12 rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/40"
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
              <FormLabel className="text-sm font-semibold text-white">
                Password
              </FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="••••••••"
                  {...field}
                  className="h-12 rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/40"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between text-sm text-white/70">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <label className="flex items-center gap-2">
                <Input
                  type="checkbox"
                  className="size-4 rounded border-white/30 bg-transparent text-lime-500 focus:ring-lime-400"
                  checked={field.value}
                  onChange={field.onChange}
                />
                Remember me
              </label>
            )}
          />
          <Link to={ROUTES.AUTH.FORGOT_PASSWORD} className="text-white hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-lime-500 px-8 py-6 text-base font-semibold text-lime-950 transition hover:bg-lime-400"
        >
          {isLoading ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
