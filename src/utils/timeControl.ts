import { TIME_CONTROL_ICONS } from "@/constants/timeControlIcons";
import type { TimeControlType } from "@/types";

/**
 * Get the icon component for a given time control type
 * @param type - The time control type (bullet, blitz, rapid)
 * @returns The corresponding icon component
 */
export const getTimeControlIcon = (type: string) => {
  return TIME_CONTROL_ICONS[type as TimeControlType];
};

export const formatTimeControl = (
  time: number,
  increment?: number,
  separator: string = "+"
): string => {
  const minutes = time / 60;

  if (increment !== undefined && increment > 0) {
    return `${minutes}${separator}${increment}`;
  }

  return `${minutes} min`;
};
