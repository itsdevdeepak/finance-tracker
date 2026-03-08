export default function ProgressBar({
  color,
  basePercent,
  deltaPercent = 0,
  isWithdrawing = false,
}: {
  color?: string;
  basePercent: number;
  deltaPercent?: number;
  isWithdrawing?: boolean;
}) {
  const displayPercentage = isWithdrawing
    ? basePercent - deltaPercent
    : basePercent + deltaPercent;

  return (
    <div
      role="progressbar"
      aria-valuenow={displayPercentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${displayPercentage} saved`}
      className="flex w-full bg-beige-lighter h-sm rounded-full overflow-hidden"
    >
      {basePercent > 0 && (
        <div
          className={`h-full bg-gray-darker ${deltaPercent <= 0.6 ? "rounded-full" : "rounded-l-full"}`}
          style={{ width: `${basePercent}%`, background: `${color}` }}
        />
      )}
      {deltaPercent > 0 && (
        <div
          className={`h-full rounded-r-full ${
            basePercent > 0
              ? "border-l-2 border-beige-lighter"
              : "rounded-l-full"
          } ${isWithdrawing ? "bg-red" : "bg-green"}`}
          style={{ width: `${deltaPercent}%` }}
        />
      )}
    </div>
  );
}
