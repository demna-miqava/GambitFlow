import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import SignInForm from "./components/SignInForm";
import { FormContainer } from "../components/FormContainer";

export const SignInContainer = () => {
  return (
    <FormContainer
      Footer={
        <p className="text-sm text-muted-foreground">
          New to ChessHub?{" "}
          <Link
            to={ROUTES.AUTH.SIGN_UP}
            className="font-semibold text-foreground hover:underline"
          >
            Sign up and start playing chess!
          </Link>
        </p>
      }
    >
      <SignInForm />
    </FormContainer>
  );
};
