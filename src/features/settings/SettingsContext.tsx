import { createContext, useContext, useMemo } from "react";
import { useGetSettings } from "./hooks/useGetSettings";
import { useUpdateSettings } from "./hooks/useUpdateSettings";
import type { Settings } from "./types";
import type { UseMutationResult } from "@tanstack/react-query";

type SettingsContextType = {
  settings: Settings | undefined;
  updateSettings: UseMutationResult<
    { data: Settings },
    Error,
    Partial<Settings>,
    unknown
  >;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { data: settings } = useGetSettings();
  const updateSettingsMutation = useUpdateSettings();

  const value = useMemo(
    () => ({
      settings: settings?.data,
      updateSettings: updateSettingsMutation,
    }),
    [settings?.data, updateSettingsMutation]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return context;
}
