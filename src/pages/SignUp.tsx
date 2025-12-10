import { ROUTES } from "@/constants/routes";
import { SignUp } from "@clerk/clerk-react";

export const SignUpPage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <SignUp signInUrl={ROUTES.AUTH.SIGN_IN} />
    </div>
  );
};

export default SignUpPage;
