import {
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_MINUTE,
  MINUTES_IN_HOUR,
  ONE_MINUTE_MS,
  ONE_SECOND_MS,
} from "@/constants/time";

/**
 * Formats milliseconds to MM:SS or H:MM:SS format
 * Shows milliseconds when time is low (< 20 seconds)
 * @param ms - Time in milliseconds
 * @param showMilliseconds - Whether to show milliseconds (for low time)
 * @returns Formatted time string
 */
export const formatTime = (ms: number, showMilliseconds = false): string => {
  const totalMs = Math.max(0, ms);
  const totalSeconds = Math.floor(totalMs / MILLISECONDS_IN_SECOND);
  const hours = Math.floor(totalSeconds / (MINUTES_IN_HOUR * SECONDS_IN_MINUTE));
  const minutes = Math.floor(
    (totalSeconds % (MINUTES_IN_HOUR * SECONDS_IN_MINUTE)) / SECONDS_IN_MINUTE
  );
  const seconds = totalSeconds % SECONDS_IN_MINUTE;
  const centiseconds = Math.floor((totalMs % MILLISECONDS_IN_SECOND) / 10);

  // When time is low, show seconds with centiseconds
  if (showMilliseconds) {
    return `${seconds}.${centiseconds.toString().padStart(2, "0")}`;
  }

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

/**
 * Parses time control string (e.g., "3", "3 + 2", "10 + 5") to milliseconds
 * @param timeControl - Time control string
 * @returns Object with initial time and increment in milliseconds
 */
export const parseTimeControl = (
  timeControl: string
): { initialTime: number; increment: number } => {
  const parts = timeControl.split("+").map((p) => p.trim());
  const initialTime = parseInt(parts[0]) * ONE_MINUTE_MS;
  const increment = parts[1] ? parseInt(parts[1]) * ONE_SECOND_MS : 0;

  return { initialTime, increment };
};
