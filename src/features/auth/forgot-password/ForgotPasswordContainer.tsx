import { ForgotPasswordForm } from "./components/ForgotPasswordForm";
import { FormContainer } from "../components/FormContainer";

export const ForgotPasswordContainer = () => {
  return (
    <FormContainer title="Reset your password">
      <ForgotPasswordForm />
    </FormContainer>
  );
};
