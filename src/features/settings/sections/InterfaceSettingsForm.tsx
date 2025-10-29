import { useSettingsForm } from "../hooks/useSettingsForm";
import { SettingSwitch } from "../components/SettingSwitch";
import { SettingsSubmitButton } from "../components/SettingsSubmitButton";
import { Form } from "@/components/ui/form";

export const InterfaceSettingsForm = () => {
  const { form, onSubmit, isLoading } = useSettingsForm([
    "showRatingsDuringGameEnabled",
    "pieceIconNotationEnabled",
  ]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <SettingSwitch
            control={form.control}
            name="showRatingsDuringGameEnabled"
            label="Show player ratings during game"
            description="Display player ratings next to names during gameplay"
            id="show-player-ratings"
          />

          <SettingSwitch
            control={form.control}
            name="pieceIconNotationEnabled"
            label="Show piece icons in game notation"
            description="Display chess piece symbols instead of letters (♔ instead of K)"
            id="show-piece-icons"
          />
        </div>

        <SettingsSubmitButton isLoading={isLoading} />
      </form>
    </Form>
  );
};
