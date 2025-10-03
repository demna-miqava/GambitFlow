import { TIME_CONTROL_ICONS } from "@/consts";
import { type LucideIcon } from "lucide-react";

export type TimeControlType = keyof typeof TIME_CONTROL_ICONS;

/**
 * Get the icon component for a given time control type
 * @param type - The time control type (bullet, blitz, rapid)
 * @returns The corresponding icon component
 */
export const getTimeControlIcon = (type: string) => {
  return TIME_CONTROL_ICONS[type as TimeControlType];
};
