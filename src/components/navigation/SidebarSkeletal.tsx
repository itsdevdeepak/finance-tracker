import styles from "./navigation.module.css";

export default function SidebarSkeletal() {
	return (
		<aside
			className={styles.sidebar + " *:motion-safe:animate-pulse"}
			aria-busy="true"
			aria-label="Loading navigation"
		>
			<div className="px-2xl py-3xl">
				<div className="h-8 w-35 rounded-lg bg-gray" />
			</div>

			<nav aria-hidden="true">
				<div className="flow-sm pr-xl pb-base" aria-hidden="true">
					<div className="h-13 rounded-r-lg bg-gray" />
					<div className="h-13 rounded-r-lg bg-gray" />
					<div className="h-13 rounded-r-lg bg-gray" />
					<div className="h-13 rounded-r-lg bg-gray" />
				</div>
			</nav>

			<div className="flow-sm px-xl pb-base" aria-hidden="true">
				<div className="h-13 rounded-lg bg-gray" />
				<div className="h-13 rounded-lg bg-gray" />
			</div>
		</aside>
	);
}
