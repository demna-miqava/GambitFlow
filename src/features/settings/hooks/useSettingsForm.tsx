import { useEffect, useMemo } from "react";
import { useForm, type DefaultValues } from "react-hook-form";
import { useSettings } from "../SettingsContext";
import type { Settings } from "../types";
// gadaxede typescripts
type BooleanKeys<T> = {
  [K in keyof T]: T[K] extends boolean ? K : never;
}[keyof T];

export const useSettingsForm = <K extends BooleanKeys<Settings>>(
  fields: K[]
) => {
  const { settings, updateSettings } = useSettings();

  const defaultValues = useMemo(() => {
    const acc = {} as Record<K, boolean>;
    for (const field of fields) {
      acc[field] = false;
    }
    return acc;
  }, [fields]);

  const form = useForm<Record<K, boolean>>({
    defaultValues: defaultValues as DefaultValues<Record<K, boolean>>,
  });

  useEffect(() => {
    if (settings) {
      const formValues = {} as Record<K, boolean>;
      for (const field of fields) {
        formValues[field] = settings[field];
      }
      form.reset(formValues);
    }
  }, [settings, form]);

  const onSubmit = (data: Record<K, boolean>) => {
    updateSettings.mutate(data);
  };

  return {
    form,
    onSubmit,
    isLoading: updateSettings.isPending,
  } as const;
};
