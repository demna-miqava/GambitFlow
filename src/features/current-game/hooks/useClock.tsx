import { useEffect, useState, useRef } from "react";

const LOW_TIME_PER_FORMAT = {
  rapid: 60000,
  blitz: 20000,
  bullet: 10000,
};

const format = "bullet";
export const useClock = ({
  startingTime,
  increment,
  isActive,
}: {
  startingTime: number;
  increment?: number;
  isActive: boolean;
}) => {
  const [time, setTime] = useState(startingTime);
  const lastTickRef = useRef<number>(Date.now());
  const intervalRef = useRef<number | null>(null);

  const isLowTime = time <= LOW_TIME_PER_FORMAT[format];
  // TODO: Check requestAnimationFrame for better countdown experience
  // Update time when startingTime changes (external updates)
  useEffect(() => {
    setTime(startingTime);
  }, [startingTime]);

  // Countdown logic when clock is active
  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        if (increment) {
          setTime((prev) => prev + increment);
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
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [increment, isActive]);

  return { time, isLowTime };
};
