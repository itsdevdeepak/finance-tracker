import Link from "next/link";
import { getPots } from "../service";
import { formatCurrency } from "@/lib/utils/format";
import { getColorByName } from "@/lib/utils/colors";
import { ColorsByName } from "@/constants/colors";
import DataTile from "@/components/ui/DataTile";
import IconCaretRight from "@/components/icons/IconCaretRight";
import IconPot from "@/components/icons/IconPot";
import ErrorCard from "@/components/ui/ErrorCard";

export default async function PotsSummary() {
  const { data, error } = await getPots();

  if (error) {
    return (
      <ErrorCard
        heading="Pots data couldn't be loaded"
        description="Please check your connection or try again soon."
      />
    );
  }

  const pots = data.pots;
  const totalSaved = pots.reduce((sum, pot) => sum + pot.total, 0);

  return (
    <div className="card flow-lg">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Pots</h2>
        <Link className="pageLink" href="/pots">
          See Details <IconCaretRight />
        </Link>
      </div>
      <div className="flex flex-wrap *:flex-1 *:grow gap-lg">
        <div className="p-base flex items-center gap-base card bg-beige-lighter">
          <IconPot className="text-green size-10 " />
          <div className="flow-sm">
            <h3 className="text-gray text-sm">Total Saved</h3>
            <div className="text-2xl font-bold">
              {formatCurrency(totalSaved)}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-base min-w-fit">
          {pots.slice(0, 4).map((pot) => (
            <DataTile
              key={pot.id}
              color={getColorByName(pot.theme) || ColorsByName.navy}
              title={pot.name}
              value={formatCurrency(pot.total)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
