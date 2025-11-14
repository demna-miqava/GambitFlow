import { Link } from "react-router";
import SignInForm from "./components/SignInForm";
import { FormContainer } from "../components/FormContainer";

export const SignInContainer = () => {
  return (
    <FormContainer
      Footer={
        <p className="text-sm text-white/60">
          New to ChessHub?{" "}
          <Link
            to="/signup"
            className="font-semibold text-white hover:underline"
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
