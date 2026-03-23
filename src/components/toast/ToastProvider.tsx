"use client";
import {
  createContext,
  PropsWithChildren,
  use,
  useReducer,
  useState,
} from "react";
import Toasts from "./Toasts";

export type Toast = {
  id: string;
  title: string;
  description?: string;
  duration?: number;
  autoDismiss?: boolean;
  type: "ERROR" | "SUCCESS";
};

type ProviderValue = {
  error: (
    title: string,
    description?: string,
    options?: { duration?: number; autoDismiss?: boolean },
  ) => void;
  success: (
    title: string,
    description?: string,
    options?: { duration?: number; autoDismiss?: boolean },
  ) => void;
};

const DURATION = 2000;

const ToastContext = createContext<ProviderValue | null>(null);

export default function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function removeToast(id: string) {
    setToasts((toasts) => toasts.filter((toast) => id !== toast.id));
  }

  function addNewToast(newToast: Toast) {
    setToasts((toasts) => [...toasts, newToast].slice(-4));
  }

  const toast = {
    error: (
      title: string,
      description?: string,
      options?: { duration?: number; autoDismiss?: boolean },
    ) => {
      const id = crypto.randomUUID();

      addNewToast({
        id,
        type: "ERROR",
        title,
        description,
        duration: options?.duration ?? DURATION,
        autoDismiss: options?.autoDismiss ?? true,
      });
    },
    success: (
      title: string,
      description?: string,
      options?: { duration?: number; autoDismiss?: boolean },
    ) => {
      const id = crypto.randomUUID();

      addNewToast({
        id,
        type: "SUCCESS",
        title,
        description,
        duration: options?.duration ?? DURATION,
        autoDismiss: options?.autoDismiss ?? true,
      });
    },
  };

  return (
    <ToastContext value={toast}>
      {children}
      <Toasts toasts={toasts} removeToast={removeToast} />
    </ToastContext>
  );
}

export function useToast() {
  return use(ToastContext);
}
