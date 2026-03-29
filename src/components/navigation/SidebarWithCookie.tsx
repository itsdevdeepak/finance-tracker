import { getCookieByKey } from "@/actions/cookies";
import Sidebar from "./Sidebar";

export default async function SidebarWithCookie() {
	const sidebarCollapsed =
		(await getCookieByKey("sidebar-collapsed")) === "true";

	return <Sidebar initialCollapsed={sidebarCollapsed} />;
}
