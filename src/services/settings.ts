import { apiRequest } from ".";
import type { Settings } from "@/features/settings/types";

export const getSettings = (): Promise<{ data: Settings }> => {
  return apiRequest("get", "/settings");
};

export const updateSettings = (
  settings: Partial<Settings>
): Promise<{ data: Settings }> => {
  return apiRequest("patch", "/settings", { data: settings });
};
