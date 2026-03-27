"use client";

import { unstable_catchError as catchError, type ErrorInfo } from "next/error";
import ErrorDialog from "./ErrorDialog";

function ErrorFallback(
	props: { title?: string; description?: string },
	{ error, unstable_retry: retry }: ErrorInfo,
) {
	const heading = props.title || error.message || "Unexpected error occurred";
	const description =
		props.description ||
		"We encountered an error while processing your request. Please try again, or return to the overview page.";
	return (
		<div className="flex-1 flex justify-center items-center **:[h2,h1]:text-red/90">
			<ErrorDialog heading={heading} description={description} retry={retry} />
		</div>
	);
}

export default catchError(ErrorFallback);
