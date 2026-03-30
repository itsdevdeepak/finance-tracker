export default function SummarySkeletal({
	height = "200px",
	width = "100%",
}: {
	height?: string;
	width?: string;
}) {
	return (
		<div
			aria-busy="true"
			aria-label="Loading..."
			className="card flow-xl *:motion-safe:animate-pulse"
		>
			<div className="flex items-center justify-between">
				<div className="h-10 w-[40%] bg-gray-lighter rounded-sm"></div>
				<div className="h-9 w-30 bg-gray-lighter rounded-sm"></div>
			</div>
			<div
				className="h-70 w-full bg-gray-lighter rounded-sm"
				style={{ height: height, width: width }}
			></div>
		</div>
	);
}
