import type { Toast as ToastType } from "./ToastProvider";
import Toast from "./Toast";

export default function Toasts({
  toasts,
  removeToast,
}: {
  toasts: ToastType[];
  removeToast: (id: string) => void;
}) {
  return (
    <div className="flow-base fixed z-99 right-base bottom-base">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          removeToast={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}
