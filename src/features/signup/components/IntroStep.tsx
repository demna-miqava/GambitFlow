import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

type IntroStepProps = {
  onEmailSignup: () => void;
  onGoogleSignup: () => void;
};

export const IntroStep = ({
  onEmailSignup,
  onGoogleSignup,
}: IntroStepProps) => {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <Logo />

      <div className="w-full flex flex-col gap-4">
        <Button
          onClick={onEmailSignup}
          className="w-full rounded-full bg-lime-500 px-8 py-6 text-base font-semibold text-lime-950 shadow-[0_20px_60px_rgba(132,204,22,0.25)] transition-transform hover:scale-[1.02] hover:bg-lime-400"
        >
          Sign up with email
        </Button>
        <Button
          variant="outline"
          className="w-full rounded-full border-white/15 bg-white/5 px-8 py-6 text-base font-semibold text-white hover:bg-white/10"
          onClick={onGoogleSignup}
        >
          Continue with Google
        </Button>
      </div>
    </div>
  );
};
