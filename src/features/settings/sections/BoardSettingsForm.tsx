import { Form } from "@/components/ui/form";
import { SettingsSubmitButton } from "../components/SettingsSubmitButton";
import { SettingSwitch } from "../components/SettingSwitch";
import { useSettingsForm } from "../hooks/useSettingsForm";

export const BoardSettingsForm = () => {
  const { form, onSubmit, isLoading } = useSettingsForm([
    "boardCoordinatesEnabled",
    "moveHighlightEnabled",
    "soundsEnabled",
  ]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <SettingSwitch
            control={form.control}
            name="boardCoordinatesEnabled"
            label="Show board coordinates"
            description="Display A-H and 1-8 coordinates around the board"
            id="show-coordinates"
          />

          <SettingSwitch
            control={form.control}
            name="moveHighlightEnabled"
            label="Highlight moves"
            description="Highlight the last move played on the board"
            id="highlight-moves"
          />

          <SettingSwitch
            control={form.control}
            name="soundsEnabled"
            label="Play sounds"
            description="Play sound effects for moves and game events"
            id="play-sounds"
          />
        </div>

        <SettingsSubmitButton isLoading={isLoading} />
      </form>
    </Form>
  );
};
