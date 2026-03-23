"use client";
import ToastProvider from "@/components/toast/ToastProvider";

export default function Template({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
