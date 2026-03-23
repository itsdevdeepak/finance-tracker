import IconCheck from "../icons/IconCheck";
import IconClose from "../icons/IconClose";
import IconDanger from "../icons/IconDanger";
import { type Toast } from "./ToastProvider";
import useToastConfig from "./useToastConfig";

export default function Toast({
  toast,
  removeToast,
}: {
  toast: Toast;
  removeToast: () => void;
}) {
  const { startTimer, clearTimer } = useToastConfig({
    duration: toast.duration,
    autoDismiss: toast.autoDismiss,
    callback: removeToast,
  });

  const accessibleProps =
    toast.type === "SUCCESS"
      ? {
          role: "status",
          "aria-live": "polite" as const,
        }
      : {
          role: "alert",
          "aria-live": "assertive" as const,
        };

  const toastColorClassUtilities =
    toast.type === "SUCCESS"
      ? "bg-gray-darker text-gray-light"
      : "bg-red text-white";
  const iconUtilities = "size-[28px] shrink-0 text-white mt-[1px]";
  const toastIcon =
    toast.type === "SUCCESS" ? (
      <IconCheck className={iconUtilities} />
    ) : (
      <IconDanger className={iconUtilities} />
    );

  const closeButton = (
    <button
      type="button"
      aria-label="Dismiss toast"
      onClick={() => removeToast()}
      className="shrink-0 rounded-md text-white/80 hover:text-white cursor-pointer"
    >
      <IconClose className="size-6" />
    </button>
  );

  return (
    <div
      {...accessibleProps}
      className={`flex items-start gap-sm rounded-xl py-lg px-base max-w-[45ch] ${toastColorClassUtilities}`}
      onMouseEnter={() => clearTimer()}
      onMouseLeave={() => startTimer()}
    >
      {toastIcon}
      <div className="text-pretty flow-xs">
        <div className="flex justify-between">
          <h3 className="text-lg text-white font-bold">{toast.title}</h3>
          {!toast.autoDismiss && closeButton}
        </div>
        {toast.description && <p className="text-sm">{toast.description}</p>}
      </div>
    </div>
  );
}
