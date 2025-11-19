import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type OAuthSectionType = "login" | "signup";

const OAuthSection = ({ type }: { type: OAuthSectionType }) => {
  return (
    <div className="w-full space-y-6">
      <div className="flex w-full items-center gap-4 text-sm text-muted-foreground">
        <Separator className="flex-1" />
        <span className="text-foreground">OR</span>
        <Separator className="flex-1" />
      </div>
      <div className="w-full space-y-3">
        <Button
          variant="outline"
          className="w-full rounded-full px-8 py-6 text-base font-semibold"
        >
          {type === "login" ? "Log in with Google" : "Sign up with Google"}
        </Button>
      </div>
    </div>
  );
};

export default OAuthSection;
