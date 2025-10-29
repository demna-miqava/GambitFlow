import { SettingSwitch } from "../components/SettingSwitch";
import { useSettingsForm } from "../hooks/useSettingsForm";
import { SettingsSubmitButton } from "../components/SettingsSubmitButton";
import { Form } from "@/components/ui/form";

export const NotificationsSettingsForm = () => {
  const { form, onSubmit, isLoading } = useSettingsForm([
    "emailNotificationsEnabled",
  ]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <SettingSwitch
            control={form.control}
            name="emailNotificationsEnabled"
            label="Email notifications"
            description="Receive notifications via email"
            id="receive-email-notifications"
          />
        </div>

        <SettingsSubmitButton isLoading={isLoading} />
      </form>
    </Form>
  );
};
