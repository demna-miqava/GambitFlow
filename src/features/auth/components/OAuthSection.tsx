import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type OAuthSectionType = "login" | "signup";

const OAuthSection = ({ type }: { type: OAuthSectionType }) => {
  return (
    <div className="w-full space-y-6">
      <div className="flex w-full items-center gap-4 text-sm text-white/40">
        <Separator className="flex-1 bg-white/10" />
        <span className="text-white">OR</span>
        <Separator className="flex-1 bg-white/10" />
      </div>
      <div className="w-full space-y-3">
        <Button
          variant="outline"
          className="w-full rounded-full border-white/15 bg-white/5 px-8 py-6 text-base font-semibold text-white hover:bg-white/10"
        >
          {type === "login" ? "Log in with Google" : "Sign up with Google"}
        </Button>
      </div>
    </div>
  );
};

export default OAuthSection;
