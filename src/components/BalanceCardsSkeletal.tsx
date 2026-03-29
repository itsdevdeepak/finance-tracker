import CompactCard from "./CompactCard";

export default function BalanceCardsSkeletal() {
	return (
		<div
			aria-busy="true"
			aria-label="Loading..."
			className="flex max-sm:flex-col *:flex-1 *:grow *:shrink gap-sm md:gap-xl"
		>
			<CompactCard isDark={true}>
				<div className="h-[21px] w-[20ch] rounded-lg bg-gray-lighter motion-safe:animate-pulse" />
				<div className="h-[32px] w-[10ch] rounded-xl bg-gray-lighter motion-safe:animate-pulse" />
			</CompactCard>
			<CompactCard>
				<div className="h-[21px] w-[20ch] rounded-lg bg-gray-lighter motion-safe:animate-pulse" />
				<div className="h-[32px] w-[10ch] rounded-xl bg-gray-lighter motion-safe:animate-pulse" />
			</CompactCard>
			<CompactCard>
				<div className="h-[21px] w-[20ch] rounded-lg bg-gray-lighter motion-safe:animate-pulse" />
				<div className="h-[32px] w-[10ch] rounded-xl bg-gray-lighter motion-safe:animate-pulse" />
			</CompactCard>
		</div>
	);
}
