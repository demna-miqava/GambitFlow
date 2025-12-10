import { ChangePasswordForm } from "./components/ChangePasswordForm";
import { DeleteAccountSection } from "./components/DeleteAccountSection";

export const AccountSettingsForm = () => {
  return (
    <div className="space-y-8">
      <ChangePasswordForm />

      <div className="pt-6 border-t">
        <DeleteAccountSection />
      </div>
    </div>
  );
};
