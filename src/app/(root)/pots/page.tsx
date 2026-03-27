import { Suspense } from "react";
import Link from "next/link";
import Pots from "@/features/pots/components/Pots";
import PotsSkeletal from "@/features/pots/components/PotsSkeletal";
import { getPots } from "@/features/pots/service";
import ErrorFallback from "@/components/ErrorFallback";
import { potsPath } from "@/constants/paths";

export default function Page() {
	const potsRes = getPots();
	return (
		<section className="flex flex-col gap-2xl min-h-[calc(100dvh-5rem)]">
			<div className="flex justify-between">
				<h1 className="text-xl font-bold">Pots</h1>
				<Link prefetch={true} href={`${potsPath()}/new`} className="button">
					+ Add New Pot
				</Link>
			</div>
			<ErrorFallback>
				<Suspense fallback={<PotsSkeletal />}>
					<Pots getPotsResponse={potsRes} />
				</Suspense>
			</ErrorFallback>
		</section>
	);
}
