import { useSettingsForm } from "../hooks/useSettingsForm";
import { SettingSwitch } from "../components/SettingSwitch";
import { SettingsSubmitButton } from "../components/SettingsSubmitButton";
import { Form } from "@/components/ui/form";

export const GameplaySettingsForm = () => {
  const { form, onSubmit, isLoading } = useSettingsForm([
    "premovesEnabled",
    "autoPromoteToQueenEnabled",
    "confirmDrawResignationEnabled",
    "showLegalMovesEnabled",
    "engineEvaluationEnabled",
    "showTimestampsEnabled",
  ]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Gameplay</h3>

          <SettingSwitch
            control={form.control}
            name="premovesEnabled"
            label="Enable premoves"
            description="Make moves while waiting for your opponent"
            id="enable-premoves"
          />

          <SettingSwitch
            control={form.control}
            name="autoPromoteToQueenEnabled"
            label="Always promote to queen"
            description="Automatically promote pawns to queen without asking"
            id="always-promote-queen"
          />

          <SettingSwitch
            control={form.control}
            name="confirmDrawResignationEnabled"
            label="Confirm resignation/draw"
            description="Show confirmation dialog before resigning or offering a draw"
            id="confirm-resignation"
          />

          <SettingSwitch
            control={form.control}
            name="showLegalMovesEnabled"
            label="Show legal moves"
            description="Highlight available moves when selecting a piece"
            id="show-legal-moves"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Analysis</h3>

          <SettingSwitch
            control={form.control}
            name="engineEvaluationEnabled"
            label="Show engine evaluation"
            description="Display computer analysis during games"
            id="show-engine-evaluation"
          />

          <SettingSwitch
            control={form.control}
            name="showTimestampsEnabled"
            label="Show timestamps"
            description="Display the time each move was made"
            id="show-timestamps"
          />
        </div>

        <SettingsSubmitButton isLoading={isLoading} />
      </form>
    </Form>
  );
};
