import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        // TODO: trigger reset flow
      }}
      className="w-full space-y-6"
    >
      <div className="space-y-2 text-left">
        <label className="text-sm font-medium" htmlFor="reset-email">
          Email
        </label>
        <Input
          id="reset-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="h-12 rounded-xl"
        />
      </div>

      <Button
        type="submit"
        className="w-full rounded-full px-8 py-6 text-base font-semibold"
      >
        Submit
      </Button>
    </form>
  );
};
