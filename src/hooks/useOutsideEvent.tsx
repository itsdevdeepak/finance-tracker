"use client";

import { useEffect, useRef } from "react";

function isKeyboardEvent(event: Event): event is KeyboardEvent {
  return "key" in event;
}

/**
 * Hook for detecting clicks, touches, focus changes, or Escape key presses outside a specific element.
 * Useful for closing dropdowns, modals, or popovers when the user interacts outside of them.
 *
 * @template T - The type of HTML element being monitored (must extend HTMLElement)
 * @param callback - Function called when an outside event is detected (click, touch, focus, or Escape key)
 * @returns A ref to the element to monitor for outside events
 *
 * @example
 * const dropdownRef = useOutsideEvent<HTMLDivElement>(() => setIsOpen(false));
 */
export default function useOutsideEvent<T extends HTMLElement>(
  callback: (event: Event) => void,
) {
  const elementRef = useRef<T>(null);

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

  return elementRef;
}
