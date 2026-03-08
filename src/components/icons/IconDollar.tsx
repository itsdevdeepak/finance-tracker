import { IconProps } from "./types";

export default function IconDollar({ className }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      height={14}
      width={14}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      <path d="M12 22 L12 2" />
    </svg>
  );
}
