import { Suspense } from "react";
import Link from "next/link";
import Pots from "@/features/pots/components/Pots";
import PotsSkeletal from "@/features/pots/components/PotsSkeletal";
import { getPots } from "@/features/pots/service";

export default function Page() {
  const potsRes = getPots();
  return (
    <section className="flow-2xl">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Pots</h1>
        <Link prefetch={true} href="/pots/new" className="button">
          + Add New Pot
        </Link>
      </div>
      <Suspense fallback={<PotsSkeletal />}>
        <Pots getPotsResponse={potsRes} />
      </Suspense>
    </section>
  );
}
