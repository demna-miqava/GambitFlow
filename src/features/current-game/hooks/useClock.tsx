import { useEffect, useState, useRef } from "react";
import type { TimeControlType } from "@/types";
import {
  LOW_TIME_THRESHOLDS,
  TIME_CONTROL_BOUNDARIES,
  CLOCK_TICK_INTERVAL_MS,
  ONE_SECOND_MS,
} from "@/constants/time";

const getTimeControlFormat = (timeInSeconds: number): TimeControlType => {
  if (timeInSeconds < TIME_CONTROL_BOUNDARIES.bulletMax) return "bullet";
  if (timeInSeconds < TIME_CONTROL_BOUNDARIES.blitzMax) return "blitz";
  return "rapid";
};

export const useClock = ({
  startingTime,
  increment,
  isActive,
  onTimeout,
  gameEnded = false,
}: {
  startingTime: number; // in seconds
  increment?: number; // in seconds
  isActive: boolean;
  onTimeout?: () => void;
  gameEnded?: boolean;
}) => {
  const startingTimeMs = startingTime * ONE_SECOND_MS;
  const incrementMs = increment ? increment * ONE_SECOND_MS : 0;

  const [time, setTime] = useState(startingTimeMs);
  const lastTickRef = useRef<number>(Date.now());
  const intervalRef = useRef<number | null>(null);
  const timeoutCalledRef = useRef(false);

  const format = getTimeControlFormat(startingTime);
  const isLowTime = time <= LOW_TIME_THRESHOLDS[format];
  // TODO: Check requestAnimationFrame for better countdown experience
  useEffect(() => {
    setTime(startingTimeMs);
    timeoutCalledRef.current = false; // Reset timeout flag when time changes
  }, [startingTimeMs]);

  useEffect(() => {
    if (time === 0 && !timeoutCalledRef.current && onTimeout) {
      timeoutCalledRef.current = true;
      onTimeout();
    }
  }, [time, onTimeout]);

  useEffect(() => {
    if (gameEnded) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    if (!isActive) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        if (incrementMs > 0) {
          setTime((prev) => prev + incrementMs);
        }
      }
      return;
    }

    lastTickRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastTickRef.current;
      lastTickRef.current = now;

      setTime((prevTime) => Math.max(0, prevTime - elapsed));
    }, CLOCK_TICK_INTERVAL_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [incrementMs, isActive, gameEnded]);

  return { time, isLowTime };
};
