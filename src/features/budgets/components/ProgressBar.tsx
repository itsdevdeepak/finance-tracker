export default function ProgressBar({
  basePercent,
  color,
}: {
  basePercent: number;
  color: string;
}) {
  return (
    <div
      role="progressbar"
      aria-valuenow={basePercent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${basePercent}% used`}
      className="flex w-full bg-beige-lighter h-2xl p-2xs rounded-xs overflow-hidden"
    >
      <div
        className={`h-full bg-gray-darker rounded-xs`}
        style={{ width: `${basePercent}%`, background: `${color}` }}
      />
    </div>
  );
}
