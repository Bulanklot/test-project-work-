import styles from "./custom-preloader.module.css";
export function Preloader() {
  return (
    <div className={styles.page}>
      <div className={styles.loader}>
      </div>
    </div>
  );
}
