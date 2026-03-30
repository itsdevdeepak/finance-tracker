import Link from "next/link";
import { potsPath } from "@/constants/paths";
import PotsSkeletal from "@/features/pots/components/PotsSkeletal";

export default function Loading() {
	return (
		<section className="flex flex-col gap-2xl min-h-[calc(100dvh-5rem)]">
			<div className="flex justify-between">
				<h1 className="text-xl font-bold">Pots</h1>
				<Link prefetch={true} href={`${potsPath()}/new`} className="button">
					+ Add New Pot
				</Link>
			</div>
			<PotsSkeletal />
		</section>
	);
}
