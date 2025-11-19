import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import OAuthSection from "../../components/OAuthSection";

type IntroStepProps = {
  onEmailSignup: () => void;
};

export const IntroStep = ({ onEmailSignup }: IntroStepProps) => {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <Logo />

      <div className="w-full flex flex-col gap-4">
        <Button
          onClick={onEmailSignup}
          className="w-full rounded-full px-8 py-6 text-base font-semibold transition-transform hover:scale-[1.02]"
        >
          Sign up with email
        </Button>
        <OAuthSection type="signup" />
      </div>
    </div>
  );
};
