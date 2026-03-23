"use client";

import { useEffect, useRef } from "react";

export default function useToastConfig({
  duration = 2000,
  autoDismiss = true,
  callback,
}: {
  duration?: number;
  autoDismiss?: boolean;
  callback: () => void;
}) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function startTimer() {
    if (autoDismiss === false) {
      return;
    }

    clearTimer();
    timerRef.current = setTimeout(() => {
      callback();
    }, duration ?? 2000);
  }

  function clearTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  useEffect(() => {
    if (!autoDismiss) return;

    startTimer();

    return () => clearTimer();
  }, []);
  return { startTimer, clearTimer };
}
