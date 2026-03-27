"use client";

import { useEffect } from "react";
import Toast from "./Toast";
import { useToast, type Toast as ToastType } from "./ToastProvider";
import { deleteCookieByKey, getCookieByKey } from "@/actions/cookies";

export default function Toasts({
	toasts,
	removeToast,
}: {
	toasts: ToastType[];
	removeToast: (id: string) => void;
}) {
	const toast = useToast();

	useEffect(() => {
		(async function showToast() {
			const cookie = await getCookieByKey("toast");
			if (cookie) {
				toast?.success(cookie);
				deleteCookieByKey("toast");
			}
		})();
	}, [toast]);

	return (
		<div className="flow-base fixed z-999 right-base bottom-base">
			{toasts.map((toast) => (
				<Toast
					key={toast.id}
					toast={toast}
					removeToast={() => removeToast(toast.id)}
				/>
			))}
		</div>
	);
}
