"use client";

import { useEffect, useRef } from "react";
import { ActionState } from "../types";

type ActionFeedbackOptions = {
	onSuccess?: (actionState: ActionState) => void;
	onError?: (actionState: ActionState) => void;
};

export default function useActionFeedback(
	actionState: ActionState,
	options: ActionFeedbackOptions,
) {
	const prevTimestamp = useRef(actionState.timestamp);

	useEffect(() => {
		const isUpdate = prevTimestamp.current !== actionState.timestamp;
		if (!isUpdate) return;

		if (actionState.status === "SUCCESS") {
			options.onSuccess?.(actionState);
		}
		if (actionState.status === "ERROR") {
			options.onError?.(actionState);
		}

		prevTimestamp.current = actionState.timestamp;
	}, [actionState, options]);
}
