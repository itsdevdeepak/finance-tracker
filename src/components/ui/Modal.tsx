"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  use,
  useEffect,
  useRef,
} from "react";

const ModalContext = createContext<{ closeModal: () => void } | null>(null);

export default function Modal({
  fallbackRoute,
  children,
}: PropsWithChildren<{ fallbackRoute: string }>) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "";
    };
  }, []);

  function closeModal() {
    dialogRef.current?.close();
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackRoute);
  }

  return (
    <ModalContext value={{ closeModal }}>
      <dialog
        onKeyDown={({ key }) => key === "Escape" && closeModal()}
        ref={dialogRef}
        className="m-auto bg-transparent overflow-visible"
        tabIndex={-1}
      >
        <div className="overflow-visible">{children}</div>
      </dialog>
    </ModalContext>
  );
}

export function useModal() {
  const context = use(ModalContext);
  return context;
}
