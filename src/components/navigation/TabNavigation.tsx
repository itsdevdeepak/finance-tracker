import NavLinks from "./NavLinks";
import styles from "./navigation.module.css";

interface TabNavigationProps {
  visibility: "mobile-only" | "mobile-and-tablet" | "all";
}

export default function TabNavigation({ visibility }: TabNavigationProps) {
  return (
    <nav
      aria-label="Main Navigation"
      className={styles.tabbar}
      data-visibility={visibility}
    >
      <NavLinks />
    </nav>
  );
}
