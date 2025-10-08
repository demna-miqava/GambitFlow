/**
 * Formats milliseconds to MM:SS or H:MM:SS format
 * Shows milliseconds when time is low (< 20 seconds)
 * @param ms - Time in milliseconds
 * @param showMilliseconds - Whether to show milliseconds (for low time)
 * @returns Formatted time string
 */
export const formatTime = (ms: number, showMilliseconds = false): string => {
  const totalMs = Math.max(0, ms);
  const totalSeconds = Math.floor(totalMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const centiseconds = Math.floor((totalMs % 1000) / 10); // Show centiseconds (00-99)

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
  const initialTime = parseInt(parts[0]) * 60 * 1000; // Convert minutes to ms
  const increment = parts[1] ? parseInt(parts[1]) * 1000 : 0; // Convert seconds to ms

  return { initialTime, increment };
};
