import { ChangePasswordForm } from "./components/ChangePasswordForm";
import { ChangeEmailForm } from "./components/ChangeEmailForm";

export const AccountSettingsForm = () => {
  return (
    <div className="space-y-8">
      {/* Change Password Section */}
      <ChangePasswordForm />

      {/* Change Email Section */}
      <div className="pt-6 border-t">
        <ChangeEmailForm />
      </div>
    </div>
  );
};
