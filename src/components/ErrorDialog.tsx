import Link from "next/link";
import IconCloudSlash from "./icons/IconCloudSlash";
import Placeholder from "./Placeholder";
import IconArrowLeft from "./icons/IconArrowLeft";

export default function ErrorDialog({
	heading,
	description,
	retry,
}: {
	heading: string;
	description: string;
	retry: () => void;
}) {
	return (
		<Placeholder
			heading={heading}
			description={description}
			icon={<IconCloudSlash className="size-18 text-red/90" />}
			button={
				<div className="flex flex-col w-full gap-3">
					<button onClick={retry} className="button flex-1 bg-red">
						Try Again
					</button>
					<Link
						href="/"
						className="button flex justify-center flex-1 bg-beige-lighter text-gray items-center gap-xs"
					>
						<IconArrowLeft className="size-lg" /> Back to Dashboard
					</Link>
				</div>
			}
		/>
	);
}
