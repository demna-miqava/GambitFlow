import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { SettingRadioGroup } from "../components/SettingRadioGroup";
import { SettingsSubmitButton } from "../components/SettingsSubmitButton";
import { useSettings } from "../SettingsContext";
import type { MessagesAllowedFrom } from "@/services/settings";
import { Form } from "@/components/ui/form";

type SocialSettingsFormValues = {
  messagesAllowedFrom: MessagesAllowedFrom;
};

const privacyOptions = [
  { value: "everyone", label: "Everyone" },
  { value: "only_friends", label: "Only friends" },
  { value: "nobody", label: "Nobody" },
];

export const SocialSettingsForm = () => {
  const { settings, updateSettings } = useSettings();

  const form = useForm<SocialSettingsFormValues>({
    defaultValues: {
      messagesAllowedFrom: "everyone",
    },
  });

  useEffect(() => {
    if (settings) {
      form.reset({
        messagesAllowedFrom: settings.messagesAllowedFrom,
      });
    }
  }, [settings, form]);

  const onSubmit = (data: SocialSettingsFormValues) => {
    updateSettings.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <SettingRadioGroup
            control={form.control}
            name="messagesAllowedFrom"
            label="Send and receive direct messages"
            description="Allow other users to send you private messages"
            options={privacyOptions}
            id="messages-privacy"
          />
        </div>

        <SettingsSubmitButton isLoading={updateSettings.isPending} />
      </form>
    </Form>
  );
};
