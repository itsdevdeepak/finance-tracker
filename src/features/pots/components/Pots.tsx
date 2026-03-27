"use client";

import { PropsWithChildren, use } from "react";
import Link from "next/link";
import { GetPotsResponse, Pot } from "../types";
import { getColorByName } from "@/lib/utils/colors";
import { ColorsByName } from "@/constants/colors";
import { formatCurrency } from "@/lib/utils/format";
import ProgressBar from "./ProgressBar";
import OptionsMenu, { Option } from "@/components/ui/OptionsMenu";

function PotLink({
	children,
	href,
}: PropsWithChildren<{
	href: string;
}>) {
	return (
		<Link
			prefetch={true}
			href={href}
			className="block p-base text-center cursor-pointer border border-beige-lighter bg-beige-lighter font-bold text-sm hover:bg-white hover:border-beige rounded-lg"
		>
			{children}
		</Link>
	);
}

function PotCard({ pot }: { pot: Pot }) {
	const targetCompleted = parseFloat(
		(pot.total * (100 / pot.target)).toFixed(2),
	);

	const potRoute = `/pots/${pot.id}`;
	const color = getColorByName(pot.theme) || ColorsByName.navy;

	return (
		<article className="p-xl bg-white rounded-xl flow-3xl grow">
			<div className="flex gap-base items-center">
				<div
					className="w-base h-base rounded-full"
					style={{ background: color }}
				/>
				<h2 className="font-bold">{pot.name}</h2>
				<OptionsMenu name="pot" className="ml-auto">
					<Option type="link" prefetch={true} href={`${potRoute}/edit`}>
						Edit Pot
					</Option>
					<Option
						type="link"
						prefetch={true}
						href={`${potRoute}/delete`}
						className="text-red"
					>
						Delete Pot
					</Option>
				</OptionsMenu>
			</div>
			<div className="flow-base">
				<div className="flex justify-between items-center">
					<span className="text-gray">Total Saved</span>
					<span className="text-2xl font-bold">
						{formatCurrency(pot.total)}
					</span>
				</div>
				<div className="flow-sm">
					<ProgressBar basePercent={targetCompleted} color={color} />
					<div className="flex justify-between text-gray text-xs gap-sm">
						<span className="font-bold">{targetCompleted}%</span>
						<span>Target of {pot.target}</span>
					</div>
				</div>
			</div>
			<div className="flex gap-base *:flex-1 flex-wrap">
				<PotLink href={`${potRoute}/saving/add`}>+ Add Money</PotLink>
				<PotLink href={`${potRoute}/saving/withdraw`}>Withdraw</PotLink>
			</div>
		</article>
	);
}

export default function Pots({
	getPotsResponse,
}: {
	getPotsResponse: Promise<GetPotsResponse>;
}) {
	const { data, error } = use(getPotsResponse);

	if (error) {
		throw new Error(error);
	}

	return (
		<div
			className="fluid-grid gap-xl"
			style={{ "--minimum": "518px" } as React.CSSProperties}
		>
			{data.pots.map((pot) => (
				<PotCard key={pot.id} pot={pot} />
			))}
		</div>
	);
}
