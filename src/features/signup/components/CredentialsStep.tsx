import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";

export const CredentialsStep = ({
  selectedSkill,
}: {
  selectedSkill: string;
}) => {
  // TODO: use react hook form
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(selectedSkill);
    navigate("/home");
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2 text-left">
          <label className="text-sm font-semibold text-white" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="h-12 rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/40"
          />
        </div>
        <div className="space-y-2 text-left">
          <label
            className="text-sm font-semibold text-white"
            htmlFor="password"
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="h-12 rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/40"
          />
        </div>
      </div>
      <Button
        type="submit"
        className="w-full rounded-full bg-lime-500 px-8 py-6 text-base font-semibold text-lime-950 transition hover:bg-lime-400"
      >
        Create account
      </Button>
    </form>
  );
};
