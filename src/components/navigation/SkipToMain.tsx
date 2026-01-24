import styles from "./navigation.module.css";

export default function SkipToMain() {
  return (
    <a className={styles.skipToMain} href="#main">
      Skip To Main
    </a>
  );
}
