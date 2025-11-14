import { useState, useCallback } from "react";
import type { TimeControlType } from "@/types";

export interface TimeControl {
  format: TimeControlType;
  time: number;
  increment: number;
}

/**
 * Hook to manage time control selection
 * Combines format (bullet/blitz/rapid), time (in minutes), and increment (in seconds)
 */
export const useTimeControl = (
  initialFormat: TimeControlType = "blitz",
  initialTime = 180,
  initialIncrement = 0
) => {
  const [timeControl, setTimeControl] = useState<TimeControl>({
    format: initialFormat,
    time: initialTime,
    increment: initialIncrement,
  });

  const updateTimeControl = useCallback(
    (format: TimeControlType, time: number, increment: number = 0) => {
      setTimeControl({ format, time, increment });
    },
    []
  );

  return {
    timeControl,
    updateTimeControl,
    format: timeControl.format,
    time: timeControl.time,
    increment: timeControl.increment,
  };
};
