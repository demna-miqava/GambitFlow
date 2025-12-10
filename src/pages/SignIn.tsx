import { ROUTES } from "@/constants/routes";
import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <SignIn signUpUrl={ROUTES.AUTH.SIGN_UP} forceRedirectUrl={ROUTES.HOME} />
    </div>
  );
};

export default SignInPage;
