import {
	SidebarSkeletal,
	SidebarWithCookie,
	SkipToMain,
	TabNavigation,
	TabNavigationSkeletal,
} from "@/components/navigation";
import { Suspense } from "react";

export default function Layout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<>
			<SkipToMain />
			<div className="with-sidebar">
				<Suspense fallback={<SidebarSkeletal />}>
					<SidebarWithCookie />
				</Suspense>
				<main
					id="main"
					className="px-base py-xl sm:px-3xl sm:py-2xl max-lg:pb-23!"
				>
					{modal}
					{children}
				</main>
			</div>
			<Suspense
				fallback={<TabNavigationSkeletal visibility="mobile-and-tablet" />}
			>
				<TabNavigation visibility="mobile-and-tablet" />
			</Suspense>
		</>
	);
}
