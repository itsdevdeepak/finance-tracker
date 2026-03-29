import styles from "./navigation.module.css";

interface TabNavigationSkeletalProps {
	visibility: "mobile-only" | "mobile-and-tablet" | "all";
}

export default function TabNavigationSkeletal({
	visibility,
}: TabNavigationSkeletalProps) {
	return (
		<nav
			aria-busy="true"
			aria-label="Loading navigation"
			className={styles.tabbar}
			data-visibility={visibility}
		>
			<ul
				role="presentation"
				className={`${styles.navLinks} min-h-[56px] items-end gap-sm`}
				aria-hidden="true"
			>
				<div className="m-h-[48px] basis-[110px] h-[50] rounded-sm bg-gray motion-safe:animate-pulse" />
				<div className="m-h-[48px] basis-[110px] h-[50] rounded-sm bg-gray motion-safe:animate-pulse" />
				<div className="m-h-[48px] basis-[110px] h-[50] rounded-sm bg-gray motion-safe:animate-pulse" />
				<div className="m-h-[48px] basis-[110px] h-[50] rounded-sm bg-gray motion-safe:animate-pulse" />
				<div className="m-h-[48px] basis-[110px] h-[50] rounded-sm bg-gray motion-safe:animate-pulse" />
			</ul>
		</nav>
	);
}
