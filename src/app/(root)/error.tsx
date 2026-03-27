"use client";

import ErrorDialog from "@/components/ErrorDialog";
import { ErrorInfo } from "next/error";
import { useEffect } from "react";

export default function GlobalError({
	error,
	unstable_retry: retry,
}: ErrorInfo) {
	useEffect(() => {
		console.error("Unexpected error occurred", error);
	}, [error]);

	const heading = "Unexpected error occurred";
	const description =
		"We encountered an unexpected error while processing your request. Please try again, or return to the overview page.";

	return (
		<html>
			<body>
				<section className="flex h-screen max-h-screen items-center justify-center">
					<ErrorDialog
						heading={heading}
						description={description}
						retry={retry}
					/>
				</section>
			</body>
		</html>
	);
}
