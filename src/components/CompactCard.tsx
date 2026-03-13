import { PropsWithChildren } from "react";

export default function CompactCard({
  className = "",
  isDark = false,
  children,
}: PropsWithChildren<{ className?: string; isDark?: boolean }>) {
  return (
    <div
      className={`p-lg md:p-xl flow-sm rounded-xl  ${isDark ? "bg-gray-darker text-white" : "bg-white text-gray-darker"} ${className}`}
    >
      {children}
    </div>
  );
}
