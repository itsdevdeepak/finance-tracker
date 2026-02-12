"use client";

import { RefObject, useEffect } from "react";

function isKeyboardEvent(event: Event): event is KeyboardEvent {
  return "key" in event;
}

export default function useOutsideEvent<T extends HTMLElement>(
  elementRef: RefObject<T | null>,
  callback: (event: Event) => void,
) {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    function handler(event: Event) {
      if (!element) return;

      if (isKeyboardEvent(event) && event.key === "Escape") {
        callback(event);
        return;
      }

      if (element.contains(event.target as HTMLElement)) return;

      callback(event);
    }

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchend", handler);
    document.addEventListener("focusin", handler);
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchend", handler);
      document.removeEventListener("focusin", handler);
      document.removeEventListener("keydown", handler);
    };
  }, [elementRef, callback]);
}
