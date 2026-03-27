import DialogSkeletal from "@/components/ui/DialogSkeletal";
import { MobileHeader, SideBanner } from "@/features/auth/components/AuthView";

export default function Loading() {
	return (
		<div className="h-dvh flex flex-col">
			<MobileHeader className="lg:hidden" />
			<div className="with-sidebar flex-1 flex-nowrap!">
				<SideBanner className="max-lg:hidden" />
				<main className="flex items-center justify-center">
					<DialogSkeletal />
				</main>
			</div>
		</div>
	);
}
