import ProgressBar from "./ProgressBar";
import { ColorsByName } from "@/constants/colors";
import { getColorByName } from "@/lib/utils/colors";
import { formatCurrency } from "@/lib/utils/format";

export default function AmountInfo({
  spent,
  maximum,
  theme,
}: {
  maximum: number;
  spent: number;
  theme: string;
}) {
  const spendingPercent =
    maximum > 0 ? Math.min((spent / maximum) * 100, 100) : 0;

  const freeAmount = maximum - spent;
  const color = getColorByName(theme) || ColorsByName.navy;

  return (
    <div className="flow-base">
      <span className="text-sm text-gray">
        Maximum of {formatCurrency(maximum)}
      </span>
      <ProgressBar basePercent={spendingPercent} color={color} />
      <div className="flex *:flex-1">
        <div className="flex gap-base">
          <div className="w-2xs rounded-full" style={{ background: color }} />
          <div className="flex flex-col gap-2xs text-xs">
            <span className="text-gray">Spent</span>
            <span className="font-bold">{formatCurrency(spent)}</span>
          </div>
        </div>
        <div className="flex gap-base">
          <div className="w-2xs rounded-full bg-beige-lighter" />
          <div className="flex flex-col gap-2xs text-xs">
            <span className="text-gray">Remaining</span>
            <span className="font-bold">{formatCurrency(freeAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
