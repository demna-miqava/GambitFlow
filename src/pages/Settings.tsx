import { SettingsContainer } from "@/features/settings/SettingsContainer";
import { Settings as SettingsIcon } from "lucide-react";

export const Settings = () => {
  return (
    <div className="mx-auto max-w-8xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <SettingsIcon />
        <span className="text-2xl font-bold">Settings</span>
      </div>
      <SettingsContainer />
    </div>
  );
};
